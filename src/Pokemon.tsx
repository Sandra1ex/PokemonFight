import React, { useEffect, useState } from 'react';
import FightModal from './FightModal';
import { Pok } from './types/types'

interface IPokemon {
  pokemon: Pok,
  oponentsArray: Array<Pok> | undefined,
}
const Pokemon = ({ oponentsArray, pokemon }: IPokemon): JSX.Element => {
  const [playSound, setPlaySound] = useState<boolean>(false);
  const [audioElement, setAudioElement] = useState<any>(null);
  const [showFightModal, setShowFightModal] = useState<boolean>(false);
  const [oponent, setOponent] = useState<Pok>();


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

  useEffect(() => {
    if (oponentsArray) {
      const indexOfAiPokemon = Math.floor(Math.random() * 5);
      setOponent(oponentsArray[indexOfAiPokemon]);
    }
  }, [oponentsArray]);

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
      <div className="card m-3 justify-content-start">
        <p className="card-text">Price: {pokemon?.price}</p>
        <p className="card-text">{pokemon?.name}</p>
        <img src={pokemon?.sprites.front_default} alt="POKEMON" />
        <div className='d-flex justify-content-around'>
          <p className="card-text fs-6">Attack: {' '}{pokemon?.attack}</p>
          <p className="card-text fs-6">Hp: {' '}{pokemon?.hp}</p>
        </div>
        {pokemon?.price !== "free" ?
          <button className="custom-button">Buy it!</button> :
          <button className="custom-button" onClick={handleClick}>Choose ur destiny!</button>}
      </div>
      <FightModal oponent={oponent} pokemon={pokemon} showFightModal={showFightModal} handleClose={handleClose} />
    </>
  )
}
export default Pokemon