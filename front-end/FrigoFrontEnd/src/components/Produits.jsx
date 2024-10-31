import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const Produits = () => {
  const [mesproduits, setMesproduits] = useState([]);
  // const [mesrecettes, setMesrecettes] = useState([]);

  async function getProduits() {
  try {
    const response = await axios.get('http://localhost:3093/produits');
    console.log(response.data);
    setMesproduits(response.data);

  } catch (error) {
    console.error(error);
  }
}

useEffect(() => {
  console.log("test")
  getProduits();
},[])

  return (
    <div>
      <h2>Produits</h2>
      <div>
        {mesproduits.map((monproduit) => (
          <p key={monproduit.id}>{monproduit.nom}</p>
        ))}
      </div>

      {/* <h2>Recettes</h2>
      <div>
        {mesrecettes.map((marecette) => (
          <p key={marecette.id}>{marecette.nom} - {marecette.instructions} </p>
        ))}
      </div> */}
    </div>
  );

};