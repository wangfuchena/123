<script setup>
import { ref, watch } from 'vue'
import { useArticleStore } from '@/stores/article'

const articleStore = useArticleStore()
const raw = ref('')

function refresh() {
  raw.value = localStorage.getItem('articles') || '[]'
}
watch(() => articleStore.articles, refresh, { deep: true })
refresh()
</script>

<template>
  <div class="ls-panel">
    <h4>localStorage 实时数据（articles 键）· 与页面状态同步</h4>
    <pre class="ls-json">{{ raw }}</pre>
  </div>
</template>
