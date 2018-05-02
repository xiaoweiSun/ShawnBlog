<template>
	<div class="navigation">
		<div class="navigation_inner">
			<ul class="navigation_inner_link">
				<li class="navigation_item"><router-link to="/">首页</router-link></li>
				<li class="navigation_item"><router-link to="/admin/articleEdit">写文章</router-link></li>
				<li class="navigation_item"><router-link to="/admin/articleList">文章列表</router-link></li>
	      <li class="navigation_item"><router-link to="/admin/addCategory">分类管理</router-link></li>
	    </ul>
    </div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				name: ''
			}
		},
		mounted: function() {
			let self = this
			if(!this.$session.get('jwt')) {
				this.$http.get('/api/checkLogin').then(
					response => {
						self.$session.start()
    				self.$session.set('jwt', response.data.name)
					}
				).catch(function(err) {
    			self.$router.push('/')
				})
			}
		}
	}
</script>