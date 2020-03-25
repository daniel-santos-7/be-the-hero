const db = require('../database/connection');

module.exports = {

    async store(req,res) {

        const { title, description, value } = req.body;
        const ong_id = req.headers.authorization;
        const [id] = await db('incidents').insert({ title, description, value, ong_id });
        res.json({id});

    },

    async index(req,res) {

        const { page=1 } = req.query;

        const [count] = await db('incidents').count();

        const select = ['incidents.*', 'ongs.name','ongs.email','ongs.whatsapp','ongs.city','ongs.uf'];

        const incidents = await db('incidents').join('ongs','ongs.id','=','incidents.ong_id').limit(5).offset(page*5-5).select(select);

        res.header('X-Total-Count', count['count(*)']);

        return res.json(incidents);

    },

    async remove(req,res) {

        const { id } = req.params;

        const ong_id = req.headers.authorization;

        const incident = await db('incidents').where('id',id).select('ong_id').first();

        if(incident.ong_id !== ong_id) {
            return res.status(401).json({ error: 'Operation not permitted' });
        }

        await db('incidents').where('id',id).delete();
    
        return res.status(204).send();
    }

}