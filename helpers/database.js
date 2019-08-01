const connection = {
  host: 'localhost',
  database: 'forum'
};

const knex = require('knex')({
  client: 'pg',
  connection
});

knex.on('query', queryData => {
  console.log('Query:\t\t', queryData.sql);
  console.log('Bindings:\t', queryData.bindings);
});

// Parse Postgres dates to ISO format
const pg = require('pg');
const moment = require('moment-timezone');
pg.types.setTypeParser(1114, val => moment.utc(val).toISOString());

module.exports = knex;
