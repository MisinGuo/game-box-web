<script setup lang="ts">
// APlayer 只能在客户端使用，避免在 SSR 阶段导入导致 `window is not defined`
let APlayer: any = null;
import MyIcon from "./MyIcon.vue";
// 移除vue-router导入，使用window.location代替
import { ref, onMounted, nextTick } from "vue";
import axios from "axios";
let IsShow = ref(false);
let GlobalMusicList: any[] = [];
let currentCover = ref("");
let isPlaying = ref(false);
let isFirstClick = ref(true);

// 音乐播放器状态管理
const MUSIC_STORAGE_KEY = "GlobalAPlayer_State";
const MUSIC_LIST_STORAGE_KEY = "GlobalAPlayer_MusicList";

// 保存播放状态到localStorage
const saveMusicState = () => {
  const Win: any = window;
  if (Win.GlobalAPlayer) {
    const state = {
      currentTime: Win.GlobalAPlayer.audio.currentTime,
      currentIndex: Win.GlobalAPlayer.list.index,
      isPlaying: !Win.GlobalAPlayer.audio.paused,
      volume: Win.GlobalAPlayer.audio.volume,
      timestamp: Date.now(),
    };
    localStorage.setItem(MUSIC_STORAGE_KEY, JSON.stringify(state));
  }
};

// 从localStorage恢复播放状态
const restoreMusicState = () => {
  const Win: any = window;
  if (!Win.GlobalAPlayer) return;

  try {
    const savedState = localStorage.getItem(MUSIC_STORAGE_KEY);
    if (savedState) {
      const state = JSON.parse(savedState);
      // 检查状态是否过期（24小时）
      if (Date.now() - state.timestamp < 24 * 60 * 60 * 1000) {
        // 恢复播放位置
        if (
          state.currentIndex !== undefined &&
          state.currentIndex !== Win.GlobalAPlayer.list.index
        ) {
          Win.GlobalAPlayer.list.switch(state.currentIndex);
        }

        // 恢复音量
        if (state.volume !== undefined) {
          Win.GlobalAPlayer.volume(state.volume);
        }

        // 恢复播放时间
        if (state.currentTime !== undefined) {
          Win.GlobalAPlayer.audio.currentTime = state.currentTime;
        }

        // 恢复播放状态
        if (state.isPlaying) {
          setTimeout(() => {
            safeAPlayerCall("play");
          }, 100);
        }
      }
    }
  } catch (error) {
    console.warn("Failed to restore music state:", error);
  }
};

// 保存音乐列表到localStorage
const saveMusicList = () => {
  if (GlobalMusicList.length > 0) {
    localStorage.setItem(
      MUSIC_LIST_STORAGE_KEY,
      JSON.stringify(GlobalMusicList),
    );
  }
};

// 从localStorage恢复音乐列表
const restoreMusicList = () => {
  try {
    const savedList = localStorage.getItem(MUSIC_LIST_STORAGE_KEY);
    if (savedList) {
      const list = JSON.parse(savedList);
      if (Array.isArray(list) && list.length > 0) {
        GlobalMusicList = list;
        if (list[0] && list[0].cover) {
          currentCover.value = list[0].cover;
        }
        return true;
      }
    }
  } catch (error) {
    console.warn("Failed to restore music list:", error);
  }
  return false;
};

// 安全的APlayer方法调用包装器
const safeAPlayerCall = (methodName: string, ...args: any[]) => {
  const Win: any = window;
  if (!Win.GlobalAPlayer) {
    console.warn(`APlayer instance not found for method: ${methodName}`);
    return false;
  }

  if (typeof Win.GlobalAPlayer[methodName] !== "function") {
    console.warn(`APlayer method '${methodName}' not found`);
    return false;
  }

  try {
    return Win.GlobalAPlayer[methodName](...args);
  } catch (error) {
    console.warn(`Failed to call APlayer method '${methodName}':`, error);
    return false;
  }
};

const SwitchStatus = () => {
  if (isFirstClick.value) {
    // 首次点击：自动播放并展开下拉
    IsShow.value = true;
    isFirstClick.value = false;

    // 自动播放第一首音乐
    setTimeout(() => {
      safeAPlayerCall("play");
    }, 100);
  } else {
    // 后续点击：切换显示状态
    IsShow.value = !IsShow.value;
  }
};

const CloseStatus = () => {
  IsShow.value = false;
};

