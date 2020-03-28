const knex = require('knex');

const conf = require('../../knexfile');

database = process.env.NODE_ENV === 'test'? conf.test : conf.development;

const connection = knex(database);

module.exports = connection;