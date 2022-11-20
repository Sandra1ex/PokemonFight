import React, { ChangeEvent, useEffect, useState } from 'react'
import Pokemon from './Pokemon';
import { Pok, Poke } from './types/types';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ManualModal from './ManualModal'

const Card = (): JSX.Element => {
  const [pokemonsArray, setPokemonsArray] = useState<Array<Pok>>();
  const [sortedPokemonsArray, setSortedPokemonsArray] = useState<Array<Pok>>();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sortType, setSortType] = useState('');
  const [searchPokemon, setSearchPokemon] = useState<string>('');
  const [filteredPokemonsArray, setFilteredPokemonsArray] = useState<Array<Pok>>();
  const [searchMessage, setSearchMessage] = useState('');
  const [oponentsArray, setOponentsArray] = useState<Array<Pok>>();
  const [showManualModal, setShowManualModal] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=30`)
      .then((res) => res.json())
      .then((json) => {
        Promise.all(json.results.map((urlPokemon: Poke) => {
          return fetch(`${urlPokemon.url}`)
            .then((res) => res.json())
            .then((pokemonInfo) => {
              const attack = pokemonInfo?.stats['0'].base_stat;
              const hp = pokemonInfo?.stats['1'].base_stat;
              const armor = pokemonInfo?.stats['2'].base_stat;
              const descriptionURL = pokemonInfo?.species.url;

              return fetch(descriptionURL)
                .then((res) => res.json())
                .then((pokemonFullInfo) => {
                  const description = pokemonFullInfo.flavor_text_entries['6'].flavor_text;

                  pokemonInfo.description = description;
                  pokemonInfo.attack = attack;
                  pokemonInfo.hp = hp;
                  pokemonInfo.armor = armor;
                  pokemonInfo.name = urlPokemon.name;

                  if (attack && hp) {
                    if (attack > 85 || hp > 85) {
                      pokemonInfo.price = '10$';
                      pokemonInfo.priceOrder = 3;
                    } else if (attack > 50 || hp > 50) {
                      pokemonInfo.price = '5$';
                      pokemonInfo.priceOrder = 2;
                    } else {
                      pokemonInfo.price = 'free';
                      pokemonInfo.priceOrder = 1;
                    }
                  }

                  return pokemonInfo;
                })
            });
        })).then((pokemonInfoArray) => {
          setPokemonsArray(pokemonInfoArray);
          setIsLoading(false);
        })
      }).catch((err) => {
        setError('Ошибка запроса');
        setIsLoading(false);
      })
  }, []);

  useEffect(() => {
    if (pokemonsArray) {
      setIsLoading(true);
      setError('Фильтруем покемонов. . .');
      if (!sortType || sortType === 'Price') {
        const sortArr = pokemonsArray.sort((a, b) => a.priceOrder - b.priceOrder);
        setSortedPokemonsArray(sortArr);
        setTimeout(() => {
          setError('');
          setIsLoading(false);
        }, 1000);
      } else if (sortType === 'Name') {
        const sortArr = pokemonsArray.sort((a, b) => {
          const Aname = a.name.toUpperCase();
          const Bname = b.name.toUpperCase();
          return Aname < Bname ? -1 : 1;
        });
        setSortedPokemonsArray(sortArr);
        setTimeout(() => {
          setError('');
          setIsLoading(false);
        }, 1000);
      } else if (sortType === 'Attack') {
        const sortArr = pokemonsArray.sort((a, b) => a.attack - b.attack);
        setSortedPokemonsArray(sortArr);
        setTimeout(() => {
          setError('');
          setIsLoading(false);
        }, 1000);
      } else if (sortType === 'HP') {
        const sortArr = pokemonsArray.sort((a, b) => a.hp - b.hp);
        setSortedPokemonsArray(sortArr);
        setTimeout(() => {
          setError('');
          setIsLoading(false);
        }, 1000);
      }
    }
  }, [pokemonsArray, sortType]);

  useEffect(() => {
    if (pokemonsArray) {
      const sortArr = pokemonsArray.sort((a, b) => a.priceOrder - b.priceOrder);
      const mostWantedPokemons = sortArr.slice(sortArr.length - 5);
      setOponentsArray(mostWantedPokemons);
    }
  }, [pokemonsArray]);

  useEffect(() => {
    if (searchPokemon) {
      setSearchMessage('Поиск покемона. . .');
      if (sortedPokemonsArray) {
        const filterPokemon = sortedPokemonsArray.filter((el) => el
          .name
          .includes(searchPokemon.toLowerCase()));
        if (filterPokemon.length > 0) {
          setFilteredPokemonsArray(filterPokemon);
          setTimeout(() => {
            setSearchMessage('');
          }, 500);
        } else {
          setFilteredPokemonsArray([]);

          setTimeout(() => {
            setSearchMessage('Такого покемона нет =(');
          }, 500);
        }
      } else {
        setSearchMessage('Ошибка запроса. . .');
      }
    } else {
      setFilteredPokemonsArray(sortedPokemonsArray);
    }
  }, [sortedPokemonsArray, searchPokemon]);

  const handleChange = (event: any) => {
    setSortType(event.target.value as string);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchPokemon(event.target.value as string);
  }

  const handleManualOpen = () => {
    setShowManualModal(true);
  }
  const handleManualClose = () => {
    setShowManualModal(false);
  }

  return (
    isLoading ? <>
      <CircularProgress />
      <div>{error}</div>
    </> :
      <div>
        {!error ?
          <>
            <div className='d-flex m-3 justify-content-start'>
              <TextField
                label="Имя покемона"
                id="outlined-nize-small"
                defaultValue="normal"
                type="text"
                onChange={handleSearch}
                value={searchPokemon}
                color="secondary"
                sx={{ color: 'white' }}
              />
              <Box sx={{ minWidth: 250 }}>
                <FormControl sx={{ width: 200 }}>
                  <InputLabel id="demo-simple-select-label" sx={{ color: 'white' }}>Sort</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sortType}
                    label="Sort"
                    onChange={handleChange}
                    color="secondary"
                    sx={{ color: 'white' }}
                  >
                    <MenuItem value={'Price'}>Price</MenuItem>
                    <MenuItem value={'Name'}>Name</MenuItem>
                    <MenuItem value={'Attack'}>Attack</MenuItem>
                    <MenuItem value={'HP'}>HP</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <Button startIcon={<MenuBookIcon />} variant="contained" size="large" onClick={handleManualOpen} >Manual</Button>
              </Box>
            </div>
            {!searchMessage && filteredPokemonsArray ?
              <div className="d-flex flex-wrap songBlock">
                {filteredPokemonsArray?.map((pokemon: Pok, idx) => (
                  <Pokemon oponentsArray={oponentsArray} pokemon={pokemon} key={idx} />
                ))}
              </div> :
              <div>{searchMessage}</div>}
          </>
          :
          <>
            <TextField
              label="Size"
              id="outlined-size-small"
              defaultValue="Small"
              size="small"
              type="text"
              onChange={handleSearch}
              sx={{ color: 'white' }}
            />
            <div>{error}</div>
          </>
        }
        <ManualModal showManualModal={showManualModal} handleManualClose={handleManualClose}/>
      </div>
  )
}

export default Card