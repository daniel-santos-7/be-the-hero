const db = require('../database/connection');
const crypto = require('crypto');
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {

    async store(req,res) {

        const { name, email, whatsapp, city, uf } = req.body;

        const id = generateUniqueId();
    
        await db('ongs').insert({ id, name, email, whatsapp, city, uf });
    
        return res.json({ id });

    },

    async index(req,res) {
    
        const ong = await db('ongs').select('*');

        return res.json(ong);

    }

}