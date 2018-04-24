import Vue from 'vue'
import router from './router'  //直接导入路由配置
import App from './App.vue'

new Vue({
	el: '#app',
	router: router,
	render: h => h(App)
})