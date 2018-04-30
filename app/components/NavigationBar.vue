<template>
	<div class="navigation">
		<div class="navigation-inner">
			<div class="navigation-inner-meta"></div>
			<ul class="navigation-inner-link">
				<li class="navigation_item"><router-link to="/">首页</router-link></li>
				<li class="navigation_item"><router-link to="/categoryList">分类</router-link></li>
				<li class="navigation_item"><router-link to="/articleList">文章列表</router-link></li>
				<li class="navigation_item"><a href="https://github.com/xiaoweiSun/ShawnBlog" target="_blank">GIT</a></li>
				<li class="navigation_item"><router-link to="/articleEdit">管理员入口</router-link></li>
	      <li class="navigation_item"><router-link to="/addCategory">分类管理</router-link></li>
	    </ul>
    </div>
	</div>
</template>

<script>
  export default {
    data: () => ({
    })
  }
</script>

<style>
.navigation {
	display:flex;
	height:90px;
	background: #f5f5f5;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 1000;
}
.navigation-inner {
	width: 50%;
	margin: 0 auto;
	display:flex;
}
.navigation-inner-meta {
	flex-grow: 1;
}
.navigation-inner-link {
	display: flex;
	align-items: center;
	list-style: none;
	margin:0; /* chrome set the margin for ul with default value */
}
.navigation_item {
	padding: 0 10px;
	line-height: 30px;
	border-radius: 2px;
}
.navigation_item:hover {
	background: #e1e1e1;
}
</style>