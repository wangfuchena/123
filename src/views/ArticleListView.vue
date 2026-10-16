<script setup>
import { storeToRefs } from 'pinia'
import { useArticleStore } from '@/stores/article'

const articleStore = useArticleStore()
// state 和 getters 用 storeToRefs 包装，解构后仍保持响应式
const { articles, total } = storeToRefs(articleStore)
</script>

<template>
  <div class="card">
    <h2>文章列表 <span class="count">共 {{ total }} 篇</span></h2>
    <p class="sub">数据由 article Store 提供，经 storeToRefs 解构后保持响应式；刷新页面后从 localStorage 恢复。</p>
    <div v-if="articles.length === 0" class="empty">暂无文章，请先到「文章管理」页新增。</div>
    <article v-for="a in articles" :key="a.id" class="post">
      <h3>{{ a.title }}</h3>
      <div class="meta">作者：{{ a.author }} · 日期：{{ a.date }}</div>
      <p class="body">{{ a.content }}</p>
    </article>
  </div>
</template>
