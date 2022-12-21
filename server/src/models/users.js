const db = require('./db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const table = 'users';

const all = () => {
  return db.all(table);
};

const find = (id) => {
  return db.find(table, id);
};

const create = async (data) => {
  const encryptPass = await bcrypt.hash(data.password, saltRounds);
  const query = `INSERT INTO ${table} (name, email, password) VALUES ('${data.name}', '${data.email}', '${encryptPass}');`;

  return db.query(query);
};

const update = (id, data) => {
  const query = `UPDATE ${table} SET name = '${data.name}', email = '${data.email}', password = '${data.password}' WHERE id = ${id};`;

  return db.query(query);
};

const remove = (id) => {
  return db.remove(table, id);
};

module.exports = {
  all: all,
  find: find,
  create: create,
  update: update,
  remove: remove
};
