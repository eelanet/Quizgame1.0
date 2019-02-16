const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const config = require('../config');
const secret = config.JWT_SECRET;

const AdminController = {

    registerAdmin: function (req, res, next) {
        const hashedPassword = bcrypt.hashSync(req.body.password, 8);

        Admin.create({
            username: req.body.username,
            password: hashedPassword,
            isadmin: req.body.isadmin
        },
        function (err, admin) {
            if (err) {
                return res.status(500).send('Admin käyttäjän rekisteröinti epäonnistui.');
            }
            /*
            Luodaan token jos username ja password on saatu.
            Token muodostuu user-objektista (payload),
            secret keysta ja optioista (tässä expiresIn).
            Tokeniin ei pitäisi laittaa salasanaa, koska se
            voidaan dekryptata tokenista. Parempi laittaa
            tokeniin vain tieto siitä onko käyttäjä admin.
             */
            const payload = {
                username: admin.username,
                isadmin: admin.isadmin
            }; // {'username': 'nimi', 'isadmin': true}
            console.log(payload);
            const token = jwt.sign(payload, secret, {
                expiresIn: 60 * 60 * 24 // expiroituu 24 tunnissa
            });
            res.json({
                success: true,
                message: 'Tässä token',
                token: token
            });
        });
    },

    // olemassa olevan käyttäjän autentikaatio
    authenticateAdmin: function (req, res, next) {
        // etsitään käyttäjä requestista saadun käyttäjätunnuksen perusteella
        Admin.findOne({ username: req.body.username }, function (err, admin) {
            if (err) {
                return res.status(500).send('Error on the server.');
            }
            if (!admin) {
                return res.status(404).send('No admin user found.');
            }
            const passwordIsValid = bcrypt.compareSync(req.body.password, admin.password);
            if (!passwordIsValid) {
                return res.status(401).send({ auth: false, token: null });
            }
            const payload = {
                username: admin.username,
                isadmin: admin.isadmin
            };
            const token = jwt.sign(payload, secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.json({
                success: true,
                message: 'Tässä token',
                token: token
            });
        });
    }
};

module.exports = AdminController;