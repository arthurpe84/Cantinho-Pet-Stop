import './TopBar.css'

import img_insta from './assets/instagram.svg'
import img_fb from './assets/facebook.svg'
import img_Twitter from './assets/twitter.svg'
import React from 'react';

function menushow() {
    console.log('!');
    let menuMobile = document.getElementsByClassName('menumob');
    menuMobile[0].classList.toggle('active')
    menuMobile[1].classList.toggle('active')
}


export function Topbar() {
    return (
        <div className='Topbar'>
            <nav className='buttonstop'>
                <div className='mobile-menu' onClick={menushow}>
                    <div className='line'></div>
                    <div className='line2'></div>
                    <div className='line3'></div>
                </div>
                <div className=''></div>
                <ul className='links menumob'>
                    <li className='btnTopBar'><a href="/">Pagina Inicial</a></li>
                    <li className='btnTopBar'><a href="/about">Sobre</a></li>
                    <li className='btnTopBar'><a href="/services">Nossos Serviços</a></li>
                    <li className='btnTopBar'><a href="/products">Produtos</a></li>
                    <li className='btnTopBar'><a href="/pets">Adote um Pet</a></li>
                    <li className='btnTopBar'><a href="/perguntas-frequentes">Perguntas Frequentes</a></li>
                    <li className='btnTopBar' id='btnlogin'><a href="/login">Login</a></li>
                </ul>
                <div className='SocialMidias menumob'>
                    <button className='ButtonsMidias'>
                        <a href="https://cantinhopetstop.wixsite.com/cantinhopetstop/pt" className='imgsocialmedia'>
                            <img src={img_insta} alt="Logo do Instagram" className='midiaslogo' />
                        </a>
                    </button>
                    <button className='ButtonsMidias'>
                        <a href="https://cantinhopetstop.wixsite.com/cantinhopetstop/pt" className='imgsocialmedia'>
                            <img src={img_fb} alt="Logo do Facebook" className='midiaslogo' />
                        </a>
                    </button>
                    <button className='ButtonsMidias'>
                        <a href="https://cantinhopetstop.wixsite.com/cantinhopetstop/pt" className='imgsocialmedia'>
                            <img src={img_Twitter} alt="Logo do Twitter" className='midiaslogo' />
                        </a>
                    </button>
                </div>
            </nav>
        </div>
    )
}
