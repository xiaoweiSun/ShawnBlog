<template>
	<div class="article">
		<div class="article_detail">
			<h1 class="article_detail_title">{{article.title}}</h1>
			<div class="article_detail_meta">
				<span class="article_detail_meta_date">发表于{{article.date}}</span>
				<span class="article_detail_meta_category">
					分类于
					<router-link :to="'/categories/' + category._id" class="article_detail_meta_category_link">{{category.name}}</router-link>
				</span>
			</div>
			<div class="article_detail_content" v-html="compiledMarkdown()"></div>
		</div>
	</div>
</template>

<script>
	import marked from 'marked'
	export default {
		name: 'articleDetail',
		data: () => ({
			article: {},
			category: {}
		}),
		mounted () {
			let id = this.$route.params.id
			this.$http.get('/api/articleDetail/' + id).then(
				response => {
					this.article = response.data
					this.category = this.article.category
				}
			).catch(function (error) {
				console.log(error);
			})
		},
		methods: {
			compiledMarkdown: function () {
				return marked(this.article.content || '', {sanitize: true})
			}
		}
	}
</script>

<style lang="scss">
	@media (max-width: 767px) {
		.article {
			width: auto;
			margin: 180px 20px;
		}
	}

	.article {
		width: 700px;
		margin: 180px auto;
	
		&_detail {
			box-shadow: 0 0 10px rgba(201,201,201,.5);
			padding:25px;

			&_title {
				text-align: center;
			}

			&_meta {
				margin:5px 0 25px;
				font-size: 12px;
				color: #999;
				text-align: center;

				&_category {
					margin-left:5px;
					border-left:1px solid;
					padding-left:5px;

					&_link {
						color: #999;
						padding-left:2px;
						text-decoration: underline;
					}
				}
			}
		}
	}

</style>