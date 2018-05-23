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
		<div class="article_page" v-if="pageNumber > 1">
			<span v-for="n in pageNumber">
				<a @click="jumpToPage(n - 1)" class="article_page_link" :class="{current: n - 1 === offset}">{{n}}</a>
			</span>
		</div>
	</div>
</template>

<script>
	import marked from 'marked'
	const LIMIT = 5; // article number to show in each page
	export default {
		data: () => ({
			articleList: [],
			total: 0,
			offset: 0
		}),
		computed: {
			pageNumber: function () {
				return Math.ceil(this.total / LIMIT);
			}
		},
		mounted: function () {
			this.$http.get('/api/articleList/0/' + LIMIT)
				.then(
					response => {
						this.articleList = response.data.docs.sort(this.reorder)
						this.total = response.data.count
					}
				).catch(function (error) {
					console.log(error);
				})
		},
		methods: {
			compiledMarkdown: function (content) {
				return marked(content || '', {sanitize: true})
			},
			reorder: function (article1, article2) {
				let date1 = new Date(article1.date);
				let date2 = new Date(article2.date);
				return date1 > date2 ? -1 : 1;
			},
			jumpToPage: function (offset) {
				this.$http.get('/api/articleList/' + offset * LIMIT + '/' + LIMIT)
					.then(
						response => {
							this.articleList = response.data.docs.sort(this.reorder)
							this.offset = offset
						}
					).catch(function (error) {
						console.log(error);
					})
			}
		}
	}
</script>

<style lang="scss">
	.article {
		width: 700px;
		margin: 180px auto;

		&_item {
			position: relative;
			max-height: 300px;
			box-shadow: 0 0 10px rgba(201,201,201,.5);
			overflow: hidden;
			margin-bottom: 60px;
			padding:25px;
		}

		&_title {
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
			font-weight: bold;
		}

		&_meta {
			margin:5px 0 25px;
			font-size: 12px;
			color: #999;

			&_category {
				margin-left:5px;
				border-left:1px solid;
				padding-left:5px;

				&_link {
					padding-left:2px;
					text-decoration: underline;
				}
			}
		}
		&_page {
			margin-top: 120px;
			border-top:1px solid #eee;
			&_link {
				margin: 0 10px;
				padding: 0 10px;
				line-height: 30px;
				display: inline-block;
				&.current {
					cursor: text;
					color: #fff;
					background: #ccc;
				}
			}

		}
	}

	@media (max-width: 767px) {
		.article {
			width: auto;
			margin: 180px 20px;
		}
	}

	.read_all {
		position: absolute;
		bottom: 0;
		left: 25px;
		right: 25px;
		padding-top: 80px;
		background-image: -webkit-gradient(linear,left top, left bottom,from(rgba(255,255,255,0)),color-stop(70%, #fff));
		background-image: linear-gradient(-180deg,rgba(255,255,255,0) 0%,#fff 70%);
	
		&_btn {
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
	}
</style>