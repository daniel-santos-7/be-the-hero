const db = require('../database/connection');
const crypto = require('crypto');

module.exports = {

    async store(req,res) {

        const { name, email, whatsapp, city, uf } = req.body;

        const id = crypto.randomBytes(4).toString('HEX');
    
        await db('ongs').insert({ id, name, email, whatsapp, city, uf });
    
        return res.json({ id });

    },

    async index(req,res) {
    
        const ong = await db('ongs').select('*');

        return res.json(ong);

    }

}