import Http from '@/http/Http.js'

class Company extends Http {
  constructor () {
    super()
    this.prefix = '/api/admin/companies'
  }

  getCompanies (params = {}) {
    return this.get('', params)
  }

  create (data, params = {}) {
    return this.post('', data, params)
  }
}

export default new Company()
