import React from 'react';
import'./styles.css';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

export default function Logon() {

  const [id,setId] = React.useState('');
  const history = useHistory();

  async function handleLogin(event) {
    event.preventDefault();

    try {
      const response = await api.post('session',{id});
      localStorage.setItem('ongId',id);
      localStorage.setItem('ongName',response.data.name);
      history.push('/profile');
    } catch (err) {
      alert('Não foi possível encontrar a ONG')
    }

  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero"/>
        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>
          <input placeholder="Sua ID" value={id} onChange={(e)=>setId(e.target.value)}/>
          <button className="button" type="submit">Entrar</button>
          <Link className="back-link" to="/register"><FiLogIn size={16} color="#e02041"/>Não tenho cadastro</Link>
        </form>
      </section>
      <img src={heroesImg} alt="Heroes"/>
    </div>
  );
}
