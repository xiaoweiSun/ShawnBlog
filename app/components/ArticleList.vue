<template>
	<div>
		<ul>
			<li v-for="article in articleList">
				<router-link :to="'/articleDetail/'+article._id">{{article.title}}</router-link>
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
    }
	}

</script>