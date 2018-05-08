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

<style lang="scss">
	@media (max-width: 767px) {
		.navigation_inner {
			width: 100%;
			margin: 0 20px;
		}
	}
	.navigation {
		display:flex;
		height:90px;
		background: #f5f5f5;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1000;

		&_inner {
			width: 700px;
			margin: 0 auto;
			display:flex;

			&_blank {
				flex-grow: 1;
			}

			&_meta {
				margin: 25px 0;
				margin-left: -10px;

				&_before, &_after {
					margin: 0 10px;
					height:2px;
					background: black;
				}

				&_title {
					font-size: 22px;
					font-weight: bold;
					line-height: 36px;
				}
			}

			&_link {
				display: flex;
				align-items: center;
				list-style: none;
				margin:0; /* chrome set the margin for ul with default value */
			}
		}

		&_item {
			padding: 0 10px;
			line-height: 30px;
			border-radius: 2px;

			&:hover {
				background: #e1e1e1;
			}
		}
	}
</style>