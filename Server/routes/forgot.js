const { Router } = require('express');
const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');



router.get('/', (req, res, next) => {
    mysql.getConnection(async (error, conn) => {
        const { Login, Fone } = req.body;
        console.log(Login, Fone);
        if (Login != '') {
            conn.query('Select Nome, PassUser, email, fone from users where login = ? or email =?;', [Login, Login], async (error, resultado, fields) => {
                conn.release();

            })

        } else {

        }

    })
});


router.post('/:params', (req, res, next) => {
    const { parametro } = req.body
    switch (req.params.params) {
        case "login":
            query = 'Select id from users where login = ? or email =?'
            mysql.getConnection((error, conn) => {
                conn.query(query, [parametro, parametro], (error, resultado, fields) => {
                    conn.release();
                    console.log("login");
                    if (error) {
                        return res.status(500).send({ error: error })
                    }
                    if (resultado == '') {
                        console.log(resultado);
                        return res.status(201).send({
                            mensagem: 'Usuario inválido'
                        })
                    } else {
                        console.log(resultado == '');
                        return res.status(201).send({
                            id: resultado
                        })
                    }
                })
            })
            break;
        case "fone":
            query = 'Select id from users where fone = ?'
            mysql.getConnection((error, conn) => {
                conn.query(query, [parametro], (error, resultado, fields) => {
                    conn.release();
                    console.log("fone");
                    if (error) {
                        return res.status(500).send({ error: error })
                    }
                    if (resultado == '') {
                        console.log(resultado);
                        return res.status(201).send({
                            mensagem: 'Fone inválido'
                        })
                    } else {
                        console.log(resultado == '');
                        return res.status(201).send({
                            id: resultado
                        })
                    }
                })
            })
            break;
    }


}
);

module.exports = router;