import './home.css';


import Slider from '../../Slider/Slider copy';
import Pets from '../../CardAnimal/CardAnimal';
import Products from '../Products/Products';
import Services from '../Services/Services';

import { Rodape } from "../..//Rodape/rodape"

import React from 'react';

const Home = () => {
    return (
        <div className="App">
            <Slider></Slider>
            <span className='Welcome'>
                <h1>
                    SEJA MUITO BEM-VINDO(a) AO CANTINHO PET STOP
                </h1>
                <p >
                    No cantinhopetstop utilizamos uma abordagem nova. Venha conhecer os Pets mais adoraveis para você levar para o seu lar
                    e torna-lo um lugar mais aconxegante e ainda mais amável. Temos também uma grande variedade de alimentos e produtos
                    para que eles sejam selecionados e comprados. Sem falar dos diversos cursos que disponibilizamos para enriquecer
                    ainda mais sua experiência com seu Pet. Divirta-se por nosso site e conheça um verdadeiro paraíso para os apaixonados
                    por animais domésticos. Temos os pets mais adoráveis a sua espera, as melhores marcas de comida, brinquedos, suprimentos
                    e muito, muito mais. Faça uma visita hoje — seu animal agradece!
                </p>
                <h2>
                    Adote um animal de estimação
                </h2>
            </span>
            <div className='Cards'>
                <Pets></Pets>
            </div>

            <h2>Produtos</h2>
            <nav className='sliderproducts'>
                <Products></Products>
            </nav>

            <h2>Nossos Serviços</h2>
            <nav className='sliderservices'>
                <Services></Services>
            </nav>

            <Rodape></Rodape>

        </div>
    )
};

export default Home;