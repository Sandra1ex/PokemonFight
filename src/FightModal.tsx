import React from 'react'
import { Box, Modal, Typography, Stack } from '@mui/material';
import { Pok } from './types/types';

interface IFightModal {
  pokemon: Pok | undefined,
  showFightModal: boolean,
  handleClose: () => void,
}

function FightModal({ pokemon, showFightModal, handleClose }: IFightModal): JSX.Element {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  return (
    pokemon ? <Modal
      open={showFightModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
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