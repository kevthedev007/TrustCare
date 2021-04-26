const router = require('express').Router();
const counselorController = require('../controllers/counselorController');
const verify = require('../verifytoken')


router.post('/register', counselorController.postRegister);
router.get('/confirmation/:token', counselorController.Confirmation)
router.post('/login', counselorController.postLogin);
router.get('/logout', counselorController.logout)


module.exports = router;