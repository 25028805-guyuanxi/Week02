const journalModel = require('../models/journalModel');
const petModel = require('../models/petModel');

exports.getJournals = (req, res) => {
  const userId = req.session.user.id;
  let selectedPetId = req.query.petId;

  petModel.getPetsByOwnerId(userId, (err, pets) => {
    if (err) return res.send('Error loading pets');
    if (!selectedPetId && pets.length > 0) {
      selectedPetId = pets[0].id;
    }
    if (!selectedPetId) {
      return res.render('journals', { journals: [], pets, selectedPetId: '', pet: null, session: req.session });
    }

    journalModel.getJournalsByOwnerAndPet(userId, selectedPetId, (err2, journals) => {
      if (err2) return res.send('Error loading journals');
      const petInfo = pets.find(p => p.id == selectedPetId);
      return res.render('journals', { journals, pets, selectedPetId, pet: petInfo, session: req.session });
    });
  });
};

exports.getNewJournal = (req, res) => {
  const userId = req.session.user.id;
  const selectedPetId = req.query.petId;
  petModel.getPetsByOwnerId(userId, (err, pets) => {
    if (err) return res.send('Error loading pets');
    res.render('newJournal', { pets, session: req.session, selectedPetId });
  });
};

exports.postNewJournal = (req, res) => {
  const { pet_id, activity, notes, entry_date } = req.body;
  journalModel.createJournal(pet_id, activity, notes, entry_date, (err) => {
    if (err) return res.send('Error saving journal');
    res.redirect(`/journals?petId=${pet_id}`);
  });
};

exports.getEditJournal = (req, res) => {
  const journalId = req.params.id;
  const userId = req.session.user.id;
  journalModel.getJournalById(journalId, (err, journalResults) => {
    if (err || journalResults.length === 0) return res.send('Journal not found');
    petModel.getPetsByOwnerId(userId, (err2, pets) => {
      if (err2) return res.send('Error fetching pets');
      res.render('editJournal', { journal: journalResults[0], pets, session: req.session });
    });
  });
};

exports.postEditJournal = (req, res) => {
  const { entry_date, activity, notes, pet_id } = req.body;
  const journalId = req.params.id;
  journalModel.updateJournal(journalId, entry_date, activity, notes, pet_id, (err) => {
    if (err) return res.send('Error updating journal');
    res.redirect(`/journals?petId=${pet_id}`);
  });
};

exports.deleteJournal = (req, res) => {
  const journalId = req.params.id;
  journalModel.getPetIdByJournalId(journalId, (err, result) => {
    if (err || result.length === 0) return res.send('Journal not found.');
    const petId = result[0].pet_id;
    journalModel.deleteJournal(journalId, (err2) => {
      if (err2) return res.send('Error deleting journal.');
      res.redirect(`/journals?petId=${petId}`);
    });
  });
};

exports.searchJournals = (req, res) => {
  const userId = req.session.user.id;
  const searchQuery = `%${req.query.q}%`;
  const selectedPetId = req.query.petId;

  petModel.getPetsByOwnerId(userId, (err, pets) => {
    if (err) return res.send('Error loading pets');
    journalModel.searchJournals(userId, searchQuery, selectedPetId, (err2, journals) => {
      if (err2) return res.send('Error searching journals');
      let pet = null;
      if (selectedPetId) {
        const found = pets.find(p => p.id.toString() === selectedPetId);
        if (found) pet = found;
      }
      res.render('journals', { journals, pets, selectedPetId, pet, session: req.session });
    });
  });
};