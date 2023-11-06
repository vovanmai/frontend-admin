import { defineStore } from 'pinia'
import { useAppStore } from '@/stores/app'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    currentUser: null
  }),
  getters: {},
  actions: {
    setUser(data) {
      this.currentUser = data
    }
  }
})
