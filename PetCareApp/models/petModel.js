const connection = require('../config/db');

exports.createPet = (ownerId, name, species, breed, age, image, callback) => {
  const sql = 'INSERT INTO pets (owner_id, name, species, breed, age, image) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(sql, [ownerId, name, species, breed, age, image], callback);
};

exports.getPetsByOwnerId = (ownerId, callback) => {
  const sql = 'SELECT * FROM pets WHERE owner_id = ?';
  connection.query(sql, [ownerId], callback);
};