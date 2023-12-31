import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    isLoading: false,
    appName: 'Mana4.0',
    appShortName: 'M4.0'
  }),
  getters: {},
  actions: {
    setLoading(value = true) {
      this.isLoading = value
    }
  }
})
