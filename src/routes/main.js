const {Router} = require('express');
const main = require('../controllers/main');
const router = Router();

router.get("/", main.index);

module.exports = router