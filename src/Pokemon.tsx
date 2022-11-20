import React, { useEffect, useState } from 'react';
import FightModal from './FightModal';
import { Pok } from './types/types'
import { Typography, Card, CardMedia, CardContent, Button, CardActions, Box, Stack, Tooltip } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SportsMmaIcon from '@mui/icons-material/SportsMma';
import './index.css';
import BuyModal from './BuyModal';

interface IPokemon {
  pokemon: Pok,
  oponentsArray: Array<Pok> | undefined,
}
const Pokemon = ({ oponentsArray, pokemon }: IPokemon): JSX.Element => {
  const [playSound, setPlaySound] = useState<boolean>(false);
  const [audioElement, setAudioElement] = useState<any>(null);
  const [showFightModal, setShowFightModal] = useState<boolean>(false);
  const [oponent, setOponent] = useState<Pok>();
  const [showModalWithBuyPokemon, setShowModalWithBuyPokemon] = useState<boolean>(false);


  // console.log(pokemon.description);

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

  const handleBuyOpen = () => {
    setShowModalWithBuyPokemon(true);
  }
  const handleBuyClose = () => {
    setShowModalWithBuyPokemon(false);
  }

  return (
    <>
      <Card className='cardStyle' sx={{ maxWidth: 345, margin: '10px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <CardMedia
            component="img"
            alt="green iguana"

            // height="140"
            image={pokemon?.sprites.front_default}
            sx={{ maxHeight: '200px' }}
          />
          <div style={{ position: 'relative', bottom: '200px', left: '182px', backgroundColor: '#1976d2', width: '52px', padding: '2px 5px', borderRadius: '3px 3px 3px 5px' }}>
            <Typography variant="h6" sx={{ color: 'white' }}>
              <strong>{pokemon?.price === 'free' ? 'Free' : pokemon?.price}</strong>
            </Typography>
          </div>
        </div>
        <CardContent sx={{ marginTop: '-30px' }}>
          <Typography gutterBottom variant="h5" component="div">
            {pokemon?.name.toUpperCase()}
          </Typography>
          <Tooltip title={pokemon?.description.replace('', ' ')} placement="top">
            <Typography variant="body2" color="text.secondary" className='truncate-text' >
              {pokemon?.description.replace('', ' ')}
            </Typography>
          </Tooltip>
          <Stack direction='row' sx={{ justifyContent: 'space-evenly' }}>
            <Box>
              ⚔️  {pokemon?.attack}
            </Box>
            <Box>
              🛡️  {pokemon?.armor}
            </Box>
            <Box>
              ❤️  {pokemon?.hp}
            </Box>
          </Stack>
        </CardContent>
        <CardActions>
          {pokemon?.price !== "free" ?
            <Button fullWidth startIcon={<AddShoppingCartIcon />} variant="contained" size="small" onClick={handleBuyOpen} >Buy it!</Button> :
            <Button size="small" fullWidth onClick={handleClick} variant="contained" endIcon={<SportsMmaIcon />}>
              Choose ur destiny!
            </Button>}
        </CardActions>
      </Card>
      <FightModal oponent={oponent} pokemon={pokemon} showFightModal={showFightModal} handleClose={handleClose} />
      <BuyModal handleBuyClose={handleBuyClose} showModalWithBuyPokemon={showModalWithBuyPokemon} />
    </>
  )
}
export default Pokemon