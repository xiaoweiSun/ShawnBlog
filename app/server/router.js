import express from 'express'
import db from './db.js'

const router = express.Router()

router.get('/api/articleList', function(req, res) {
	db.Article.find({}, function (err, docs) {
    if (err) {
      console.error(err);
      return;
    }
    res.json(docs);
  })
})

router.post('/api/saveArticle' function(req, res) {
	new db.Article(req.body.articleInformation).save(function (err) {
    if (err) {
      res.status(500).send();
      return;
    }
    res.send();
  })
})

export default router