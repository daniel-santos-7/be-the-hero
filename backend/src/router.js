const express = require('express');
const ONGCtrl = require('./controllers/ONGCtrl');
const IncidentCtrl = require('./controllers/IncidentCtrl');
const ProfileCtrl = require('./controllers/ProfileCtrl');
const SessionCtrl = require('./controllers/SessionCtrl');


const router = express.Router();

router.get('/ong',ONGCtrl.index);
router.post('/ong', ONGCtrl.store);

router.post('/incident', IncidentCtrl.store);
router.get('/incident', IncidentCtrl.index);
router.delete('/incident/:id', IncidentCtrl.remove);

router.get('/profile', ProfileCtrl.index);

router.post('/session', SessionCtrl.store);

module.exports = router;

