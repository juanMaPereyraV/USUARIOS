const {Router} = require('express');
const user = require('../controllers/user');
const router = Router();
const {validate} = require('../models/user');
const access = require('../middlewares/acces');
const auth = require('../middlewares/auth');

router.get('/login',user.login);
router.get('/register', user.register);
router.get('/profile', [access],user.profile);

router.post('/', [validate], user.save);
router.post('/access', [validate], user.acces);
router.post('/logout', user.logout)

module.exports = router;