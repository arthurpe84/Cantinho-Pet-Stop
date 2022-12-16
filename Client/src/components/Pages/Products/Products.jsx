import "./Products.css"
import Arrow from "./assets/right-arrow-svgrepo-com.svg"

import react, { Component } from 'react'
import API from '../../API/API.JSX';
import { useNavigate } from "react-router-dom";




function selectproduct(product) {
    // console.log(product.target.id)
    let Product = product.target.id
    localStorage.setItem('IdProduct', Product)
    window.location.href = "http://localhost:5173/produtos/" + Product
}

function MovetoRight() {
    var product = document.getElementsByClassName('Product')[0]
    document.getElementsByClassName('Product').scrollx(0, 20)

}
function MovetoLeft() {

}
class Products extends Component {
    state = {
        infoproducts: [],
    }

    async componentDidMount() {
        if (this.state.infoproducts == 0) { const response = await API.get('/Products'); this.setState({ infoproducts: response.data.Produtos }); }

    }

    render() {
        var Products = this.state.infoproducts;

        return (
            <div id="productshome">

                <a classname="showAll" href="/products">Mostrar Todos</a>
                <div className="Products">
                    {Products.map(produto =>
                        <div key={produto.id} className="Product" >
                            <img id={produto.id} className="ImgProduct" onClick={selectproduct} src={produto.Imagem} alt="Imagem de um produto" />
                            <p className="Produto-Name" >{produto.Nome.substring(0, 50) + "..."}</p>
                            <p className="Produto-Value">R$  {produto.Preco}</p>
                            <button id={produto.id} className="ButtonBuy" onClick={selectproduct}>Ver Produto</button>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
export default Products;
