import react, { Component } from 'react'
import API from '../../API/API.JSX';
import "./pet.css"

var pet = {}
var link = document.location.href
link = link.split('/')
const idPet = link[4]
const aux = localStorage.getItem('Usuario')
const dados = JSON.parse(aux)
const email = dados.email
console.log(email)

export default class Pet extends Component {

    state = {
        infopet: {},
    }


    async componentDidMount() {

        const response = await API.post('/pets/' + idPet);
        this.setState({ infopet: response.data.Pet[0] })
    };

    render() {
        console.log(email)
        pet = this.state.infopet;
        let prefix = ''
        let number = ''
        if (pet.Contato) {
            number = pet.Contato.replace("(", "").replace(")", "").replace(" ", "").replace("-", "")
            pet.Contato = number
            console.log(pet.Contato);
        }
        if (pet.Sexo == 'M') {
            pet.Sexo = 'Macho'
            prefix = 'o'
        } else if (pet.Sexo == 'F') {
            pet.Sexo = 'Fêmea'
            prefix = 'a'

        }
        const formatNumber = () => {
            let number = document.querySelector('#Fone').value
            let isnanteste = number.replace(' ', '').replace('(', '').replace(')', '').replace('-', '')
            if (isNaN(isnanteste)) {
                document.querySelector('#Fone').value = document.querySelector('#Fone').value.slice(0, -1)
            } else {
                var phone = isnanteste
                var formatPhone = ''
                formatPhone = phone.replace(/(\d{2})(\d{5})(\d{4})/,
                    function (regex, arg0, arg1, arg2) {
                        return '(' + arg0 + ') ' + arg1 + '-' + arg2;
                    });
                document.querySelector('#Fone').value = formatPhone
            }

        }
        const formatCEP = () => {
            var cep = document.querySelector('#CEP').value
            let isnanteste = cep.replace('-', '')
            if (isNaN(isnanteste)) {
                document.querySelector('#CEP').value = document.querySelector('#CEP').value.slice(0, -1)
            } else {

                var formatcep = cep.replace(/(\d{5})(\d{3})/,
                    function (regex, arg1, arg2) {
                        return arg1 + '-' + arg2;
                    });
                document.querySelector('#CEP').value = formatcep
            }
        }

        const openForm = () => {
            var FORM = document.getElementById("form");
            var formdata = document.getElementById("formdata");
            console.log(FORM.style.display)
            switch (FORM.style.display) {
                case 'none':
                    FORM.style.display = 'contents';
                    break;
                case 'contents':
                    FORM.style.display = 'none';
                    formdata.reset();
                    break;
            }
        }
        return (
            <div className='petselect'>


                <div className='pet'>

                    <div className='imgpet'>
                        <img id='img' className='img' src={pet.Imagem} alt="" />
                    </div>

                    <div className="adoption">
                        <div className="Myhistory Pet">
                            <h2>Minha História</h2>
                            <br />
                            <h3>Adote {prefix} {pet.NomePet}</h3>
                            <h4>{pet.Sexo}</h4>
                            <p>{pet.Descricao}</p>
                        </div>
                        <div id='Adopt' className='Pet'>
                            {/* <a href={'https://api.whatsapp.com/send?phone=55' + pet.Contato + '&text=Olá!%20Vim%20através%20do%20Cantinho%20Pet%20Stop,%20gostaria%20de%20adotar%20' + prefix + '%20' + pet.NomePet} target={'_blank'}> Quero adotar {prefix} {pet.NomePet}</a> */}
                            <button id='openForm' onClick={openForm}>Quero adotar {prefix} {pet.NomePet}</button>
                        </div>
                        <div id='form' style={{ display: 'none' }} >
                            <form id="formdata" action="https://formsubmit.co/cantinhopetstop@gmail.com" method="post">

                                <input type="hidden" name="_subject" value={'Adoção d' + prefix + ' ' + pet.NomePet}></input>
                                <div className='inputs'>
                                    <input name="Nome" type="text" placeholder='Insira seu nome' required />
                                    <input name="e-mail" type='email' id='emailcad' placeholder='Insira seu e-mail' required />
                                </div>
                                <div className='inputs'>
                                    <input type="tel" name="Fone" id="Fone" placeholder='Digite seu telefone' onChange={formatNumber} required />
                                    <input type="text" name="Endereço" id="" placeholder='Insira seu endereço' required />
                                </div>
                                <div className='inputs'>
                                    <input type="text" name="CEP" id="CEP" placeholder='Cep' maxLength={9} onChange={formatCEP} required />
                                </div>


                                <div className='inputs'>
                                    <textarea name="Mensagem" id="" cols="40" rows="5" required></textarea>
                                </div>
                                <br />
                                <input type="hidden" name="_cc" value={pet.Email+','+email}></input>
                                <input type="hidden" name="_next" value="http://localhost:5173/"></input>
                                <input type="hidden" name="_captcha" value="false"></input>
                                <button className='submit-form' type='submit' > Enviar</button>
                            </form>
                        </div>


                        <div className='Petinfo'>
                            <p>Idade: {pet.IdadePet}</p>
                            <p>Porte: {pet.Porte}</p>
                            <p>Sexo: {pet.Sexo}</p>
                        </div>

                    </div>
                </div >
            </div>
        )
    };

}
;