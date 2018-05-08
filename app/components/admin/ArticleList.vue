<template>
	<div class="article_list">
		<ul>
			<li v-for="article in articleList">
				<router-link :to="'/articleDetail/'+article._id">{{article.title}}</router-link>
				<router-link :to="'/admin/articleEdit/' + article._id">编辑</router-link>
				<span class="delete_btn" @click="deleteArticle(article._id)">删除</span>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'articleList',
		data: () => ({
			articleList: [],
		}),
		mounted: function () {
			if (!this.$session.get('jwt')) {
				this.$http.get('/api/checkLogin').then(
					response => {
						if (response.data && response.data.name) {
							this.$session.start()
							this.$session.set('jwt', response.data.name)
						} else {
							this.$router.push('/')
						}
					}
				).catch(function (err) {
					console.log(err)
				})
			}
			// 获取文章列表
			this.$http.get('/api/articleList').then(
				response => {
					this.articleList = response.data.reverse()
				}
			).catch(function (error) {
				console.log(error);
			})
		},
		methods: {
			deleteArticle: function (id) {
				this.$http.get('/api/admin/deleteArticle/' + id).then(
					response => this.fetchData()
				).catch(function (error) {
					console.log(error);
				})
			},
			// 更新数据
			fetchData: function () {
				console.log('fetch data');
				this.$http.get('/api/articleList').then(
					response => {
						this.articleList = response.data.reverse()
					}
				).catch(function (error) {
					console.log(error);
				})
			}
		}
	}
</script>

<style lang="scss">
	.delete_btn {
		cursor: pointer;
	}
	.article_list {
    width: 50%;
		margin: 90px auto;
	}
</style>