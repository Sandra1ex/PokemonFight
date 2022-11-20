import React, { useEffect, useState } from 'react'
import { Box, Modal, Typography, Stack, Tooltip } from '@mui/material';
import { Pok } from './types/types';
import { borderStyles, style } from './styles';
import './borderStyles.css';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';


interface IFightModal {
  pokemon: Pok | undefined,
  showFightModal: boolean,
  handleClose: () => void,
  oponent: Pok | undefined,
}

function FightModal({ oponent, pokemon, showFightModal, handleClose }: IFightModal): JSX.Element {
  const [isFighting, setIsFighting] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(3);
  const [condition, setCondition] = useState<string>('');
  const [fightError, setFightError] = useState<string>('');
  const [randomAICondition, setRandomAICondition] = useState<string>('');
  const [resultAfterFigth, setResultAfterFigth] = useState<string>('');
  const [fightWinner, setFightWinner] = useState<string>('none');
  const [totalWinner, setTotalWinner] = useState<string>('');
  const [currentAiHp, setCurrentAiHp] = useState<number>(oponent ? oponent.hp : 100);
  const [currentOwnHp, setCurrentOwnHp] = useState<number>(pokemon ? pokemon.hp : 100);
  const [percentOfDamage, setPercentOfDamage] = useState<number>(0);
  const [currentDamage, setCurrentDamage] = useState<number>(0);
  const [currentDefence, setCurrentDefence] = useState<number>(0);
  const [percentOfDefence, setPercentOfDefence] = useState<number>(0);
  const [previousAiHpValue, setPreviousAiHpValue] = useState<number>(oponent ? oponent.hp : 100);
  const [previousOwnHpValue, setPreviousOwnHpValue] = useState<number>(pokemon ? pokemon.hp : 100);
  const [calculatedDamage, setCalculatedDamage] = useState<number>(0);

  useEffect(() => {
    if (showFightModal) {
      setTotalWinner('');
      setCondition('');
      setRandomAICondition('');
      setFightWinner('none');
      setResultAfterFigth('');
      setIsFighting(false);
      setCurrentAiHp(oponent ? oponent.hp : 100);
      setCurrentOwnHp(pokemon ? pokemon.hp : 100);
      setPercentOfDamage(0);
      setPercentOfDefence(0);
    }
    // eslint-disable-next-line
  }, [showFightModal]);

  useEffect(() => {
    if (totalWinner) {
      const closeTimeout = setTimeout(() => {
        handleClose();
      }, 5000);

      return () => {
        clearTimeout(closeTimeout);
      }
    }
  }, [totalWinner, handleClose]);

  useEffect(() => {
    if (isFighting) {
      if (timer === 3) {
        const asd = setInterval(() => {
          if (timer > 0) {
            setTimer((prev) => prev - 1);
          }
        }, 800);

        return () => {
          clearInterval(asd);
        }
      }
    } else {
      setCurrentDamage(0);
    }
    // eslint-disable-next-line
  }, [isFighting]);

  useEffect(() => {
    const oponentConditionEtalonArray = ['AiAttack', 'AiDefend', 'AiAgility'];
    if (isFighting) {
      const AiCondition = oponentConditionEtalonArray[Math.floor(Math.random() * 3)];
      setRandomAICondition(AiCondition);
    }
  }, [condition, isFighting]);

  useEffect(() => {
    if (randomAICondition && isFighting && condition && oponent) {
      const aicond = randomAICondition.slice(2).toLowerCase();
      if (aicond === condition) {
        setResultAfterFigth('DRAW');
        setFightWinner('none');
      } else if (aicond === 'attack' && condition === 'defend') {
        setResultAfterFigth('YOU WIN!');
        setFightWinner('you');
      } else if (aicond === 'attack' && condition === 'agility') {
        setResultAfterFigth(`${oponent.name.toUpperCase()} WIN!`);
        setFightWinner('ai');
      } else if (aicond === 'defend' && condition === 'attack') {
        setResultAfterFigth(`${oponent.name.toUpperCase()} WIN!`);
        setFightWinner('ai');
      } else if (aicond === 'defend' && condition === 'agility') {
        setResultAfterFigth('YOU WIN!');
        setFightWinner('you');
      } else if (aicond === 'agility' && condition === 'attack') {
        setResultAfterFigth('YOU WIN!');
        setFightWinner('you');
      } else if (aicond === 'agility' && condition === 'defend') {
        setResultAfterFigth(`${oponent.name.toUpperCase()} WIN!`);
        setFightWinner('ai');
      }
    }
  }, [randomAICondition, isFighting, condition, oponent]);

  useEffect(() => {
    if (pokemon && oponent) {
      const multiplyDmg = 30 + Math.floor(Math.random() * 120);
      const multiplyDefence = 25 + Math.floor(Math.random() * 50);
      setPercentOfDamage(multiplyDmg);
      setPercentOfDefence(multiplyDefence);

      const howManyAttackPokemon = Math.floor(pokemon.attack * multiplyDmg / 100);
      const howManyAttackOponent = Math.floor(oponent.attack * multiplyDmg / 100);

      const howManyBlockPokemon = Math.floor(pokemon.armor * multiplyDefence / 100);
      const howManyBlockOponent = Math.floor(oponent.armor * multiplyDefence / 100);

      if (fightWinner === 'you') {
        if (howManyAttackPokemon - howManyBlockOponent > 0) {
          const damage = howManyAttackPokemon - howManyBlockOponent;
          setCalculatedDamage(damage);

          setCurrentAiHp((prev) => {
            setPreviousAiHpValue(prev);
            return prev - damage
          });
        } else {
          setCalculatedDamage(0);
          setCurrentAiHp((prev) => prev);
        }

        setCurrentDamage(howManyAttackPokemon);
        setCurrentDefence(howManyBlockOponent);
      } else if (fightWinner === 'ai') {
        if (howManyAttackOponent - howManyBlockPokemon > 0) {
          const damage = howManyAttackOponent - howManyBlockPokemon;
          setCalculatedDamage(damage);

          setCurrentOwnHp((prev) => {
            setPreviousOwnHpValue(prev);
            return prev - damage;
          });
        } else {
          setCurrentOwnHp((prev) => prev);
        }

        setCurrentDamage(howManyAttackOponent);
        setCurrentDefence(howManyBlockPokemon);
      } else {
        setCurrentDamage(0);
        setCurrentDefence(0);
        setPercentOfDamage(0);
        setPercentOfDefence(0);
      }
    }
    // eslint-disable-next-line
  }, [fightWinner]);

  useEffect(() => {
    if (currentAiHp < 1) {
      const winnerTimer = setTimeout(() => {
        setTotalWinner('you');
      }, 5000);

      return () => {
        clearTimeout(winnerTimer);
      }
    } else if (currentOwnHp < 1) {
      const winnerTimer = setTimeout(() => {
        setTotalWinner('ai')
      }, 5000);

      return () => {
        clearTimeout(winnerTimer)
      }
    }
  }, [currentAiHp, currentOwnHp]);

  const fightClick = () => {
    if (!condition) {
      setFightError('Выберите действие!');
      setTimer(3);
    } else {
      setFightError('');
    }
    setIsFighting(true);
  }

  const againClick = () => {
    setIsFighting(false);
    setTimer(3);
    setRandomAICondition('');
    setCondition('');
  }

  const radioHandler = (condition: string) => {
    setCondition(condition);
  };

  return (
    pokemon ? <Modal
      open={showFightModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {<Box sx={style}>
        <div className='d-flex justify-content-around align-items-center'>
          {/* Мой покемон */}
          <Stack direction='row'>
            <Stack spacing={0} direction="column" sx={borderStyles} className="ramka-3">
              <div style={{display: 'flex', flexDirection: 'column' }}>
                <Tooltip title={pokemon?.description.replace('', ' ')} placement='top'>
                  <QuestionMarkIcon sx={{position: 'relative', top: '5px', left: '5px'}}/>
                </Tooltip>
                <img src={pokemon?.sprites.front_default} alt="POKEMON" width='200' />

              </div>
              <Stack direction='column'>
                <Typography variant="h6" sx={{ mt: 2, width: 'fit-content', margin: 'auto', color: '#444a4e' }}>
                  {pokemon.name.toUpperCase()}
                </Typography>
                <Stack direction='row' sx={{ width: 'fit-content', margin: 'auto', mb: 1, mt: 1 }} spacing={1}>
                  <Box sx={{ color: '#444a4e' }}>
                    ⚔️  {pokemon.attack}
                  </Box>
                  <Box sx={{ color: '#444a4e' }}>
                    🛡️ {pokemon.armor}
                  </Box>
                  <Box sx={{ color: '#444a4e' }}>
                    ❤️  {currentOwnHp}
                  </Box>
                </Stack>
              </Stack>
            </Stack >
            <Stack direction='column' spacing={1} sx={{ margin: 'auto', paddingLeft: '20px' }}>
              <button type="button" className={condition === 'attack' ? `btn btn-warning` : `btn btn-secondary`} disabled={isFighting && !fightError} onClick={() => radioHandler('attack')}
                style={{
                  cursor: 'pointer',
                }}>
                <label htmlFor="coffee" style={{ pointerEvents: 'none' }}>⚔️</label>
              </button>
              <button type="button" className={condition === 'defend' ? `btn btn-warning` : `btn btn-secondary`} disabled={isFighting && !fightError} onClick={() => radioHandler('defend')}
                style={{
                  cursor: 'pointer',
                }}>
                <label htmlFor="tea" style={{ pointerEvents: 'none' }}>🛡️</label>
              </button>
              <button type="button" className={condition === 'agility' ? `btn btn-warning` : `btn btn-secondary`} disabled={isFighting && !fightError} onClick={() => radioHandler('agility')}
                style={{
                  cursor: 'pointer',
                }}>
                <label htmlFor="pumpkin" style={{ pointerEvents: 'none' }}>🦚</label>
              </button>
            </Stack>
          </Stack>
          {/* Цетральная арена */}
          {!totalWinner ? !isFighting ?
            <Stack direction='column' >
              <div className='align-self-center' style={{ width: '100px' }}>
                <img src="VS.png" alt='VS' width='90'></img>
              </div>
              <div className='align-self-center' style={{ position: 'relative', top: '50px' }}>
                <button type="button" className={`btn btn-danger`} onClick={fightClick} style={{ cursor: 'pointer' }}>FIGHT!</button>
              </div>
            </Stack> :
            fightError ?
              <Stack direction='column' >
                <Typography id="modal-modal-description" sx={{ mt: 2, color: '#444a4e' }}>
                  {fightError}
                </Typography>
                <div className='align-self-center' style={{ position: 'relative', top: '50px' }}>
                  <button type="button" className={`btn btn-danger`} onClick={fightClick} style={{ cursor: 'pointer' }}>FIGHT!</button>
                </div>
              </Stack>
              :
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
                <Stack direction='column' sx={{ alignItems: 'center' }}>
                  <Typography id="modal-modal-description" sx={{ mb: 2, alignText: 'center', color: '#444a4e' }}>
                    {resultAfterFigth}
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mb: 2, alignText: 'center', maxWidth: '200px', color: '#444a4e' }}>
                    {percentOfDamage > 100 ?
                      <Stack direction='column' spacing={1}>
                        <Typography variant="body2">{`DMG: CRIT ${percentOfDamage}%!!!, ${currentDamage} DAMAGE DONE`}</Typography>
                        <Typography variant="body2">{`DEF: ${currentDefence} BLOCKED (${percentOfDefence}% OF ARMOR).`}</Typography>
                        <Typography variant="body2">{`TOTAL HIT: ${calculatedDamage}`}</Typography>
                        <Typography variant="body2">{`LIFECHANGE: ${fightWinner === 'you' ? previousAiHpValue + `➡️` + currentAiHp : previousOwnHpValue + `➡️` + currentOwnHp}`}</Typography>
                      </Stack> :
                      percentOfDamage === 0 ? '' :
                        <Stack direction='column' spacing={1}>
                          <Typography variant="body2">{`DMG: LOW DAMAGE!! (${percentOfDamage}%), ${currentDamage} DAMAG DONE`}</Typography>
                          <Typography variant="body2">{`DEF: ${currentDefence} BLOCKED (${percentOfDefence}% OF ARMOR).`}</Typography>
                          <Typography variant="body2">{`TOTAL HIT: ${calculatedDamage}`}</Typography>
                          <Typography variant="body2">{`LIFECHANGE: ${fightWinner === 'you' ? previousAiHpValue + `➡️` + currentAiHp : previousOwnHpValue + `➡️` + currentOwnHp}`}</Typography>
                        </Stack>}
                  </Typography>
                  {/* <div className='align-self-center' style={{ width: '100px' }}>
                    <img src="fatality.png" alt='VS' width='90'></img>
                  </div> */}
                  <div className='align-self-center' style={{ position: 'relative', top: '50px' }}>
                    <button type="button" className={`btn btn-secondary`} onClick={againClick} style={{ cursor: 'pointer' }}>{totalWinner ? `AGAIN` : 'NEXT ROUND'}</button>
                  </div>
                </Stack> :
            <Stack direction='column' sx={{ alignItems: 'center' }}>
              <Typography id="modal-modal-description" sx={{ mb: 2, alignText: 'center', color: '#444a4e' }}>
                {totalWinner.toUpperCase()} WIN THIS FIGHT!
              </Typography>
            </Stack>
          }
          {/* Покемон компьютера */}

          <Stack direction='row'>
            <Stack direction='column' spacing={1} sx={{ margin: 'auto', paddingRight: '20px' }}>
              <button type="button" className={randomAICondition === 'AiAttack' && !fightError ? `btn btn-warning` : `btn btn-secondary`} disabled={true}
                style={{
                  cursor: 'pointer',
                }}>
                <label htmlFor="coffee" style={{ pointerEvents: 'none' }}>⚔️</label>
              </button>
              <button type="button" className={randomAICondition === 'AiDefend' && !fightError ? `btn btn-warning` : `btn btn-secondary`} disabled={true}
                style={{
                  cursor: 'pointer',
                }}>
                <label htmlFor="tea" style={{ pointerEvents: 'none' }}>🛡️</label>
              </button>
              <button type="button" className={randomAICondition === 'AiAgility' && !fightError ? `btn btn-warning` : `btn btn-secondary`} disabled={true}
                style={{
                  cursor: 'pointer',
                }}>
                <label htmlFor="pumpkin" style={{ pointerEvents: 'none' }}>🦚</label>
              </button>
            </Stack>

            <Stack spacing={0} direction="column" sx={borderStyles} className="ramka-3">
              <div style={{display: 'flex', flexDirection: 'column' }}>
                <Tooltip title={oponent?.description.replace('', ' ')} placement='top' >
                  <QuestionMarkIcon sx={{position: 'relative', top: '5px', left: '170px'}}/>
                </Tooltip>
                <img src={oponent ? oponent?.sprites.front_default : pokemon?.sprites.front_default} alt="POKEMON" width='200' />
              </div>
              <Stack direction='column'>
                <Typography variant="h6" sx={{ mt: 2, width: 'fit-content', margin: 'auto', color: '#444a4e' }}>
                  {oponent ? oponent.name.toUpperCase() : pokemon.name.toUpperCase()}
                </Typography>
                <Stack direction='row' sx={{ width: 'fit-content', margin: 'auto', mb: 1, mt: 1 }} spacing={1}>
                  <Box sx={{ color: '#444a4e' }}>
                    ⚔️  {oponent ? oponent.attack : pokemon.attack}
                  </Box>
                  <Box sx={{ color: '#444a4e' }}>
                    🛡️ {oponent ? oponent.armor : pokemon.armor}
                  </Box>
                  <Box sx={{ color: '#444a4e' }}>
                    ❤️  {currentAiHp}
                  </Box>
                </Stack>
              </Stack>
            </Stack>


          </Stack>
        </div>
      </Box>}
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