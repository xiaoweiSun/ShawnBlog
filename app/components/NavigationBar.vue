<template>
	<div class="navigation">
		<span class="navigation_item"><a href="/" v-bind:class="{active:!isList}">{{message_index}}</a></span>
		<span class="navigation_item"><a v-bind:class="{active:isList}">{{message_list}}</a></span>
		<span class="navigation_item"><a href="https://github.com/xiaoweiSun/ShawnBlog" target="_blank">{{message_git}}</a></span>
		<span class="navigation_item"><a href="articleEdit">{{message_admin}}</a></span>
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
	width:512px;
	margin:0 auto;
	height:10%;
}
.navigation_item {
	margin: 0 8px;
	padding: 8px;
	flex-grow: 1;
}
.active{
	border-bottom: 2px solid green;
}
</style>