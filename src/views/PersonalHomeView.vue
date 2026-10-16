<script setup>
// 个人主页：使用 Element Plus 组件对实验1-3积累的个人主页进行重构
// 用到的组件：el-container / el-header / el-main / el-row / el-col
//            el-menu / el-menu-item / el-card / el-avatar / el-tag
//            el-timeline / el-timeline-item / el-button / el-link
import { reactive } from 'vue'
import { STUDENT_NAME, STUDENT_ID } from '@/config'

// 个人基本信息（对应实验一的 data()，现在由父组件直接提供）
const profile = reactive({
  name: '勾佳俊',
  title: '前端开发学习者 / 计算机相关专业',
  bio: '在实验一到实验三的基础上，逐步从单页 HTML、选项式 API 演进到 Vue 工程、组合式 API、组件化、Vue Router，本实验进一步引入 Pinia 状态管理与 Element Plus 组件库。',
  skills: ['Vue 3', 'Pinia', 'Vue Router', 'Element Plus', 'HTML/CSS', 'JavaScript']
})

// 学习时间线：对应实验要求"在个人信息页面新增时间线"
const timeline = [
  { time: '2026-09', title: '实验一：个人信息页面', desc: 'CDN 引入 Vue 3，选项式 API，完成个人信息展示与技能搜索' },
  { time: '2026-09', title: '实验二：组件化开发', desc: '迁移到 Vue 工程，组合式 API，拆分个人信息/项目展示组件，应用插槽' },
  { time: '2026-10', title: '实验三：路由配置', desc: 'Vue Router 配置首页/项目页/详情页/后台管理，嵌套路由与路由守卫' },
  { time: '2026-10', title: '实验四（一）：Pinia 状态管理', desc: 'user/article/project 三个 Store，localStorage 持久化，storeToRefs 保持响应式' },
  { time: '2026-10', title: '实验四（二）：Element Plus 重构', desc: '使用布局/菜单/卡片/时间线/表格/对话框等不少于 10 种组件重构界面' }
]

const projects = reactive([
  { name: '校园二手交易平台', desc: '基于 Vue 3 + Pinia 的多页面前后端分离项目', tag: '已完成' },
  { name: '个人主页（本项目）', desc: '从实验一积累至今的持续迭代项目', tag: '进行中' }
])
</script>

<template>
  <el-container class="home">
    <el-main>
      <el-card shadow="hover">
        <el-row :gutter="24" align="middle">
          <el-col :span="4">
            <el-avatar :size="90" class="avatar">{{ profile.name.charAt(0) }}</el-avatar>
          </el-col>
          <el-col :span="20">
            <h2 style="margin:0 0 6px">{{ profile.name }}
              <el-tag color="#409EFF" effect="dark" style="margin-left:10px">{{ STUDENT_ID }}</el-tag>
            </h2>
            <p style="color:#606266;margin:0 0 10px">{{ profile.title }}</p>
            <p style="color:#606266;line-height:1.6">{{ profile.bio }}</p>
            <div>
              <el-tag v-for="s in profile.skills" :key="s" style="margin:0 8px 8px 0">{{ s }}</el-tag>
            </div>
          </el-col>
        </el-row>
      </el-card>

      <el-card shadow="hover" style="margin-top:16px">
        <template #header><b>学习与实验时间线</b></template>
        <el-timeline>
          <el-timeline-item
            v-for="item in timeline"
            :key="item.title"
            :timestamp="item.time"
            placement="top"
          >
            <h4 style="margin:0 0 4px">{{ item.title }}</h4>
            <p style="color:#606266;margin:0">{{ item.desc }}</p>
          </el-timeline-item>
        </el-timeline>
      </el-card>

      <el-card shadow="hover" style="margin-top:16px">
        <template #header><b>代表项目</b></template>
        <el-table :data="projects" stripe>
          <el-table-column prop="name" label="项目名称" width="220" />
          <el-table-column prop="desc" label="简介" />
          <el-table-column prop="tag" label="状态" width="120">
            <template #default="{ row }">
              <el-tag :type="row.tag === '已完成' ? 'success' : 'warning'">{{ row.tag }}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-main>
  </el-container>
</template>

<style scoped>
.home { background: #f5f7fa; min-height: 100%; padding: 0; }
.avatar { background: #409EFF; color: #fff; font-weight: 700; font-size: 28px; }
</style>
