import './subscribe.css'
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Contexts/auth';



export default function Home() {
    const { authenticated, sub, login } = useContext(AuthContext);
    const [values, setValues] = useState();

    const handleChangeValues = async (value) => {
        setValues((prevalue) => ({
            ...prevalue,
            [value.target.name]: value.target.value,
        }));
        console.log(values);
        if (value.target.name == "Nome") { document.getElementById('inputNome').innerText = '' }
        if (value.target.name == "Sobrenome") { document.getElementById('inputSobrenome').innerText = `` }
        if (value.target.name == "Email") { document.getElementById('inputEmail').innerText = `` }
        if (value.target.name == "Fone") { document.getElementById('inputFone').innerText = `` }
        if (value.target.name == "Login") { document.getElementById('inputLogin').innerText = `` }
        if (value.target.name == "password") { document.getElementById('inputPassword').innerText = `` }

        if (value.target.name == "cpfcnpj") {
            if (!isNaN(value.target.value)) {
                document.getElementById('inputcpfcnpj').innerText = ``
            } else {
                document.getElementById('inputcpfcnpj').innerText = `Digite apenas números`
            }
        }


        if (value.target.name == "Fone") {
            let number = document.querySelector('#Fone').value
            let isnanteste = number.replace(' ', '').replace('(', '').replace(')', '').replace('-', '')
            if (isNaN(isnanteste)) {
                console.log(isnanteste)
                document.querySelector('#Fone').value = document.querySelector('#Fone').value.slice(0, -1)
            } else {
                console.log(isnanteste)
                document.getElementsByClassName("inputFone").innerText = ''
            }
            document.body.addEventListener('keypress', function (event) {
                const key = event.key;

                if (!isNaN(key)) {
                    var formatPhone = ''
                    let phone = document.querySelector('#Fone').value
                    formatPhone = phone.replace(/(\d{2})(\d{5})(\d{3})/,
                        function (regex, arg0, arg1, arg2) {
                            return '(' + arg0 + ') ' + arg1 + '-' + arg2;
                        });
                    document.querySelector('#Fone').value = formatPhone
                }
            });

        }
    };


    const handleChangePerson = async (value) => {
        console.log(values);
        setValues((prevalue) => ({
            ...prevalue,
            [value.target.name]: value.target.value,
        }));
        var Type = value.target.value
        if (Type) {
            console.log(values.cpfcnpj);
            if (Type == 'Jur') {
                var CPF = document.getElementById("_CPF");
                CPF.style.display = 'none';

                var CNPJ = document.getElementById("_CNPJ");
                CNPJ.style.display = 'contents';
            } else if (Type == 'Fis') {
                var CNPJ = document.getElementById("_CNPJ");
                CNPJ.style.display = 'none';

                var CPF = document.getElementById("_CPF");
                CPF.style.display = 'contents';
            }
        } else if (!Type) {
            var CNPJ = document.getElementById("_CNPJ");
            var cnpjInput = document.getElementById("CNPJ");
            CNPJ.style.display = 'none';
            cnpjInput.value = ''

            var CPF = document.getElementById("_CPF");
            var cpfInput = document.getElementById("CPF");
            CPF.style.display = 'none';
            cpfInput.value = ''

            var Pessoa = values
            Pessoa.cpfcnpj = ''



        }
    }
    const validate = () => {

        var nome = document.querySelector('#Nome').value;
        var sobrenome = document.querySelector('#Sobrenome').value;
        var email = document.querySelector('#Email').value;
        var fone = document.querySelector('#Fone').value;
        var pessoa = document.querySelector('#tpPessoa').value;
        var cpf = document.querySelector('#CPF').value;
        var cnpj = document.querySelector('#CNPJ').value;
        var login = document.querySelector('#Login').value;
        var senha = document.querySelector('#password').value;
        var valid = 0


        if (!nome) { document.getElementById('inputNome').innerText = `*Campo obrigatorio`; valid++ }
        if (!sobrenome) { document.getElementById('inputSobrenome').innerText = `*Campo obrigatorio`; valid++ }
        if (!email) { document.getElementById('inputEmail').innerText = `*Campo obrigatorio`; valid++ }
        if (fone) {
            if (fone.length != 15) {
                document.getElementById('inputFone').innerText = `*Prencha ex: (99) 99999-9999`; valid++
            }
        }
        if (!fone) { document.getElementById('inputFone').innerText = `*Campo obrigatorio`; valid++ }
        if (!pessoa) {
            document.getElementById('inputPessoa').innerText = `*'Preencher com 'Fis' ou 'Jur'`; valid++
        } else {
            if (pessoa == 'Fis') {
                if (cpf) {
                    if (cpf.length !== 11) { document.getElementById('inputcpfcnpj').innerText = `Digite apenas numeros`; valid++ }
                    if (isNaN(cpf)) { document.getElementById('inputcpfcnpj').innerText = `*Digite apenas numeros`; valid++};
                    console.log(!isNaN(cpf));
                }
            } else if (pessoa == 'Jur') {
                if (cnpj) {
                    if (cnpj.length != 18) { document.getElementById('inputcpfcnpj').innerText = `*CNPJ  ex:XXXXXXXX0001XX`; valid++ }
                } else { document.getElementById('inputcpfcnpj').innerText = `*CNPJ  ex:XXXXXXXX0001XX`; valid++ }
            } else { console.log('Favor preencher apenas com Fis ou Jur');; valid++ }
        }
        if (!login) { document.getElementById('inputLogin').innerText = `*Campo obrigatorio`; valid++ }
        if (senha) { if (senha.length <= 8) { document.getElementById('inputPassword').innerText = `*Senha inferior de 8 caracteres `; valid++ } }
        if (!senha) {
            document.getElementById('inputPassword').innerText = `*Campo obrigatorio`; valid++
        }
        if (valid == 0) {
            return true
        } else {
            console.log(valid);
            return false
        }

    }
    const handleClickButton = () => {
        var valids = validate();
        console.log(valids);
        console.log(values);
        if (valids) {
            sub(
                values.Nome,
                values.Sobrenome,
                values.Email,
                values.Login,
                values.password,
                values.Fone,
                values.tpPessoa,
                values.cpfcnpj
            );
        }

    };



    return (
        <div className='sub-banner'>

            <div className='sub-card'>
                <h2>Cadastro</h2>
                <p id='mensagem'></p>
                <form method='post'>
                    <p id='inputNome'></p>
                    <div className='sub'>
                        <br />
                        <label htmlFor="Nome">Nome:</label>
                        <input
                            type="text"
                            name="Nome"
                            id="Nome"
                            placeholder='Nome'
                            onChange={handleChangeValues} />
                    </div>
                    <p id='inputSobrenome'></p>
                    <div className='sub'>
                        <label htmlFor="Sobrenome">Sobrenome:</label>
                        <input
                            type="text"
                            name="Sobrenome"
                            id="Sobrenome"
                            placeholder='Sobrenome'
                            onChange={handleChangeValues} />
                    </div>
                    <p id='inputEmail'></p>
                    <div className='sub'>
                        <label htmlFor="Email">Email:</label>
                        <input
                            type="text"
                            name="Email"
                            id="Email"
                            placeholder='Email'
                            onChange={handleChangeValues} />
                    </div>
                    <p id='inputFone'></p>
                    <div className='sub'>
                        <label htmlFor="Fone">Fone:</label>
                        <input
                            type='tel'
                            name="Fone"
                            id="Fone"
                            maxLength="15"
                            placeholder='(00) 00000-0000'
                            onChange={handleChangeValues} />
                    </div>
                    <p id='inputPessoa'></p>
                    <div className='sub'>
                        <label htmlFor="tpPessoa">Pessoa: </label>
                        <input type='text' name="tpPessoa" id="tpPessoa" onChange={handleChangePerson} onClick={handleChangePerson} list="Pessoa" />
                        <datalist id="Pessoa" onChange={handleChangePerson}>
                            <option value="Fis" className='1'>Pessoa Fisica</option>
                            <option value="Jur">Pessoa Juridica ex: ONGs, instituições,empresas... </option>

                        </datalist>
                    </div>
                    <p id='inputcpfcnpj'></p>
                    <div className='sub' id='cpfcnpj' >
                        <div style={{ display: 'none' }} id='_CPF' className='sub'>
                            <label htmlFor="CPF">CPF:</label>
                            <input
                                type='text'
                                name="cpfcnpj"
                                id="CPF"
                                maxLength={11}
                                onChange={handleChangeValues}
                                placeholder='XXXXXXXXXXX'
                            />
                        </div>
                        <div style={{ display: 'none' }} id='_CNPJ' className='sub'>
                            <label htmlFor="CNPJ">CNPJ:</label>
                            <input
                                type="text"
                                name="cpfcnpj"
                                id="CNPJ"
                                maxLength={15}
                                onChange={handleChangeValues}
                                placeholder='XXXXXXXXXXXXXX'
                            />
                        </div>


                    </div>
                    <p id='inputLogin'></p>
                    <div className='sub'>
                        <label htmlFor="Login">Login:</label>
                        <input
                            type="text"
                            name="Login"
                            id="Login"
                            placeholder='Usuario'
                            onChange={handleChangeValues} />
                    </div>

                    <p id='inputPassword'></p>
                    <div className='sub'>
                        <label htmlFor="password">Senha:</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder='Password'
                            onChange={handleChangeValues} />
                    </div>
                </form>

                <div className='submit'>
                    <button onClick={() => handleClickButton()}>Cadastrar</button>
                </div>
            </div>
            <h2>Seja Bem Vindo(a)!!!</h2>
        </div>
    )
};


