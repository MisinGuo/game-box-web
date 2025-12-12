import { navbar } from "vuepress-theme-hope";

// 自动为完全匹配 redirect?tourl= 的链接添加 activeMatch 属性
const addActiveMatch = (item: any, submodule: string) => {
  const result = { ...item };
  
  // 检查当前项是否匹配
  if (item.link && item.link === `/redirect?tourl=/${submodule}/`) {
    result.activeMatch = "^/.*$";
  }
  
  // 递归处理 children
  if (item.children && Array.isArray(item.children)) {
    result.children = item.children.map((child: any) => {
      if (child.link && child.link === `/redirect?tourl=/${submodule}/`) {
        return {
          ...child,
          activeMatch: "^/.*$"
        };
      }
      return child;
    });
  }
  
  return result;
};

export const FixNavbarConfig = (submodule: string) => navbar([
  addActiveMatch({
    text: "首頁",
    link: "/redirect?tourl=/",
    icon: "lightbulb",
  }, submodule),
  addActiveMatch({
    text: "遊戲破解版",
    link: "/redirect?tourl=/pojie/",
    icon: "lightbulb",
  }, submodule),
  addActiveMatch({
    text: "遊戲攻略",  
    // 这里使用 redirect.html、redirect.md、redirect都行，因为都会被重定向到 redirect.html
    link: "/redirect?tourl=/strategy/",
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
  }, submodule),

]);

