const Category = require('../models/category');

const QuestionController = {

    findAllQuestions: (req, res) => {
        Category.findById(req.params.categoryId)
            .then(data => {
                res.send(data.catquestions);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || 'Some error occurred while retrieving Questions.'
                });
            });
    },

    findAllAnswers: (req, res) => {
        Category.findById(req.params.categoryId)
            .then(data => {
                const answersArray = [];
                for (let i = 0; i < data.catquestions.length; i++) {
                    console.log(answersArray);
                    answersArray.push(data.catquestions[i].answer);
                }
                res.send(answersArray);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || 'Some error occurred while retrieving Answers.'
                });
            });
    },

    findOneQuestion: (req, res) => {
        Category.findById(req.params.categoryId)
            .then(category => {
                if (!category) {
                    return res.status(404).send({
                        message: 'Category not found with id ' + req.params.categoryId
                    });
                }
                for (let i = 0; i < category.catquestions.length; i++) {
                    if (category.catquestions[i]._id == req.params.questionId) {
                        res.send(category.catquestions[i]);
                    }
                }
            })
            .catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: 'Category not found with id ' + req.params.categoryId
                    });
                }
                return res.status(500).send({
                    message: 'Error finding question with id ' + req.params.questionId
                });
            });
    },

    addQuestion: (req, res) => {
        Category.findOneAndUpdate({ _id: req.params.categoryId },
            { $push: { catquestions: req.body } }, { new: true })
            .then(category => {
                if (!category) {
                    return res.status(404).send({
                        message: 'Category not found with id ' + req.params.categoryId
                    });
                }
                res.send(req.body);
            })
            .catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: 'Category not found with id ' + req.params.categoryId
                    });
                }
                return res.status(500).send({
                    message: 'Error updating Category with id ' + req.params.categoryId
                });
            });
    },

    deleteQuestion: (req, res) => {
        Category.findById(req.params.categoryId)
            .then(category => {
                if (!category) {
                    return res.status(404).send({
                        message: 'Category not found with id ' + req.params.categoryId
                    });
                }
                for (let i = 0; i < category.catquestions.length; i++) {
                    if (category.catquestions[i]._id == req.params.questionId) {
                        category.catquestions[i].remove();
                        category.save();
                    }
                }
                res.send(category);
            })
            .catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: 'Category not found with id ' + req.params.categoryId
                    });
                }
                return res.status(500).send({
                    message: 'Error deleting question with id ' + req.params.questionId
                });
            });
    }
};

module.exports = QuestionController;