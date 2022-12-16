import "./Services.css"
import cama from "../../../assets/cama para pets.png"


import react, { Component } from 'react'
import API from '../../API/API.JSX';
import { useNavigate } from "react-router-dom";




function selectproduct(product) {
    // console.log(product.target.id)
    let Product = product.target.id
    localStorage.setItem('IdProduct', Product)
    window.location.href = "http://localhost:5173/services/" + Product
}
class Products extends Component {
    state = {
        infoproducts: [],
    }

    async componentDidMount() {
        if (this.state.infoproducts == 0) { const response = await API.get('/services'); this.setState({ infoproducts: response.data.Services }); }

    }

    render() {
        var Products = this.state.infoproducts;
        console.log(Products)
        return (
            <div id="serviceshome">
                <a href="/services">Mostrar Todos</a>
                <div className="Services">
                    {Products.map(produto =>

                        <div className="Service">
                            <img className="ImgProduct" src={produto.Imagem} alt="" />
                            <p className="Service-Name">{produto.Nome}</p>
                            <button id={produto.id} className="ButtonBuy" onClick={selectproduct}>Ver mais</button>
                            {/* <a className="ButtonBuy"  >Ver Produto</a> */}
                        </div>

                    )}
                </div>
            </div>
        )
    }
}
export default Products;
