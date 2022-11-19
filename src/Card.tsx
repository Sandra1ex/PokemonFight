import React, { useEffect, useState } from 'react'
import Pokemon from './Pokemon';
import { Poke, Data } from './types/types';


const Card = (): JSX.Element => {
  const [poks, setPok] = useState<Data>();
  // console.log(poks);
  
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=40`)
      .then((res) => res.json())
      // .then((json) => console.log(json))      
      .then((json) => setPok(json))
  },[]);

  return (
    <div>
      <div className="d-flex flex-wrap songBlock">
        {poks?.results.map((poke: Poke, idx) => (
          <Pokemon name={poke.name} url={poke.url} key={idx}/>
        ))}
      </div>
    </div>
  )
}

export default Card