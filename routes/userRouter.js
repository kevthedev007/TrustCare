const router = require('express').Router();
const userController = require('../controllers/userController');
const verify = require('../verifytoken')

router.post('/register', userController.postRegister);
router.post('/login', userController.postLogin);
router.get('/confirmation/:token', counselorController.Confirmation)
router.get('/logout', userController.logout);
router.get('/post', verify, (req, res) => {
    res.send('You can access this data')
})


module.exports = router;