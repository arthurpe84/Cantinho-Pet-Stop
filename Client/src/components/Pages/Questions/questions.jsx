import './questions.css'
import react, { Component } from 'react'
import API from '../../API/API.JSX';
import { Navigate } from "react-router-dom";
import Copyright from '../../Rodape/Copyright'

var all = []
var Perguntas = []
var Respostas = []
function Perguntar() {
    let el = document.getElementById('formquestion')
    if (el.style.display == 'none') { el.style.display = 'flex' } else { el.style.display = 'none' }
}


async function EnviarPergunta(Pergunta) {
    let el = document.getElementById('resposta')
    if (el.style.display == 'none') { el.style.display = 'flex' } else { el.style.display = 'none' }
}
const handleEnterkey = async (key) => {
    if (key.key == 'Enter') {
        let pergunta = document.querySelector('#pergunta')
        API.post('/questions/newquestions', { Pergunta: pergunta.value, Type: 'P' }).then((response) => {
            alert(response.data.mensagem)
            window.location.reload()
        })
    }

};
const handleEnterkeyadmin = (btn) => {
    let idinpuit = btn.target.id
    let resposta = document.getElementById(`${idinpuit}`)
    let value = resposta.value
    console.log('Resposta:' + value)
    console.log(btn.key)
    console.log(btn.key === 'Enter')

    if (btn.key === 'Enter') {
        if (confirm('Deseja responder a esta pergunta ?')) {
            API.post('/questions/newquestions', { Resposta: resposta.value, Type: 'R', Fk: btn.target.id }).then((response) => {

                alert(response.data.mensagem)
                window.location.reload()
            })

        }
    }
};

const hiddenPergunta = (btn) => {
    console.log
    if (confirm('Deseja ocultar esta pergunta ?')) {
        API.patch('/questions/hidden', { id: btn.target.id }).then((response) => {
            alert(response.data.mensagem)
            window.location.reload()
        })
    }
};

const deletePergunta = (btn) => {
    if (confirm('Deseja excluir esta pergunta ?')) {
        API.patch('/questions/delete', { id: btn.target.id }).then((response) => {
            alert(response.data.mensagem)
            window.location.reload()
        })
    }
};

class Questions extends Component {
    //export default function Questiopns() {
    state = {
        questions: [],
        Respostas: []
    }
    async componentDidMount() {
        let Usuario = localStorage.getItem('Usuario')
        let aux = JSON.parse(Usuario)
        if (Usuario !== null) {
            if (aux.Usuario == '@') {
                if (this.state.questions == 0) {
                    let response = await API.get('/questions/admin');
                    this.setState({ questions: response.data.Questions })
                    this.setState({ questions: response.data.Respostas })

                    all = response.data.Questions
                    all.forEach(element => {
                        if (element.RorP == 'P') {
                            all.forEach(element2 => {
                                if (element2.Fk !== '') {
                                    if (element.id == element2.Fk) {
                                        if (element2.status == 0) {
                                            element.Resposta = element2.Resposta
                                        }
                                    }
                                }
                            })
                        }
                    });
                }
            } else {
                if (this.state.questions == 0) {
                    let response = await API.get('/questions');
                    this.setState({ questions: response.data.Questions })
                    this.setState({ questions: response.data.Respostas })

                    all = response.data.Questions
                    all.forEach(element => {
                        if (element.RorP == 'P') {
                            console.log('entrou')
                            all.forEach(element2 => {
                                if (element2.Fk !== '') {
                                    if (element.id == element2.Fk) {
                                        element.Resposta = element2.Resposta
                                    }
                                }
                            })
                        }
                    });
                }
            }
        } else {
            if (this.state.questions == 0) {
                let response = await API.get('/questions');
                this.setState({ questions: response.data.Questions })
                this.setState({ questions: response.data.Respostas })

                all = response.data.Questions
                all.forEach(element => {
                    if (element.RorP == 'P') {
                        console.log('entrou')
                        all.forEach(element2 => {
                            if (element2.Fk !== '') {
                                if (element.id == element2.Fk) {
                                    element.Resposta = element2.Resposta
                                }
                            }
                        })
                    }
                });
            }
        }
    }

    render() {
        //var result = this.state.questions;
        if (Perguntas.length == 0) {
            all.forEach(element => {
                if (element.RorP == 'P') {
                    Perguntas.push(element)
                }
            });
        }
        if (Respostas.length == 0) {
            all.forEach(element => {
                if (element.RorP == 'R') {
                    if (element.status == 0) {
                        Respostas.push(element)
                    }
                }
            });
        }
        console.log(all)
        console.log(Perguntas)
        console.log(Respostas)
        let Usuario = localStorage.getItem('Usuario')
        let aux = JSON.parse(Usuario)
        console.log(Usuario)
        if (Usuario !== null) {
            if (aux.Usuario == '@') {
                return (
                    <div className='Questions'>
                        <h2>Perguntas Frequentes</h2>
                        <p>Administrador</p>
                        <br />

                        {Perguntas.map(pergunta =>
                            <div className='question'>
                                <span className='Pergunta'>{pergunta.Pergunta}</span>
                                <p>{pergunta.Resposta}</p>
                                <div id='resposta' key={pergunta.id}>
                                    <div>
                                        <input name={pergunta.id} id={pergunta.id} type="text" placeholder='Resposta' required onKeyDown={handleEnterkeyadmin} />
                                        <button className='submit-form' id={pergunta.id} onClick={hiddenPergunta}>Ocultar Pergunta</button>
                                        <button className='submit-form' id={pergunta.id} onClick={deletePergunta}>Excluir Pergunta</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    <Copyright/>
                    </div>
                )
            }
        }
        return (
            <div className='Questions'>
                <h2>Perguntas Frequentes</h2>
                <br />

                {Perguntas.map(pergunta =>
                    <div className='question'>
                        <span className='Pergunta'>{pergunta.Pergunta}</span>
                        <p>{pergunta.Resposta}</p>
                    </div>
                )}
                <div className='FormQuestions'>
                    <span onClick={Perguntar}><h3>Fazer Pergunta</h3></span>
                    <div id='formquestion' style={{ display: 'none' }}>
                        <br />
                        <div>
                            <label htmlFor="pergunta">Pergunta</label>
                            <input name='pergunta' id='pergunta' maxLength='320' type="text" placeholder='Qual a sua duvida ?' required onKeyDown={handleEnterkey} />
                        </div>
                    </div>
                </div>
<Copyright/>
            </div>
        )


    }
}
export default Questions