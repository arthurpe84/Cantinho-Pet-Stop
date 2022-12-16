import "./NewProducts.css"

import react, { Component } from 'react'
import API from '../../../API/API.JSX';
import { Navigate } from "react-router-dom";
import wpp from '../../../../assets/whatsapp_Svg.svg'


var te = 0
var link = document.location.href
var IdProduct = ''
link = link.split('/')
const idPet = link[4]
var thisproduct = []
IdProduct = idPet


async function Aprove(IdProduct) {
    if (confirm("Deseja Realmente aprovar o cadastro deste produto ? " + '\n' + thisproduct.Nome)) {
        try {
            await API.patch('/products/release', { id: thisproduct.id }).then((response) => {
                var response = response.data.Mensagem
                alert(response)
                window.location.replace('/releaseProducts')
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

async function Remove(IdProduct) {
    let mensagem = ''
    if (thisproduct.ProdutoServico == 'P') { mensagem = 'Deseja Realmente Excluir o cadastro deste produto ?' } else { mensagem = 'Deseja Realmente Excluir o cadastro deste Serviço ?' }
    if (confirm(mensagem + '\n' + thisproduct.Nome)) {
        try {
            await API.delete('/products/delete/' + thisproduct.id).then((response) => {
                var response = response.data.Mensagem
                alert(response)
                window.location.replace('/releaseProducts')
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

class OneProductAdmin extends Component {
    state = {
        infoproducts: [],
    }

    async componentDidMount() {
        if (this.state.infoproducts.length === 0) {
            const response = await API.post('/Products/' + IdProduct);
            this.setState({ infoproducts: response.data.Produtos[0] });
            thisproduct = response.data.Produtos[0]
            te++
        }

        console.log(te)
    }
    render() {
        var Products = this.state.infoproducts;
        var aux, Variacoes = []
        if (Products.Tamanhos == 'S') {
            if (Products.Tamanho) {
                Products.Tamanho = Products.Tamanho.toUpperCase()
                aux = Products.Tamanho.split('/')
                aux.forEach(element =>
                    Variacoes.push(element)
                );
            }
            if (Products.Volume != '') {
                Products.Volume = Products.Volume.toUpperCase()
                if ((Products.Volume).includes('L')) {
                    aux = Products.Volume.replace('L', '').split('/')
                    aux.forEach(element =>
                        Variacoes.push(element + "L")
                    );
                }
                if ((Products.Volume).includes('ML')) {
                    aux = Products.Volume.replace('ML', '').split('/')
                    aux.forEach(element =>
                        Variacoes.push(element + "ml")
                    );
                }
            }
            if (Products.Peso !== '') {
                Products.Peso = Products.Peso.toUpperCase()
                if ((Products.Peso).includes('KG')) {
                    aux = Products.Peso.replace('KG', '').split('/')
                    aux.forEach(element =>
                        Variacoes.push(element + "Kg")
                    );
                } else if ((Products.Peso).includes('G')) {
                    aux = Products.Peso.replace('G', '').split('/')
                    aux.forEach(element =>
                        Variacoes.push(element + "G")
                    );
                }
            }
        }

        if (Products.Tamanhos !== 'N') {
            return (
                <div className="ProductPage">

                    <div key={Products.id} className="ProductSelect">
                        <div className="Prod">
                            <img className="ImgProduct" src={Products.Imagem} alt="Cama para animais de estimação" />
                            <br />
                            <p className="Produto-Desc">{Products.Descricao}</p>
                            <br />
                        </div>
                        <div className="info-Produto">
                            <h2 className="Produto-Name">{Products.Nome}</h2>
                            <p>{Products.Fornecedor}</p>
                            <br />
                            <p className="Produto-Value">R$ {Products.Preco}</p>
                            <select name="" id="SelectVariations">
                                <option value="">Veja as Variações</option>
                                {Variacoes.map(tamanho =>
                                    <option key={tamanho}>{tamanho}</option>
                                )}
                            </select>

                            <button id='contactFonecedor'><a id='link-Wpp' href={'https://api.whatsapp.com/send?phone=55' + Products.Fone + '&text=Olá!%20Vim%20através%20do%20Cantinho%20Pet%20Stop%20Gostaria%20de%20Saber%20mais%20sobre%20o%20produto%20' + Products.Nome} target={'_blank'}>Conversar com vendedor <img src={wpp} alt="whatsapp link" /></a></button>
                            <div id='adminbtns'>
                                <button className='btnSubmit adminbtn' id='approve' onClick={Aprove} >Aprovar</button>
                                <button className='btnSubmit adminbtn' id='delete' onClick={Remove} >Excluir</button>
                            </div>

                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className="ProductPage">
                <div key={Products.id} className="ProductSelect">
                    <div className="Prod">
                        <img className="ImgProduct" src={Products.Imagem} alt="Cama para animais de estimação" />
                        <br />
                        <p className="Produto-Desc">{Products.Descricao}</p>
                        <br />
                    </div>
                    <div className="info-Produto">
                        <h2 className="Produto-Name">{Products.Nome}</h2>
                        <p>{Products.Fornecedor}</p>
                        <br />
                        <p className="Produto-Value">R$  {Products.Preco}</p>
                        <button id='contactFonecedor'><a id='link-Wpp' href={'https://api.whatsapp.com/send?phone=55' + Products.Fone + '&text=Olá!%20Vim%20através%20do%20Cantinho%20Pet%20Stop%20Gostaria%20de%20Saber%20mais%20sobre%20o%20produto%20' + Products.Nome} target={'_blank'}>Conversar com vendedor <img src={wpp} alt="whatsapp link" /></a></button>
                        <div id='adminbtns'>
                            <button className='btnSubmit adminbtn' id='approve' onClick={Aprove} >Aprovar</button>
                            <button className='btnSubmit adminbtn' id='delete' onClick={Remove} >Excluir</button>
                        </div>
                    </div>
                </div>


            </div>
        )

    }
}
export default OneProductAdmin;






//=====================================================================================================================================================

// return (
//     <div className="ProductPage">

//         <div key={Products.id} className="Product">
//             <img className="ImgProduct" src={Products.Imagem} alt="" />
//             <div className="info">
//                 <p className="Produto-Name">{Products.Nome}</p>
//                 <br />
//                 <p className="Produto-Desc">{Products.Descricao}</p>
//                 <br />
//                 <p className="Produto-Value">R$  {Products.Preco}</p>
//                 <select name="" id="SelectVariations">
//                     <option value="">Veja as Variações</option>
//                     {Variacoes.map(tamanho =>
//                         <option key={tamanho}>{tamanho}</option>
//                     )}
//                 </select>

//                 <button id='contactFonecedor'> <a id='link-Wpp' href={'https://api.whatsapp.com/send?phone=55' + Products.Fone + '&text=Olá!%20Vim%20através%20do%20Cantinho%20Pet%20Stop%20Gostaria%20de%20Saber%20mais%20sobre%20o%20produto%20' + Products.Nome} target={'_blank'}>Conversar com vendedor <img src={wpp} alt="whatsapp link" /></a></button>
//                 <button className='btnSubmit admin' id='approve' onClick={Aprove} >Aprovar</button>
//             </div>
//         </div>
//     </div>
// )
// }
// return (
// <div className="ProductPage">
//     <div key={Products.id} className="Product">
//         <img className="ImgProduct" src={Products.Imagem} alt="" />
//         <div className="info">
//             <p className="Produto-Name">{Products.Nome}</p>
//             <br />
//             <p className="Produto-Desc">{Products.Descricao}</p>
//             <br />
//             <p className="Produto-Value">R$  {Products.Preco}</p>
//             <button id='contactFonecedor'>Conversar com vendedor <a id='link-Wpp' href={'https://api.whatsapp.com/send?phone=55' + Products.Fone + '&text=Olá!%20Vim%20através%20do%20Cantinho%20Pet%20Stop%20Gostaria%20de%20Saber%20mais%20sobre%20o%20produto%20' + Products.Nome} target={'_blank'}><img src={wpp} alt="whatsapp link" /></a></button>
//             <button className='btnSubmit' id='approve' onClick={Aprove} >Aprovar</button>
//         </div>
//     </div>


// </div>
// )

