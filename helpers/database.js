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

module.exports = knex;
