import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello.vue'
import NavigationBar from '../components/NavigationBar.vue'
import ArticleEdit from '../components/ArticleEdit.vue'

Vue.use(Router)

const router = new Router({
  routes: [
  	{
  		path: '/',
  		components: {default:ArticleEdit, navigation: NavigationBar},
  		props: {default:false,navigation:true}
  	},
    {
      path: '/articleEdit',
      components: {default:ArticleEdit, navigation: NavigationBar},
      props: {default:false,navigation:true}
    }
	]
})

export default router