const InsertMenu = () => {
  const navCenterElm = document.querySelector(".vp-navbar-end");
  if (!navCenterElm) return;

  // 插入封面显示区域
  if (!document.querySelector("#MyMusic_Cover") && currentCover.value) {
    const coverElm = document.createElement("div");
    coverElm.id = "MyMusic_Cover";
    coverElm.classList.add("nav-item");
    coverElm.innerHTML = `<img src="${currentCover.value}" alt="音乐封面" />`;
    navCenterElm.appendChild(coverElm);
  }

  // 封面点击事件
  const Cover = document.querySelector("#MyMusic_Cover") as HTMLElement;
  if (Cover) {
    Cover.onclick = (event) => {
      SwitchStatus();
      event.stopPropagation();
    };
  }

  const MyMusicWrapper = document.querySelector(".MyMusic") as HTMLElement;
  MyMusicWrapper?.addEventListener("click", (event) => {
    event.stopPropagation();
  });
};

const NewPlayer = async () => {
  // 仅在浏览器环境执行
  if (typeof window === "undefined") return;
  const Win: any = window;
  const playElm = document.getElementById("GlobalAPlayer");
  if (!playElm || GlobalMusicList.length < 1) return;

  // 动态加载 APlayer（以及它的样式），避免在 SSR 阶段执行
  if (!APlayer) {
    try {
      // 加载样式（Vite/webpack 都支持动态导入 CSS）
      await import("aplayer/dist/APlayer.min.css");
      const mod = await import("aplayer");
      APlayer = mod?.default || mod;
    } catch (err) {
      console.error("Failed to dynamically import APlayer:", err);
      return;
    }
  }

  // 调试：检查 APlayer 是否正确导入
  console.log("APlayer type:", typeof APlayer);
  console.log("APlayer value:", APlayer);
  if (typeof APlayer !== "function") {
    console.error("APlayer is not a constructor! Type:", typeof APlayer);
    return;
  }

  // 如果播放器已存在，先清理
  if (Win.GlobalAPlayer) {
    try {
      // APlayer 1.x 使用 destroy 方法
      if (typeof Win.GlobalAPlayer.destroy === "function") {
        Win.GlobalAPlayer.destroy();
      } else {
        // 手动清理
        if (
          Win.GlobalAPlayer.audio &&
          typeof Win.GlobalAPlayer.pause === "function"
        ) {
          Win.GlobalAPlayer.pause();
        }
      }
    } catch (error) {
      console.warn("Failed to destroy APlayer:", error);
    }
    Win.GlobalAPlayer = null;
  }

  // 清除旧的播放器DOM
  if (playElm.classList.contains("aplayer")) {
    playElm.innerHTML = "";
    playElm.className = "";
  }

  // 验证 GlobalMusicList 是有效的数组
  if (!Array.isArray(GlobalMusicList) || GlobalMusicList.length === 0) {
    console.error("Invalid GlobalMusicList:", GlobalMusicList);
    return;
  }

  // 验证每个音乐项都有必需的属性
  const isValidMusicList = GlobalMusicList.every(
    (item) =>
      item &&
      typeof item === "object" &&
      typeof item.name === "string" &&
      typeof item.artist === "string" &&
      typeof item.url === "string",
  );

  if (!isValidMusicList) {
    console.error("GlobalMusicList contains invalid items:", GlobalMusicList);
    return;
  }

  try {
    console.log("Creating APlayer with:", GlobalMusicList);
    Win.GlobalAPlayer = new APlayer({
      container: playElm,
      audio: GlobalMusicList,
      lrcType: 3,
      listFolded: false,
      listMaxHeight: "324px",
      mini: false,
      fixed: false,
      volume: 1,
      storageName: "GlobalAPlayer",
    });

    // 验证APlayer实例是否正确创建
    if (!Win.GlobalAPlayer) {
      console.error("APlayer instance creation failed");
      return;
    }

    console.log("APlayer instance created:", Win.GlobalAPlayer);
    console.log(
      "Available methods:",
      Object.getOwnPropertyNames(Win.GlobalAPlayer),
    );
    console.log(
      "APlayer prototype methods:",
      Object.getOwnPropertyNames(Object.getPrototypeOf(Win.GlobalAPlayer)),
    );
  } catch (error) {
    console.error("Failed to create APlayer instance:", error);
    return;
  }

  // 添加事件监听器
  Win.GlobalAPlayer.on("play", () => {
    isPlaying.value = true;
    // 设置当前播放音乐的封面
    if (
      Win.GlobalAPlayer.list &&
      Win.GlobalAPlayer.list.audios &&
      Win.GlobalAPlayer.list.audios.length > 0
    ) {
      const currentIndex = Win.GlobalAPlayer.list.index;
      const currentAudio = Win.GlobalAPlayer.list.audios[currentIndex];
      if (currentAudio.cover) {
        currentCover.value = currentAudio.cover;
        // 更新封面显示
        const coverElm = document.querySelector("#MyMusic_Cover");
        if (coverElm) {
          const img = coverElm.querySelector("img");
          if (img) img.src = currentAudio.cover;
        }
      }
    }
    // 添加播放状态的CSS类
    const coverElm = document.querySelector("#MyMusic_Cover");
    if (coverElm) {
      coverElm.classList.add("playing");
    }
    // 保存播放状态
    saveMusicState();
  });

  Win.GlobalAPlayer.on("pause", () => {
    isPlaying.value = false;
    // 移除播放状态的CSS类
    const coverElm = document.querySelector("#MyMusic_Cover");
    if (coverElm) {
      coverElm.classList.remove("playing");
    }
    // 保存播放状态
    saveMusicState();
  });

  Win.GlobalAPlayer.on("ended", () => {
    isPlaying.value = false;
    // 移除播放状态的CSS类
    const coverElm = document.querySelector("#MyMusic_Cover");
    if (coverElm) {
      coverElm.classList.remove("playing");
    }
    // 保存播放状态
    saveMusicState();
  });

  // 监听播放时间变化，定期保存状态
  Win.GlobalAPlayer.on("timeupdate", () => {
    // 每5秒保存一次状态
    if (Math.floor(Win.GlobalAPlayer.audio.currentTime) % 5 === 0) {
      saveMusicState();
    }
  });

  // 监听歌曲切换
  Win.GlobalAPlayer.on("listswitch", () => {
    saveMusicState();
  });

  // 恢复播放状态
  setTimeout(() => {
    restoreMusicState();
  }, 200);
};

