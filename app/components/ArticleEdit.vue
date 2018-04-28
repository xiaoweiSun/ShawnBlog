<template>
	<div>
		<div id="title">
			<label>标题</label>
			<input v-model="title" type="text">
		</div>
		<div id="category">
			<label>分类</label>
			<select v-model="category">
				<option v-for="item in categoryList" :value="item._id">{{item.name}}</option>
			</select>
		</div>
		<div id="editor">
		  <textarea v-model="input" @input="update"></textarea>
		  <div v-html="compiledMarkdown"></div>
		</div>
		<div id="save">
			<button class="save-btn" v-on:click="submit">保存</button>
		</div>
	</div>
</template>

<script>
	import _ from 'lodash'
  import marked from 'marked'
	export default {
		data() {
			return {
	    	input: '# hello',
	    	title: '',
	    	category: '',
	    	categoryList: []
	    }
	  },
	  computed: {
	    compiledMarkdown: function () {
	      return marked(this.input, { sanitize: true })
	    }
	  },
	  mounted: function() {
	  	if(this.$route.params.id) {
	  		this.$http.get('/api/articleDetail/' + this.$route.params.id).then(
          response => {
            let article = response.body
            this.title = article.title
            this.category = article.category._id
            this.input = article.content
          },
	    		response => console.log(response)
        )
	  	}
      this.$http.get('/api/categoryList').then(
        response => this.categoryList = response.body,
        response => console.log(response.body)
      )
	  },
	  methods: {
	    update: _.debounce(function (e) {
	      this.input = e.target.value
	    }, 300),
	    submit: function() {
	    	let self = this;
	    	if(this.$route.params.id) {
					let articleInformation = {
						_id: this.$route.params.id,
	    			title: this.title,
	    			date: Date.now(),
	    			category: this.category,
	    			content: this.input
	    		}
	    		this.$http.post('/api/updateArticle', {
						articleInformation: articleInformation
	    		}).then(
	    			response => this.$router.push('/articleDetail/' + self.$route.params.id),
	    			response => console.log(response)
	    		)
	    	} else {
	    		let articleInformation = {
	    			title: this.title,
	    			date: Date.now(),
	    			category: this.category,
	    			content: this.input
	    		}
	    		this.$http.post('/api/saveArticle', {
            articleInformation: articleInformation
          }).then(
            response => this.$router.push('/articleList/true'),
	    			response => console.log(response)
          )
	    	}
	    }
	  }
	}
</script>

<style>
textarea, #editor div {
  display: inline-block;
  width: 49%;
  height: 80%;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 20px;
}

textarea {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: 'Monaco', courier, monospace;
  padding: 20px;
}

code {
  color: #f66;
}

.save-btn {
	width: 80px;
	margin-left: auto;
}
</style>