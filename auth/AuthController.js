var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser');
var fs = require('fs');
var url = require('url');
var path = require("path");
var fileType = require('file-type');
var VerifyToken = require('./VerifyToken');
var easyimg = require('easyimage');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json({ type: ['json', '+json'] }));

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var jsonPatch = require("json-patch")
var bcrypt = require('bcryptjs');
var config = require('../config'); // get config file

router.post('/login', function (req, res) {
  if (req.body.username == undefined && req.body.password == undefined) {
    res.status(500).send('Plese send username and password.');
  }
  // create a token
  var token = jwt.sign({ id: req.body.userName }, config.secret, {
    expiresIn: 86400 // expires in 24 hours
  });

  // return the information including token as JSON
  res.status(200).send({ auth: true, token: token });
});

router.post('/applyjsonpatch', VerifyToken, function (req, res, next) {
  if (req.body.jsonObject == undefined && req.body.jsonObject == undefined) {
    res.status(500).send('Plese send jsonObject,jsonPatch parameters.');
  }

  let JsonObject = JSON.parse(req.body.jsonObject);
  let JsonPatch = JSON.parse(req.body.jsonPatch);
  let resultJsonObject = jsonPatch.apply(JsonObject, [JsonPatch]);

  res.status(200).send(resultJsonObject);
});

var download = function (uri, filename, callback) {
  request.head(uri, function (err, res, body) {
       request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

router.post('/createthumbnail', VerifyToken, function (req, res, next) {
  if (req.body.imageUri == undefined) {
    res.status(500).send('Plese send imageUri.');
  }

  let uri = req.body.imageUri;
  let pathname = url.parse(uri, [false], [false]).pathname;
  let imageName = path.basename(pathname);

  download(uri, imageName, function () {
    console.log('done');
  });

  easyimg.rescrop({
    src: './' + imageName, dst: './thumbnail_' + imageName,
    width: 50, height: 50,
    cropwidth: 128, cropheight: 128,
    x: 0, y: 0
  }).then(
    function (image) {
      res.status(200).sendFile(__root + './thumbnail_' + imageName);
    },
    function (err) {
      res.status(500).send('Error on the server.');
    }
    );
});

module.exports = router;