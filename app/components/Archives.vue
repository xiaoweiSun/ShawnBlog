<template>
	<div class="archive">
		<div class="archive_stat">目前共计{{total}}篇日志</div>
		<div class="" v-for="archive in archives">
			<h2 class="archive_title">{{archive.year}}</h2>
			<div class="archive_article" v-for="article in archive.list">
				<span class="archive_article_date">{{article.date}}</span>
				<router-link :to="'/articleDetail/'+article._id">{{article.title}}</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'archiveList',
		data: () => ({
			archives: [],
			total: 0
		}),
		mounted: function () {
			// 获取分类列表
			this.$http.get('/api/articleList').then(
				response => this.generateArchives(response.data.sort(this.reorder))
			).catch(function (error) {
				console.log(error);
			})
		},
		methods: {
			generateArchives: function (articleList) {
				let archive = {}
				let len = articleList.length
				this.total = len
				for (let i = 0; i < len; i++) {
					if (archive.year) {
						let year = articleList[i].date.slice(0, 4)
						if (year !== archive.year) {
							archive = {}
							archive.year = year
							archive.list = [];
							archive.list.push(articleList[i])
							this.archives.push(archive)
						} else {
							archive.list.push(articleList[i])
						}
					} else {
						archive.year = articleList[i].date.slice(0, 4)
						archive.list = [];
						archive.list.push(articleList[i])
						this.archives.push(archive)
					}
				}
			},
			reorder: function (article1, article2) {
				let date1 = new Date(article1.date);
				let date2 = new Date(article2.date);
				return date1 > date2 ? -1 : 1;
			}
		}
	}
</script>

<style lang="scss">
	.archive {
		margin:180px auto;
		border-left: 1px solid #f5f5f5;
		width: 700px;

    &_stat {
      margin: 30px 0;
      padding-left: 20px;
      position: relative;
      line-height: 2;
      font-size: 16px;
      &:before {
        position: absolute;
        top: 50%;
        margin-left: -4px;
        margin-top: -4px;
        width: 8px;
        height: 8px;
        content: " ";
        left: 0;
        background: #bbb;
        border-radius: 50%;
      }
    }
    
    &_title {
      padding-left: 20px;
      position: relative;
    
      &:before {
        position: absolute;
        top: 50%;
        margin-left: -4px;
        margin-top: -4px;
        width: 8px;
        height: 8px;
        content: " ";
        left: 0;
        background: #bbb;
        border-radius: 50%;
      }
    }
    &_article {
      margin: 30px 0;
      padding-bottom: 10px;
      border-bottom: 1px dashed #ccc;
      position: relative;
      line-height: 2;
      font-size: 16px;
    
      &:before {
        position: absolute;
        top: 14px;
        width: 6px;
        height: 6px;
        margin-left: -4px;
        border: 1px solid #fff;
        transition-property: background;
        content: " ";
        left: 0;
        background: #bbb;
        border-radius: 50%;
      }

      &_date {
        margin: 0 20px;
        font-size: 12px;
      }
    }
	}

  @media (max-width: 767px) {
    .archive {
      width: auto;
      margin: 180px 20px;
    }
  }
	
</style>