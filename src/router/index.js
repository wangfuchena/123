// src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

import LoginView from '@/views/LoginView.vue'
import PersonalHomeView from '@/views/PersonalHomeView.vue'
import ArticleListView from '@/views/ArticleListView.vue'
import ArticleManageView from '@/views/ArticleManageView.vue'
import ProjectManageView from '@/views/ProjectManageView.vue'
import DevToolsView from '@/views/DevToolsView.vue'

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/login', name: 'Login', component: LoginView, meta: { title: '登录 - 实验四 状态管理与UI组件库' } },
  { path: '/home', name: 'Home', component: PersonalHomeView, meta: { title: '个人主页 - 实验四 状态管理与UI组件库' } },
  { path: '/articles', name: 'ArticleList', component: ArticleListView, meta: { title: '文章列表 - 实验四 状态管理与UI组件库' } },
  {
    path: '/article-manage', name: 'ArticleManage', component: ArticleManageView,
    meta: { title: '文章管理 - 实验四 状态管理与UI组件库', requiresAuth: true }
  },
  {
    path: '/project-manage', name: 'ProjectManage', component: ProjectManageView,
    meta: { title: '项目管理 - 实验四 状态管理与UI组件库', requiresAuth: true }
  },
  {
    path: '/devtools', name: 'DevTools', component: DevToolsView,
    meta: { title: 'Store 调试 - 实验四 状态管理与UI组件库', requiresAuth: true }
  }
]

// 使用 Hash 模式（URL 带 #），适配 GitHub Pages 等静态托管，无需服务器 rewrite 规则
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to) => {
  // 在守卫函数内部调用 Store，确保 Pinia 已完成初始化
  const userStore = useUserStore()
  if (to.meta.title) document.title = to.meta.title
  // 需要登录的页面：未登录则重定向到登录页，并记录原目标地址
  if (to.meta.requiresAuth && !userStore.isLogin) {
    return { name: 'Login', query: { redirect: to.fullPath } }
  }
})

export default router
