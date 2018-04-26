<template>
	<div>
		<div id="title">
			<label>标题</label>
			<input v-model="title" type="text">
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
	    	title: ''
	    }
	  },
	  computed: {
	    compiledMarkdown: function () {
	      return marked(this.input, { sanitize: true })
	    }
	  },
	  methods: {
	    update: _.debounce(function (e) {
	      this.input = e.target.value
	    }, 300),
	    submit: function() {
	    	let self = this;
	    	if(this.$route.params.id) {

	    	} else {
	    		let articleInformation = {
	    			title: this.title,
	    			date: Date.now(),
	    			content: this.input
	    		}
	    		this.$http.post('/api/saveArticle', {
            articleInformation: articleInformation
          }).then(
            response => this.$router.push('/articleList/true')
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