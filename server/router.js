const express = require('express')
const db = require('./db.js')

const router = express.Router()

router.get('/api/articleList', function(req, res) {
	db.Article.find({})
  .populate('category', 'name')
  .exec(function (err, docs) {
    if (err) {
      console.error(err)
      return
    }
    res.json(docs)
  })
})

router.get('/api/articleDetail/:id', function (req, res) {
  db.Article.findOne({ _id: req.params.id })
  .populate('category')
  .exec(function (err, docs) {
    if (err) {
      console.error(err)
      return
    }
    res.send(docs)
  })
})

router.post('/api/saveArticle', function(req, res) {
	new db.Article(req.body.articleInformation).save(function (err) {
    if (err) {
      res.status(500).send()
      console.log(err)
      return
    }
    res.send()
  })
})

router.post('/api/updateArticle', function(req, res) {
  let info = req.body.articleInformation
  db.Article.findOne({_id: info._id}, function (err, docs) {
    if (err) {
      return
    }
    docs.title = info.title
    docs.date = info.date
    docs.category = info.category
    docs.content = info.content
    db.Article(docs).save(function (err) {
      if (err) {
        res.status(500).send()
        return
      }
      res.send()
    })
  })
})

// 文章删除
router.get('/api/deleteArticle/:id', function (req, res) {
  db.Article.remove({_id: req.params.id}, function (err) {
    if (err) {
      res.status(500).send()
      console.log(err)
      return
    }
    res.send()
  })
})

// 添加分类
router.post('/api/category/save', function(req, res) {
  new db.Category(req.body.categoryInformation).save(function (err) {
    res.status(500).send()
    console.log(err)
    return
  })
  res.send()
})

// 分类列表
router.get('/api/categoryList', function(req, res) {
  db.Category.find({}, function (err, docs) {
    if (err) {
      console.error(err)
      return
    }
    res.json(docs)
  })
})

module.exports = router