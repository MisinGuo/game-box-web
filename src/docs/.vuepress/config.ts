import { appendDatePlugin } from "@vuepress/plugin-append-date";
import siteConfig from "./config/site.js";
import { cachePlugin } from "@vuepress/plugin-cache";
import { viteBundler } from "@vuepress/bundler-vite";
import type { UserConfig, Page, HeadConfig } from "vuepress";
import type MarkdownIt from 'markdown-it';
import { defineUserConfig } from "vuepress";
// import { getDirname, path } from "vuepress/utils";

import theme from "./theme.js";

// const __dirname = getDirname(import.meta.url);

const head: HeadConfig[] = [
  [
    "link",
    {
      rel: "mask-icon",
      href: "/assets/safari-pinned-tab.svg",
      color: "#5c92d1",
    },
  ],

  // ★ 在这里加入你的 meta
  [
    "meta",
    {
      name: "google-adsense-account",
      content: "ca-pub-5210459989585757",
    },
  ],

// Google Adsense 主脚本
[
  "script",
  {
    async: true,
    src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5210459989585757",
    crossorigin: "anonymous",
  },
],


  // Google Analytics
  [
    "script",
    {
      async: true,
      src: "https://www.googletagmanager.com/gtag/js?id=G-FPM28649E3",
    },
  ],
  [
    "script",
    {},
    `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FPM28649E3');
          `,
  ],
];

if (siteConfig.indexNowKey) {
  head.push(["meta", { name: "indexnow", content: siteConfig.indexNowKey }]);
}

export default <UserConfig>defineUserConfig({

    // 繁體中文
    lang: "zh-TW",

    dest: "dist",

    // 排除子模块文件，只包含主模块的页面
    pagePatterns: [
    "*.md",
    "!.vuepress",
    "!node_modules"
  ],

  bundler: viteBundler({
    viteOptions: {
      assetsInclude: ["**/*.JPG", "**/*.jpg", "**/*.JPEG", "**/*.jpeg", "**/*.PNG", "**/*.png", "**/*.GIF", "**/*.gif", "**/*.WEBP", "**/*.webp"]
    },
  }),

  head,
// 已覆写
  // locales: {
  //   "/": {
  //     lang: "zh-tw",
  //     title: "玩遊戲邀我",
  //     description: `${siteConfig.domain} 致力於精品遊戲`,
  //   },

  //   "/zh-CN/": {
  //     lang: "zh-CN",
  //     title: "玩游戏邀我",
  //     description: `${siteConfig.domain} 专注于精品游戏`,
  //   },
  // },
  

  theme,

  // 使用 rootComponents 方式添加语言切换组件
  // alias: {
  //   "@theme-hope/components/navbar/LanguageDropdown": path.resolve(
  //     __dirname,
  //     "./components/CustomLangSwitcher.vue",
  //   ),
  // },

  plugins: [appendDatePlugin(), cachePlugin({ type: "filesystem" })],

  shouldPrefetch: false,

  // 替换模板变量
  extendsPage: (page: Page) => {
    // 处理frontmatter中的footer变量
    if (page.frontmatter.footer && typeof page.frontmatter.footer === 'string') {
      let footer = page.frontmatter.footer;

        // 替换所有siteConfig变量
        Object.keys(siteConfig).forEach(key => {
          const regex = new RegExp(`\\{\\{siteConfig\\.${key}\\}\\}`, 'g');
        footer = footer.replace(regex, siteConfig[key]);
        });

      page.frontmatter.footer = footer;
    }
  },

  // 扩展 Markdown 渲染器，支持模板变量替换
  extendsMarkdown: (md: MarkdownIt) => {
    
    // 保存原始的 render 方法
    const originalRender = md.render;
    
    // 重写 render 方法，在渲染前进行变量替换
    md.render = function(src, env) {
      let newSrc = src; // 创建源内容的副本
      
      // 遍历 siteConfig 中的所有配置项
      Object.keys(siteConfig).forEach(key => {
        // 创建匹配 {{siteConfig.key}} 格式的正则表达式
        // 使用全局匹配标志 'g' 来替换所有出现的位置
        const regex = new RegExp(`\\{\\{siteConfig\\.${key}\\}\\}`, 'g');
        // 将模板变量替换为实际的配置值
        newSrc = newSrc.replace(regex, siteConfig[key]);
      });
      
      // 调用原始的 render 方法处理替换后的内容
      return originalRender.call(this, newSrc, env);
    };
  },
});
