<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useArticleStore } from '@/stores/article'
import LocalStoragePanel from '@/components/LocalStoragePanel.vue'

const articleStore = useArticleStore()
// state 和 getters 用 storeToRefs 包装，解构后仍保持响应式
const { articles, total } = storeToRefs(articleStore)
// actions 不需要包装，可直接从 Store 实例解构
const { deleteArticle } = articleStore

const editingId = ref(null)
const form = ref({ title: '', author: '', date: '', content: '' })
const toast = ref('')

function openEdit(a) {
  editingId.value = a.id
  form.value = { title: a.title, author: a.author, date: a.date, content: a.content }
}
function submit() {
  if (!form.value.title || !form.value.author) { toast.value = '标题和作者不能为空'; return }
  if (editingId.value) {
    articleStore.updateArticle(editingId.value, { ...form.value })
    toast.value = '修改成功：updateArticle 已调用，视图与 localStorage 自动同步'
  } else {
    articleStore.addArticle({ ...form.value })
    toast.value = '新增成功：addArticle 已调用，总数 total 更新为 ' + total.value
  }
  editingId.value = null
  form.value = { title: '', author: '', date: '', content: '' }
  setTimeout(() => { toast.value = '' }, 2600)
}
function remove(id) {
  deleteArticle(id)
  toast.value = '删除成功：deleteArticle 已调用，数据同步更新'
  setTimeout(() => { toast.value = '' }, 2600)
}
</script>

<template>
  <div class="card">
    <h2>文章管理 <span class="count">共 {{ total }} 篇</span></h2>
    <p class="sub">通过 article Store 的 actions（addArticle / updateArticle / deleteArticle）完成增删改查，每次修改后 save() 写回 localStorage。</p>

    <div v-if="toast" class="toast">{{ toast }}</div>

    <form class="form" @submit.prevent="submit">
      <input v-model="form.title" class="input" placeholder="文章标题" />
      <input v-model="form.author" class="input" placeholder="作者" />
      <input v-model="form.date" class="input" placeholder="日期，如 2026-10-14" />
      <textarea v-model="form.content" class="input" rows="2" placeholder="内容摘要"></textarea>
      <button type="submit" class="primary">{{ editingId ? '保存修改' : '新增文章' }}</button>
      <button v-if="editingId" type="button" class="ghost" @click="editingId = null; form = { title: '', author: '', date: '', content: '' }">取消编辑</button>
    </form>

    <table class="tbl">
      <thead>
        <tr><th>ID</th><th>标题</th><th>作者</th><th>日期</th><th>操作</th></tr>
      </thead>
      <tbody>
        <tr v-for="a in articles" :key="a.id">
          <td>{{ a.id }}</td>
          <td>{{ a.title }}</td>
          <td>{{ a.author }}</td>
          <td>{{ a.date }}</td>
          <td>
            <button class="ghost" @click="openEdit(a)">编辑</button>
            <button class="danger" @click="remove(a.id)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <LocalStoragePanel />
  </div>
</template>
