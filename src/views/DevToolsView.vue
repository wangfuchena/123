<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { useArticleStore } from '@/stores/article'
import { useProjectStore } from '@/stores/project'
import { actionLog } from '@/actionLog'

// 挂载时从 localStorage 恢复完整的 actions 调用记录
onMounted(() => {
  try {
    const saved = JSON.parse(localStorage.getItem('actionLog') || '[]')
    if (saved.length) actionLog.value = saved
  } catch (e) { /* ignore */ }
})

const userStore = useUserStore()
const articleStore = useArticleStore()
const projectStore = useProjectStore()

const active = ref('user')
const list = [
  { key: 'user', name: 'user', desc: '用户登录状态' },
  { key: 'article', name: 'article', desc: '文章信息（增删改查）' },
  { key: 'project', name: 'project', desc: '项目信息（增删改查）' }
]
const stateMap = computed(() => ({
  user: userStore.$state,
  article: articleStore.$state,
  project: projectStore.$state
}))
const json = computed(() => JSON.stringify(stateMap.value[active.value], null, 2))
</script>

<template>
  <div class="card devtools">
    <h2>Vue DevTools · Pinia 状态面板 <span class="count">（实验环境模拟面板）</span></h2>
    <p class="sub">查看 user、article、project 各 Store 的 state 结构与 actions 调用记录。</p>

    <div class="dt-grid">
      <aside class="dt-side">
        <div
          v-for="s in list"
          :key="s.key"
          class="dt-item"
          :class="{ on: active === s.key }"
          @click="active = s.key"
        >
          <div class="dt-name">{{ s.name }}</div>
          <div class="dt-desc">{{ s.desc }}</div>
        </div>
      </aside>
      <section class="dt-main">
        <div class="dt-title">State（{{ active }}）</div>
        <pre class="dt-json">{{ json }}</pre>
      </section>
    </div>

    <section class="dt-log">
      <div class="dt-title">Actions 调用记录</div>
      <table class="tbl">
        <thead>
          <tr><th>Store</th><th>Action</th><th>参数</th><th>调用时间</th><th>状态</th></tr>
        </thead>
        <tbody>
          <tr v-for="(e, i) in actionLog" :key="i">
            <td>{{ e.store }}</td>
            <td>{{ e.action }}</td>
            <td class="mono">{{ e.args }}</td>
            <td>{{ e.time }}</td>
            <td><span class="ok">{{ e.status }}</span></td>
          </tr>
          <tr v-if="actionLog.length === 0"><td colspan="5" class="empty">暂无 actions 调用记录</td></tr>
        </tbody>
      </table>
    </section>
  </div>
</template>
