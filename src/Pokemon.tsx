import React, { useEffect, useState } from 'react';
import FightModal from './FightModal';
import { Pok } from './types/types'

interface IPokemon {
  pokemon: Pok
}
const Pokemon = ({ pokemon }: IPokemon): JSX.Element => {
  const [playSound, setPlaySound] = useState<boolean>(false);
  const [audioElement, setAudioElement] = useState<any>(null);
  const [showFightModal, setShowFightModal] = useState<boolean>(false);

  useEffect(() => {
    const x: HTMLAudioElement | any = document.createElement("AUDIO");
    if (x.canPlayType("audio/mpeg")) {
      x.setAttribute("src", "mortal-combat.mp3");
    } else {
      x.setAttribute("src", "horse.ogg");
    }
    x.setAttribute("controls", "controls");

    setAudioElement(x);
  }, []);

  useEffect(() => {
    if (audioElement) {
      if (playSound) {
        audioElement.play();
      } else {
        audioElement.pause();
      }
    }
  }, [playSound, audioElement]);

  const handleClick = () => {
    setPlaySound(true);
    setShowFightModal(true);
  }

  const handleClose = () => {
    setShowFightModal(false);
    setPlaySound(false);
  }

  return (
    <>
      <div className="card m-3">
        <p className="card-text">Price: {pokemon?.price}</p>
        <p className="card-text">{pokemon?.name}</p>
        <img src={pokemon?.sprites.front_default} alt="POKEMON" />
        <p className="card-text">Attack: {' '}{pokemon?.attack}</p>
        <p className="card-text">Hp: {' '}{pokemon?.hp}</p>
        {pokemon?.price !== "free" ?
          <button className="custom-button">Buy it!</button> :
          <button className="custom-button" onClick={handleClick}>Choose ur destiny!</button>}
      </div>
      <FightModal pokemon={pokemon} showFightModal={showFightModal} handleClose={handleClose}/>
    </>
  )
}
export default Pokemon