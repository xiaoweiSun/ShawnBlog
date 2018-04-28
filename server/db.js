const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/blog')

const userSchema = new mongoose.Schema({
  name: String,
  password: String
})

const articleSchema = new mongoose.Schema({
  title: String,
  date: String,
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  content: String
})

const categorySchema = new mongoose.Schema({
	name: String
})

const Models = {
  User: mongoose.model('User', userSchema),
  Category: mongoose.model('Category', categorySchema),
  Article: mongoose.model('Article', articleSchema)
}

module.exports = Models