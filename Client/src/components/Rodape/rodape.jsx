import React from 'react'
import './rodape.css'

import Copy from "./Copyright"

export function Rodape() {
    return (
        <div>
            <div className='separador'><h3>Entre em contato conosco:</h3></div>

            <div className='Rodape'>


                <div className='contactpage'>
                    <h3>ENTRE EM CONTATO</h3>
                    <p>Av. Alfredo Lisboa - Recife, Pe, 50030-150, Brasil</p>
                    <a href="mailto:cantinhopetstop@gmail.com">cantinhopetstop@gmail.com</a>
                    <a data-auto-recognition="true" href="tel:81999006237">(81) 99900-6237</a>
                </div>

                <div id='formhome'>
                    <form action="https://formsubmit.co/weslleysantosdev@gmail.com" method="POST" preventDefault>
                        <div className='grp'>
                            <div classname="_sub">
                                <label htmlFor="Nome">Nome*</label>
                                <input type="text" name="Nome" id="Nome" required />
                            </div>
                            <div classname="_sub">
                                <label htmlFor="Email">Email*</label>
                                <input type="text" name="Email" id="Email" required />
                            </div>
                        </div>
                        <div className='grp'>
                            <div classname="_sub">
                                <label htmlFor="">Telefone*</label>
                                <input type="text" name="Telefone" id="Telefone" required />
                            </div>
                            <div classname="_sub">
                                <label htmlFor="">Endereco</label>
                                <input type="text" name="Endereco" id="Endereco" />
                            </div>
                        </div>

                        <div classname="_sub">
                            <label htmlFor="Assunto">Assunto</label>
                            <input type="text" name="_subject" id="Assunto"></input>
                        </div>
                        <div classname="_sub" id='message'>
                            <label htmlFor="Mensagem">Mensagem</label>
                            <textarea name="Mensagem" id="Mensagem" cols="30" rows="10"></textarea>
                        </div>
                        {/* <input type="hidden" name="_next" value="http://localhost:5173/"></input>
                        <input type="hidden" name="_captcha" value="false"></input> */}
                        <button className='submit-form' type='submit' > Enviar</button>
                    </form>
                    {/* <div id='formsubmit'>
                        <button className='btnSubmit'> Enviar</button>

                    </div> */}
                </div>
            </div>
            <Copy></Copy>
        </div>
    )
}