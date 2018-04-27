import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import Hello from '../components/Hello.vue'
import NavigationBar from '../components/NavigationBar.vue'
import ArticleEdit from '../components/ArticleEdit.vue'
import ArticleList from '../components/ArticleList.vue'

Vue.use(Router)
Vue.use(Resource)

const router = new Router({
  mode: 'history',
  routes: [
  	{
  		path: '/',
  		components: {default:Hello, navigation: NavigationBar}
  	},
    {
      path: '/articleEdit',
      components: {default:ArticleEdit, navigation: NavigationBar}
    },
    {
      path: '/articleList/:isList',
      components: {default:ArticleList, navigation: NavigationBar}
    }
	]
})

export default router