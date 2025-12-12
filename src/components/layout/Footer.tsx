import React from 'react';

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-12 text-slate-400">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 font-bold text-xl text-white mb-4">
            <div className="h-8 w-8 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              G
            </div>
            <span>GameBox</span>
          </div>
          <p className="text-sm leading-relaxed">
            最专业的中立游戏盒子聚合平台。
            <br />
            汇集全网优质游戏盒子，提供最客观的折扣对比与攻略评测。
          </p>
        </div>
        
        <div>
          <h3 className="font-semibold text-white mb-4">平台导航</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-400">盒子大全</a></li>
            <li><a href="#" className="hover:text-blue-400">游戏库</a></li>
            <li><a href="#" className="hover:text-blue-400">福利中心</a></li>
            <li><a href="#" className="hover:text-blue-400">攻略资讯</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-4">关于我们</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-400">联系合作</a></li>
            <li><a href="#" className="hover:text-blue-400">免责声明</a></li>
            <li><a href="#" className="hover:text-blue-400">隐私政策</a></li>
            <li><a href="#" className="hover:text-blue-400">加入我们</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-4">关注我们</h3>
          <p className="text-sm mb-4">订阅最新游戏折扣情报</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="您的邮箱" 
              className="bg-slate-900 border border-slate-800 rounded px-3 py-2 text-sm flex-1 focus:outline-none focus:border-blue-500"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
              订阅
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
        © 2025 GameBox Platform. All rights reserved. 仅为示例演示。
      </div>
    </footer>
  );
}
