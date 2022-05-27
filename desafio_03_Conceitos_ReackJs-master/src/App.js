import React, { useState, useEffect } from "react";
import { IoIosAdd } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";

import api from './services/api';

import "./styles.css";
import "./App.css";

function App() {

  const [repositories, setRepositories] = useState([]);


  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      "url": "https://github.com/Rocketseat/umbriel",
      "title": `Rebeca ${Date.now()}`,
      "techs": ["React", "ReactNative", "TypeScript", "ContextApi"]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div className="profile-container">

      <button type="button" onClick={handleAddRepository}>
        <IoIosAdd size={28} color="#E02041" />
        Adicionar
      </button>


      <h1>Casos Cadastrados</h1>


      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>

            <strong>{repository.url}</strong>
            <p>{repository.title}</p>

            <button typpe="button" onClick={() => handleRemoveRepository(repository.id)}>
              <FiTrash2 size={20} color="#E02041" />
              Remover
            </button>
          </li>
        )}
      </ul>


    </div>
  );
}

export default App;
