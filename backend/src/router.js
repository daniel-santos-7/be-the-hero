const express = require('express');
const ONGCtrl = require('./controllers/ONGCtrl');
const IncidentCtrl = require('./controllers/IncidentCtrl');
const ProfileCtrl = require('./controllers/ProfileCtrl');
const SessionCtrl = require('./controllers/SessionCtrl');
const { celebrate, Segments, Joi } = require('celebrate');

const router = express.Router();

router.get('/ong',ONGCtrl.index);

router.post('/ong',celebrate({

    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    }), 

}), ONGCtrl.store);

router.post('/incident', IncidentCtrl.store);
router.get('/incident', celebrate({

    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })

}) , IncidentCtrl.index);


router.delete('/incident/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), IncidentCtrl.remove);

router.get('/profile', celebrate({

    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()

}), ProfileCtrl.index);

router.post('/session', SessionCtrl.store);

module.exports = router;

