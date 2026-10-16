<script setup>
// 顶部导航：使用 el-menu 组件实现菜单导航，整合 Router 与 Pinia
import { useRouter, useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { useArticleStore } from '@/stores/article'
import { useProjectStore } from '@/stores/project'
import { watchStoreActions } from '@/actionLog'
import { STUDENT_NAME, STUDENT_ID } from '@/config'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const articleStore = useArticleStore()
const projectStore = useProjectStore()

// 注册各 Store 的 actions 调用记录（供「Store 调试」页观察）
watchStoreActions(userStore, 'user')
watchStoreActions(articleStore, 'article')
watchStoreActions(projectStore, 'project')

// el-menu 的激活项与路由同步
const activeMenu = ref(route.path)
watch(() => route.path, (p) => { activeMenu.value = p })
function onMenuSelect(key) { router.push(key) }

function handleLogout() {
  userStore.logout()
  router.push('/login')
}
</script>

<template>
  <el-container class="page">
    <el-header class="topbar" height="60">
      <div class="brand">实验四：状态管理与 UI 组件库</div>
      <el-menu mode="horizontal" :default-active="activeMenu" :ellipsis="false"
               class="nav" @select="onMenuSelect" background-color="#0f5f6b"
               text-color="#cfd8dc" active-text-color="#ffd04b">
        <el-menu-item index="/home">个人主页</el-menu-item>
        <el-menu-item index="/articles">文章列表</el-menu-item>
        <el-menu-item index="/article-manage">文章管理</el-menu-item>
        <el-menu-item index="/project-manage">项目管理</el-menu-item>
        <el-menu-item index="/devtools">Store 调试</el-menu-item>
      </el-menu>
      <div class="user">
        <template v-if="userStore.isLogin">
          <el-tag type="warning" effect="dark">{{ STUDENT_NAME }}（{{ STUDENT_ID }}）</el-tag>
          <el-button size="small" @click="handleLogout">退出</el-button>
        </template>
        <el-button v-else size="small" @click="router.push('/login')">登录</el-button>
      </div>
    </el-header>
    <el-main class="content">
      <RouterView />
    </el-main>
    <el-footer class="foot">实验四 · 状态管理与 UI 组件库 · {{ STUDENT_NAME }}（{{ STUDENT_ID }}）</el-footer>
  </el-container>
</template>

<style>
body { margin: 0; font-family: "PingFang SC", "Microsoft YaHei", sans-serif; background: #f5f7fa; }
.page { min-height: 100vh; }
.topbar { display: flex; align-items: center; gap: 20px; background: #0f5f6b; color: #fff; padding: 0 24px; }
.brand { font-weight: 700; font-size: 16px; color: #fff; white-space: nowrap; }
.nav { flex: 1; border-bottom: none; background: transparent !important; }
.nav .el-menu-item { border-bottom: none !important; }
.user { display: flex; align-items: center; gap: 10px; }
.user .el-button { background: transparent; color: #fff; border-color: #cfd8dc; }
.content { padding: 20px 24px; }
.foot { text-align: center; color: #909399; font-size: 12px; padding: 16px 0; }
</style>
