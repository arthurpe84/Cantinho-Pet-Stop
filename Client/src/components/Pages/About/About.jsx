import "./about.css"
import about from "../../../assets/Imagens/about.png"
import Copyright from "../../Rodape/Copyright";


const Home = () => {
    return (
        <div className="App">
            <div className='Sobre'>
                <div className="text">
                    <h1>NOSSA HISTÓRIA</h1>
                    <p >
                        Nosso cantinho pet stop cresceu pelo amor que temos por todos os animais. Temos tudo que você precisa para manter seu bichinho confortável dentro de casa.
                        Entendemos que existe uma ligação especial entre os pets e seus donos e queremos incentivar esse amor.
                        Ser dono de um animal que continuamos confiantes, com isso em mente, assegurando-nos que todos nós somos dignos de responsabilidade, e com isso em mente, com certeza, que venhamos a entender que todos sejam felizes e compreensíveis como pessoas felizes e felizes. Como resultado do nosso trabalho árduo, nossos clientes, como nossos clientes, conquistaram um animal feliz de sua relevância. Adoramos quando eles são suas histórias! Faça uma adoção hoje e veja como é legal ter um bichinho. Procuramos levar todo o cuidado e amor em diversos aspectos, seja através dos nossos cursos, ou através dos produtos que disponibilizamos, para que seu pet e você, se sintam cada vez mais próximos e assim criamos um relacionamento lindo ente você e seu pet.
                    </p>
                    <p>Curta nossa Pagina</p>


                </div>
                <span>
                    <img src={about} alt="" />
                </span>
            </div>
            <Copyright/>
        </div>
    )
};

export default Home;