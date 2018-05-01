const express = require('express')
const db = require('./db.js')

const router = express.Router()

router.get('/api/getUser/:username', function (req, res) {
  db.User.findOne({ username: req.params.username }, function (err, docs) {
    if (err) {
      console.error(err)
      return
    }
    res.send(docs)
  })
})

// 登录
router.post('/api/signin', function (req, res) {
  req.session.user = req.body.userInfo
  req.session.save()
  res.send()
})

router.get('/api/articleList', function(req, res) {
  db.Article.find({})
  .populate('category', 'name')
  .exec(function (err, docs) {
    if (err) {
      console.error(err)
      return
    }
    console.log(req.session)
    res.json(docs)
  })
})

router.get('/api/articleList/:categoryId', function(req, res) {
  db.Article.find({category: req.params.categoryId})
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
  .populate('category', 'name')
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
  db.Category.findOne({_id: req.body.articleInformation.category}, function (err, docs) {
    if (err) {
      console.error(err)
      return
    }
    docs.count += 1
    db.Category(docs).save(function (err) {
      if (err) {
        console.error(err)
        return
      }
    })
  })
})

router.post('/api/updateArticle', function(req, res) {
  let info = req.body.articleInformation
  db.Article.findOne({_id: info._id}, function (err, docs) {
    if (err) {
      console.error(err)
      return
    }
    docs.title = info.title
    docs.date = info.date
    docs.category = info.category
    docs.content = info.content
    db.Article(docs).save(function (err) {
      if (err) {
        res.status(500).send()
        console.error(err)
        return
      }
      res.send()
    })
  })
  if (info.category != info.category_old) {
    db.Category.findOne({_id: info.category}, function (err, docs) {
      if (err) {
        console.error(err)
        return
      }
      docs.count = 1
      db.Category(docs).save(function (err) {
        if (err) {
          console.error(err)
          return
        }
      })
    })
    db.Category.findOne({_id: info.category_old}, function (err, docs) {
      if (err) {
        console.error(err)
        return
      }
      docs.count = docs.count - 1
      db.Category(docs).save(function (err) {
        if (err) {
          console.error(err)
          return
        }
      })
    })
  }
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
  db.Article.findOne({ _id: req.params.id })
  .exec(function (err, article) {
    if (err) {
      console.error(err)
      return
    }
    db.Category.findOne({_id: article.category}, function (err, docs) {
      if (err) {
        console.error(err)
        return
      }
      docs.count = docs.count - 1
      db.Category(docs).save(function (err) {
        if (err) {
          console.error(err)
          return
        }
      })
    })
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

router.get('/api/categoryDetail/:id', function(req, res) {
  db.Category.findOne({_id:req.params.id}, function(err, docs) {
    if (err) {
      console.error('api:api/categoryDetail/' + req.params.id + ',err:' + req.err)
      return
    }
    res.json(docs)
  })
})

module.exports = router