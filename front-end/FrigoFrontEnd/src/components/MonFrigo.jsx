import React from 'react'
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
    </div>
  )
}

