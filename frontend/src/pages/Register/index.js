import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import {FiArrowLeft} from 'react-icons/fi';
import './styles.css';
import api from '../../services/api';

export default function Register() {

  const [name,setName] = React.useState('');
  const [email,setEmail] = React.useState('');
  const [whatsapp,setWhatsapp] = React.useState('');
  const [city,setCity] = React.useState('');
  const [uf,setUf] = React.useState('');

  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();
    const data = {name,email,whatsapp,city,uf};
    try {
      const response = await api.post('ong',data);
      alert(`Seu ID de acesso ${response.data.id}`);
      history.push('/');
    } catch (err) {
      alert('Erro ao salvar os dados');
    }
  }

  return (
    <div className="register-container">
        <div className="content">
            <section>
                <img src={logoImg} alt="Be The Hero"/>
                <h1>Cadastro</h1>
                <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontratem os casos da sua ONG.</p>
                <Link className="back-link" to="/"><FiArrowLeft size={16} color="#e02041"/>Já tenho cadastro</Link>
            </section>
            <form onSubmit={handleSubmit}>
              <input placeholder="Nome da ONG" value={name} onChange={(e)=>setName(e.target.value)}/>
              <input type="email" placeholder="E-mail" value={email} onChange={(e)=>setEmail(e.target.value)}/>
              <input placeholder="Whatsapp" value={whatsapp} onChange={(e)=>setWhatsapp(e.target.value)}/>
              <div className="input-group">
                <input placeholder="Cidade" value={city} onChange={(e)=>setCity(e.target.value)}/>
                <input placeholder="UF" style={{width: 80}} value={uf} onChange={(e)=>setUf(e.target.value)}/>
              </div>
              <button className="button" type="submit">Cadastrar</button>
            </form>
        </div>    
    </div>
  );
}
