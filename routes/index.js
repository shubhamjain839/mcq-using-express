var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';
/* GET home page. */
router.get('/', function(req, res, next) {
  mongo.connect(url,{useNewUrlParser:true},function(err,db){
    if(err) throw err;
    var dbs = db.db('db1');
    dbs.collection('ques').find({}).toArray(function(err,result){
      if (err) throw err;
      res.render('index', { title: 'Express','ques':result });
    });
    db.close();
  });
});
router.post('/result', function(req, res, next) {
  var ans = 0;
  mongo.connect(url,{useNewUrlParser:true},function(err,db){
    if(err) throw err;
    var dbs = db.db('db1');
    dbs.collection('ques').find({}).toArray(function(err,result){
      if (err) throw err;
      for(i=0;i<=5;i++){    //upto n-1 questions
        var qr = 'ans'+i;
        if(req.body[qr] == result[i].ans) //answer stored under ans property in db
          ans+=1;
        }
      res.render('result', { title: 'Express','ans':ans });
    });
    db.close();
  });
});

module.exports = router;
