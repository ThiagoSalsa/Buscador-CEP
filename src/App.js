import {useState} from 'react';
import {FiSearch} from 'react-icons/fi'
import './styles.css';
import api from './services/api';


function App() {

  const[input, setInput] = useState('')
  const[cep,setCep] = useState({});

  async function handleSearch(){
    if(input === ''){
      alert("preencha com algum cep!")
      return;
    }
    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("")

    } catch{
      alert("Ops erro ao buscar")
      setInput("")
    }
  }

  return (
    <div className="container">
      <h1 className="title"> Buscador CEP</h1>

      <div className="containerInput">

        <input type="text" placeholder="Digite seu CEP..." value={input} onChange={(evento) => setInput(evento.target.value)}/>

        <button className="buttonSearch"><FiSearch size={25} color='#d3d3d3' onClick={handleSearch} /></button>
        

      </div>

      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>
          <span>Logradouro: {cep.logradouro}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Cidade: {cep.localidade}</span>
          <span>Estado: {cep.uf} / ddd:{cep.ddd}</span>

        </main>
      )}

      
    </div>
  );
}

export default App;
