import { sidebar } from "vuepress-theme-hope";
import { physics } from "./physics.js";
import { comsol, software, vscode } from "./software/index.js";

export const zhTWSidebarConfig = sidebar({
  // "/daily/": "structure",

  // "/pojie/": "structure",

  // "/strategy/": "structure",
  

  // // 这个留作示例
  // "/software/vscode/": vscode,

  // "/software/git/": "structure",

  // "/software/comsol/": comsol,

  // "/software/": software,

  // "/physics/": physics,

  // // fallback
  "/": "structure",
});

export const zhCNSidebarConfig = sidebar({
  "/": "structure",
  // "/zh-CN/daily/": "structure",

  // "/zh-CN/pojie/": "structure",

  // "/zh-CN/strategy/": "structure",
  

  // // fallback
  // "/": [""
  //   // , "note/", "code/", "software/", "aboutUs/"
  // ],
});
