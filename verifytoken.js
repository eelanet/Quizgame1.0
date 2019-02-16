const jwt = require('jsonwebtoken');
const config = require('./config');
const secret = config.JWT_SECRET;

// verifyToken ottaa vastaan tokenin, dekoodaa ja tarkistaa sen
function verifyToken (req, res, next) {

    // Otetaan token vastaan kahdella eri tavalla:
    // bodyssa tai headerissa
    const token = req.body.token || req.headers['x-access-token'];
    // dekoodataan token
    if (!token) {
        // verify tutkii tokenin voimassaolon ja salausmuuttujan
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }
    // tarkistetaan onko token oikein ja nextillä päästään eteenpäin
    jwt.verify(token, secret, function(err, decoded) {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }
        // if everything good, save to request for use in other routes
        req.adminId = decoded.id;
        next();
    });
};

module.exports = verifyToken;