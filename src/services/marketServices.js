import * as marketRepository from "../repositories/marketRepository.js";
import * as pokedexServices from "../services/pokedexServices.js";

export async function getMarket(userId) {
  const { rows: market } = await marketRepository.getMarket(userId);

  return market;
}

export async function getMyMarket(userId) {
  const { rows: market } = await marketRepository.getMyMarket(userId);

  return market;
}

export async function getCardId(userId, pokenumber) {
  const { rows: pokemons } = await marketRepository.getCardId(
    userId,
    pokenumber
  );

  if (pokemons.length < 1) {
    throw {
      type: "not_found",
      message: "Pokemon not found",
    };
  }

  const pokemonId = pokemons[0].id;
  return pokemonId;
}

export async function postIntoMarket(userId, cardId, pokeintent) {
  const validateOwner = await marketRepository.validateOwner(userId, cardId);
  if (validateOwner.length < 1) {
    throw {
      type: "not_found",
      message: "Card not found",
    };
  }
  const { rows: newMarketInput } = await marketRepository.postIntoMarket(
    cardId,
    pokeintent
  );
  return newMarketInput;
}

export async function getAllPokemons() {
  return await pokedexServices.getAllPokemons();
}

export async function getOwnerId(cardId) {
  const { rows: pokemons } = await marketRepository.getOwnerId(cardId);

  if (pokemons.length < 1) {
    throw {
      type: "not_found",
      message: "User not found",
    };
  }

  const ownerId = pokemons[0].userId;
  return ownerId;
}

export async function tradeFromMarket(
  userId,
  userCardId,
  previousOwnerId,
  pokeid,
  pokeintent
) {
  const validate = await marketRepository.validateCardToTrade(
    pokeid,
    pokeintent
  );

  if (validate.length < 1) {
    throw {
      type: "bad_request",
      message: "Card is not available for exchange",
    };
  }
  const { rows: firstTrade } = await marketRepository.updateOwner(
    userId,
    pokeid
  );
  const { rows: secondTrade } = await marketRepository.updateOwner(
    previousOwnerId,
    userCardId
  );

  return firstTrade;
}

export async function deleteFromMarket(userId, cardId) {
  const validateOwner = await marketRepository.validateOwner(userId, cardId);
  if (validateOwner.length < 1) {
    throw {
      type: "not_found",
      message: "Card not found",
    };
  }

  const { rows: canceledTrade } = await marketRepository.cancelTrade(cardId);

  return canceledTrade;
}

export async function searchFromMarketByNumber(userId, number) {
  const { rows: market } = await marketRepository.searchFromMarketByNumber(userId, number);
  return market;
}

export async function searchFromMarketByOwner(userId, owner) {
  const { rows: market } = await marketRepository.searchFromMarketByOwner(userId, owner);
  return market;
}

export async function searchFromMarketByName(userId, name) {
  const { rows: market } = await marketRepository.searchFromMarketByName(userId, name);
  return market;
}

export async function searchFromMyMarketByNumber(userId, number) {
  const { rows: market } = await marketRepository.searchFromMyMarketByNumber(userId, number);
  return market;
}

export async function searchFromMyMarketByName(userId, name) {
  const { rows: market } = await marketRepository.searchFromMyMarketByName(userId, name);
  return market;
}