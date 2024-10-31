import React from 'react'
import { AjouterProduits } from './AjouterProduits'
import { AjouterRecettes } from './AjouterRecettes'
import { Produits } from './Produits'
import { Recettes } from './Recettes'
import { RecettesAvailable } from './RecettesAvailable'

export const MonFrigo = () => {
  return (
    <div>
        Mon Frigo
        <Recettes />
        <Produits />
        <RecettesAvailable />
        <AjouterProduits />
        <AjouterRecettes />
    </div>
  )
}

