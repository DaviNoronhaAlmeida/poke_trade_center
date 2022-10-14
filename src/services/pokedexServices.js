import * as pokedexRepository from "../repositories/pokedexRepository.js";

export async function getMyPokedex(userId) {
  const { rows: pokemons } = await pokedexRepository.getAllPokemons();
  const { rows: myPokemons } = await pokedexRepository.getMyPokedex(userId);
  const pokedex = [];

  //complexidade o(n²) -> melhorar futuramente
  for (let j = 0; j < pokemons.length; j++) {
    let isntFound = true;
    for (let i = 0; i < myPokemons.length; i++) {
      if (pokemons[j].number === myPokemons[i].number) {
        pokedex.push({
          ...pokemons[j],
          hasIt: true,
          isForSale: myPokemons[i].isForSale,
          quantity: myPokemons[i].quantity,
        });
        isntFound = false;
        break;
      }
    }
    if (isntFound) {
      pokedex.push({
        ...pokemons[j],
        hasIt: false,
        isForSale: null,
        quantity: 0,
      });
    }
  }
  return pokedex;
}

export async function getAllPokemons() {
  const { rows: pokemons } = await pokedexRepository.getAllPokemons();
  return pokemons;
}

export async function getMyPokemonsList(id) {
  const { rows: pokemons } = await pokedexRepository.getMyPokemonsList(id);
  return pokemons;
}
