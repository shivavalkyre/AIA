const express = require('express'); //import express
const router  = express.Router(); 

const flickrController = require('../controllers/flickr'); 
router.get('/', flickrController.index); 
router.get("/tags/:tag", flickrController.index);

module.exports = router; // export to use in server.js