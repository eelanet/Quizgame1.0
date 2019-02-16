const Category = require('../models/category');

const CategoryController = {
    // GET
    findAllCategories: (req, res) => {
        Category.find()
            .then(data => {
                console.log(data);
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || 'Some error occurred while retrieving Categories.'
                });
            });
    },

    findOneCategory: (req, res) => {
        Category.findById(req.params.categoryId)
            .then(data => {
                if (!data) {
                    return res.status(404).send({
                        message: 'Category not found with id ' + req.params.categoryId
                    });
                }
                res.send(data);
            })
            .catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: 'Category not found with id ' + req.params.categoryId
                    });
                }
                return res.status(500).send({
                    message: 'Error retrieving category with id ' + req.params.categoryId
                });
            });
    },



    // POST
    create: (req, res) => {
        // Validate request
        if (!req.body.catname) {
            return res.status(400).send({
                message: 'Category name can not be empty'
            });
        }

        const newCategory = new Category(req.body);

        // Tallenna tietokantaan
        newCategory.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || 'Some error occurred while creating the Category.'
                });
            });
    },

    // UPDATE
    update: (req, res) => {
        Category.findByIdAndUpdate(req.params.categoryId, { catname: req.body.catname }, { new: true }).then(
            data => {
                if (!data) {
                    return res.status(404).send({
                        message: 'Category not found with id ' + req.params.categoryId
                    });
                }
                res.send(data);
            })
            .catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: 'Category not found with id ' + req.params.categoryId
                    });
                }
                return res.status(500).send({
                    message: 'Error updating category with id ' + req.params.categoryId
                });
            });
    },


    // DELETE
    delete: (req, res) => {
        Category.findByIdAndRemove(req.params.categoryId)
            .then(data => {
                if (!data) {
                    return res.status(404).send({
                        message: 'Category not found with id ' + req.params.categoryId
                    });
                }
                res.send({ message: 'Category deleted successfully!' });
            })
            .catch(err => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404).send({
                        message: 'Category not found with id ' + req.params.categoryId
                    });
                }
                return res.status(500).send({
                    message: 'Could not delete Category with id ' + req.params.categoryId
                });
            });
    }
};

module.exports = CategoryController;