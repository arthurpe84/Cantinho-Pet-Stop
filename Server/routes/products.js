const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;


//RETORNA TODOS  DE PRODUTOS
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) };
        conn.query(
            'Select * from Products where status = 0 and ProdutoServico ="P" order by id desc LIMIT 6;',
            (error, resultado, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).json({ Produtos: resultado })
            }
        );
    });
});

router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) };
        conn.query(
            'Select * from Products where status = 0 and ProdutoServico ="P"',
            (error, resultado, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).json({ Produtos: resultado })
            }
        );
    });
});


//INSERE DADOS DE UM PRODUTO
router.post('/newproduct', async (req, res) => {
    const { Nome, Fornecedor, Descricao, Preco, ProdServ, Tamanhos, Medidas, Peso, Volume, Tamanho, Fone, Imagem, Usuario } = req.body
    console.log(Nome, Fornecedor, Descricao, Preco, ProdServ, Tamanhos, Medidas, Peso, Volume, Tamanho, Fone, Usuario)
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'INSERT INTO Products (Nome, Fornecedor, Descricao, Preco, ProdutoServico, Tamanhos, Medidas, Peso, Volume, Tamanho, Fone, Imagem, idFornecedor, status) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
            [Nome, Fornecedor, Descricao, Preco, ProdServ, Tamanhos, Medidas, Peso, Volume, Tamanho, Fone, Imagem, Usuario, '1'],
            (error, resultado, field) => {
                conn.release();  //ENCERRA CONEXÃO APÓS REALIZAR
                if (error) {
                    console; console.log(error.sqlMessage);
                    return res.status(500).send({ error: error })
                }
                return res.status(201).send({
                    mensagem: 'Produto cadastrado com sucesso!' + '\n' + 'Por politicas de segurança será verificado e inserido no cadastro de Produtos',
                    IdPet: resultado.insertId
                })
            }
        )
    })
});

//APROVA PRODUTO /SERVIÇO CADASTRADO
router.patch('/release', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query('update Products set status = 0 where id =?', [req.body.id], (error, resultado, fields) => {
            if (error) {
                return res.status(500).send({ error: error })
            } else {
                return res.status(201).send({ Mensagem: 'Produto Aprovado com sucesso' })
            }
        })
    })
}
);
//RETORNA OS DADDOS DE "1" PRODUTO
//RETORNA TODOS  DE PRODUTOS AINDA NÃO APROVADOS
router.post('/admin', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) };
        conn.query(
            'Select * from Products where status = 1;',
            (error, resultado, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).json({ Produtos: resultado })
            }
        );
    });
});
router.post('/:id_product', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(

            'select * from products where id=?', [req.params.id_product],
            (error, resultado, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send({ Produtos: resultado })
            }
        )
    })
});

router.delete('/delete/:id', (req, res, next) => {
    console.log(req.params.id)
    let id = req.params.id
    mysql.getConnection((error, conn) => {
        conn.query('delete from Products where id =?', [id], (error, resultado, fields) => {
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