const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;


router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        console.log('aqui')
        if (error) { return res.status(500).send({ error: error }) };
        conn.query(
            'Select * from Products where status = 0  and ProdutoServico = "S"  order by id desc LIMIT 6;',
            (error, resultado, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).json({ Services: resultado })
            }
        );
    });
});

router.post('/admin', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) };
        conn.query(
            'Select * from Products where status = 1 and ProdutoServico = "S";',
            (error, resultado, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).json({ Services: resultado })
            }
        );
    });
});

router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        console.log('aqui')
        if (error) { return res.status(500).send({ error: error }) };
        conn.query(
            'Select * from Products where status = 0  and ProdutoServico = "S";',
            (error, resultado, fields) => {
                conn.release();
                console.log(resultado)
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).json({ Services: resultado })
            }
        );
    });
});


//RETORNA OS DADDOS DE "1" PRODUTO
router.get('/:id_Service', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
'select * from products where ProdutoServico = "S" and id=?', [req.params.id_Service],
            (error, resultado, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                console.log(resultado)
                return res.status(200).send({ Servico: resultado })
            }
        )
    })
});
module.exports = router;