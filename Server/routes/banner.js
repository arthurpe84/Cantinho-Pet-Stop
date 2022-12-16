const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;


router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) };
        conn.query(
            'select imagem, idpet from pets where Status=0 order by idpet desc LIMIT 4;',
            (error, resultado, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).json({ Pets: resultado })
            }
        );
    });
});
module.exports = router;