import './settings.css'
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Contexts/auth';
import { json } from 'react-router-dom';
import API from '../../API/API.JSX'




export default function Home() {
    const { authenticated, newPet } = useContext(AuthContext);
    const [values, setValues] = useState();
    const aux = localStorage.getItem('Usuario')
    const Usuario = JSON.parse(aux)


    const handleChangeValues = (value) => {
        setValues((prevalue) => ({
            ...prevalue,
            [value.target.name]: value.target.value,
        }));
        document.getElementById('mensagem').innerText = ''

        console.log(value.target.name)
        if (value.target.name == "fone") {
            console.log(value.target.value)
            let number = document.querySelector('#contato').value
            let isnanteste = number.replace(' ', '').replace('(', '').replace(')', '').replace('-', '')
            if (isNaN(isnanteste)) {
                document.querySelector('#contato').value = document.querySelector('#Fone').value.slice(0, -1)
            } else {
                var phone = value.target.value
                var formatPhone = ''
                formatPhone = phone.replace(/(\d{2})(\d{5})(\d{4})/,
                    function (regex, arg0, arg1, arg2) {
                        return '(' + arg0 + ') ' + arg1 + '-' + arg2;
                    });
                document.querySelector('#contato').value = ''
                document.querySelector('#contato').value = formatPhone
            }

        }
    };

    const LiberaUpdate = () => {
        document.getElementById('Update').style.display = 'flex'
        document.getElementById('btnUpdate').style.display = 'none'
    };

    const Update = async () => {
        let aux = localStorage.getItem('Usuario')
        let Usuario = JSON.parse(aux)
        let newDadosUser = Usuario

        if (document.getElementById('Nome').value == '') {
            newDadosUser.Nome = Usuario.Nome
        } else { newDadosUser.Nome = document.getElementById('Nome').value }

        if (document.getElementById('Sobrenome').value == '') {
            newDadosUser.Sobrenome = Usuario.Sobrenome
        } else { newDadosUser.Sobrenome = document.getElementById('Sobrenome').value }

        if (document.getElementById('contato').value == '') {
            newDadosUser.Fone = Usuario.Fone
        } else { newDadosUser.Fone = document.getElementById('contato').value }

        if (document.getElementById('email').value == '') {
            newDadosUser.email = Usuario.email
        } else { newDadosUser.email = document.getElementById('email').value }

        if (document.getElementById('login').value == '') {
            newDadosUser.Login = Usuario.Login
        } else { newDadosUser.Login = document.getElementById('login').value }

        try {
            const response = await API.patch('/update', {
                Nome: newDadosUser.Nome,
                Sobrenome: newDadosUser.Sobrenome,
                Email: newDadosUser.email,
                Fone: newDadosUser.Fone,
                Login: newDadosUser.Login,
                Id: newDadosUser.id
            }).then((response) => {
                localStorage.setItem('tokenolder', JSON.stringify(response.data));
                console.log(response.data)
                let token = localStorage.getItem('tokenolder');
                localStorage.clear()
                let tokenuser = JSON.parse(token);
                localStorage.setItem('Usuario', JSON.stringify(tokenuser.Usuario));
                console.log(tokenuser.token)
                localStorage.setItem('token', JSON.stringify('Bearer ' + tokenuser.token));
                document.getElementById('mensagem').innerText = response.data.mensagem

                setTimeout(() => {
                    window.location.reload();
                }, 2000);

            })
        } catch (error) {
            document.getElementById('mensagem').innerText = error.response.data.mensagem
        }
    }

    const UpdateSenha = () => {
        let aux = localStorage.getItem('Usuario')
        let Usuario = JSON.parse(aux)
        const inputsenha = document.getElementById('password')
        if (inputsenha.value !== '') {

        } else {
            if (inputsenha.type === 'hidden') {
                inputsenha.type = 'password'
                inputsenha.disabled = false
                inputsenha.placeholder = 'Digite a senha antiga'
                document.getElementById('cancel').style.display = 'flex'
                document.getElementById('updatepassword').style.display = 'none'

            }
        }
    }

    const cancelSenha = () => {
        const inputsenha = document.getElementById('password')
        document.getElementById('cancel').style.display = 'none'
        document.getElementById('confirmpass').style.display = 'none'
        document.getElementById('updatepassword').style.display = 'flex'
        document.getElementById('mensagem').innerText = ''
        document.getElementById('mensagempass').innerText = ''
        inputsenha.type = 'hidden'
        inputsenha.disabled = true
        inputsenha.value = null
        document.getElementById('new').style.display = 'none'
        document.getElementById('newpassword').value = null
        document.getElementById('newpassword2').value = null
    }

    const cancelUpdate = () => {
        document.getElementById('mensagem').innerText = ''
        document.getElementById('Nome').value = null
        document.getElementById('Sobrenome').value = null
        document.getElementById('contato').value = null
        document.getElementById('email').value = null
        document.getElementById('login').value = null
        document.getElementById('Update').style.display = 'none'
        document.getElementById('btnUpdate').style.display = 'flex'

    }
    const handleEnterkey = async (key) => {
        let aux = localStorage.getItem('Usuario')
        let Usuario = JSON.parse(aux)
        let senha = document.getElementById('password')
        if (key.key == 'Enter') {
            try {
                const response = await API.post('/login/verify', { id: Usuario.id, password: senha.value }).then((response) => {
                    const inputsenha = document.getElementById('password')
                    inputsenha.type = 'hidden'
                    inputsenha.disabled = true
                    inputsenha.value = null
                    document.getElementById('new').style.display = 'flex'
                    document.getElementById('confirmpass').style.display = 'flex'
                    document.getElementById('cancel').style.display = 'flex'
                    document.getElementById('newpassword').disabled = false
                    document.getElementById('newpassword2').disabled = false
                })
            } catch (error) {
                document.getElementById('mensagempass').innerText = error.response.data.mensagem
            }
        }

    };

    const updatepassword = async (key) => {
        let aux = localStorage.getItem('Usuario')
        console.log(key)
        let Usuario = JSON.parse(aux)
        var pass1 = document.getElementById('newpassword')
        var pass2 = document.getElementById('newpassword2')
        if (pass1.value === pass2.value) {
            if (key.key == 'Enter') {
                try {
                    const response = await API.patch('/update/password', { id: Usuario.id, parametro: pass2.value }).then((response) => {
                        document.getElementById('mensagempass').innerText = response.data.mensagem
                        const inputsenha = document.getElementById('password')
                        inputsenha.type = 'hidden'
                        inputsenha.disabled = true
                        inputsenha.value = null
                        pass1.disabled = true
                        pass2.disabled = true
                        setTimeout(() => {
                            cancelSenha()
                        }, 1500);
                    })
                } catch (error) {
                    document.getElementById('mensagempass').innerText = error.response.data.mensagem
                }
            }
             if(key.type =='click'){
                try {
                    const response = await API.patch('/update/password', { id: Usuario.id, parametro: pass2.value }).then((response) => {
                        document.getElementById('mensagempass').innerText = response.data.mensagem
                        const inputsenha = document.getElementById('password')
                        inputsenha.type = 'hidden'
                        inputsenha.disabled = true
                        inputsenha.value = null
                        pass1.disabled = true
                        pass2.disabled = true
                        setTimeout(() => {
                            cancelSenha()
                        }, 1500);
                    })
                } catch (error) {
                    document.getElementById('mensagempass').innerText = error.response.data.mensagem
                }
}
        }

    };

    return (
        <div id='Settings'>
            <div>

                <h2>{Usuario.Nome + ' ' + Usuario.Sobrenome}</h2>
                <br />
                <div id='Dados'>
                    <p id='mensagem' className='mensagem'></p>

                    <span id='Client'>
                        <label htmlFor="">Nome:</label>
                        <p>{Usuario.Nome} {Usuario.Sobrenome}</p>
                    </span>

                    <span><label htmlFor="">Usuario:</label>
                        <p>{Usuario.Login}</p>
                    </span>

                    <span><label htmlFor="">e-Mail:</label>
                        <p>{Usuario.email}</p>
                    </span>

                    <span><label htmlFor="">Contato:</label>
                        <p>{Usuario.Fone}</p>
                    </span>
                    <button className='submit-form settings' id='btnUpdate' onClick={LiberaUpdate}>Atualizar Cadastro</button>
                    <span id='Update' style={{ display: 'none' }}>
                        <h3>Preencha apenas os campos que deseja alterar</h3>
                        <span>
                            <label htmlFor="">Nome:</label>
                            <input type="text" id='Nome' name='Nome' onChange={handleChangeValues} placeholder={Usuario.Nome} />
                        </span>

                        <span>
                            <label htmlFor="">Sobrenome:</label>
                            <input type="text" id='Sobrenome' name='Sobrenome' onChange={handleChangeValues} placeholder={Usuario.Sobrenome} />
                        </span>

                        <span>
                            <label htmlFor="">e-Mail:</label>
                            <input type='email' id='email' name='email' onChange={handleChangeValues} placeholder={Usuario.email} />
                        </span>

                        <span>
                            <label htmlFor="">Login</label>
                            <input type="text" id='login' name='login' onChange={handleChangeValues} maxLength='25' placeholder={Usuario.Login} />
                        </span>

                        <span>
                            <label htmlFor="">Fone:</label>
                            <input type="text" id='contato' name='fone' onChange={handleChangeValues} maxLength='15' placeholder={Usuario.Fone} />
                        </span>

                        <button className='submit-form settings' onClick={Update}>Confirmar</button>
                        <button className='submit-form settings' onClick={cancelUpdate}>Cancelar</button>
                    </span>
                </div>
                <p id='mensagempass' className='mensagem'></p>
                <div id='updatepass'>
                    <span id='olderpass'>
                        <div className='inputs'>
                            <input type="hidden" id='password' onKeyDown={handleEnterkey} onChange={handleChangeValues} disabled />
                        </div>

                        <button className='submit-form settings' id='updatepassword' onClick={UpdateSenha}>Alterar senha</button>
                    </span>

                    <span id='new' style={{ display: 'none' }}>
                        <label htmlFor="">Nova Senha:</label>
                        <input type="password" id='newpassword' onKeyDown={updatepassword} />
                        <label htmlFor="">Confirme:</label>
                        <input type="password" id='newpassword2' onKeyDown={updatepassword} />
                    </span>
                    <button className='submit-form settings' id='confirmpass' style={{ display: 'none' }} onClick={updatepassword}>Confirmar</button>
                    <button className='submit-form settings' id='cancel' style={{ display: 'none' }} onClick={cancelSenha}> Cancelar</button>
                </div>
            </div>
        </div>
    )

};