import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from '../API/API.JSX';

export const AuthContext = createContext();




export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        setloading(true);
        const recover = localStorage.getItem('Usuario');
        const Usuario = JSON.parse(recover);
        // document.getElementById('btnlogin').innerHTML = (`<a href="">${Usuario.Nome}</a>`);
        if (Usuario) {
            if (Usuario.Usuario == 'a') {
                document.getElementById('btnlogin').innerHTML = (`<p href="/settings">${Usuario.Nome}
                <ul>
                    <li className='submenu'><a href="/newpet">Cadastrar pet</a></li>
                    <li className='submenu'><a href="/newproduct">Cadastrar produtos</a></li>
                    <li className='submenu'><a href="/logout">Logout</a></li>
                </ul>
            </p>`
                );
            } else if (Usuario.Usuario == '@') {
                document.getElementById('btnlogin').innerHTML = (`<p href="/settings">${Usuario.Nome}
                                                                        <ul>
                                                                            <li className='submenu'><a href="/release">Novos Pets</a></li>
                                                                            <li className='submenu'><a href="/releaseProducts">Novos Produtos</a></li>
                                                                            <li className='submenu'><a href="/newpet">Cadastrar pet</a></li>
                                                                            <li className='submenu'><a href="/newproduct">Cadastrar produtos</a></li>
                                                                            <li className='submenu'><a href="/settings">Settings</a></li>
                                                                            <li className='submenu'><a href="/logout">Logout</a></li>
                                                                        </ul>
                                                                    </p>`);
            }
            setUser({
                ID: (Usuario.id),
                Nome: (Usuario.Nome),
                Usuario: (Usuario.Usuario),
                Sobrenome: (Usuario.Sobrenome),
                Login: (Usuario.Login),
                email: (Usuario.email)
            });
        } else {
            document.getElementById('btnlogin').innerHTML = ('<a href="/login">Login</a>');
        }
        setloading(false);
    }
        , []);

    const login = async (Login, password) => {
        try {
            console.log("login", { Login, password });
            await API.post('/login', {
                Login: Login,
                password: password
            }).then((response) => {
                console.log(response.data)
                if (response.data.Mensagem !== undefined) {
                    document.getElementById('mensagem').innerText = response.data.Mensagem
                } else {
                    localStorage.setItem('tokenolder', JSON.stringify(response.data));
                    let token = localStorage.getItem('tokenolder');
                    localStorage.clear()
                    let tokenuser = JSON.parse(token);
                    localStorage.setItem('Usuario', JSON.stringify(tokenuser.Usuario));
                    console.log(tokenuser.token)
                    localStorage.setItem('token', JSON.stringify('Bearer ' + tokenuser.token));
                    let userls = localStorage.getItem('Usuario');
                    let Usuario = JSON.parse(userls);
                    console.log(Usuario);
                    if (Usuario.id) {
                        setUser({
                            ID: (Usuario.id),
                            Usuario: (Usuario.Usuario),
                            Nome: (Usuario.Nome),
                            Sobrenome: (Usuario.Sobrenome),
                            Login: (Usuario.Login),
                            email: (Usuario.email)
                        });
                        if (!user) {
                            navigate('/');
                            window.location.reload();
                        }
                    }
                }
            });
        } catch (error) {
            console.log(error.response.data)
            document.getElementById('mensagem').innerText = error.response.data
        }
        setloading(false);


    };

    const forgot = async (params) => {
        console.log(params.fone != undefined);
        const login = params.login
        var fone = ''
        if (params.fone != undefined) {
            fone = params.fone
        }
        if (params.fone === undefined) {
            console.log("forgot", { login });
            await API.post('/forgot/login', {
                parametro: params.login
            }).then((response) => {
                var mensagem = response.data.mensagem
                if (mensagem !== undefined) {
                    document.getElementById('inputemail').innerText = `${mensagem}`
                } else {
                    var INPUTfone = document.getElementById("_fone");
                    document.getElementById('inputemail').innerText = ''
                    INPUTfone.style.display = 'flex';
                    var id = response.data.id[0].id
                    console.log(id)


                    localStorage.setItem('user', id);
                    const token = localStorage.getItem('user');
                    console.log(token)
                    var INPUTfone = document.getElementById("_fone");
                    INPUTfone.style.display = 'flex';



                }
            })
        } else if (fone) {
            console.log("forgot", { fone });
            await API.post('/forgot/fone', {
                parametro: fone
            }).then((response) => {
                var mensagem = JSON.stringify(response.data)
                var Mensagem = JSON.parse(mensagem);
                console.log(Mensagem.mensagem);
                console.log(mensagem);
                if (Mensagem.mensagem !== undefined) {
                    document.getElementById('mensagem').innerText = `${Mensagem.mensagem}`
                } else {
                    var id = response.data.id[0].id
                    const idemail = localStorage.getItem('user');
                    var iduser = JSON.parse(idemail);
                    console.log(id)
                    console.log(iduser)
                    if (id == idemail) {
                        var Newpassword = document.getElementById("_password");
                        var confirmPassword = document.getElementById("_Newpassword");
                        var login = document.getElementById("_login");
                        var fone = document.getElementById("_fone");
                        login.style.display = 'none';
                        fone.style.display = 'none';
                        confirmPassword.style.display = 'flex';
                        Newpassword.style.display = 'flex';

                        var login = document.getElementById("login");
                        var fone = document.getElementById("fone");
                        console.log(login.value)
                        console.log(fone.value)

                    } else { document.getElementById('mensagem').innerText = `Este numero de celular já está vinculado a outro usuario` }
                }
            })
        }
    }

    const logout = async () => {
        console.log('Logout sendo usado');
        localStorage.clear();
        navigate('/');
        setloading(false);
    };

    const signup = () => {
        navigate('/subscription');
    };
    const sub = async (nome, sobrenome, email, login, passUser, fone, pessoa, cpfCnpj) => {
        console.log('subscription sendo usado');
        await API.post('/update/newuser', {
            Nome: nome,
            Sobrenome: sobrenome,
            Email: email,
            Login: login,
            PassUser: passUser,
            Fone: fone,
            Pessoa: pessoa,
            CpfCnpj: cpfCnpj
        }).then(
            (response) => {
                var Mensagem = response.data.mensagem
                document.getElementById('mensagem').innerText = Mensagem;
                localStorage.clear();
                if (Mensagem == 'Inserido usuario com Sucesso!') {
                    setTimeout(function () {
                        navigate('/login');
                    }, 4000);

                }
            }
        );
        setloading(false);
    };

    const newPet = async (Nome, Idade, Sexo, Peso, Porte, Raca, Desc, Date, Fone, Imagem, Uf, Cidade, Usuario) => {
        console.log('Cadastrando Pet');
        console.log(Nome, Idade, Sexo, Peso, Porte, Raca, Desc, Date, Fone, Imagem, Uf, Cidade, Usuario);
        await API.post('/pets/newpet', {
            Nome: Nome,
            Idade: Idade,
            Sexo: Sexo,
            Peso: Peso,
            Porte: Porte,
            Raca: Raca,
            Desc: Desc,
            Date: Date,
            Fone: Fone,
            Imagem: Imagem,
            Uf: Uf,
            Cidade: Cidade,
            Usuario: Usuario,
        }).then(
            (response) => {
                var Mensagem = response.data.mensagem;
                console.log(response.data);
                alert(Mensagem);
                if (!confirm('Deseja adicionar mais Pets ?')) {
                    navigate('/');
                } else {
                    window.location.reload();
                }
            }
        );



        setloading(false);
    };

    const newProduct = async (Nome, Fornecedor, Desc, Preco, ProdServ, Tamanhos, Medidas, Peso, Volume, Tamanho, Fone, Imagem, Usuario) => {
        console.log('Cadastrando Produto...');
        console.log(Nome, Desc, Preco, ProdServ, Tamanhos, Medidas, Peso, Volume, Tamanho, Fone, Imagem, Usuario);

        await API.post('/products/newproduct', {
            Nome: Nome,
            Fornecedor: Fornecedor,
            Descricao: Desc,
            Preco: Preco,
            ProdServ: ProdServ,
            Tamanhos: Tamanhos,
            Medidas: Medidas,
            Peso: Peso,
            Volume: Volume,
            Tamanho: Tamanho,
            Fone: Fone,
            Imagem: Imagem,
            Usuario: Usuario
        }).then((response) => {
            var Mensagem = response.data.mensagem;
            console.log(response.data);
            alert(Mensagem);
            if (!confirm('Deseja adicionar mais Produtos ?')) {
                navigate('/');
            } else {
                window.location.reload();
            }
        }
        );
        setloading(false);
    }


    const forgotupdate = async (id, password) => {
        var Newpassword = document.getElementById("_password");
        var confirmPassword = document.getElementById("_Newpassword");
        confirmPassword.style.display = 'none';
        Newpassword.style.display = 'none';
        document.getElementById('mensagem').innerText = 'Atualizando...';

        await API.patch('/update/password', {
            id: id,
            parametro: password
        }).then((response) => {
            console.log(response.data);
            console.log(response.data.mensagem);
            var Mensagem = response.data.mensagem
            console.log(Mensagem);
            document.getElementById('mensagem').innerText = Mensagem;

        });
        setloading(false);

        setTimeout(function () {
            navigate('/login');
        }, 2000);


    }

    return (
        <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout, sub, newPet, newProduct, signup, forgot, forgotupdate }}
        >{children}
        </AuthContext.Provider>

    );
};