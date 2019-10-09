'use strict';

var express = require('express');
var router = express();

var controller = require('./controller');

router.post('/login', controller.login);
router.post('/signup', controller.signUp);

module.exports = router;