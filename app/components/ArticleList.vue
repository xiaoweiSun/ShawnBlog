<template>
	<div>
		<ul>
			<li v-for="article in articleList">
				<router-link :to="'/articleDetail/'+article._id">{{article.title}}</router-link>
        <router-link :to="'/articleEdit/'+article._id">修改</router-link>
        <div @click="deleteArticle(article._id)" class="delete_btn">删除</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
    name: 'articleList',
    data() {
      return {
        articleList: [],
      }
    },
    mounted: function () {
      // 获取文章列表
      this.$http.get('/api/articleList').then(
        response => this.articleList = response.body.reverse(),
        response => console.log(response.body)
      )
    },
    methods: {
      deleteArticle: function (id) {
        this.$http.get('/api/deleteArticle/' + id).then(
          response => this.fetchData(),
          response => console.log(response)
        )
      },
      // 更新数据
      fetchData: function () {
        console.log('fetch data');
        this.$http.get('/api/articleList').then(
          response => this.articleList = response.body.reverse(),
          response => console.log(response)
        )
      }
    }
	}

</script>

<style>
  .delete_btn {
    cursor: pointer;
  }
</style>