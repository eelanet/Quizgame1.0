const Question = require('./question');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const CategorySchema = new mongoose.Schema({
    catname: { type: String, required: true },
    catquestions: { type: [Question] }
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;

/*
Esimerkki kategoriasta json-muodossa:

{
    "catname": "Urheilu",
    "catquestions": [
        {
            "question": "Mikä oli Teemu Selänteen pelinumero?",
            "options": [
                "8",
                "10",
                "4",
                "1"
            ],
            "answer": 0
        }
    ]
}

 */