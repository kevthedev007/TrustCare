const router = require('express').Router();
const authController = require('../controllers/authController');
const verify = require('../verifytoken')

router.post('/signup', authController.postRegister);
router.post('/signin', authController.postLogin);
router.get('/confirmation/:token',authController.Confirmation);
router.get('/logout',authController.logout);

//auth for reset password
router.post('/forget-password',authController.forgot_password);
router.get('/reset-password/:id/:token',authController.reset_password);
router.post('/change-password/:id/:token',authController.change_password)

//auth for resend confirmation mail
router.post('/resend-mail',authController.resend_mail);



router.get('/post', verify, (req, res) => {
    res.send('You can access this data')
})


module.exports = router;