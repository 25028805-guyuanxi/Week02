const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/auth');
const journalController = require('../controllers/journalController');

router.get('/', isLoggedIn, journalController.getJournals);
router.get('/new', isLoggedIn, journalController.getNewJournal);
router.post('/new', isLoggedIn, journalController.postNewJournal);
router.get('/edit/:id', isLoggedIn, journalController.getEditJournal);
router.post('/edit/:id', isLoggedIn, journalController.postEditJournal);
router.get('/delete/:id', isLoggedIn, journalController.deleteJournal);
router.get('/search', isLoggedIn, journalController.searchJournals);

module.exports = router;