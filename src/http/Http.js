import axios from 'axios'
import { get } from 'lodash'
import router from '@/router'


export default class Http {
  constructor () {
    this.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }

    this.api = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL_API,
      headers: this.headers
    })
    this.requestInterceptor()
    this.responseInterceptor()
  }

  requestInterceptor () {
    this.api.interceptors.request.use(async (config) => {
      const { method } = config
      return config
    }, (error) => {
      return Promise.reject(error)
    })
  }

  responseInterceptor () {
    this.api.interceptors.response.use((response) => {
      return Promise.resolve(response.data);
    }, (error) => {
      const status = error.response.status
      switch (status) {
        case 403:
          router.push({ name: 'error.403' })
          return
        case 404:
          router.push({ name: 'error.404' })
          return
        case 500:
          router.push({ name: 'error.500' })
          return
      }
      return Promise.reject(error.response.data);
    })
  }

  setHeaders (headers) {
    this.headers = {
      ...this.headers,
      ...headers
    }

    return this
  }

  getHeaders () {
    return this.headers
  }

  getPath (path) {
    path = String(path)

    if (get(this, 'prefix', false)) {
      path = this.prefix + path
    }

    return path
  }

  get (path = '', params = {}, headers = this.getHeaders(), config = {}) {
    return this.api.get(this.getPath(path), {
      params: params,
      headers,
      ...config
    })
  }

  post (path = '', data, params = {}, headers = this.getHeaders(), config = {}) {
    return this.api.post(this.getPath(path), data, { params: params, headers, ...config })
  }

  postForm(path = '', data, params = {}, headers = this.getHeaders(), config = {}) {
    return this.api.postForm(this.getPath(path), data, { params: params, headers, ...config })
  }

  put (id, data, params = {}, config = {}) {
    return this.api.put(this.getPath(id), data, { params, headers: this.getHeaders(), ...config })
  }

  delete (id, data = {}) {
    return this.api.delete(this.getPath(id), data)
  }

  custom () {
    return this.api
  }
}
