<template>
	<div class="navigation">
		<div class="navigation_inner">
			<div class="navigation_inner_meta">
				<div class="navigation_inner_meta_before"></div>
				<div class="navigation_inner_meta_title">小V的博客</div>
				<div class="navigation_inner_meta_after"></div>
			</div>
			<div class="navigation_inner_blank"></div>
			<ul class="navigation_inner_link">
				<li class="navigation_item"><router-link to="/">首页</router-link></li>
				<li class="navigation_item"><router-link to="/categoryList">分类</router-link></li>
				<li class="navigation_item"><router-link to="/archives">归档</router-link></li>
				<li class="navigation_item"><a href="https://github.com/xiaoweiSun/ShawnBlog" target="_blank">GIT</a></li>
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
.navigation_inner {
	width: 700px;
	margin: 0 auto;
	display:flex;
}
@media (max-width: 767px) {
	.navigation_inner {
		width: 100%;
		margin: 0 20px;
	}
}
.navigation_inner_blank {
	flex-grow: 1;
}
.navigation_inner_meta {
	margin: 25px 0;
	margin-left: -10px;
}
.navigation_inner_meta_before, .navigation_inner_meta_after {
	margin: 0 10px;
	height:2px;
	background: black;
}
.navigation_inner_meta_title {
	font-size: 22px;
	font-weight: bold;
	line-height: 36px;
}
.navigation_inner_link {
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