import { defineStore } from 'pinia'
import { useAppStore } from '@/stores/app'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    currentUser: null,
  }),
  getters: {
  },
  actions: {
    authenticate(params) {
      const app = useAppStore()
      app.setLoading()
      try {
        console.log(params)
      } catch (error) {

      } finally {
        app.setLoading(false)
      }
    },
  },
})
