import react, { Component } from 'react';
import { useNavigate } from "react-router-dom";
import API from '../../../API/API.JSX';
import './NewPets.css';


class Adminpets extends Component {
    state = {
        petsinfo: [],
    }
    async componentDidMount() {
        let token = localStorage.token
        let aux = JSON.parse(localStorage.Usuario)
        let Cargo = aux.Usuario
        console.log(Cargo)
        if (this.state.petsinfo.length === 0) {
            try {
                const response = await API.post('/pet', { token: token, Cargo:Cargo }); this.setState({ petsinfo: response.data.Pets });
                console.log(this.state.petsinfo)
            } catch (error) {
                if (error.response.data == 'Falha na autenticação') {
                    alert('Sessão Expirada !')
                    window.location.replace('/login')
                    localStorage.clear();
                }
            }
        }
    }

    render() {
        var pets = this.state.petsinfo;
        pets.forEach(animal => {
            animal.Sexo = animal.Sexo.toUpperCase();
            animal.Porte = animal.Porte.toUpperCase();
            if (animal.Sexo == 'M') {
                animal.Sexo = 'Macho'
            } else if (animal.Sexo == 'F') {
                animal.Sexo = 'Fêmea'
            }

            switch (animal.Porte) {
                case 'P':
                    animal.Porte = "Pequeno"
                    break;
                case 'M':
                    animal.Porte = "Médio"
                    break;
                case 'G':
                    animal.Porte = "Grande"
                    break;
            }
            let data = animal.Data.split('-')
            animal.Data = data[2] + '/' + data[1] + '/' + data[0]
        });
        return (
            <div id='NovosPets'>
                {pets.map(pet => <div key={pet.idPet} className='Card'>

                    <span className='infopets' >
                        <div className='CardAnimal'>
                            <a href={'/pet/' + pet.idPet} >
                                <img className='img' src={pet.Imagem} alt="" />
                            </a>

                            <div className='infopet'>

                                <ul>
                                    <h3>{pet.NomePet}</h3>
                                    <li>{pet.Sexo}</li>
                                    <li>{pet.Raça}</li>
                                    <li>{pet.IdadePet}</li>
                                    <li>No abrigo desde: {pet.Data}</li>
                                </ul>
                                <a className='btnSubmit'
                                    href={'/petadmin/' + pet.idPet} >
                                    Quero Conhecer
                                </a>

                            </div>
                        </div>
                    </span>
                </div>)}

            </div>
        )
    }
}
export default Adminpets;
