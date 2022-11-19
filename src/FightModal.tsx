import React, { useEffect, useState } from 'react'
import { Box, Modal, Typography, Stack } from '@mui/material';
import { Pok } from './types/types';

interface IFightModal {
  pokemon: Pok | undefined,
  showFightModal: boolean,
  handleClose: () => void,
  oponent: Pok | undefined,
}

function FightModal({ oponent, pokemon, showFightModal, handleClose }: IFightModal): JSX.Element {
  const [isFighting, setIsFighting] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(3);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  useEffect(() => {
    if (isFighting) {
      if (timer === 3) {
        const asd = setInterval(() => {
          if (timer > 0) {
            setTimer((prev) => prev - 1);
          }
        }, 1000);
    
        return () => {
          clearInterval(asd);
        }
      }
    }
    // eslint-disable-next-line
  }, [isFighting]);

  const fightClick = () => {
    setIsFighting(true);
  }

  const surrenderClick = () => {
    setIsFighting(false);
    setTimer(3);
  }

  return (
    pokemon ? <Modal
      open={showFightModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className='d-flex justify-content-around align-items-center'>
          <div>
            <Stack spacing={2} direction="column">
              <img src={pokemon?.sprites.front_default} alt="POKEMON" />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Name: {pokemon.name}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Attack: {pokemon.attack}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                HP: {pokemon.hp}
              </Typography>
            </Stack>
          </div>
          {!isFighting ? <Stack direction='column' >
            <div className='align-self-center' style={{ width: '100px' }}>
              <img src="VS.png" alt='VS' width='90'></img>
            </div>
            <div className='align-self-center' style={{ position: 'relative', top: '50px' }}>
              <button className="custom-button" onClick={fightClick}>FIGHT!</button>
            </div>
          </Stack> :
            timer > 0 ?
              <>
                {timer === 3 && <div className='align-self-center' style={{ width: '100px' }}>
                  <img src="3.png" alt='VS' width='90'></img>
                </div>}
                {timer === 2 && <div className='align-self-center' style={{ width: '100px' }}>
                  <img src="2.png" alt='VS' width='90'></img>
                </div>}
                {timer === 1 && <div className='align-self-center' style={{ width: '100px' }}>
                  <img src="1.png" alt='VS' width='90'></img>
                </div>}
              </> :
              <Stack direction='column' >
                <div className='align-self-center' style={{ width: '100px' }}>
                  <img src="fatality.png" alt='VS' width='90'></img>
                </div>
                <div className='align-self-center' style={{ position: 'relative', top: '50px' }}>
                  <button className="custom-button" onClick={surrenderClick}>SURRENDER</button>
                </div>
              </Stack>}
          <div>
            <Stack spacing={2} direction="column">
              <img src={oponent ? oponent?.sprites.front_default : pokemon?.sprites.front_default} alt="POKEMON" />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Name: {oponent ? oponent.name : pokemon.name}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Attack: {oponent ? oponent.attack : pokemon.attack}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                HP: {oponent ? oponent.hp : pokemon.hp}
              </Typography>
            </Stack>
          </div>
        </div>
      </Box>
    </Modal> :
      <Modal
        open={showFightModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Ошибка, покемон не найден
        </Typography>

      </Modal>
  )
}

export default FightModal