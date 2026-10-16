// src/stores/article.js
import { defineStore } from 'pinia'

export const useArticleStore = defineStore('article', {
  state: () => ({
    articles: JSON.parse(localStorage.getItem('articles') || '[]')
  }),
  getters: {
    total: (state) => state.articles.length
  },
  actions: {
    addArticle(article) {
      this.articles.push({ id: Date.now(), ...article })
      this.save()
    },
    updateArticle(id, data) {
      const i = this.articles.findIndex(a => a.id === id)
      if (i !== -1) { Object.assign(this.articles[i], data); this.save() }
    },
    deleteArticle(id) {
      this.articles = this.articles.filter(a => a.id !== id)
      this.save()
    },
    save() {
      localStorage.setItem('articles', JSON.stringify(this.articles))
    }
  }
})
