import react, { Component } from 'react'

import './CardAnimal.css';
import API from '../API/API.JSX';



function selectpet(petid) {
    var hreflink = '/adoption' + petid
}

class Pets extends Component {
    state = {
        petsinfo: [],
    }

    async componentDidMount() {
        if (this.state.petsinfo == 0) {
            const response = await API.get('/pets'); this.setState({ petsinfo: response.data.Pets });
        }

    }

    render() {
        var pets = this.state.petsinfo;

        pets.forEach(animal => {
            animal.Sexo = animal.Sexo.toUpperCase();
            if (animal.Sexo == 'M') {
                animal.Sexo = 'Macho'
            } else if (animal.Sexo == 'F') {
                animal.Sexo = 'Fêmea'
            }
            let data = animal.Data.split('-')
            animal.Data = data[2] + '/' + data[1] + '/' + data[0]
        });
        return (
            <div>
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
                                    href={'/pet/' + pet.idPet} >
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
export default Pets;