import 'ant-design-vue/dist/reset.css'
import './assets/main.scss'
import 'dayjs/locale/vi';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import dayjs from "dayjs";
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
