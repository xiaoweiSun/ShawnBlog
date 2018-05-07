<template>
	<div class="management">
		<div class="management_inner">
			<ul class="management_inner_link">
				<li class="management_item"><router-link to="/">首页</router-link></li>
				<li class="management_item"><router-link to="/admin/articleEdit">写文章</router-link></li>
				<li class="management_item"><router-link to="/admin/articleList">文章列表</router-link></li>
				<li class="management_item"><router-link to="/admin/addCategory">分类管理</router-link></li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		data: () => ({
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
		}
	}
</script>

<style>
	.management {
		width: 300px;
		margin: 90px auto;
	}
</style>