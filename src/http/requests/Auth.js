import Http from '@/http/Http.js'

class Company extends Http {
  constructor () {
    super()
    this.prefix = '/api/admin/'
  }

  login (data) {
    return this.post('login', data)
  }

  profile () {
    return this.get('profile')
  }

  logout () {
    return this.get('logout')
  }
}

export default new Company()
