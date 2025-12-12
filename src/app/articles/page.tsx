import { redirect } from 'next/navigation'

// 文章页面重定向到攻略页面
// 所有文章类内容（包括破解版和攻略）都属于 articles 概念
// 但当前实现分散在 /pojie 和 /strategy 路由
export default function ArticlesPage() {
  redirect('/strategy')
}
