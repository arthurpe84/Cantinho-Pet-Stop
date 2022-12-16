import react, { Component } from 'react';
import { useNavigate } from "react-router-dom";
import API from '../../API/API.JSX';
import './Products';
import Copyrigth from "../../Rodape/Copyright";

function selectProd(product) {
    // console.log(product.target.id)
    let Product = product.target.id
    window.location.href = "http://localhost:5173/produtos/" + Product
}
export default class ProductsPage extends Component {
    state = {
        Productsinfo: [],
    }

    async componentDidMount() {
        if (this.state.Productsinfo.length === 0) {
            const response = await API.post('/products'); this.setState({ Productsinfo: response.data.Produtos });

        }
    }

    render() {
        var Produtos = []
        this.state.Productsinfo.forEach(produto => {
            produto.Nome = produto.Nome.substring(0,30) 
            Produtos.push(produto)
        });
        console.log(Produtos)

        return (
            <div id='NossosProdutos'>
                <div>

                    <h1>Produtos</h1>
                    {Produtos.map(produto => <div key="{Services.idPet}" className='Card'>

                        <span className='infoprodutos' >
                            <div className='CardProduto'>
                                <a href={'/produtos/' + produto.id} >
                                    <img className='img' src={produto.Imagem} alt="" />
                                </a>

                                <div className='InfoProduto'>
                                    <ul>
                                        <h3>{produto.Nome}</h3>
                                        <p>{produto.Fornecedor}</p>
                                    </ul>
                                    <button className='btnSubmit'
                                        id={produto.id}
                                        onClick={selectProd}>
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
