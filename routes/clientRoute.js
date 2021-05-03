const router = require('express').Router();
const clientController = require('../controllers/clientController');
const { verify, isClient } = require('../verifytoken');

router.post('/client-survey', [verify, isClient],clientController.clientSurvey);




module.exports = router;