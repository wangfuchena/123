<script setup>
// 项目管理：使用 Element Plus 的表格、对话框、表单、按钮、消息等组件
// 用到的组件：el-table / el-table-column / el-button / el-dialog / el-form
//            el-form-item / el-input / el-message / el-tag / el-space
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'
import { useProjectStore } from '@/stores/project'
import LocalStoragePanel from '@/components/LocalStoragePanel.vue'

const projectStore = useProjectStore()
const { projects, total } = storeToRefs(projectStore)
const { deleteProject } = projectStore

// 对话框与表单状态
const dialogVisible = ref(false)
const editingId = ref(null)
const form = ref({ name: '', owner: '', desc: '' })

function openAdd() {
  editingId.value = null
  form.value = { name: '', owner: '', desc: '' }
  dialogVisible.value = true
}
function openEdit(p) {
  editingId.value = p.id
  form.value = { name: p.name, owner: p.owner, desc: p.desc }
  dialogVisible.value = true
}
function submit() {
  if (!form.value.name) {
    ElMessage.warning('项目名称不能为空')
    return
  }
  if (editingId.value) {
    projectStore.updateProject(editingId.value, { ...form.value })
    ElMessage.success('修改成功：updateProject 已调用，视图与 localStorage 自动同步')
  } else {
    projectStore.addProject({ ...form.value })
    ElMessage.success('新增成功：addProject 已调用，总数 total 更新为 ' + total.value)
  }
  dialogVisible.value = false
}
function remove(id) {
  deleteProject(id)
  ElMessage.success('删除成功：deleteProject 已调用')
}
</script>

<template>
  <div class="card">
    <h2>项目管理 <span class="count">共 {{ total }} 项</span></h2>
    <p class="sub">使用 Element Plus 的 el-table / el-dialog / el-form / el-button / el-message 重构项目增删改查。</p>

    <el-button type="primary" :icon="'Plus'" @click="openAdd">新增项目</el-button>

    <el-table :data="projects" stripe style="margin-top:12px">
      <el-table-column prop="id" label="ID" width="160" />
      <el-table-column prop="name" label="项目名称" width="220" />
      <el-table-column prop="owner" label="负责人" width="120" />
      <el-table-column prop="desc" label="说明" />
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <el-button size="small" @click="openEdit(row)">编辑</el-button>
          <el-button size="small" type="danger" @click="remove(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 对话框：新增/编辑项目 -->
    <el-dialog v-model="dialogVisible" :title="editingId ? '编辑项目' : '新增项目'" width="480px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="项目名称">
          <el-input v-model="form.name" placeholder="请输入项目名称" />
        </el-form-item>
        <el-form-item label="负责人">
          <el-input v-model="form.owner" placeholder="请输入负责人" />
        </el-form-item>
        <el-form-item label="项目说明">
          <el-input v-model="form.desc" type="textarea" :rows="3" placeholder="请输入项目说明" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </template>
    </el-dialog>

    <LocalStoragePanel />
  </div>
</template>
