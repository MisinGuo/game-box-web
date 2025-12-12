import { defineAsyncComponent, onMounted } from "vue";
import { defineClientConfig } from "vuepress/client";
import siteConfig from "./config/site.js";
import { trackUserRefererOnce } from "./utils/tracking.js";
import GlobalLangSwitcher from "./components/GlobalLangSwitcher.vue";
const NavMusic = defineAsyncComponent(() => import('./components/NavMusic.vue'));

// import CustomLink from "./components/CustomLink.vue";

export default defineClientConfig({
  // 添加全局语言切换组件
  rootComponents: [
    GlobalLangSwitcher,
    
    NavMusic,

  ],
  enhance({ app, router, siteData }) {
    // 将siteConfig添加到全局属性中，使其在Vue组件中可用
    app.config.globalProperties.siteConfig = siteConfig;
    
    // 完全禁用VuePress路由系统
    // router.beforeEach((to, from, next) => {
    //   // 对于所有路由，都使用原生浏览器导航
    //   if (to.path !== from.path) {
    //     window.location.href = to.fullPath;
    //     return;
    //   }
    //   next();
    // });
    router.beforeEach((to, from, next) => {
      if (to.path === '/redirect.html') { // 全站路由页
        const tourl = Array.isArray(to.query.tourl) ? to.query.tourl[0] : to.query.tourl
        if (!tourl) {
          next('/') // 没有参数跳首页
        } else if (/^https?:\/\//.test(tourl)) {
          window.location.replace(tourl)
        } else if (tourl.startsWith('/')) {
          window.location.replace(tourl === '/' ? '/' : window.location.origin + tourl)
        } else {
          window.location.replace('/')
        }
      } else {
        next()
      }
    })
    
  },
  setup() {
    onMounted(() => {
      console.log(`
    ,---,                        ____                                   
  .'  .' \`\\                    ,'  , \`.             ,--,                
,---.'     \\    ,---.       ,-+-,.' _ |           ,--.'|         ,---,  
||   |  .\`\\  |  '   ,'\\   ,-+-. ;   , ||           |  |,      ,-+-. /  | 
:   : |  '  | /   /   | ,--.'|'   |  || ,--.--.   \`--'_     ,--.'|'   | 
||   ' '  ;  :.   ; ,. :|   |  ,', |  |,/       \\  ,' ,'|   |   |  ,"\\" | 
|'   | ;  .  |'   | |: :|   | /  | |--'.--.  .-. | '  | |   |   | /  | | 
||   | :  |  ''   | .; :|   : |  | ,    \\__\\/: . . |  | :   |   | |  | | 
|'   : | /  ; |   :    ||   : |  |/     ," .--.; | '  : |__ |   | |  |/  
||   | '\` ,/   \\   \\  / |   | |\`-'     /  /  ,.  | |  | '.'||   | |--'   
|;   :  .'      \`----'  |   ;/        ;  :   .'   \\;  :    ;|   |/       
||   ,.'                '---'         |  ,     .-./|  ,   / '---'        
|'---'                                 \`--\`---'     ---\`-'               
               
`);

      // 执行用户来源追踪
      trackUserRefererOnce();

      // 修改所有 {{siteConfig.jumpDomain}} 链接，添加当前页面参数
      modifyJumpLinks();

      // 用于SEO优化，将内容区域内的所有 H1 降级为 H2
      // 将内容区域内的所有 H1 降级为 H2（主题渲染后的兜底处理）
      demoteContentHeadings();

      // 监听路由变化与 DOM 变化，确保后续导航与动态渲染也生效
      const applyAfterNav = () => setTimeout(() => demoteContentHeadings(), 0);
      window.addEventListener('vuepress:navigated', applyAfterNav);

      const mo = new MutationObserver(() => demoteContentHeadings());
      mo.observe(document.body, { childList: true, subtree: true });
      window.addEventListener('beforeunload', () => mo.disconnect());
    });
  },
});

// VuePress路由已完全禁用，所有导航都使用原生浏览器行为

// 修改跳转链接的函数,不再使用这种方式
function modifyJumpLinks() {
  // 获取当前页面的完整URL
  const currentUrl = window.location.href;
  
  // 查找所有包含 {{siteConfig.jumpDomain}} 的链接
  const jumpLinks = document.querySelectorAll(`a[href*="${siteConfig.jumpDomain}"]`);
  
  jumpLinks.forEach((link) => {
    const originalHref = link.getAttribute('href');
    if (originalHref && originalHref.includes(siteConfig.jumpDomain)) {
      // 构建新的跳转链接，添加source参数
      const jumpUrl = `${siteConfig.jumpDomain}?source=${encodeURIComponent(currentUrl)}`;
      link.setAttribute('href', jumpUrl);
    }
  });
  
  // 监听DOM变化，处理动态加载的内容
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            // 检查新添加的节点是否包含跳转链接
            const newJumpLinks = element.querySelectorAll ? 
              element.querySelectorAll(`a[href*="${siteConfig.jumpDomain}"]`) : [];
            
            newJumpLinks.forEach((link) => {
              const originalHref = link.getAttribute('href');
              if (originalHref && originalHref.includes(siteConfig.jumpDomain)) {
                const currentUrl = window.location.href;
                const jumpUrl = `${siteConfig.jumpDomain}?source=${encodeURIComponent(currentUrl)}`;
                link.setAttribute('href', jumpUrl);
              }
            });
            
            // 如果新添加的节点本身就是链接
            if (element.tagName === 'A') {
              const originalHref = element.getAttribute('href');
              if (originalHref && originalHref.includes(siteConfig.jumpDomain)) {
                const currentUrl = window.location.href;
                const jumpUrl = `${siteConfig.jumpDomain}?source=${encodeURIComponent(currentUrl)}`;
                element.setAttribute('href', jumpUrl);
              }
            }
          }
        });
      }
    });
  });
  
  // 开始观察DOM变化
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  // 页面卸载时停止观察
  window.addEventListener('beforeunload', () => {
    observer.disconnect();
  });
}

// 将页面内容区域内的 H1 全部降级为 H2（不影响站点级标题栏）
function demoteContentHeadings() {
  const selectors = [
    '.theme-hope-content h1',
    '.theme-default-content h1',
    '.page h1'
  ];
  const nodes: Element[] = [];
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => nodes.push(el));
  });
  nodes.forEach((h1) => {
    // 避免重复处理：若父级已标记则跳过
    if ((h1 as any).__demotedToH2) return;
    const h2 = document.createElement('h2');
    // 复制属性
    for (const attr of Array.from(h1.attributes)) {
      if (attr.name === 'id') {
        h2.setAttribute('id', attr.value); // 保留跳转定位
      } else {
        h2.setAttribute(attr.name, attr.value);
      }
    }
    // 迁移子节点
    while (h1.firstChild) h2.appendChild(h1.firstChild);
    (h1 as any).__demotedToH2 = true;
    h1.replaceWith(h2);
  });
}
