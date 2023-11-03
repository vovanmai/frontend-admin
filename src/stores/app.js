import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    isLoading: false,
    appName: 'Mana4.0',
    appShortName: 'M4.0',
    errors: {},
    errorTimeout: null,
  }),
  getters: {},
  actions: {
    setLoading(value = true) {
      this.isLoading = value
    },
    setError(value) {
      this.errors = value
      if (this.errorTimeout) {
        clearTimeout(this.errorTimeout)
        this.errorTimeout = null
      }
      this.errorTimeout = setTimeout(() => {
        this.errors = {}
      }, 5000)
    }
  }
})
