const express = require('express'),
      router = express.Router(),
      cache = require('apicache').middleware,
      axiosController = require('../controllers/axios');

router.get('/meteo', cache('1 minutes'), axiosController.getMeteo);
router.post('/books', axiosController.postBook);

module.exports = router;