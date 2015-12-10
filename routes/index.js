var express = require('express');
var router = express.Router();

router.get('/ajax-response', function(req, res, next) {
  res.send('hello world');
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
