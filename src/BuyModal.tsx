import React from 'react'
import { Box, Modal, Typography } from '@mui/material';

interface IBuyModal {
  handleBuyClose: () => void,
  showModalWithBuyPokemon: boolean,
}

function BuyModal({ handleBuyClose, showModalWithBuyPokemon }: IBuyModal): JSX.Element {

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:900,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    fontSize: '12px'
  };

  return (
    <Modal
      open={showModalWithBuyPokemon}
      onClose={handleBuyClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Ошибка оплаты
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Нам известно об этой ошибке, в ближайшее время разберемся с ней
        </Typography>
      </Box>
    </Modal>
  )
}

export default BuyModal