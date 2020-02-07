import React, { useState, useEffect } from 'react';
import './app.css';
import './global.css';
import './sideBar.css';
import './main.css';

import api from './services/api';

function App() {

  const [devs, setDevs] = useState([])
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [github_user, setGithubUser] = useState();
  const [techs, setTechs] = useState();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      const { latitude, longitude } = position.coords;
      setLatitude(latitude);
      setLongitude(longitude);


    },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      })
  }, []);

  useEffect(() => {
    async function loadDev() {
      const response = await api.get('/devs');
      setDevs(response.data)
    }
    loadDev();
  }, []);
  async function handleAddDev(e) {
    e.preventDefault();
    const response = await api.post('/devs', {
      latitude,
      longitude,
      github_user,
      techs,
    })
    setGithubUser('');
    
    setTechs('');
    setDevs([...devs,response.data]);

  }
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>

        <form onSubmit={handleAddDev}>
          <div className="input-block">
            <label htmlFor="github_user">Usuário do github</label>
            <input name="github_user" id="github_user" required
              value={github_user}
              onChange={e => setGithubUser(e.target.value)}
            />
          </div>
          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input name="techs" id="techs" required
              value={techs}
              onChange={e => setTechs(e.target.value)}
            />
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">latitude</label>
              <input type="number" name="latitude" id="latitue" required value={latitude}
                onChange={e => setLatitude(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="longitude">longitude</label>
              <input type="number" name="longitude" id="longitude" required value={longitude}
                onChange={e => setLongitude(e.target.value)} />
            </div>
          </div>
          <button type="submit">Salvar</button>
        </form>
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
          <li key={dev.id} className="dev-item">
            <header>
              <img src={dev.avatar_url} alt={dev.name} />
              <div className="user-info">
                <strong>{dev.name}</strong>
                <span>{dev.techs}</span>
              </div>
            </header>
            <p>{dev.bio}</p>

            <a href={`https://github.com/${dev.github_user}`}>Acessar o perfil do github</a>

          </li>))}

        </ul>

      </main>
    </div>

  );
}

export default App;
