import 'ant-design-vue/dist/reset.css'
import './assets/main.scss'
import 'dayjs/locale/vi'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import dayjs from 'dayjs'
dayjs.locale('vi')
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
