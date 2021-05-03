const router = require('express').Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.postRegister);
router.post('/signin', authController.postLogin);
router.get('/confirmation/:token',authController.Confirmation);

//auth for reset password
router.post('/forget-password',authController.forgot_password);
router.get('/reset-password/:id/:token',authController.reset_password);
router.post('/change-password/:id/:token',authController.change_password)

//auth for resend confirmation mail
router.post('/resend-mail',authController.resend_mail);




module.exports = router;