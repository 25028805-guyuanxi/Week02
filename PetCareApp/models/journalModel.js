const connection = require('../config/db');

exports.getJournalsByOwnerAndPet = (ownerId, petId, callback) => {
  const sql = `
    SELECT journal.*, pets.name, pets.species, pets.breed, pets.age, pets.image 
    FROM journal 
    JOIN pets ON journal.pet_id = pets.id 
    WHERE pets.owner_id = ? AND pets.id = ?
  `;
  connection.query(sql, [ownerId, petId], callback);
};

exports.getAllJournalsForAdminUser = (ownerId, callback) => {
  const sql = `
    SELECT journal.*, pets.id AS pet_id
    FROM journal
    JOIN pets ON journal.pet_id = pets.id
    WHERE pets.owner_id = ?
  `;
  connection.query(sql, [ownerId], callback);
};

exports.createJournal = (petId, activity, notes, entryDate, callback) => {
  const sql = 'INSERT INTO journal (pet_id, activity, notes, entry_date) VALUES (?, ?, ?, ?)';
  connection.query(sql, [petId, activity, notes, entryDate], callback);
};

exports.getJournalById = (id, callback) => {
  const sql = 'SELECT * FROM journal WHERE id = ?';
  connection.query(sql, [id], callback);
};

exports.updateJournal = (id, entryDate, activity, notes, petId, callback) => {
  const sql = 'UPDATE journal SET entry_date = ?, activity = ?, notes = ?, pet_id = ? WHERE id = ?';
  connection.query(sql, [entryDate, activity, notes, petId, id], callback);
};

exports.getPetIdByJournalId = (id, callback) => {
  const sql = 'SELECT pet_id FROM journal WHERE id = ?';
  connection.query(sql, [id], callback);
};

exports.deleteJournal = (id, callback) => {
  const sql = 'DELETE FROM journal WHERE id = ?';
  connection.query(sql, [id], callback);
};

exports.searchJournals = (ownerId, searchQuery, petId, callback) => {
  let sql = `
    SELECT journal.*, pets.name, pets.species, pets.breed, pets.age, pets.image 
    FROM journal 
    JOIN pets ON journal.pet_id = pets.id 
    WHERE pets.owner_id = ? AND (journal.activity LIKE ? OR journal.notes LIKE ?)`;
  
  const params = [ownerId, searchQuery, searchQuery];
  
  if (petId) {
    sql += ' AND pets.id = ?';
    params.push(petId);
  }
  
  connection.query(sql, params, callback);
};