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
              <img alt='Feyre' src="https://i.pinimg.com/originals/6b/6a/4d/6b6a4dce0b2797e007715178bf83140a.png"></img>
            </header>
            <div className='user-info'>
              <strong>Feyre</strong>
              <span>JavaScript, C#</span>
            </div>
            <p>Quebradora de Maldições, Grã-Senhora da Corte Noturna</p>
            <a href="https://cursebreakerstuff.tumblr.com/">Acessar perfil</a>
          </li>

          <li className='dev-item'>
            <header>
              <img alt='Rhysand' src="https://vignette.wikia.nocookie.net/cortedeespinhoserosas/images/d/db/Rhysand_by_Merwild_01.jpg/revision/latest?cb=20170908023927&path-prefix=pt-br"></img>
            </header>
            <div className='user-info'>
              <strong>Rhysand</strong>
              <span>JavaScript, C#</span>
            </div>
            <p>Grão-Senhor da Corte Noturna. O mais poderoso de todos os tempos</p>
            <a href="https://cursebreakerstuff.tumblr.com/">Acessar perfil</a>
          </li>

          <li className='dev-item'>
            <header>
              <img alt='Feyre' src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/638c57d2-7ada-4933-99bf-4aad318c057c/ddoqbn5-68dda545-0c7b-4e69-945f-a4e24408fa55.jpg/v1/fill/w_1280,h_1811,q_75,strp/cassian_from_acotar_fanart_by_michelacacciatore_ddoqbn5-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD0xODExIiwicGF0aCI6IlwvZlwvNjM4YzU3ZDItN2FkYS00OTMzLTk5YmYtNGFhZDMxOGMwNTdjXC9kZG9xYm41LTY4ZGRhNTQ1LTBjN2ItNGU2OS05NDVmLWE0ZTI0NDA4ZmE1NS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.J-ZTssL7oVN6NvM_8EZlUQ2A3AEt8DCtynwxJTooO4A"></img>
            </header>
            <div className='user-info'>
              <strong>Cassian</strong>
              <span>JavaScript, C#</span>
            </div>
            <p>Guerreiro Illyriano. Capitão do exército da Corte Noturna.</p>
            <a href="https://cursebreakerstuff.tumblr.com/">Acessar perfil</a>
          </li>

          <li className='dev-item'>
            <header>
              <img alt='Rhysand' src="https://i.pinimg.com/originals/d7/ba/68/d7ba6858d960d9a0f4f1ef59a945b26c.jpg"></img>
            </header>
            <div className='user-info'>
              <strong>Morrigan</strong>
              <span>JavaScript, C#</span>
            </div>
            <p>Responsável por botar a ordem no parqinho que é o círculo íntimo</p>
            <a href="https://cursebreakerstuff.tumblr.com/">Acessar perfil</a>
          </li>        
        </ul>
      </main>
    </div>
  );
}

export default App;
