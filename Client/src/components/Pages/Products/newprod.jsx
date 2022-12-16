import './newprod.css'
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Contexts/auth';



export default function Home() {
    const { authenticated, newProduct } = useContext(AuthContext);
    const [values, setValues] = useState();

    const handleChangeImage = () => {
        var photo = document.getElementById('foto').files;
        if (photo.length > 0) {
            var img = photo[0];
            var readfile = new FileReader();

            readfile.onload = function (arquivocarregado) {
                // var imagembase64 = arquivocarregado.target.result;
                // var newimage = document.createElement('img')
                // newimage.src = imagembase64;
                // document.getElementById('imagempet').innerHTML = newimage.outerHTML;

                var imagembase64 = arquivocarregado.target.result;
                var newimage = document.getElementById('prodPhoto')
                newimage.src = imagembase64;
                document.getElementById('imagemproduct').innerHTML = newimage.outerHTML;
            }
            readfile.readAsDataURL(img)
            document.getElementsByClassName("msgalert")[0].innerText = ''
            var foto = document.getElementById("imagemproduct");
            foto.style.display = 'contents';

        } else {
            var foto = document.getElementById("imagemproduct");
            foto.style.display = 'none';
            var foto = document.getElementById("prodPhoto");
            foto.src = '';
        }
    }

    const handleChangeValues = async (value) => {
        setValues((prevalue) => ({
            ...prevalue,
            [value.target.name]: value.target.value,
        }));
        console.log(value.target)
        if (value.target.name == "Nome") { document.getElementsByClassName("msgalert")[1].innerText = '' }
        if (value.target.name == "Desc") { document.getElementsByClassName("msgalert")[2].innerText = '' }
        if (value.target.name == "Preco") { document.getElementsByClassName("msgalert")[3].innerText = '' }
        if (value.target.name == "Peso") { document.getElementsByClassName("msgalert")[4].innerText = '' }
        if (value.target.name == "Tamanhos") { document.getElementsByClassName("msgalert")[5].innerText = '' }
        if (value.target.name == "Medidas") { document.getElementsByClassName("msgalert")[6].innerText = '' }
        if (value.target.name == "Fone") { document.getElementsByClassName("msgalert")[7].innerText = '' }
        if (value.target.name == "Fone") {
            console.log(value.target.value)
            let number = document.querySelector('#Fone').value
            let isnanteste = number.replace(' ', '').replace('(', '').replace(')', '').replace('-', '')
            if (isNaN(isnanteste)) {
                document.querySelector('#Fone').value = document.querySelector('#Fone').value.slice(0, -1)
            } else {
                document.getElementsByClassName("msgalert")[7].innerText = ''
                var phone = value.target.value
                var formatPhone = ''
                formatPhone = phone.replace(/(\d{2})(\d{5})(\d{4})/,
                    function (regex, arg0, arg1, arg2) {
                        return '(' + arg0 + ') ' + arg1 + '-' + arg2;
                    });
                document.querySelector('#Fone').value = ''
                document.querySelector('#Fone').value = formatPhone
            }

        }

        if (value.target.name == "Preco") {
            let number = document.querySelector('#Preco').value
            let isnanteste = number.replace(' ', '').replace('(', '').replace(')', '').replace('-', '')
            if (isNaN(isnanteste)) {
                console.log(isnanteste)
                document.querySelector('#Preco').value = document.querySelector('#Preco').value.slice(0, -1)
            }
        }

        if (value.target.name == "ProdServ") {
            var Type = document.querySelector('#ProdServ').value
            Type = Type.toUpperCase()
            if (Type) {
                switch (Type) {
                    case 'P':
                        document.getElementsByClassName("msgalert")[4].innerText = ''
                        document.getElementsByClassName('sub')[5].style.display = 'flex'
                        break;
                    case 'S':
                        document.getElementsByClassName("msgalert")[4].innerText = ''
                        document.getElementsByClassName('sub')[5].style.display = 'flex'
                        break;
                    default:
                        document.querySelector('#ProdServ').value = document.querySelector('#ProdServ').value.slice(0, -1)
                        document.getElementsByClassName('sub')[4].style.display = 'none'
                }
            }
        }
        if (value.target.name == "Tamanhos") {
            var Type = document.querySelector('#Tamanhos').value
            Type = Type.toUpperCase()
            if (Type) {
                switch (Type) {
                    case 'S':
                        document.getElementsByClassName("msgalert")[6].innerText = ''
                        document.getElementsByClassName('sub')[6].style.display = 'flex'
                        break;
                    default:
                        document.getElementsByClassName('sub')[6].style.display = 'none'
                }
            }
        }
        if (value.target.name == "Medidas") {
            var Type = document.querySelector('#Medidas').value
            if (Type) {
                switch (Type) {
                    case 'Peso':
                        document.getElementsByClassName("msgalert")[7].innerText = ''
                        document.getElementsByClassName('sub')[7].style.display = 'flex'
                        document.getElementsByClassName('sub')[8].style.display = 'none'
                        document.getElementsByClassName('sub')[9].style.display = 'none'
                        break;
                    case 'Volume':
                        document.getElementsByClassName("msgalert")[7].innerText = ''
                        document.getElementsByClassName('sub')[7].style.display = 'none'
                        document.getElementsByClassName('sub')[8].style.display = 'flex'
                        document.getElementsByClassName('sub')[9].style.display = 'none'
                        break;
                    case 'Tamanhos':
                        document.getElementsByClassName("msgalert")[6].innerText = ''
                        document.getElementsByClassName('sub')[7].style.display = 'none'
                        document.getElementsByClassName('sub')[8].style.display = 'none'
                        document.getElementsByClassName('sub')[9].style.display = 'flex'
                        break;
                    case 'Outros':
                        document.getElementsByClassName("msgalert")[6].innerText = ''
                        document.getElementsByClassName('sub')[7].style.display = 'none'
                        document.getElementsByClassName('sub')[8].style.display = 'none'
                        document.getElementsByClassName('sub')[9].style.display = 'flex'
                        break;
                    default:
                        document.getElementsByClassName('sub')[7].style.display = 'none'
                        document.getElementsByClassName('sub')[8].style.display = 'none'
                        document.getElementsByClassName('sub')[9].style.display = 'none'
                }
            }
        }
        console.log(values);
    }


    const validate = () => {
        var Imagem = document.getElementById('prodPhoto').src;
        var Nome = document.querySelector('#Nome').value;
        var Fornecedor = document.querySelector('#Fornecedor').value;
        var Desc = document.querySelector('#Descricao').value;
        var Preco = document.querySelector('#Preco').value;
        var Tamanhos = document.querySelector('#Tamanhos').value;
        var Medidas = document.querySelector('#Medidas').value;
        var Fone = document.querySelector('#Fone').value;
        var ProdServ = document.querySelector('#ProdServ').value;
        var Peso = document.querySelector('#Peso').value;
        var Tamanho = document.querySelector('#Tamanho').value;
        var Volume = document.querySelector('#Volume').value;
        var Volume = document.querySelector('#Fornecedor').value;

        var newProduct = new Object();
        var valid = 0


        if (Imagem.length < 50) { document.getElementsByClassName("msgalert")[0].innerText = '*Campo obrigatorio'; valid++ }
        if (!Nome) { document.getElementsByClassName("msgalert")[1].innerText = '*Campo obrigatorio'; valid++ }
        if (!Fornecedor) { document.getElementsByClassName("msgalert")[2].innerText = '*Campo obrigatorio'; valid++ }
        if (!Desc) { document.getElementsByClassName("msgalert")[3].innerText = '*Campo obrigatorio'; valid++ }
        if (!Preco) { document.getElementsByClassName("msgalert")[4].innerText = '*Campo obrigatorio'; valid++ }
        if (!ProdServ) { document.getElementsByClassName("msgalert")[5].innerText = '*Campo obrigatorio'; valid++ }
        if (!Fone) { document.getElementsByClassName("msgalert")[6].innerText = '*Campo obrigatorio'; valid++ }


        // console.log(Imagem)
        if (valid == 0) {
            newProduct.Imagem = Imagem
            newProduct.Nome = Nome
            newProduct.Fornecedor = Fornecedor
            newProduct.Desc = Desc
            newProduct.Preco = Preco
            newProduct.Peso = Peso
            newProduct.Tamanho = Tamanho
            newProduct.Volume = Volume
            newProduct.Tamanhos = Tamanhos
            newProduct.Medidas = Medidas
            newProduct.ProdServ = ProdServ
            newProduct.Fone = Fone


            console.log(values)
            console.log(newProduct)
            return newProduct

        } else {
            console.log(valid);
        }

    }
    const handleClickButton = async () => {
        var productvalid = validate();
        const recover = localStorage.getItem('Usuario');
        const Usuario = JSON.parse(recover);
        console.log(productvalid);
        console.log(Usuario.id);
        if (productvalid !== '') {
            newProduct(productvalid.Nome,
                productvalid.Fornecedor,
                productvalid.Desc,
                productvalid.Preco,
                productvalid.ProdServ,
                productvalid.Tamanhos,
                productvalid.Medidas,
                productvalid.Peso,
                productvalid.Volume,
                productvalid.Tamanho,
                productvalid.Fone,
                productvalid.Imagem,
                Usuario.id);
        }
    };

    return (
        <div className='prod-banner'>
            <div className='prod-card'>
                <h2>Cadastro de Produtos</h2>
                <p className='msgalert'></p>
                <div style={{ display: 'none' }} id='imagemproduct'>
                    <img id='prodPhoto' src="" onChange={handleChangeValues} value={document.getElementById("prodPhoto")} />
                </div>

                <p id='mensagem'></p>
                <form method='post' >
                    <input
                        type='file'
                        name="foto"
                        accept="image/*"
                        id="foto"
                        onChange={handleChangeImage} />

                    <p className='msgalert'></p>
                    <div className='sub'>
                        <label htmlFor="Nome">Nome:</label>
                        <input
                            type="text"
                            name="Nome"
                            id="Nome"
                            placeholder='Nome do produto'
                            onChange={handleChangeValues} />
                    </div>
                    <p className='msgalert'></p>
                    <div className='sub'>
                        <label htmlFor="Fornecedor">Fornecedor:</label>
                        <input
                            type="text"
                            name="Fornecedor"
                            id="Fornecedor"
                            placeholder='Nome do fornecedor'
                            onChange={handleChangeValues} />
                    </div>

                    <p className='msgalert'></p>
                    <div id='Desc' className='sub'>
                        <label htmlFor="Desc">Descrição:</label>
                        <textarea name="Desc" maxLength='2022' id="Descricao" cols="30" rows="10" onChange={handleChangeValues} placeholder='Digite a história e informações adicionais do pet'></textarea>
                    </div>

                    <p className='msgalert'></p>
                    <div className='sub'>
                        <label htmlFor="Preco">Preço:</label>
                        <input
                            type='number'
                            name="Preco"
                            id="Preco"
                            placeholder='R$ 999,99'
                            onChange={handleChangeValues} />
                    </div>

                    <p className='msgalert'></p>
                    <div className='sub'>
                        <label htmlFor="ProdServ">Produto/ Serviço:</label>
                        <input
                            type="text"
                            name="ProdServ"
                            id="ProdServ"
                            placeholder='ex: P/S'
                            onChange={handleChangeValues}
                            list="ProdServices" />
                        <datalist id="ProdServices">
                            <option value="P" className='1'>Produto</option>
                            <option value="S">Serviço</option>

                        </datalist>
                    </div>

                    <p className='msgalert'></p>
                    <div style={{ display: 'none' }} className='sub'>
                        <label htmlFor="Tamanhos">Possui tamanhos:</label>
                        <input
                            type='text'
                            name="Tamanhos"
                            id="Tamanhos"
                            placeholder='ex: S/N'
                            onChange={handleChangeValues} maxLength={1} list="pergunta" />
                        <datalist id="pergunta">
                            <option value="S" className='1'>Sim</option>
                            <option value="N">Não</option>

                        </datalist>
                    </div>

                    <div style={{ display: 'none' }} className='sub'>
                        <label htmlFor="Medidas">Medida:</label>
                        <input
                            type="text"
                            name="Medidas"
                            id="Medidas"
                            placeholder='ex: Peso, Volume, Tamanho, Outros'
                            onChange={handleChangeValues} list='portes' />
                        <datalist id="portes" onChange={handleChangeValues}>
                            <option value="Peso" className='1'>gramas/quilos</option>
                            <option value="Volume">ml/L</option>
                            <option value="Tamanhos">P/M/G</option>
                            <option value="Outros">Branco/Preto/...</option>
                        </datalist>
                    </div>

                    <div style={{ display: 'none' }} className='sub'>
                        <label htmlFor="Peso">Peso</label>
                        <input
                            type='text'
                            name="Peso"
                            id="Peso"
                            maxLength="15"
                            placeholder='ex: 400g / 1,5kg'
                            onChange={handleChangeValues} />
                    </div>

                    <div style={{ display: 'none' }} className='sub'>
                        <label htmlFor="Volume">Volume:</label>
                        <input
                            type='text'
                            name="Volume"
                            id="Volume"
                            maxLength="15"
                            placeholder='ex: 400ml / 2L'
                            onChange={handleChangeValues} />
                    </div>
                    <p style={{ display: 'none' }} className='msgalert'> Se possuir mais de um preencha separando por '/'</p>
                    <div style={{ display: 'none' }} className='sub'>
                        <label htmlFor="Tamanho">Variações:</label>
                        <input
                            type='Tamanho'
                            name="Tamanho"
                            id="Tamanho"
                            maxLength="20"
                            placeholder='ex:P/M/G/Branco/rosa/...'
                            onChange={handleChangeValues} />
                    </div>
                    <p className='msgalert'></p>
                    <div className='sub'>
                        <label htmlFor="Fone">Whatsapp:</label>
                        <input
                            type='tel'
                            name="Fone"
                            id="Fone"
                            maxLength="16"
                            placeholder='(00) 00000-0000'
                            onChange={handleChangeValues} />
                    </div>
                </form>
                <div >
                    <button className='submit-form' onClick={() => handleClickButton()}>Cadastrar</button>
                </div>
            </div>
        </div>
    )
}