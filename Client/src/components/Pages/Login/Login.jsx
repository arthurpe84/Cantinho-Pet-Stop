import './Login.css'
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Contexts/auth';
import { Await, Navigate, useNavigate } from 'react-router-dom';
// import './login2'




export default function login() {

    const { authenticated, login, signup } = useContext(AuthContext);

    // document.body.addEventListener('keydown', async function (event) {
    //     const key = event.key;
    //     if (key == 'Enter') {
    //         if (window.location.href == 'http://localhost:5173/login') { }
    //         let v1 = document.querySelector('#login').value;
    //         let v2 = document.querySelector('#password').value;
    //         if (v1) {
    //             if (v2) {
    //                 await handleClickButton();
    //             }
    //         }
    //     }
    // });



    const [values, setValues] = useState();
    const handleChangeValues = (value) => {
        setValues((prevalue) => ({
            ...prevalue,
            [value.target.name]: value.target.value,
        }));
        document.getElementById('mensagem').innerText = ''
    };
    const handleClickButton = async () => {
        await login(
            values.login,
            values.password);


    };
    const handleEnterkey = async (key) => {
        if (key.key == 'Enter') {
            await login(
                values.login,
                values.password
            );
        }

    };


    return (
        <div className='login-banner'>
            <div className='login-card'>
                <h2>Login</h2>
                <p id='mensagem'></p>
                <div className='login'>
                    <label htmlFor="username">Login:</label>
                    <input
                        type="text"
                        name="login"
                        id="login"
                        maxLength={40}
                        placeholder='email ou usuario'
                        onChange={handleChangeValues}
                        required />
                </div>
                <div className='login'>
                    <label htmlFor="password">Pass:</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        maxLength={20}
                        placeholder='password'
                        onChange={handleChangeValues}
                        onKeyDown={handleEnterkey}
                        required />
                </div>

                <a href="/forgot">Esqueceu a senha?</a>
                <div className='submit'>
                    <button onClick={() => signup()}>Cadastro</button>
                    <button onClick={() => handleClickButton()}>Login </button>
                </div>
            </div>
        </div>
    )
};


