const express = require('express');
const db = require('./db.js');

const router = express.Router();

router.get('/api/articleList', function(req, res) {
	db.Article.find({}, function (err, docs) {
    if (err) {
      console.error(err);
      return;
    }
    res.json(docs);
  })
});

router.post('/api/saveArticle', function(req, res) {
  console.log(req);
	new db.Article(req.body.articleInformation).save(function (err) {
    if (err) {
      res.status(500).send();
      console.log(err);
      return;
    }
    res.send();
  })
});

module.exports = router;