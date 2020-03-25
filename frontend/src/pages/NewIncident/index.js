import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import {FiArrowLeft} from 'react-icons/fi';
import './styles.css';
import api from '../../services/api';


export default function NewIncident() {
  
  const [title,setTitle] = React.useState('');
  const [description,setDescription] = React.useState('');
  const [value,setValue] = React.useState('');
  
  const history = useHistory();

  const ongId = localStorage.getItem('ongId');

  async function handleNewIncident(event) {
    event.preventDefault();
    const data = {title,description,value};
    try {
      await api.post('incident',data, {
        headers: {
          Authorization: ongId
        }
      });

      history.push('/profile');
    } catch (err) {
      alert('Algum erro ocorreu')
    }
  }

  return (
    <div className="new-incident">
        <div className="content">
            <section>
                <img src={logoImg} alt="Be The Hero"/>
                <h1>Cadastrar novo caso</h1>
                <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                <Link className="back-link" to="/profile"><FiArrowLeft size={16} color="#e02041"/>Voltar</Link>
            </section>
            <form onSubmit={handleNewIncident}>
              <input placeholder="Título do caso" value={title} onChange={(e)=> setTitle(e.target.value)}/>
              <textarea placeholder="Descrição" value={description} onChange={(e)=> setDescription(e.target.value)}/>
              <input placeholder="Valor em R$" value={value} onChange={(e)=> setValue(e.target.value)}/>
              <button className="button" type="submit">Cadastrar</button>
            </form>
        </div>    
    </div>
  );
}
