<template>
	<div>
		<ul>
			<li v-for="article in articleList">
				{{article.title}}
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
    name: 'article',
    data() {
      return {
        articleList: [],
      }
    },
    mounted: function () {
      // 获取文章列表
      this.$http.get('/api/articleList').then(
        response => this.articleList = response.body.reverse(),
        response => console.log(response)
      )
    }
	}

</script>