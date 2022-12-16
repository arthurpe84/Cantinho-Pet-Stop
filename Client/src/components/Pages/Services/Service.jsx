import "./Services.css"

import react, { Component } from 'react'
import API from '../../API/API.JSX';
import { Navigate } from "react-router-dom";
import wpp from './assets/whatsapp-svgrepo-com.svg'


var link = document.location.href
var IdProduct = ''
link = link.split('/')
const idPet = link[4]

IdProduct = idPet


class OneServices extends Component {
    state = {
        infoService: [],
    }

    async componentDidMount() {
        if (this.state.infoService == 0) { const response = await API.get('/services/' + IdProduct); this.setState({ infoService: response.data.Servico[0] }); }
    }

    render() {
        var Services = this.state.infoService;
        return (
            <div className="ProductPage">

                <div key={Services.id} className="ProductSelect">
                    <div className="Prod">
                        <img className="ImgProduct" src={Services.Imagem} alt="Banner de Serviços" />
                        <br />
                        <p className="Produto-Desc">{Services.Descricao}</p>
                        <br />
                    </div>
                    <div className="info-Produto">
                        <h2 className="Produto-Name">{Services.Nome}</h2>
                        <p>{Services.Fornecedor}</p>
                        <br />
                        <p className="Produto-Value">{Services.Preco}</p>
                        <button id='contactFonecedor'><a id='link-Wpp' href={'https://api.whatsapp.com/send?phone=55' + Services.Fone + '&text=Olá!%20Vim%20através%20do%20Cantinho%20Pet%20Stop%20Gostaria%20de%20Saber%20mais%20sobre%20o%20produto%20' + Services.Nome} target={'_blank'}>Conversar com anunciante <img src={wpp} alt="whatsapp link" /></a></button>
                    </div>
                </div>
            </div>
        )
    }
}
export default OneServices;