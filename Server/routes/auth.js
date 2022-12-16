const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    var token = req.body.token.split(' ')[1].slice(0, -1)
    var Admin = req.body.Cargo
    try {
        const decode = jwt.verify(token, process.env.JWT_KEY);
        if (decode) {
            if (Admin == '@') {
                console.log(Admin == '@')
                next();
} else { return res.status(401).send('Falha na autenticação'); }
        }
    } catch (error) {
        return res.status(401).send('Falha na autenticação');
    }
}