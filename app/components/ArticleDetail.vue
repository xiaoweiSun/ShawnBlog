<template>
	<div>
		<h1 class="article_detail_title">{{article.title}}</h1>
		<div>{{article.category.name}}</div>
		<div class="article_detail_content" v-html="compiledMarkdown()"></div>
	</div>
</template>

<script>
	import marked from 'marked'
	export default {
		name: 'articleDetail',
		data() {
			return {
				article: {}
			}
		},
		mounted() {
			let id = this.$route.params.id
			this.$http.get('/api/articleDetail/' + id).then(
        response => this.article = response.body,
        response => console.log(response)
      )
		},
		methods: {
      compiledMarkdown: function () {
        return marked(this.article.content || '', {sanitize: true})
      }
    }
	}
</script>

<style>
	.article_detail_title {
		text-align: center;
	}
</style>