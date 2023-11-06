import Http from '@/http/Http.js'

class Company extends Http {
  constructor () {
    super()
    this.prefix = '/api/admin/companies'
  }

  detail (id) {
    return this.get(`/${id}`)
  }

  list (params) {
    return this.get('', params)
  }

  create (data) {
    return this.post('', data)
  }

  update (id, data) {
    return this.put(`/${id}`, data)
  }

  remove (id) {
    return this.delete(`/${id}`)
  }
}

export default new Company()
