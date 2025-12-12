import { hopeTheme } from "vuepress-theme-hope";
import siteConfig from "./config/site.js";

import {
  //  zhCNNavbarConfig, 
   zhTWNavbarConfig } from "./navbar.js";
import { 
  // zhCNSidebarConfig,
   zhTWSidebarConfig } from "./sidebar/index.js";

export default hopeTheme(
  {
    // 上线需要修改
    hostname: siteConfig.hostname,

    author: {
      name: "玩遊戲邀我",
      url: siteConfig.hostname,
    },

    favicon: "/favicon.ico",

    logo: "/logo.svg",

    repo: "guogms/guogms.github.io",

    repoDisplay: false,

    docsDir: "src",

    locales: {
      "/": {
        
        navbar: zhTWNavbarConfig,
        sidebar: zhTWSidebarConfig,

        footer:
          `Theme By <a href="https://theme-hope.vuejs.press/zh/">VuePress Theme Hope</a> | <a href="${siteConfig.hostname}" target="_blank"></a>`,

        copyright: "Copyright © 2025-至今 Gimes",

        // blog: {
        //   description: ""享受精彩，不需花費一分！我們相信，真正的樂趣來自體驗與創新，而不僅僅是支付。讓每一刻都充滿價值，隨時探索，無需負擔。"",
        //   intro: "/aboutUs/",
        //   medias: {
        //     // GitHub: "https://github.com/Mister-Hope",
        //     // BiliBili: "https://space.bilibili.com/630395917",
        //     // QQ: "http://wpa.qq.com/msgrd?v=3&uin=1178522294&site=qq&menu=yes",
        //     // Qzone: "https://1178522294.qzone.qq.com/",
        //     // Gmail: "mailto:mister-hope@outlook.com",
        //     // Zhihu: "https://www.zhihu.com/people/mister-hope",
        //     // Steam: "https://steamcommunity.com/id/Mr-Hope/",
        //     // Weibo: "https://weibo.com/misterhope",
        //     // Gitee: "https://gitee.com/Mister-Hope",
        //     // Twitter: "https://twitter.com/Mister_Hope",
        //     // Telegram: "https://t.me/Mister_Hope",
        //   },
        // },
      },


    },

    displayFooter: true,
    copyright: "Copyright © 2025-至今 Gimes",

    markdown: {
      align: true,
      codeTabs: true,
      demo: true,
      figure: true,
      flowchart: true,
      highlighter: {
        type: "shiki",
        lineNumbers: 10,
        langAlias: {
          conf: "ini",
        },
      },
      imgLazyload: true,
      imgMark: true,
      imgSize: true,
      footnote: true,
      mermaid: true,
      revealjs: true,
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
    },

    plugins: {
      components: {
        // 你想使用的组件
        components: [
          // "ArtPlayer",
          // "Badge",
          // "BiliBili",
          // "CodePen",
          // "PDF",
          // "Share",
          // "SiteInfo",
          // "StackBlitz",
          // "VPBanner",
          // "VPCard",
          "VidStack",
        ],
      },
      // blog: {
      //   excerptLength: 0,
      // },

      comment: {
        provider: "Waline",
        serverURL: siteConfig.commentServerUrl,
      },

      docsearch: {
        appId: "PRP6QFAVMM",
        apiKey: "0d5e7324b1cc4b23d22375b5f9817cfa",
        indexName: siteConfig.algoliaIndexName,
      },

      sitemap:{
        sitemapFilename: "sitemap.xml",
},

      feed: {
        atom: true,
        json: true,
        rss: true,
      },

      icon: {
        assets: "//at.alicdn.com/t/font_2410206_vuzkjonf4s9.css",
      },

      pwa: {
        themeColor: "#5c92d1",
        cacheHTML: false,
        cacheImage: false,
        maxSize: 1024,
        maxImageSize: 512,
        apple: {
          icon: "/logo.png",
        },
        manifest: {
          name: "《domain（玩遊戲邀我）》",
          short_name: "玩遊戲邀我网",
          description: "Playing games invite me!",
          theme_color: "#5c92d1",
          icons: [
            {
              src: "/logo.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "/logo.png",
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: "/logo.png",
              sizes: "192x192",
              purpose: "maskable",
              type: "image/png",
            },
            {
              src: "/logo.png",
              sizes: "512x512",
              purpose: "maskable",
              type: "image/png",
            },
          ],
          shortcuts: [
            {
              name: "分类",
              short_name: "分类",
              icons: [
                {
                  src: "/assets/icon/category-maskable.png",
                  sizes: "192x192",
                  purpose: "maskable",
                  type: "image/png",
                },
              ],
              url: "/category/",
              description: "文章分类分组",
            },
            {
              name: "标签",
              short_name: "标签",
              icons: [
                {
                  src: "/assets/icon/tag-maskable.png",
                  sizes: "192x192",
                  purpose: "maskable",
                  type: "image/png",
                },
              ],
              url: "/tag/",
              description: "文章标签分组",
            },
            {
              name: "时间线",
              short_name: "时间线",
              icons: [
                {
                  src: "/assets/icon/timeline-maskable.png",
                  sizes: "192x192",
                  purpose: "maskable",
                  type: "image/png",
                },
              ],
              url: "/timeline/",
              description: "时间线文章列表",
            },
            {
              name: "关于我们",
              short_name: "关于我们",
              icons: [
                {
                  src: "/assets/icon/about-maskable.png",
                  sizes: "192x192",
                  purpose: "maskable",
                  type: "image/png",
                },
              ],
              url: "/aboutUs/",
              description: "关于我们",
            },
          ],
        },
      },
    },
  },
  
  // { custom: true },
);
