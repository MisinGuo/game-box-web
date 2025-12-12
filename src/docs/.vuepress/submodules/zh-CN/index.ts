import type { UserConfig } from "vuepress";
import { Fixtheme } from "./config/theme.js";

// 子模块配置函数，接收子模块名作为参数
export default function(submodule: string): Partial<UserConfig> {
  return {
    // 简体中文
    lang: "zh-CN",

    base: `/${submodule}/`,

    dest: `dist/${submodule}`,

    // 页面模式 - 只包含当前子模块的内容
    pagePatterns: [
      '*.md',
      '!.vuepress',
      '!node_modules',
    ],

    // 主题配置
    theme: Fixtheme(submodule),
  };
}

