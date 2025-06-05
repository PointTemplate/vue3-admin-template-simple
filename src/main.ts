import './styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

import permissionDirective from '@/directives/permission'

const app = createApp(App)
const pinia = createPinia()

app.directive('permission', permissionDirective)

app.use(pinia)
app.use(router)
app.use(Antd)
app.mount('#app')
