const express = require('express');
const router = express();
const controller = require ('./controller');


router.post('/login', controller.login);
router.post('/signup', controller.signUp);


module.exports = router;
