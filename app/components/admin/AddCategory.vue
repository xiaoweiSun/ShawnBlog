<template>
	<div>
		名称：
		<input v-model="name" placeholder="分类名称">
		<button @click="addCategory()">确定</button>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				name: ''
			}
		},
		mounted: function () {
			let self = this
			if (!this.$session.get('jwt')) {
				this.$http.get('/api/checkLogin').then(
					response => {
						if (response.data && response.data.name) {
							self.$session.start()
							self.$session.set('jwt', response.data.name)
						} else {
							self.$router.push('/')
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