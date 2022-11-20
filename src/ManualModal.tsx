import React from 'react'
import { Box, Modal, Typography } from '@mui/material';

interface IManualModal {
  showManualModal: boolean,
  handleManualClose: () => void
}

function ManualModal({ showManualModal, handleManualClose }: IManualModal): JSX.Element {

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
      open={showManualModal}
      onClose={handleManualClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <strong>Правила игры:</strong>
        </Typography>
        <Typography id="modal-modal-description" >
          PokemonFighting - это аналог игры в Камень-Ножницы-Бумага.
          Присутствует три состояние:
        </Typography>
        <Typography id="modal-modal-description" >
          1. Атака
        </Typography>
        <Typography id="modal-modal-description" >
          2. Защита
        </Typography>
        <Typography id="modal-modal-description" >
          3. Ловкий маневр
        </Typography>
        <Typography id="modal-modal-description" >
          Атака сильнее Ловкого маневра, но слабее Защиты, в свою очередь, Ловкий маневр слабее защиты.
        </Typography>
        <Typography id="modal-modal-description" >
          В данной игре учтены параметры Покемонов (атака, защита, уровень здоровья). А так же присутствует элемент удачи*
        </Typography>
        <Typography id="modal-modal-description" >
            Каждый раунд начинается с выбора инструмента для победы. В зависимости от выбора опонента возможны три исхода:
        </Typography>
        <Typography id="modal-modal-description" >
          1. Ничья, когда оба участника битвы выбирают один и тот же инструмент.
        </Typography>
        <Typography id="modal-modal-description" >
          2. Победа Вашего покемона.
        </Typography>
        <Typography id="modal-modal-description" >
          3. Поражение Вашего покемона.
        </Typography>
        <Typography id="modal-modal-description" >
          * Элемент удачи - есть вероятность нанести критический удар или же слабый удар.(Урон рассчитывается от 30% до 150% от урона покемона).
          А так же есть вероятность получения более низкого урона (Блок рассчитвается от 25% до 75% от показателя брони покемона).
        </Typography>
      </Box>
    </Modal>
  )
}

export default ManualModal