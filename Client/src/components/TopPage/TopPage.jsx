import React from 'react'
import './TopPage.css'

import Logo from '../../assets/logopage.png'


export function TopPage() {
    return (
        <div className='TopPage'>
            <div>
                <div className="LogoPage">
                    <a href="/">
                        <img className='logopng' src={Logo} alt="Logo" />
                    </a>
                </div>
                <>
                </>

                <div className="SearchBox">
                    <input type="text" name="Procurar" id="Search" placeholder='Pesquisar' />
                </div>
</div>
        </div>
    )
}