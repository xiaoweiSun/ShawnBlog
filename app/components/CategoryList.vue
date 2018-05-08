<template>
	<div class="category_list">
		<h2 class="category_list_title">分类</h2>
		<div class="category_list_stat">目前共计{{total}}个分类</div>
		<ul class="category_list_detail">
			<li class="category_list_item" v-for="category in categoryList">
				<router-link :to="'/categories/' + category._id" class="category_list_item_name">{{category.name}}</router-link>
				<span class="category_list_item_count">({{category.count}})</span>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'categoryList',
		data: () => ({
			categoryList: [],
			total: 0
		}),
		mounted: function () {
			// 获取分类列表
			this.$http.get('/api/categoryList').then(
				response => {
					this.categoryList = response.data.reverse()
					this.total = this.categoryList.length
				}
			).catch(function (error) {
				console.log(error);
			})
		}
	}
</script>

<style lang="scss">
	@media (max-width: 767px) {
		.category_list {
			width: auto;
			margin: 180px 20px;
		}
	}

	.category_list {
		margin: 180px auto;
		width: 700px;
		
		&_stat {
			text-align: center;
		}

		&_detail {
			margin-top: 20px;
			list-style: none;
			padding: 0;
		}

		&_item {
			margin: 5px 10px;
			line-height: 2;

			&_name {
				border-bottom: 1px solid #ccc;
			}

			&_count {
				color: #ccc;
			}
		}
	}
</style>