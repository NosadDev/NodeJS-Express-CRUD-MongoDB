var express = require('express');
var router = express.Router();
const AppController = require('../controller/AppController');
/* GET home page. */
router.get('/', AppController.index);
router.get('/create', AppController.create)
router.post('/create', AppController.create)
router.get('/update/:id', AppController.update);
router.post('/update/:id', AppController.update);
router.get('/delete/:id', AppController.delete);
module.exports = router;
