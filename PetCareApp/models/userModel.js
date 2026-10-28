const connection = require('../config/db');

exports.createUser = (username, password, name, role, callback) => {
  const sql = 'INSERT INTO users (username, password, name, role) VALUES (?, ?, ?, ?)';
  connection.query(sql, [username, password, name, role], callback);
};

exports.findUserByUsernameAndPassword = (username, password, callback) => {
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  connection.query(sql, [username, password], callback);
};

exports.getAllUsers = (callback) => {
  const sql = 'SELECT id, name, username, role FROM users';
  connection.query(sql, callback);
};

exports.getUserById = (id, callback) => {
  const sql = 'SELECT id, name, username, role FROM users WHERE id = ?';
  connection.query(sql, [id], callback);
};

exports.deleteUser = (id, callback) => {
  const sql = 'DELETE FROM users WHERE id = ?';
  connection.query(sql, [id], callback);
};