import react, { Component } from 'react'
import API from '../../API/API.JSX';
import Pets from '../../CardAnimal/CardAnimal';
import Copyrigth from "../../Rodape/Copyright";
import './Adoption.css'




function selectpet(petid) {
    var hreflink = '/adoption' + petid
}

class Adoptions extends Component {
    state = {
        petsinfo: [],
    }

    async componentDidMount() {
        if (this.state.petsinfo == 0) {
            const response = await API.get('/pets/all'); 
            this.setState({ petsinfo: response.data.Pets });
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
            <div class='Adoption'>
                <h2> Adote um amigo</h2>
                <div className='Cards'>

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
                <Copyrigth/>
            </div>
        )
    }
}
export default Adoptions;