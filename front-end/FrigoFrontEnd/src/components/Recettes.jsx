import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const Recettes = () => {
  const [mesrecettes, setMesrecettes] = useState([]);

  async function getRecettes() {
  try {
    const response = await axios.get('http://localhost:3093/recettes');
    console.log(response.data);
    setMesrecettes(response.data);

  } catch (error) {
    console.error(error);
  }
}

useEffect(() => {
  console.log("test")
  getRecettes();
},[])

  return (
    <div>
      <h2>Recettes</h2>
      <div>
        {mesrecettes.map((marecette) => (
          <p key={marecette.id}>{marecette.nom} - {marecette.instructions} </p>
        ))}
      </div>
    </div>
  )
}
