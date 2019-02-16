const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const QuestionSchema = new mongoose.Schema({

    question: { type: String, required: true },
    options: { type: Array, required: true },
    answer: { type: Number, required: true }
});


module.exports = QuestionSchema;

/*
Esimerkki kyssäristä json-muodossa:

{
    "question": "Mikä näistä on numero 1?",
    "options": [
        "Yksi",
        "Kaksi",
        "Kolme",
        "Neljä"
    ],
    "answer": 0
}

 */