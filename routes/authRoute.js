const router = require('express').Router();
const userController = require('../controllers/userController');
const verify = require('../verifytoken')

router.post('/signup', userController.postRegister);
router.post('/signin', userController.postLogin);
router.get('/confirmation/:token', userController.Confirmation);
router.get('/logout', userController.logout);

//auth for reset password
router.post('/forget-password', userController.forgot_password);
// router.get('/reset-password/:id/:token', userController.reset_password);
router.post('/reset-password/:id/:token', userController.change_password)

//auth for resend confirmation mail
router.post('/resend-mail', userController.resend_mail);



router.get('/post', verify, (req, res) => {
    res.send('You can access this data')
})


module.exports = router;