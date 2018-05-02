import Vue from 'vue'
import Router from 'vue-router'
import Article from '../components/Article.vue'
import NavigationBar from '../components/NavigationBar.vue'
import Archives from '../components/Archives.vue'
import ArticleDetail from '../components/ArticleDetail.vue'
import CategoryList from '../components/CategoryList.vue'
import Categories from '../components/Categories.vue'

import AddCategory from '../components/admin/AddCategory.vue'
import ArticleEdit from '../components/admin/ArticleEdit.vue'
import ArticleList from '../components/admin/ArticleList.vue'
import Login from '../components/admin/Login.vue'
import Management from '../components/admin/Management.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
  	{
  		path: '/',
  		components: {default:Article, navigation: NavigationBar}
  	},
    {
      path: '/archives',
      components: {default:Archives, navigation: NavigationBar}
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
      path: '/admin/articleEdit',
      component: ArticleEdit
    },
    {
      path: '/admin/articleEdit/:id',
      component: ArticleEdit
    },
    {
      path: '/admin/addCategory',
      component: AddCategory
    },
    {
      path: '/admin/articleList',
      component: ArticleList
    },
    {
      path: '/admin/login',
      component: Login
    },
    {
      path: '/admin/management',
      component: Management
    }
	]
})

export default router