import React from 'react';

export const AjouterProduits = () => {
  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    console.log("e", form)
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson)

    fetch('http://localhost:3093/ajouterproduits', {
      method: form.method, 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formJson)
    });
  }

return (
    <div>
      <h2>Ajouter un Produit</h2>
      <form method='post' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='nom'>Nom :</label>
          <input 
            type="text" 
            id="nom" 
            name='nom' required
            minLength="4"
            maxLength="18"
            size="10"
          />
        </div>
        <div>
          <label>Quantité :</label>
          <input 
            type="number" 
            name='quantite' required
            maxLength="40"
            size="10"
          />
        </div>
        <div>
          <label htmlFor='date_expiration'>Date d'Expiration :</label>
          <input 
            type="date" 
            name='date_expiration' required
            size="10"
          />
        </div>
        <div>
          <label>Catégorie :</label>
          <input 
            type="text" 
            id="categorie" 
            name='categorie' required
            minLength="4"
            maxLength="18"
            size="10"
          />
        </div>
        <button type="submit">Ajouter Produit</button>
      </form>
    </div>
  );
};
