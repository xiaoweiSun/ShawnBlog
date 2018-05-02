import Vue from 'vue'
import router from './router' // 直接导入路由配置
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSession from 'vue-session'

axios.defaults.withCredentials = true
Vue.use(VueAxios, axios)
Vue.use(VueSession)

new Vue({ // eslint-disable-line no-new
	el: '#app',
	router: router,
	render: h => h(App)
})
