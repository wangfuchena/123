// src/stores/project.js
import { defineStore } from 'pinia'

export const useProjectStore = defineStore('project', {
  state: () => ({
    projects: JSON.parse(localStorage.getItem('projects') || '[]')
  }),
  getters: {
    total: (state) => state.projects.length
  },
  actions: {
    addProject(project) {
      this.projects.push({ id: Date.now(), ...project })
      this.save()
    },
    updateProject(id, data) {
      const i = this.projects.findIndex(p => p.id === id)
      if (i !== -1) { Object.assign(this.projects[i], data); this.save() }
    },
    deleteProject(id) {
      this.projects = this.projects.filter(p => p.id !== id)
      this.save()
    },
    save() {
      localStorage.setItem('projects', JSON.stringify(this.projects))
    }
  }
})
