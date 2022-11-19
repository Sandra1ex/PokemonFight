import React, { useEffect, useState } from 'react'
import Pokemon from './Pokemon';
import { Pok, Poke } from './types/types';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';


const Card = (): JSX.Element => {
  const [pokemonsArray, setPokemonsArray] = useState<Array<Pok>>();
  const [sortedPokemonsArray, setSortedPokemonsArray] = useState<Array<Pok>>();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sortType, setSortType] = useState('');

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=6`)
      .then((res) => res.json())
      .then((json) => {
        Promise.all(json.results.map((urlPokemon: Poke) => {
          return fetch(`${urlPokemon.url}`)
            .then((res) => res.json())
            .then((pokemonInfo) => {
              const attack = pokemonInfo?.stats['0'].base_stat;
              const hp = pokemonInfo?.stats['1'].base_stat;
              pokemonInfo.attack = attack;
              pokemonInfo.hp = hp;
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
            });
        })).then((pokemonInfoArray) => {
          setPokemonsArray(pokemonInfoArray);
          setIsLoading(false);
        })
      }).catch((err) => {
        console.error(err);
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

  const handleChange = (event: any) => {
    setSortType(event.target.value as string);
  };

  return (
    isLoading ? <>
      <CircularProgress />
      <div>{error}</div>
    </>
      :
      <div>
        {!error ?
          <>
            <Box sx={{ minWidth: 250 }}>
              <FormControl sx={{ width: 200 }}>
                <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sortType}
                  label="Sort"
                  onChange={handleChange}
                >
                  <MenuItem value={'Price'}>Price</MenuItem>
                  <MenuItem value={'Name'}>Name</MenuItem>
                  <MenuItem value={'Attack'}>Attack</MenuItem>
                  <MenuItem value={'HP'}>HP</MenuItem>
                </Select>
              </FormControl>
            </Box>
            {console.log(sortedPokemonsArray)}
            <div className="d-flex flex-wrap songBlock">
              {sortedPokemonsArray?.map((pokemon: Pok, idx) => (
                <Pokemon pokemon={pokemon} key={idx} />
              ))}
            </div>
          </>
          : <div>{error}</div>}
      </div>
  )
}

export default Card