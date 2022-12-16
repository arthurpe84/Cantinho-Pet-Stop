const { Router } = require('express');
const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { use } = require('./questions');
var verify = Boolean

const saltRounds = 10;

//Login--------------------------------------------------------------
router.post('/', (req, res, next) => {
    mysql.getConnection(async (error, Conn) => {
        const { Login, password } = req.body;
        const salt = await bcrypt.genSalt(saltRounds)
        let user = ''
        let hash = ''
        Conn.query(
            'Select id, Nome, Usuario, Sobrenome, Login,PassUser,email, Fone from users where login = ? or email =?;', [Login, Login], async (error, resultado, fields) => {
                if (resultado != "") {
                    user = resultado[0];
                    hash = [user.PassUser].toString();
                }
                Conn.release();
                if (error) {
                    return res.status(500).send({ error: error })
                } else {
                    if (resultado === "") {
                        res.status(400).send({
                            Mensagem: 'unauthorized'
                        })
                    } else {
                        bcrypt.compare(password, hash, function (Error, Result) {
                            if (Result) { verify = Result }
                            err = Error
                        });

                        setTimeout(function () {
                            if (verify == false) {
                                return res.status(400).send('Usuário inválido')
                            } else if (verify == true) {
                                let LoginUser = {
                                    Nome: user.Nome,
                                    Usuario: user.Usuario,
                                    Sobrenome: user.Sobrenome,
                                    Login: user.Login,
                                    email: user.email,
                                    Fone: user.Fone,
                                    id: user.id

                                }
                                let token = jwt.sign({
                                    id: user.id,
                                    email: user.email,
                                    usuario: user.Usuario
                                }, process.env.JWT_KEY,
                                    { expiresIn: 7200 });
                                //Expira em 2 horas
                                return res.status(200).send({
                                    token: token,
                                    Usuario: LoginUser
                                });
                            } return res.status(401).send('Usuário inválido')
                        }, 500);


                    }

                }
            })
    })
});

router.post('/verify', (req, res, next) => {
    mysql.getConnection(async (error, Conn) => {
        const { id, password } = req.body;
        // res.status(200).send({mensagem: id password})
        const salt = await bcrypt.genSalt(saltRounds)
        let user = ''
        let hash = ''
        Conn.query(
            'Select PassUser from users where id =' + id, async (error, resultado, fields) => {
                if (resultado != "") {
                    user = resultado[0];
                    hash = [user.PassUser].toString();
                }

                Conn.release();
                if (error) {
                    return res.status(500).send({ error: error })
                } else {
                    if (resultado === "") {
                        res.status(400).send({
                            Mensagem: 'unauthorized'
                        })
                    } else {
                        bcrypt.compare(password, hash, function (Error, Result) {
                            if (Result) { verify = Result } else { verify = false }
                            err = Error
                        });
                        setTimeout(function () {
                            if (verify == false) {

                                return res.status(400).send({ mensagem: 'Senha Inválida' })
                            } else if (verify == true) {
                                console.log('2')
                                return res.status(200).send({
                                    mensagem: 'autorizado'
                                });
                            } return res.status(401).send('Senha Inválida')
                        }, 500);
                    }
                }
            })
    })
})

module.exports = router;