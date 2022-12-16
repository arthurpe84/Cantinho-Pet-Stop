const express = require('express')
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser')
const cors = require('cors')

const rotaPets = require('./routes/pets');
const rotaProducts = require('./routes/products');
const rotaBanner = require('./routes/banner');
const rotaPet = require('./routes/pet');
const rotaServices = require('./routes/services');
const rotaLogin = require('./routes/login');
const rotaUpdate = require('./routes/update');
const rotaForgot = require('./routes/forgot');
const rotaQuestions = require('./routes/questions');
const auth = require('./routes/auth');


app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ limit: '3mb', extended: false })); //ACEITA APENAS DADOS SIMPLES
app.use(bodyParser.json({ limit: '3mb' })); //JSON DE ENTRADA NO BODY

app.use((req, res, next) => {

    req.header('Access-Control-Allow-Origin', '*') //ACESSIVEL A TODOS SERVERS '*'
    req.header('Access-control-Allow-Header', 'Origin, X-requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,GET,DELETE');
    console.log(req.method);
    if (req.method === 'OPTIONS') {
        console.log('Entrou nas Options');
        return res.status(200).send(``);
    }
    next();
}

)


app.use('/login', cors(), rotaLogin);
app.use('/pets', cors(), rotaPets);
app.use('/products', cors(), rotaProducts);
app.use('/services', cors(), rotaServices);
app.use('/banner', cors(), rotaBanner);
app.use('/pet', cors(), rotaPet);
app.use('/update', cors(), rotaUpdate);
app.use('/forgot', cors(), rotaForgot);
app.use('/questions', cors(), rotaQuestions)
app.use('/auth', cors());

app.use((req, res, next) => {
    const erro = new Error('Não Encontrado' + 'PORTA:' + process.env.HOST);

    erro.status = 200;
    next(erro);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    console.log(error.message)
    return res.send({
        erro: {
            Messagem: error.message
        }
    })
})

app.listen(process.env.PORT, () => {
    console.log('servidor rodando')
    console.log(process.env.MYSQL_USER)
})
module.exports = app;