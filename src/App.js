import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => setRepositories(response.data));
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: "teste",
      url: "http://teste.com",
      techs: ["tech1", "tech2"],
    });

    if (response.status === 200) {
      const repository = response.data;
      setRepositories([...repositories, repository]);
    }
  }

  async function handleRemoveRepository(id) {
    const repositoryIndex = repositories.findIndex(
      (repository) => repository.id === id
    );

    if (repositoryIndex >= 0) {
      const response = await api.delete(`repositories/${id}`);

      if (response.status === 204) {
        setRepositories(
          repositories.filter((repository) => repository.id !== id)
        );
      }
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => {
          return (
            <li key={repository.id}>
              {repository.title}{" "}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
