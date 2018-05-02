<template>
	<div class="categories">
		<h2 class="categories_title">{{title}}分类</h2>
		<div class="categories_article" v-for="article in articleList">
			<span class="categories_article_date">{{article.date}}</span>
			<router-link :to="'/articleDetail/'+article._id">{{article.title}}</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'articleList',
		data () {
			return {
				articleList: [],
				title: ''
			}
		},
		mounted: function () {
			let id = this.$route.params.id
			this.$http.get('/api/articleList/' + id).then(
				response => {
					this.articleList = response.data.reverse()
				}
			).catch(function (error) {
				console.log(error);
			})
			this.$http.get('/api/categoryDetail/' + id).then(
				response => {
					this.title = response.data.name
				}
			).catch(function (error) {
				console.log(error);
			})
		}
	}
</script>

<style>
	.categories {
		margin:180px auto;
		border-left: 1px solid #f5f5f5;
		width: 50%;
	}
	.categories_title {
		padding-left: 20px;
		position: relative;
	}
	.categories_title:before {
		position: absolute;
		top: 50%;
		margin-left: -4px;
		margin-top: -4px;
		width: 8px;
		height: 8px;
		content: " ";
		left: 0;
		background: #bbb;
		border-radius: 50%;
	}
	.categories_article {
		margin: 30px 0;
		padding-bottom: 10px;
		border-bottom: 1px dashed #ccc;
		position: relative;
		line-height: 2;
		font-size: 16px;
	}
	.categories_article:before {
		position: absolute;
		top: 14px;
		width: 6px;
		height: 6px;
		margin-left: -4px;
		border: 1px solid #fff;
		transition-property: background;
		content: " ";
		left: 0;
		background: #bbb;
		border-radius: 50%;
	}
	.categories_article_date {
		margin: 0 20px;
		font-size: 12px;
	}
</style>