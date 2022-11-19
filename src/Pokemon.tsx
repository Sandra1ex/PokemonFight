import React, { useEffect, useState } from 'react';
import { Poke, Pok } from './types/types'

const Pokemon = ({ name, url }: Poke): JSX.Element => {

  const [pok, setPok] = useState<Pok>()
  console.log(pok);

  useEffect(() => {
    fetch(`${url}`)
      .then((res) => res.json())
      // .then((json) => console.log(json))      
      .then((json) => setPok(json))
  }, []);
  return (
    <div className="card m-3">
      <p className="card-text">{name}</p>
      <img src={pok?.sprites.front_default} alt="POKEMON" />
      <p className="card-text">Attack: {' '}{pok?.stats['0'].base_stat}</p>
      <p className="card-text">Hp: {' '}{pok?.stats['1'].base_stat}</p>
    </div>
  )
}

export default Pokemon