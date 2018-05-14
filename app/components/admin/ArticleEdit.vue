<template>
	<div class="article_edit">
		<router-link to="/admin/articleList" class="article_back_to_list">返回</router-link>
		<div id="title" class="article_title_label">标题</div>
		<input v-model="title" type="text" class="article_title_input">

		<div id="category" class="article_category">分类
			<select v-model="category" class="article_category_select">
				<option v-for="item in categoryList" :value="item._id">{{item.name}}</option>
			</select>
		</div>

		<div id="date" class="article_date">日期
			<input v-model="year" type="text" class="article_date_input">-
			<input v-model="month" type="text" class="article_date_input">-
			<input v-model="day" type="text" class="article_date_input">-
		</div>

		<div class="article_content_label">内容（Markdown）</div>
		<div id="editor">
			<textarea v-model="input" @input="update"></textarea>
			<div class="article_edit_view" v-html="compiledMarkdown"></div>
		</div>
		<div id="save">
			<button class="save_btn" @click="submit">保存</button>
		</div>
	</div>
</template>

<script>
	import _ from 'lodash'
	import marked from 'marked'
	export default {
		data: () => ({
			input: '# hello',
			title: '',
			year: '',
			month: '',
			day: '',
			date: '',
			category: '',
			category_old: '',
			categoryList: []
		}),
		computed: {
			compiledMarkdown: function () {
				return marked(this.input, { sanitize: true })
			}
		},
		mounted: function () {
			if (!this.$session.get('jwt')) {
				this.$http.get('/api/checkLogin').then(
					response => {
						if (response.data && response.data.name) {
							this.$session.start()
							this.$session.set('jwt', response.data.name)
						} else {
							this.$router.push('/')
						}
					}
				).catch(function (err) {
					console.log(err)
				})
			}
			if (this.$route.params.id) {
				this.$http.get('/api/articleDetail/' + this.$route.params.id).then(
					response => {
						let article = response.data
						this.title = article.title
						this.date = article.date
                        this.year = this.date.split('-')[0];
                        this.month = this.date.split('-')[1];
                        this.day = this.date.split('-')[2];
						this.category = article.category._id
						this.category_old = this.category
						this.input = article.content
					}).catch(function (error) {
					console.log(error);
				})
			}
			this.$http.get('/api/categoryList').then(
				response => {
					this.categoryList = response.data
				}
			).catch(function (error) {
				console.log(error);
			})
		},
		methods: {
			update: _.debounce(function (e) {
				this.input = e.target.value
			}, 300),
			getDate: function () {
				let mydate, y, m, d;
				mydate = new Date()
				y = mydate.getFullYear()
				m = mydate.getMonth() + 1
				d = mydate.getDate()
				if (m < 10) m = '0' + m
				if (d < 10) d = '0' + d
				return y + '-' + m + '-' + d
			},
			submit: function () {
				if (!this.title || !this.category || !this.input) {
					alert('some field is blank')
					return
				}
				if (this.$route.params.id) {
					let articleInformation = {
						_id: this.$route.params.id,
						title: this.title,
						date: this.year + '-' + this.month + '-' + this.day,
						category: this.category,
						category_old: this.category_old,
						content: this.input
					}
					this.$http.post('/api/admin/updateArticle', {
						articleInformation: articleInformation
					}).then(
						response => this.$router.push('/articleDetail/' + this.$route.params.id)
					).catch(function (error) {
						console.log(error);
					})
				} else {
					let articleInformation = {
						title: this.title,
						date: this.year + '-' + this.month + '-' + this.day,
						category: this.category,
						content: this.input
					}
					this.$http.post('/api/admin/saveArticle', {
						articleInformation: articleInformation
					}).then(
						response => this.$router.push('/admin/articleList')
					).catch(function (error) {
						console.log(error);
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.article{

		&_edit {
			margin: 90px 50px;
		}

		&_back_to_list {
			text-decoration: underline;
		}

		&_title_label {
			margin: 10px 0;
		}

		&_title_input {
			width: 100%;
			line-height: 2;
		}

		&_category {
			margin: 10px;
			margin-left: 0;
			line-height: 2;
		}

        &_date {
            margin: 10px;
            margin-left: 0;
            line-height: 2;
        }

		&_content_label {
			margin: 10px 0;
		}
	}

	textarea, #editor div {
		display: inline-block;
		width: 49%;
		height: 800px;
		vertical-align: top;
		box-sizing: border-box;
		padding: 0 20px;
		overflow: hidden;
		border: 1px solid #ccc;
	}

	textarea:hover, #editor div:hover {
		overflow: auto;
	}

	textarea {
		resize: none;
		outline: none;
		background-color: #f6f6f6;
		font-size: 14px;
		font-family: 'Monaco', courier, monospace;
		padding: 20px;
	}

	.save_btn {
		width: 80px;
		margin-top: 10px;
		margin-right: 20px;
		float: right;
	}
</style>