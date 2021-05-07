const router = require('express').Router();
const clientController = require('../controllers/clientController');
const { verify, isClient } = require('../verifytoken');

router.post('/client-survey', verify,clientController.clientSurvey);
router.get('/send-therapists', [verify, isClient], clientController.sendTherapists);
router.post('/pick-therapist', [verify, isClient], clientController.pickTherapist);
router.get('/client-profile', [verify, isClient], clientController.client_profile);

module.exports = router;