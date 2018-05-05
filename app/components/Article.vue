<template>
	<div class="article">
		<div class="article_item" v-for="article in articleList">
			<h2 class="article_title"><router-link :to="'/articleDetail/'+article._id">{{article.title}}</router-link></h2>
			<div class="article_meta">
				<span class="article_meta_date">发表于{{article.date}}</span>
				<span class="article_meta_category">
					分类于
					<router-link :to="'/categories/' + article.category._id" class="article_meta_category_link">{{article.category.name}}</router-link>
				</span>
			</div>
			<div v-html="compiledMarkdown(article.content)"></div>
			<div class="read_all">
				<router-link :to="'/articleDetail/'+article._id" class="read_all_btn">阅读全文</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import marked from 'marked'
	export default {
		data () {
			return {
				articleList: [],
			}
		},
		mounted: function () {
			// 获取文章列表
			this.$http.get('/api/articleList')
				.then(
					response => {
						this.articleList = response.data.reverse()
					}
				).catch(function (error) {
					console.log(error);
				})
		},
		methods: {
			compiledMarkdown: function (content) {
				return marked(content || '', {sanitize: true})
			}
		}
	}
</script>

<style>
	.article {
		width: 700px;
		margin: 180px auto;
	}

	@media (max-width: 767px) {
		.article {
			width: auto;
			margin: 180px 20px;
		}
	}

	.article_item {
		position: relative;
		max-height: 300px;
		box-shadow: 0 0 10px rgba(201,201,201,.5);
		overflow: hidden;
		margin-bottom: 60px;
		padding:25px;
	}

	.article_title {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		font-weight: bold;
	}

	.article_meta {
		margin:5px 0 25px;
		font-size: 12px;
		color: #999;
	}

	.article_meta_category {
		margin-left:5px;
		border-left:1px solid;
		padding-left:5px;
	}

	.article_meta_category_link {
		padding-left:2px;
		text-decoration: underline;
	}

	.read_all {
		position: absolute;
		bottom: 0;
		left: 25px;
		right: 25px;
		padding-top: 80px;
		background-image: -webkit-gradient(linear,left top, left bottom,from(rgba(255,255,255,0)),color-stop(70%, #fff));
		background-image: linear-gradient(-180deg,rgba(255,255,255,0) 0%,#fff 70%);
	}

	.read_all_btn {
		display: block;
		width:120px;
		margin:0 auto 25px;
		cursor: pointer;
		border-radius:4px;
		text-align:center;
		border: 1px solid #c6c6c6;
		background-color: #fff;
		-webkit-transition: background-color .1s ease-in-out;
		transition: background-color .1s ease-in-out;
	}
</style>