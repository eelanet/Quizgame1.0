const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const authorize = require('../verifytoken');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const QuestionController = require('../controllers/QuestionController');

// Etsi kategorian kaikki kysymykset
router.get('/questions/allquestions/:categoryId', QuestionController.findAllQuestions);
// Etsi kategorian yksi kysymys
router.get('/questions/question/:categoryId/:questionId', QuestionController.findOneQuestion);
// Etsi kategorian kysymysten vastaukset
router.get('/questions/allanswers/:categoryId', QuestionController.findAllAnswers);


// Lisää uusi kysymys kategoriaan
router.post('/questions/addquestion/:categoryId', authorize, QuestionController.addQuestion);


// Poista kysymys kategoriasta
router.delete('/questions/deletequestion/:categoryId/:questionId', authorize, QuestionController.deleteQuestion);


module.exports = router;