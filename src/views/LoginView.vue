<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { STUDENT_NAME, STUDENT_ID } from '@/config'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const username = ref('')
const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : ''

function handleLogin() {
  userStore.login(username.value.trim() || STUDENT_NAME)
  router.push(redirect || '/articles')
}
</script>

<template>
  <div class="card login-card">
    <h2>用户登录</h2>
    <div v-if="redirect" class="banner">
      检测到未登录访问「{{ redirect }}」，已由路由守卫（beforeEach + meta.requiresAuth）自动重定向至登录页，请登录后继续
    </div>
    <div class="whoami">实验者：{{ STUDENT_NAME }}（{{ STUDENT_ID }}）</div>
    <input v-model="username" class="input" placeholder="请输入用户名（任意）" @keyup.enter="handleLogin" />
    <button class="primary" @click="handleLogin">登 录</button>
    <p class="tip">登录状态由 user Store（state：username / isLogin）统一管理，并通过 localStorage 持久化</p>
  </div>
</template>
