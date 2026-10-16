// src/stores/user.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    const saved = JSON.parse(localStorage.getItem('userInfo') || 'null')
    return { username: saved?.username || '', isLogin: saved ? true : false }
  },
  actions: {
    login(username) {
      this.username = username
      this.isLogin = true
      localStorage.setItem('userInfo', JSON.stringify({ username }))
    },
    logout() {
      this.username = ''
      this.isLogin = false
      localStorage.removeItem('userInfo')
    }
  }
})