const LoadMusicList = (callback?: () => void) => {
  // 先尝试从缓存恢复音乐列表
  if (restoreMusicList()) {
    callback?.();
    return;
  }

  // 默认从远程 API 加载腾讯歌单
  const DEFAULT_SERVER = "tencent";
  const DEFAULT_PLAYLIST_ID = "736085695";
  
  // 🔥 直接请求音乐 API，不使用代理
  // 确保使用支持 CORS 的 API 地址
  const BASE_API = "https://m3u8.zeusai.top";

  const apiUrl = `${BASE_API}/api/music?server=${DEFAULT_SERVER}&type=playlist&id=${DEFAULT_PLAYLIST_ID}`;

  console.log(`🎵 请求地址: ${apiUrl}`);

  // 备用远程 JSON（原先的来源）
  const fallbackUrl = "//file.mo7.cc/music/list.json";

  // 最后兜底的静态备份（只有在所有请求都失败时使用）
  const staticFallback = [
    {
      name: "默认示例曲目 1",
      artist: "示例歌手",
      url: "/api/music?server=tencent&type=url&id=1",
      cover: "/api/music?server=tencent&type=pic&id=1",
      lrc: "/api/music?server=tencent&type=lrc&id=1",
    },
  ];

  // 尝试按顺序获取:内部 API -> 远程 JSON -> 静态备份
  axios
    .get(apiUrl)
    .then((res) => {
      console.log("✅ API 响应成功:", res.data);
      
      // 🔍 调试：查看第一首歌的原始 URL
      if (Array.isArray(res.data) && res.data.length > 0 && res.data[0]) {
        console.log("🔍 第一首歌原始数据:", {
          name: res.data[0].name,
          url: res.data[0].url,
          cover: res.data[0].cover,
          lrc: res.data[0].lrc
        });
      }
      
      if (Array.isArray(res.data) && res.data.length > 0) {
        // ✅ 处理资源 URL - 确保所有 URL 都是完整的绝对地址
        GlobalMusicList = res.data.map((item: any) => {
          const processUrl = (url: string | undefined) => {
            if (!url) return url;
            
            // 移除任何已有的域名前缀，只保留路径
            let cleanUrl = url;
            
            // 如果包含协议和域名，提取路径部分
            if (url.includes('://')) {
              try {
                const urlObj = new URL(url);
                cleanUrl = urlObj.pathname + urlObj.search;
              } catch (e) {
                // 如果无法解析，尝试正则提取
                const match = url.match(/\/api\/music.*/);
                cleanUrl = match ? match[0] : url;
              }
            }
            
            // 如果是相对路径，补全域名
            if (cleanUrl.startsWith('/api/music')) {
              const finalUrl = `${BASE_API}${cleanUrl}`;
              console.log(`🔧 URL 转换: ${url} -> ${finalUrl}`);
              return finalUrl;
            }
            
            // 如果已经是完整的目标 URL，保持不变
            console.log(`✓ URL 保持: ${url}`);
            return url;
          };
          
          return {
            ...item,
            url: processUrl(item.url),
            cover: processUrl(item.cover),
            lrc: processUrl(item.lrc),
          };
        });

        console.log("🎵 处理后的音乐列表:", GlobalMusicList);
        if (GlobalMusicList[0]?.cover) {
          currentCover.value = GlobalMusicList[0].cover;
        }
        saveMusicList();
        callback?.();
      } else {
        throw new Error("Invalid response format from API");
      }
    })
    .catch((err1) => {
      console.warn(`⚠️ 主 API 加载失败 (${apiUrl}):`, err1.message);
      axios
        .get(fallbackUrl)
        .then((res2) => {
          console.log("✅ 备用源加载成功:", res2.data);
          if (Array.isArray(res2.data) && res2.data.length > 0) {
            GlobalMusicList = res2.data;
            if (res2.data[0]?.cover) currentCover.value = res2.data[0].cover;
            saveMusicList();
          } else {
            GlobalMusicList = staticFallback;
            currentCover.value = staticFallback[0].cover;
            saveMusicList();
          }
          callback?.();
        })
        .catch((err2) => {
          console.warn(`⚠️ 备用源也失败 (${fallbackUrl}):`, err2.message);
          console.log("📦 使用静态备份数据");
          GlobalMusicList = staticFallback;
          currentCover.value = staticFallback[0].cover;
          saveMusicList();
          callback?.();
        });
    });
};

