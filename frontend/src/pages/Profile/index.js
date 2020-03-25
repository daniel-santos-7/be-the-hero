import React from 'react';
import'./styles.css';
import logoImg from '../../assets/logo.svg';
import { FiPower, FiTrash } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

export default function Logon() {
  
  const [incidents,setIncidents] = React.useState([]);
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');
  
  const history = useHistory();

  React.useEffect(()=> {

    api.get('profile', {
      headers: {
        Authorization: ongId
      }
    }).then(({data})=> {

      setIncidents(data);

    });

  },[]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incident/${id}`, {
        headers: {
          Authorization: ongId
        }
      });
      setIncidents(incidents.filter(inc=>inc.id!==id));
    } catch (err) {
      alert('Não foi possível realizar a operação')
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
       <img src={logoImg} alt="Be The Hero"/>
        <span>Bem vinda, {ongName}</span>
        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button onClick={handleLogout}><FiPower size={18} color="#e02041"/></button>
      </header>
      <h1>Casos Cadastrados</h1>
      <ul>
        { incidents.map(incident=> (
          <li key={incident.id}>
            <strong>Caso:</strong>
            <p>{incident.title}</p>
            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>
            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency:'BRL' }).format(incident.value)}</p>
            <button onClick={()=>handleDeleteIncident(incident.id)}><FiTrash size={20} color="#a8a8b3"/></button>
          </li>
        )) }
        
      </ul>
    </div>
  );
}
