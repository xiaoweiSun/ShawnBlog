<template>
	<div class="navigation">
		<a class="navigation_item">{{message_index}}</a>
		<a class="navigation_item">{{message_list}}</a>
		<a class="navigation_item">{{message_git}}</a>
		<a class="navigation_item">{{message_admin}}</a>
	</div>
</template>

<script>
  export default {
    data: () => ({
    	message_index: '首页',
    	message_list: '文章列表',
    	message_git: 'GIT',
    	message_admin: '管理员入口'
    })
	}
</script>

<style>
.navigation {
	display:flex;
}
.navigation_item {
	margin: 0 8px;
	padding: 8px;
	flex-grow: 1;
}
</style>