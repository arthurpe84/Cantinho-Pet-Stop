import './newpet.css'
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Contexts/auth';



export default function NewPetAdd() {
    const { authenticated, newPet } = useContext(AuthContext);
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
                var newimage = document.getElementById('petphoto')
                newimage.src = imagembase64;
                document.getElementById('imagempet').innerHTML = newimage.outerHTML;
            }
            readfile.readAsDataURL(img)
            document.getElementsByClassName("msgalert")[0].innerText = ''
            var foto = document.getElementById("imagempet");
            foto.style.display = 'contents';

        } else {
            var foto = document.getElementById("imagempet");
            foto.style.display = 'none';
            var foto = document.getElementById("petphoto");
            foto.src = '';
        }
    }

    const handleChangeValues = async (value) => {
        console.log(values)
        setValues((prevalue) => ({
            ...prevalue,
            [value.target.name]: value.target.value,
        }));

        if (value.target.name == "Nome") { document.getElementsByClassName("msgalert")[1].innerText = '' }
        if (value.target.name == "Raca") { document.getElementsByClassName("msgalert")[2].innerText = '' }
        if (value.target.name == "Idade") { document.getElementsByClassName("msgalert")[3].innerText = '' }
        if (value.target.name == "Sexo") { document.getElementsByClassName("msgalert")[4].innerText = '' }
        if (value.target.name == "Peso") { document.getElementsByClassName("msgalert")[5].innerText = '' }
        if (value.target.name == "Porte") { document.getElementsByClassName("msgalert")[6].innerText = '' }
        if (value.target.name == "Date") { document.getElementsByClassName("msgalert")[7].innerText = '' }
        if (value.target.name == "Fone") { document.getElementsByClassName("msgalert")[7].innerText = '' }
        if (value.target.name == "Uf") { document.getElementsByClassName("msgalert")[8].innerText = '' }
        if (value.target.name == "Cidade") {
            document.getElementsByClassName("msgalert")[10].innerText = ''
            document.getElementById("Desc").style.display = 'flex'
        }
        if (value.target.name == "Desc") { document.getElementsByClassName("msgalert")[11].innerText = '' }

        if (value.target.name == "Nome") {
            if (!isNaN(value.target.value)) {
                document.getElementsByClassName("msgalert")[1].innerText = 'Digite apenas letras'
            } else {
                document.getElementsByClassName("msgalert")[1].innerText = ''
            }
        }
        if (value.target.name == "Fone") {
            console.log(value.target.value)
            let number = document.querySelector('#Fone').value
            let isnanteste = number.replace(' ', '').replace('(', '').replace(')', '').replace('-', '')
            if (isNaN(isnanteste)) {
                document.querySelector('#Fone').value = document.querySelector('#Fone').value.slice(0, -1)
            } else {
                document.getElementsByClassName("msgalert")[8].innerText = ''
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
        if (value.target.name == "UF") {
            if (!isNaN(value.target.value)) {
                document.querySelector('#UF').value = document.querySelector('#UF').value.slice(0, -1)
            } else { document.getElementsByClassName("msgalert")[9].innerText = '' }
        }
        if (value.target.name == "Porte") {
            var Type = value.target.value
            Type = Type.toUpperCase();
            if (Type) {
                switch (Type) {
                    case 'P':
                        document.getElementsByClassName("msgalert")[6].innerText = ''
                        break;
                    case 'M':
                        document.getElementsByClassName("msgalert")[6].innerText = ''
                        break;
                    case 'G':
                        document.getElementsByClassName("msgalert")[6].innerText = ''
                        break;
                    default:
                        document.querySelector('#Porte').value = document.querySelector('#Porte').value.slice(0, -1)
                }
            } else {
                document.getElementsByClassName("msgalert")[4].innerText = ''
            }
        }


    };


    const handleChangePerson = async (value) => {
        console.log(values);
        setValues((prevalue) => ({
            ...prevalue,
            [value.target.name]: value.target.value,
        }));

        document.querySelectorAll('#Sexo')
        var Type = value.target.value
        Type = Type.toUpperCase();
        if (Type) {
            switch (Type) {
                case 'F':
                    document.getElementsByClassName("msgalert")[4].innerText = ''
                    break;
                case 'M':
                    document.getElementsByClassName("msgalert")[4].innerText = ''
                    break;
                default:
                    document.getElementsByClassName("msgalert")[4].innerText = 'Digite apenas "F" ou "M"'
            }
        } else {
            document.getElementsByClassName("msgalert")[4].innerText = ''
        }
    }

    const validate = () => {
        var Imagem = document.getElementById('petphoto').src;
        var Nome = document.querySelector('#Nome').value;
        var Raca = document.querySelector('#Raca').value;
        var Idade = document.querySelector('#Idade').value;
        var Sexo = document.querySelector('#Sexo').value;
        var Peso = document.querySelector('#Peso').value;
        var Porte = document.querySelector('#Porte').value;
        var Date = document.querySelector('#Date').value;
        var Fone = document.querySelector('#Fone').value;
        var Uf = document.querySelector('#UF').value;
        var Cidade = document.querySelector('#Cidade').value;
        var Desc = document.querySelector('#Descricao').value;
        var NewPet = new Object();
        var valid = 0


        if (Imagem.length < 50) { document.getElementsByClassName("msgalert")[0].innerText = '*Campo obrigatorio'; valid++ }
        if (!Nome) { document.getElementsByClassName("msgalert")[1].innerText = '*Campo obrigatorio'; valid++ }
        if (!Raca) { document.getElementsByClassName("msgalert")[2].innerText = '*Campo obrigatorio'; valid++ }
        if (!Idade) { document.getElementsByClassName("msgalert")[3].innerText = '*Campo obrigatorio'; valid++ }
        if (!Sexo) { document.getElementsByClassName("msgalert")[4].innerText = '*Campo obrigatorio'; valid++ }
        if (!Peso) { document.getElementsByClassName("msgalert")[5].innerText = '*Campo obrigatorio'; valid++ }
        if (!Porte) { document.getElementsByClassName("msgalert")[6].innerText = '*Campo obrigatorio'; valid++ }
        if (!Date) { document.getElementsByClassName("msgalert")[7].innerText = '*Campo obrigatorio'; valid++ }
        if (!Fone) { document.getElementsByClassName("msgalert")[8].innerText = '*Campo obrigatorio'; valid++ }
        if (!Uf) { document.getElementsByClassName("msgalert")[9].innerText = '*Campo obrigatorio'; valid++ }
        if (!Cidade) { document.getElementsByClassName("msgalert")[10].innerText = '*Campo obrigatorio'; valid++ }
        if (!Desc) { document.getElementsByClassName("msgalert")[11].innerText = '*Campo obrigatorio'; valid++ }



        // console.log(Imagem)
        if (valid == 0) {
            NewPet.Imagem = Imagem
            NewPet.Nome = Nome
            NewPet.Raca = Raca
            NewPet.Idade = Idade
            NewPet.Sexo = Sexo
            NewPet.Peso = Peso
            NewPet.Porte = Porte
            NewPet.Date = Date
            NewPet.Fone = Fone
            NewPet.Uf = Uf
            NewPet.Cidade = Cidade
            NewPet.Desc = Desc

            console.log(values)
            console.log(NewPet)
            return NewPet

        } else {
            console.log(valid);
        }

    }
    const handleClickButton = async () => {
        var PetValid = validate();
        const recover = localStorage.getItem('Usuario');
        const Usuario = JSON.parse(recover);
        console.log(Usuario.id);
        if (PetValid !== undefined) {
            newPet(
                PetValid.Nome,
                PetValid.Idade,
                PetValid.Sexo,
                PetValid.Peso,
                PetValid.Porte,
                PetValid.Raca,
                PetValid.Desc,
                PetValid.Date,
                PetValid.Fone,
                PetValid.Imagem,
                PetValid.Uf,
                PetValid.Cidade,
                Usuario.id
            );
        }
    };

    return (
        <div className='sub-banner-pet'>
            <div className='subPet-card'>
                <h2>Cadastro de Pet</h2>
                <div style={{ display: 'none' }} id='imagempet'>
                    <img id='petphoto' src="" alt="" onChange={handleChangeValues} value={document.getElementById("petphoto")} />
                </div>
                <p id='mensagem'></p>
                <form method='post'>
                    <p className='msgalert'></p>
                    <div className='sub'>
                        <label htmlFor="foto">Foto do Pet:</label>
                        <input
                            type='file'
                            name="foto"
                            accept="image/*"
                            id="foto"
                            onChange={handleChangeImage} />
                    </div>
                    <p className='msgalert'></p>
                    <div className='sub'>
                        <label htmlFor="Nome">Nome:</label>
                        <input
                            type="text"
                            name="Nome"
                            id="Nome"
                            placeholder='Nome do Pet'
                            onChange={handleChangeValues} />
                    </div>
                    <p className='msgalert'></p>
                    <div className='sub'>
                        <label htmlFor="Raca">Raca:</label>
                        <input
                            type="text"
                            name="Raca"
                            id="Raca"
                            placeholder='Raça'
                            onChange={handleChangeValues} />
                    </div>
                    <p className='msgalert'></p>
                    <div className='sub'>
                        <label htmlFor="Idade">Idade:</label>
                        <input
                            type='text'
                            name="Idade"
                            id="Idade"
                            placeholder='ex: 2 anos, 6 meses...'
                            onChange={handleChangeValues} />
                    </div>
                    <p className='msgalert'></p>
                    <div className='sub'>
                        <label htmlFor="Sexo">Sexo: </label>
                        <input type='text' maxLength={'1'} name="Sexo" id="Sexo" onChange={handleChangePerson} onClick={handleChangePerson} list="Sexos" />
                        <datalist id="Sexos" onChange={handleChangePerson}>
                            <option value="F" className='1'>Fêmea</option>
                            <option value="M">Macho</option>

                        </datalist>
                    </div>

                    <p className='msgalert'></p>
                    <div className='sub'>
                        <label htmlFor="Peso">Peso:</label>
                        <input
                            type="text"
                            name="Peso"
                            id="Peso"
                            placeholder='ex: 5kg'
                            onChange={handleChangeValues} />
                    </div>

                    <p className='msgalert'></p>
                    <div className='sub'>
                        <label htmlFor="Porte">Porte:</label>
                        <input
                            type="text"
                            name="Porte"
                            id="Porte"
                            placeholder='ex: P, M, G'
                            onChange={handleChangeValues} list='portes' />
                        <datalist id="portes" onChange={handleChangeValues}>
                            <option value="P" className='1'>Pequeno</option>
                            <option value="M">Médio</option>
                            <option value="G">Grande</option>
                        </datalist>
                    </div>

                    <p className='msgalert'></p>
                    <div className='sub'>
                        <label htmlFor="Date">No abrigo</label>
                        <input
                            type='Date'
                            name="Date"
                            id="Date"
                            onChange={handleChangeValues} />
                    </div>

                    <p className='msgalert'></p>
                    <div className='sub'>
                        <label htmlFor="Fone">Contato:</label>
                        <input
                            type='tel'
                            name="Fone"
                            id="Fone"
                            maxLength="16"
                            placeholder='(00) 00000-0000'
                            onChange={handleChangeValues} />
                    </div>

                    <p className='msgalert'></p>
                    <div className='sub'>
                        <label htmlFor="UF">UF:</label>
                        <input
                            type='UF'
                            name="UF"
                            id="UF"
                            maxLength="2"
                            placeholder='ex: SP, PE, BA'
                            onChange={handleChangeValues} />
                    </div>
                    <p className='msgalert'></p>
                    <div className='sub'>
                        <label htmlFor="Cidade">Cidade:</label>
                        <input
                            type='text'
                            name="Cidade"
                            id="Cidade"
                            maxLength="29"
                            placeholder='ex: Salvador, São Paulo, Recife'
                            onChange={handleChangeValues} />
                    </div>

                    <p className='msgalert'></p>
                    <div style={{ display: 'none' }} id='Desc' className='sub'>
                        <label htmlFor="Desc">Descrição:</label>

                        <textarea name="Desc" maxLength='2022' id="Descricao" cols="30" rows="10" onChange={handleChangeValues} placeholder='Digite a história e informações adicionais do pet'></textarea>
                        {/*                         
                        <input
                        type="text"
                        name="Desc"
                        id="Descricao"
                        onChange={handleChangeValues}
                        
                    /> */}
                    </div>
                </form>
                    <button className='submit-form' onClick={() => handleClickButton()}>Cadastrar</button>


            </div>
        </div>
    )
};