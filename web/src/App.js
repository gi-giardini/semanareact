import React, {useEffect, useState} from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css'

//Componente: bloco (função) isolado de HTMML, CSS e JS, o qual não interfere no restante da aplicação
//Propriedade: informações que um continente pai passa para o componente filho
//Estado: informações mantidas pelos componente (LEMBRAR: imutabilidade)

function App() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [github_username, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    )
  }, []);

  async function handleAddDev(e) {
    e.preventDefault();

    const response = await api.post('/devs', {
      github_username,
      techs,
      latitude,
      longitude,
    })

    console.log(response.data);
  }

  return (
    <div id='app'>
      <aside>
        <strong>Cadastrar</strong>
          <form onSubmit={handleAddDev}>
            <div className='input-block'>
              <label htmlFor="github_username">Usuário do Github</label>
              <input name="github_username" id="github_username" required value={github_username} onChange={e => setGithubUsername(e.target.value)}></input>
            </div>

            <div className='input-block'>
              <label htmlFor="techs">Tecnologias</label>
              <input name="techs" id="techs" required value={techs} onChange={e => setTechs(e.target.value)}></input>
            </div>

            <div className='input-group'>
              <div className='input-block'>
                <label htmlFor="latitude">Latitude</label>
                <input name="latitude" id="latitude" required value={latitude} onChange={e => setLatitude(e.target.value)}></input>
              </div>

              <div className='input-block'>
                <label htmlFor="longitude">Longitude</label>
                <input name="longitude" id="longitude" required value={longitude} onChange={e => setLongitude(e.target.value)}></input>
              </div>
            </div>
            <button type='submit'>Salvar</button>
          </form>
      </aside>

      <main>
        <ul>
          <li className='dev-item'>
            <header>
              <img alt='Feyre' src="https://www.abrafac.org.br/wp-content/uploads/2019/09/icone-perfil.png"></img>
            </header>
            <div className='user-info'>
              <strong>Feyre</strong>
              <span>JavaScript, C#</span>
            </div>
            <p>Desenvolvedora plena backend</p>
            <a href="">Acessar perfil</a>
          </li>

          <li className='dev-item'>
            <header>
              <img alt='Rhysand' src="https://www.abrafac.org.br/wp-content/uploads/2019/09/icone-perfil.png"></img>
            </header>
            <div className='user-info'>
              <strong>Rhysand</strong>
              <span>JavaScript, C#</span>
            </div>
            <p>Desenvolvedor full stack</p>
            <a href="">Acessar perfil</a>
          </li>

          <li className='dev-item'>
            <header>
              <img alt='Feyre' src="https://www.abrafac.org.br/wp-content/uploads/2019/09/icone-perfil.png"></img>
            </header>
            <div className='user-info'>
              <strong>Feyre</strong>
              <span>JavaScript, C#</span>
            </div>
            <p>Desenvolvedora plena backend</p>
            <a href="">Acessar perfil</a>
          </li>

          <li className='dev-item'>
            <header>
              <img alt='Rhysand' src="https://www.abrafac.org.br/wp-content/uploads/2019/09/icone-perfil.png"></img>
            </header>
            <div className='user-info'>
              <strong>Rhysand</strong>
              <span>JavaScript, C#</span>
            </div>
            <p>Desenvolvedor full stack</p>
            <a href="">Acessar perfil</a>
          </li>
        </ul>
      </main>
    </div>
  );
}

export default App;
