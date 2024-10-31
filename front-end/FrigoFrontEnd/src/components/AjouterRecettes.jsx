import React from 'react';

export const AjouterRecettes = () => {
  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    console.log("e", form)
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson)

    fetch('http://localhost:3093/ajouterrecettes', {
      method: form.method, 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formJson)
    });
  }

return (
    <div>
      <h2>Ajouter une Recette</h2>
      <form method='post' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='nom'>Nom :</label>
          <input 
            type="text" 
            id="nom" 
            name='nom' required
            minLength="4"
            maxLength="40"
            size="10"
          />
        </div>
        <div>
          <label>Instructions :</label>
          <input 
            type="test" 
            name='instructions' required
            maxLength="100"
            size="10"
          />
        </div>
        <div>
          <label htmlFor='difficulte'>Difficulté :</label>
          <input 
            type="text" 
            name='difficulte' required
            size="10"
          />
        </div>
        <div>
          <label>Temps de préparation :</label>
          <input 
            type="number" 
            id="temps_preparation" 
            name='temps_preparation' required
            minLength="4"
            maxLength="18"
            size="10"
          />
        </div>

        <div>
          <label>Ingrédients :</label>
          <input 
            type="text" 
            id="ingredients" 
            name='ingredients' required
            minLength="4"
            maxLength="18"
            size="10"
          />
        </div>

        <button type="submit">Ajouter recette</button>
      </form>
    </div>
  );
};