import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const Produits = () => {
  const [mesproduits, setMesproduits] = useState([]);

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
<div>Produits 
  <div>{mesproduits.map((monproduit)=>(
    <p key={monproduit.id}>{monproduit.nom}</p>
    
  ))}</div>
</div>
  )
};