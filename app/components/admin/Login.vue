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
		data() {
			return {
				username: '',
				password: ''
			}
		},
		methods: {
			signin: function() {
				let self = this
				this.$http.get('/api/getUser/' + this.username).then(
          response => {
            if (self.password !== response.data.password) {
              alert('用户名或密码不正确')
              console.log('用户名或密码不正确')
            } else {
            	let obj = {
                name: self.username
              }
              self.$http.post('/api/signin', {
                userInfo: obj
              }, {
        				withCredentials: true
      				}).then(
	              response => {
		              delete self.password
		              self.$session.start()
              		self.$session.set('jwt', self.username)
		              self.$router.push('/admin/management')
		            },
		            response => console.log('登录失败'+response)
	            )
            }
          },
          response => {
            alert('用户名或密码不正确')
            console.log('用户名或密码不正确')
            return
          }
        )
			}
		}
	}
</script>

<style>
	.login {
		width: 50%;
		margin: 200px auto;
	}
	.login_title {
		text-align: center;
	}
	.login_input {
		display: block;
		margin: 10px auto;
		width: 200px;
		height: 30px;
	}
	.login_save {
		margin-top: 20px;
		text-align: center;
	}
	.login_save_btn {
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
</style> 