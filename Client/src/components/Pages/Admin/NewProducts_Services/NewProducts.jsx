import react, { Component } from 'react';
import { useNavigate } from "react-router-dom";
import API from '../../../API/API.JSX';
import './NewProducts.css';


function selectproduct(product) {
    // console.log(product.target.id)
    let Product = product.target.id
    localStorage.setItem('IdProduct', Product)
    window.location.href = "http://localhost:5173/productadmin/" + Product
}
class AdminProducts extends Component {
    state = {
        productsinfo: [],
    }

    async componentDidMount() {
        let token = localStorage.token
        if (this.state.productsinfo.length === 0) {
            try {
                const response = await API.post('/products/admin', { token: token }); this.setState({ productsinfo: response.data.Produtos });
                console.log(this.state.productsinfo)
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
        var Products = [];
        var Services = [];
        this.state.productsinfo.forEach(prodserv => {
            if(prodserv.ProdutoServico =='P'){
                Products.push(prodserv);
            }else{
                Services.push(prodserv)
}
        });
        
        return (
            <div id='NovosProdutos'>
                <h2>Produtos</h2>

                {Products.map(produto => <div key="{produto.idPet}" className='Card'>

                    <span className='infopets' >
                        <div className='CardAnimal'>
                            <a href={'/productadmin/' + produto.id} >
                                <img className='img' src={produto.Imagem} alt="" />
                            </a>

                            <div className='infopet'>

                                <ul>
                                    <h3>{produto.Nome.substring(0,24) + '...'}</h3>
                                    <p>{produto.Fornecedor}</p>
                                    <li> R$ {produto.Preco}</li>
                                    <li>Id Fornecedor : {produto.idFornecedor}</li>

                                </ul>
                                <button className='btnSubmit'
                                id={produto.id}
                                onClick={selectproduct}>
                                    Quero Conhecer
                                </button>

                            </div>
                        </div>
                    </span>
                </div>)}

                <h2>Serviços</h2>
                {Services.map(produto => <div key="{Services.idPet}" className='Card'>

                    <span className='infopets' >
                        <div className='CardAnimal'>
                            <a href={'/productadmin/' + produto.id} >
                                <img className='img' src={produto.Imagem} alt="" />
                            </a>

                            <div className='infopet'>

                                <ul>
                                    <h3>{produto.Nome}</h3>
                                    <p>{produto.Fornecedor}</p>
                                    <li> R$ {produto.Preco}</li>
                                    <li>Id Fornecedor : {produto.idFornecedor}</li>

                                </ul>
                                <button className='btnSubmit'
                                id={produto.id}
                                onClick={selectproduct}>
                                    Quero Conhecer
                                </button>

                            </div>
                        </div>
                    </span>
                </div>)}

            </div>
        )
    }
}
export default AdminProducts
