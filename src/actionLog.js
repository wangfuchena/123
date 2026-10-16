// src/actionLog.js — 记录各 Store 的 actions 调用记录（供 Store 调试页观察）
// 使用 localStorage 持久化，避免模块热更新导致的内存日志丢失
import { ref } from 'vue'

const STORAGE_KEY = 'actionLog'

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch (e) {
    return []
  }
}

export const actionLog = ref(load())

export function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(actionLog.value))
  } catch (e) { /* ignore */ }
}

export function watchStoreActions(store, storeName) {
  store.$onAction(({ name, args, after, onError }) => {
    const entry = {
      store: storeName,
      action: name,
      args: JSON.stringify(args),
      time: new Date().toLocaleTimeString('zh-CN', { hour12: false }),
      status: '执行中'
    }
    actionLog.value.unshift(entry)
    persist()
    after(() => { entry.status = '已完成'; persist() })
    onError(() => { entry.status = '失败'; persist() })
  })
}
