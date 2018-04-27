<template>
	<div class="article">
		<div class="article_item" v-for="article in articleList">
			<div>{{article.title}}</div>
			<div v-html="compiledMarkdown(article.content)"></div>
			<div class="read_all">
				<div class="read_all_btn">阅读全文</div>
			</div>
		</div>
	</div>
</template>

<script>
	import marked from 'marked'
  export default {
    data() {
      return {
        articleList: [],
      }
    },
    mounted: function () {
      // 获取文章列表
      this.$http.get('/api/articleList').then(
        response => this.articleList = response.body.reverse(),
        response => console.log(response.body)
      )
    },
    methods: {
      compiledMarkdown: function (content) {
        return marked(content || '', {sanitize: true})
      }
    }
	}
</script>

<style>
	.article {
		width: 50%;
		margin: 0 auto;
	}

	.article_item {
		position: relative;
		max-height: 500px;
		overflow: hidden;
	}

	.read_all {
		position: absolute;
	  bottom: 0;
	  width: 100%;
	  padding-top: 80px;
	  background-image: -webkit-gradient(linear,left top, left bottom,from(rgba(255,255,255,0)),color-stop(70%, #fff));
	  background-image: linear-gradient(-180deg,rgba(255,255,255,0) 0%,#fff 70%);
	}

	.read_all_btn {
		width:120px;
		margin:0 auto;
		cursor: pointer;
		border-radius:4px;
		text-align:center;
		color: #ca0c16 !important;
	  border: 1px solid #ca0c16 !important;
	  background-color: #fff !important;
	  -webkit-transition: background-color .1s ease-in-out;
	  transition: background-color .1s ease-in-out;
	}
</style>