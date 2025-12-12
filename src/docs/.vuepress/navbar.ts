import { navbar } from "vuepress-theme-hope";


export const zhTWNavbarConfig = navbar([
  {
    text: "首頁",
    link: "/redirect?tourl=/",
    icon: "lightbulb",
    activeMatch: "^/$",
  },
  {
    text: "遊戲破解版",
    link: "/redirect?tourl=/pojie/",
    icon: "lightbulb",
  },
  {
    text: "遊戲攻略",
    // 这里使用 redirect.html、redirect.md、redirect都行，因为都会被重定向到 redirect.html
    // link: "/redirect?tourl=/strategy/",
    children: [
          {
            text: "历史文章",
            icon: "code",
            link: "/redirect?tourl=/strategy/",
            activeMatch: "^/strategy/$",
          },
          {
            text: "2025年11月",
            icon: "code",
            link: "/redirect?tourl=/strategy/2025/11/",
            activeMatch: "^/strategy/2025/11/$",
          },
      {
        text: "2025年12月",
        icon: "code",
        link: "/redirect?tourl=/strategy/2025/12/",
        activeMatch: "^/strategy/2025/12/$",
      },
        ],
    icon: "lightbulb",
  },

]);