onMounted(() => {
  LoadMusicList(() => {
    nextTick(async () => {
      InsertMenu();
      await NewPlayer();
      window.document.body.onclick = CloseStatus;

        // 使用popstate事件监听路由变化
        let currentPath = window.location.pathname;
        window.addEventListener("popstate", () => {
          const newPath = window.location.pathname;
          if (newPath !== currentPath) {
            currentPath = newPath;
            setTimeout(async () => {
              InsertMenu();
              // 检查播放器是否已存在，避免重复创建
              const Win: any = window;
              if (
                !Win.GlobalAPlayer ||
                !document
                  .getElementById("GlobalAPlayer")
                  ?.classList.contains("aplayer")
              ) {
                await NewPlayer();
              }
            }, 50);
          }
        });

        // 监听VuePress的路由变化（通过DOM变化检测）
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (
              mutation.type === "childList" &&
              mutation.target === document.body
            ) {
              // 检查是否有新的页面内容加载
              const newPath = window.location.pathname;
              if (newPath !== currentPath) {
                currentPath = newPath;
                setTimeout(() => {
                  InsertMenu();
                  // 检查播放器是否已存在，避免重复创建
                  const Win: any = window;
                  if (
                    !Win.GlobalAPlayer ||
                    !document
                      .getElementById("GlobalAPlayer")
                      ?.classList.contains("aplayer")
                  ) {
                    NewPlayer();
                  }
                }, 50);
              }
            }
          });
        });

        observer.observe(document.body, {
          childList: true,
          subtree: true,
        });

      // 页面卸载时停止观察
      window.addEventListener("beforeunload", () => {
        observer.disconnect();
      });
    });
  });
});
</script>

<template>
  <ClientOnly>
    <div class="MyMusic">
      <transition name="drop">
        <div class="MyMusic_Play" v-show="IsShow">
          <div class="close" @click="CloseStatus">
            <MyIcon name="guanbi" />
          </div>
          <div id="GlobalAPlayer"></div>
        </div>
      </transition>
    </div>
  </ClientOnly>
</template>

<style lang="scss">
.MyMusic {
  position: fixed;
  right: 0.5rem;
  top: 0.5rem;
  z-index: 9999;
  cursor: pointer;
}

.MyMusic_Play {
  width: 300px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  position: fixed;
  right: 0.5rem;
  top: 3rem;
  z-index: 9999;
}

/* 下拉动画 */
.drop-enter-active,
.drop-leave-active {
  transition: all 0.3s ease;
}
.drop-enter-from,
.drop-leave-to {
  transform: translateY(-20px) scale(0.9);
  opacity: 0;
}
.drop-enter-to,
.drop-leave-from {
  transform: translateY(0) scale(1);
  opacity: 1;
}

.MyMusic_Play .close {
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  z-index: 10;
}

#GlobalAPlayer .aplayer-list-title,
#GlobalAPlayer .aplayer-title {
  color: #3c3c43;
}

/* 音乐封面样式 */
#MyMusic_Cover {
  height: 36px;
  width: 36px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: 2px solid #fff;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
}

/* 播放状态下的旋转动画 */
#MyMusic_Cover.playing img {
  animation: rotate 3s linear infinite;
}

/* 旋转动画 */
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
