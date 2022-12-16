import react, { Component } from 'react';
import { useNavigate } from "react-router-dom";
import API from '../../API/API.JSX';
import './Services.css';
import Copyrigth from "../../Rodape/Copyright";

function selectservice(service) {
    // console.log(product.target.id)
    let Service = service.target.id
    window.location.href = "http://localhost:5173/Services/" + Service
}
export default class ProductsPage extends Component {
    state = {
        Servicesinfo: [],
    }

    async componentDidMount() {
        if (this.state.Servicesinfo.length === 0) {
            const response = await API.post('/services'); this.setState({ Servicesinfo: response.data.Services });

        }
    }

    render() {
        var Services = []
        this.state.Servicesinfo.forEach(servico => {
            servico.Nome= servico.Nome.substring(0,30)
            Services.push(servico)
        });
        console.log(Services)

        return (
            <div id='NossosServicos'>
                <div>

                    <h1>Serviços</h1>
                    {Services.map(servico => <div key="{Services.idPet}" className='Card'>

                        <span className='infopets' >
                            <div className='CardServico'>
                                <a href={'/services/' + servico.id} >
                                    <img className='img' src={servico.Imagem} alt="" />
                                </a>

                                <div className='InfoServicos'>
                                    <ul>
                                        <h3>{servico.Nome}</h3>
                                        <p>{servico.Fornecedor}</p>
                                    </ul>
                                    <button className='btnSubmit'
                                        id={servico.id}
                                        onClick={selectservice}>
                                        Quero Conhecer
                                    </button>

                                </div>
                            </div>
                        </span>
                    </div>)}
                </div>
                <Copyrigth/>

            </div>
        )
    }
};
