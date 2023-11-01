import Http from '@/http/Http.js'

class Company extends Http {
  constructor () {
    super()
    this.prefix = '/api/admin/'
  }

  login (data, params = {}) {
    return this.post('login', data, params)
  }
}

export default new Company()
