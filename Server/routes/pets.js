const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const auth = require('./auth');

//RETORNA TODOS OS DADOS DE PRODUTOS
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) };
        conn.query(
            'Select * from Pets where status = 0 order by idpet desc LIMIT 8;',
            (error, resultado, fields) => {
                conn.release();
                if (error) {
                    console.log(error.message)
                    return res.status(500).send({ error: error })
                }
                return res.status(200).json({ Pets: resultado })
            }
        );
    });
});

router.get('/all', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            console.log(error)
            return res.status(500).send({ error: error })
        };
        conn.query(
            'Select * from Pets where status = 0 order by idpet desc;',
            (error, resultado, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).json({ Pets: resultado })
            }
        );
    });
});
//INSERE DADOS DE UM PRODUTO
router.post('/newpet', async (req, res) => {
    const { Nome, Idade, Sexo, Peso, Porte, Raca, Desc, Date, Fone, Imagem, Uf, Cidade, Usuario } = req.body
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'INSERT INTO pets (NomePet, Idadepet, Sexo, Peso, Porte, Raca, Descricao, Data, Contato, Imagem, UF, Cidade, Status, IDUsuario) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
            [Nome, Idade, Sexo, Peso, Porte, Raca, Desc, Date, Fone, Imagem, Uf, Cidade, '1', Usuario],
            (error, resultado, field) => {
                conn.release();  //ENCERRA CONEXÃO APÓS REALIZAR
                if (error) {
                    console.log(error)
                    console.log(error.sqlMessage)
                    return res.status(500).send({ error: error })
                }
                return res.status(201).send({
                    mensagem: 'Pet cadastrado com sucesso!' + '\n' + 'Por politicas de segurança será verificado e inserido no cadastro de Pets para adoção',
                    IdPet: resultado.insertId
                })
            }
        )
    })
});


//RETORNA OS DADDOS DE "1" Pet
router.post('/:id_pet', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(

            'select *, u.Email from pets p inner join users u on p.idUsuario = u.id and p.idPet=? and status=0;', [req.params.id_pet],
            (error, resultado, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send({ Pet: resultado })
            }
        )
    })
});

router.patch('/:params/:id', (req, res, next) => {
    switch (req.params.params) {
        case "nome":
            query = 'update Pets set NomePet = ? where idPet =?'
            break;
        case "idade":
            query = 'update Pets set idadePet = ? where idPet =?'
            break;
        case "descricao":
            query = 'update Pets set descricao = ? where idPet =?'
            break;
        case "porte":
            query = 'update Pets set porte = ? where idPet =?'
            break;
        case "peso":
            query = 'update Pets set peso = ? where idPet =?'
            break;
        case "imagem":
            query = 'update Pets set Imagem = ? where idPet =?'
            break;
        case "Uf":
            query = 'update Pets set Uf = ? where idPet =?'
            break;
        case "Municipio":
            query = 'update Pets set Municipio = ? where idPet =?'
            break;
        case "Bairro":
            query = 'update Pets set Bairro = ? where idPet =?'
            break;
        case "Raca":
            query = 'update Pets set Raca = ? where idPet =?'
            break;
    }

    mysql.getConnection((error, conn) => {
        conn.query(query, [req.body.parametro, req.params.id], (error, resultado, fields) => {
            if (error) {
                return res.status(500).send({ error: error })
            } else {
                return res.status(500).send({

                    response: resultado
                })
            }
        })
    })
}
);

router.delete('/', (req, res, next) => {
    const { IdPet } = req.body
    mysql.getConnection((error, conn) => {
        conn.query(
            'Select * from Pets where IdPet=?;', [IdPet],
            (error, resultado, fields) => {

                if (error) { return res.status(500).send({ error: error }) } else {
                    pet = resultado;
                    conn.query(
                        'Delete from pets where IdPet = ?;', [IdPet],
                        (erro, resultado, field) => {
                            conn.release();  //ENCERRA CONEXÃO APÓS REALIZAR
                            if (erro) {

                            }
                            res.status(201).send({
                                messagem: 'Pet Deletado com Sucesso!',
                                pet: pet
                            })
                        }
                    )
                }
            }
        )
    }
    )
});




module.exports = router;