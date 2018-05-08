<template>
	<div class="login">
		<h2 class="login_title">后台管理</h2>
		<input class="login_input" v-model="username" type="text" placeholder="用户名">
		<input class="login_input" v-model="password" type="password" placeholder="密码">
		<div class="login_save">
			<button class="login_save_btn" @click="signin">登录</button>
		</div>
	</div>
</template>

<script>
	export default {
		data: () => ({
			username: '',
			password: ''
		}),
		mounted: function () {
			if (this.$session.get('jwt')) {
				this.$router.push('/admin/management')
			}
		},
		methods: {
			signin: function () {
				let userInfo = {
					username: this.username,
					password: this.password
				}
				this.$http.post('/api/signin', {
					userInfo: userInfo
				}, {
					withCredentials: true
				})
					.then(
						response => {
							if (response.data) {
								delete this.password
								this.$session.start()
								this.$session.set('jwt', this.username)
								this.$router.push('/admin/management')
							} else {
								alert('用户名或密码不正确')
								console.log('用户名或密码不正确')
							}
						}
					).catch(function (error) {
						console.log(error);
					})
			}
		}
	}
</script>

<style lang="scss">
	.login {
		width: 50%;
		margin: 200px auto;
	
		&_title {
			text-align: center;
		}

		&_input {
			display: block;
			margin: 10px auto;
			width: 200px;
			height: 30px;
		}

		&_save {
			margin-top: 20px;
			text-align: center;

			&_btn {
				color: #fff;
				background-color: #337ab7;
				border-color: #2e6da4;
				padding: 6px 12px;
				line-height: 1.5;
				text-align: center;
				vertical-align: center;
				border: 1px solid transparent;
				border-radius: 4px;
			}
		}
	}
</style> 