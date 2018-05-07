<template>
	<div class="add_category">
		名称：
		<input v-model="name" placeholder="分类名称">
		<button @click="addCategory()">确定</button>
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
		},
		methods: {
			addCategory: function () {
				let categoryInformation = {
					name: this.name,
					count: 0
				}
				this.$http.post('/api/admin/category/save', {
					categoryInformation: categoryInformation
				}).then(
					response => this.$router.push('/')
				).catch(function (error) {
					console.log(error);
				})
			}
		}
	}
</script>

<style>
	.add_category {
		width:200px;
		margin: 90px auto;
	}
</style>