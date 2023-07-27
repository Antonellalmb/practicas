const express = require('express');
const router = express.Router();
const controller = require('../controllers/movieApiController')

router.get('/', controller.list);
router.post('/create', controller.create);
router.get('/detail/:id', controller.detail);


module.exports = router;