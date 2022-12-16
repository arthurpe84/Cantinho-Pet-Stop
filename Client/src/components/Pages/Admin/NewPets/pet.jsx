import react, { Component } from 'react'
import API from '../../../API/API.JSX';
import "./NewPets.css"
// import '../../pet/pet.css'
//admin
var pet = {}
var link = document.location.href
link = link.split('/')
const idPet = link[4]
import wpp from '../../../../assets/whatsapp_Svg.svg'
var thispet = {}


async function Aprove(idPet) {
    if (confirm("Deseja Realmente aprovar o cadastro deste pet ? " + '\n' + thispet.NomePet)) {
        try {
            await API.patch('/pet/release', { id: thispet.idPet }).then((response) => {
                var response = response.data.Mensagem
                alert(response)
                window.location.replace('/release')
            });
        } catch (error) {
            if (error.response.data == 'Falha na autenticação') {
                alert('Sessão Expirada !')
                window.location.replace('/login')
                localStorage.clear();
            }
        }
    }
}



async function Remove(idPet) {
    if (confirm("Deseja Realmente Excluir o cadastro deste pet ? " + '\n' + thispet.NomePet)) {
        try {
            await API.delete('/pet/delete/'+ thispet.idPet ).then((response) => {
                var response = response.data.Mensagem
                alert(response)
                window.location.replace('/release')
            });
        } catch (error) {
            if (error.response.data == 'Falha na autenticação') {
                alert('Sessão Expirada !')
                window.location.replace('/login')
                localStorage.clear();
            }
        }
    }

}

export default class Petadmin extends Component {

    state = {
        infopet: {},
    }


    async componentDidMount() {
        const response = await API.post('/pet/admin/' + idPet);
        this.setState({ infopet: response.data.Pet[0] })
        thispet = response.data.Pet[0]

    };

    render() {
        pet = this.state.infopet;
        let prefix = ''
        let number = ''

        if (pet.Contato) {
            number = pet.Contato.replace("(", "").replace(")", "").replace(" ", "").replace("-", "")
            pet.Contato = number
        }
        if (pet.Sexo == 'M') {
            pet.Sexo = 'Macho'
            prefix = 'o'
        } else if (pet.Sexo == 'F') {
            pet.Sexo = 'Fêmea'
            prefix = 'a'

        }
        switch (pet.Porte) {
            case 'P':
                pet.Porte = "Pequeno"
                break;
            case 'M':
                pet.Porte = "Médio"
                break;
            case 'G':
                pet.Porte = "Grande"
                break;
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
                            <div id='adminbtns'>
                                <button className='btnSubmit adminbtn' id='approve' onClick={Aprove} >Aprovar</button>
                                <button className='btnSubmit adminbtn' id='delete' onClick={Remove} >Excluir</button>
                            </div>

                            <h3>Adote {prefix} {pet.NomePet}</h3>
                            <h4>{pet.Sexo}</h4>
                            <p>{pet.Descricao}</p>
                        </div>
                        <div className='Petinfo'>
                            <p>Idade: {pet.IdadePet}</p>
                            <p>Porte: {pet.Porte}</p>
                            <a href={"mailto:" + pet.Email}>Enviar email</a>
                            <p>Email: {pet.Email}</p>
                            <p id='contact'>Contato: {pet.Fone}  <a id='link-Wpp' href={'https://api.whatsapp.com/send?phone=55' + pet.Contato + '&text=Olá!%20faço%20parte%20da%20administração%20do%20Cantinho%20Pet%20Stop%20Gostaria%20de%20falar%20a%20respeito%20d' + prefix + '%20' + pet.NomePet} target={'_blank'}><img src={wpp} alt="whatsapp link" /></a></p>
                            <p>UF: {pet.UF}</p><p>Cidade: {pet.Cidade}</p>

                        </div>

                    </div>
                </div>
            </div >
        )
    };

}
;




    // <div className='pet'>

    //     <div className='imgpet'>
    //         <img id='img' className='img' src={pet.Imagem} alt="" />
    //     </div>

    //     <div className="adoption">
    //         <div className="Myhistory Pet">
    //             <h2>Minha História</h2>
    //             <br />
    //             <h3>Adote {prefix} {pet.NomePet}</h3>
    //             <h4>{pet.Sexo}</h4>
    //             <p>{pet.Descricao}</p>
    //         </div>

    //         <div className='Petinfo'>
    //             <p>Idade: {pet.IdadePet}</p>
    //             <p>Porte: {pet.Porte}</p>
    //             <a href={"mailto:" + pet.Email}>Enviar email</a>
    //             <p>Email: {pet.Email}</p>
    //             <p id='contact'>Contato: {pet.Fone}  <a id='link-Wpp' href={'https://api.whatsapp.com/send?phone=55' + pet.Contato + '&text=Olá!%20faço%20parte%20da%20administração%20do%20Cantinho%20Pet%20Stop%20Gostaria%20de%20falar%20a%20respeito%20d' + prefix + '%20' + pet.NomePet} target={'_blank'}><img src={wpp} alt="whatsapp link" /></a></p>
    //             <p>UF: {pet.UF}</p><p>Cidade: {pet.Cidade}</p>

    //         </div>
    //     </div>
    // </div >