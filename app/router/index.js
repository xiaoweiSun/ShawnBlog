import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import Article from '../components/Article.vue'
import NavigationBar from '../components/NavigationBar.vue'
import ArticleEdit from '../components/ArticleEdit.vue'
import ArticleList from '../components/ArticleList.vue'
import ArticleDetail from '../components/ArticleDetail.vue'
import CategoryList from '../components/CategoryList.vue'
import Categories from '../components/Categories.vue'

import AddCategory from '../components/admin/AddCategory.vue'

Vue.use(Router)
Vue.use(Resource)

const router = new Router({
  mode: 'history',
  routes: [
  	{
  		path: '/',
  		components: {default:Article, navigation: NavigationBar}
  	},
    {
      path: '/articleEdit',
      components: {default:ArticleEdit, navigation: NavigationBar}
    },
    {
      path: '/articleEdit/:id',
      components: {default:ArticleEdit, navigation: NavigationBar}
    },
    {
      path: '/articleList',
      components: {default:ArticleList, navigation: NavigationBar}
    },
    {
    	path: '/articleDetail/:id',
    	components: {default:ArticleDetail, navigation: NavigationBar}
    },
    {
      path: '/categoryList',
      components: {default:CategoryList, navigation: NavigationBar}
    },
    {
      path: '/categories/:id',
      components: {default:Categories, navigation: NavigationBar}
    },
    {
      path: '/addCategory',
      component: AddCategory
    }
	]
})

export default router