require('dotenv').config();
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  }
});
const blopsKnex = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.BLOPS_DB_HOST,
    user: process.env.BLOPS_DB_USER,
    password: process.env.BLOPS_DB_PASSWORD,
    database: process.env.BLOPS_DB_DATABASE
  }
});

module.exports = {
  knex: knex,
  blopsKnex: blopsKnex
};
