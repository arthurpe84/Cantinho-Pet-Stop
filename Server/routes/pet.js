const express = require('express');
// const { response } = require('../app');
const router = express.Router();
const mysql = require('../mysql').pool;
const auth = require('./auth');


router.post('/', auth, (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) };
        conn.query(
            'Select * from Pets where status = 1;',
            (error, resultado, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).json({ Pets: resultado })


            }
        );
    });
});


router.post('/admin/:id_pet', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'select *, u.Email from pets p inner join users u on p.idUsuario = u.id and p.idPet=?;', [req.params.id_pet],
            (error, resultado, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send({ Pet: resultado })
            }
        )
    })
});


router.patch('/release', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query('update Pets set status = 0 where idPet =?', [req.body.id], (error, resultado, fields) => {
            if (error) {
                return res.status(500).send({ error: error })
            } else {
                return res.status(201).send({Mensagem : 'Pet Aprovado com sucesso'})
            }
        })
    })
}
);

router.delete('/delete/:id', (req, res, next) => {
    console.log(req.params.id)
    let id = req.params.id
    mysql.getConnection((error, conn) => {
        conn.query('delete from Pets where idPet =?', [id], (error, resultado, fields) => {
            if (error) {
                return res.status(500).send({ error: error })
            } else {
                return res.status(201).send({Mensagem : 'Deletado com sucesso'})
            }
        })
    })
}
);

module.exports = router;