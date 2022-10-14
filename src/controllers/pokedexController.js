import * as pokedexServices from "../services/pokedexServices.js";

export async function getMyPokedex(req, res) {
  const { id } = res.locals.userData;
  const pokemons = await pokedexServices.getMyPokedex(id);

  res.status(200).send(pokemons);
}

export async function getMyPokemonsList(req, res) {
  const { id } = res.locals.userData;
  const pokemons = await pokedexServices.getMyPokemonsList(id);

  res.status(200).send(pokemons);
}
