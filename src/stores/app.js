import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    isLoading: false,
  }),
  getters: {
  },
  actions: {
    setLoading(value = true) {
      this.isLoading = value
    },
  },
})
