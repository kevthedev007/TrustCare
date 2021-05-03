const router = require('express').Router();
const therapistController = require('../controllers/therapistController');
const { verify, isTherapist } = require('../verifytoken');

router.post('/therapist-survey', therapistController.therapistSurvey)



module.exports = router;