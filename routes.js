var express = require('express');
var bodyParser = require('body-parser');
var redis = require('redis');

var urlencode = bodyParser.urlencoded({ extended: false });
var router = express.Router();

if (process.env.REDISTOGO_URL) {
  var rtg   = require("url").parse(process.env.REDISTOGO_URL);
  var client = redis.createClient(rtg.port, rtg.hostname);
  client.auth(rtg.auth.split(":")[1]);
} else {
  var client = redis.createClient();
  client.select((process.env.NODE_ENV || 'development').length);
}

router.route('/')
  .get(function(request, response){
    client.hkeys('users', function(error, names) {
      if(error) throw error;

      response.json(names);
    });
  })

  .post(urlencode, function(request, response){
    var user = request.body;
    client.hset('users', user.name, user.description, function(error) {
      if(error) throw error;

      response.status(201).json(response.name);
    });
  });

module.exports = router;
