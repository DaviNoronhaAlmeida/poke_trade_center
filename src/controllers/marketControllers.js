import * as marketServices from "../services/marketServices.js";

export async function getMarket(req, res) {
  const { id } = res.locals.userData;
  const market = await marketServices.getMarket(id);

  res.status(200).send(market);
}

export async function getMyMarket(req, res) {
  const { id } = res.locals.userData;
  const market = await marketServices.getMyMarket(id);

  res.status(200).send(market);
}

export async function postIntoMarket(req, res) {
  const { id: userId } = res.locals.userData;
  const { pokenumber, pokeintent } = req.params;
  const cardId = await marketServices.getCardId(userId, pokenumber);
  const market = await marketServices.postIntoMarket(
    userId,
    cardId,
    pokeintent
  );

  res.status(201).send(market);
}

export async function getAllPokemons(req, res) {
  const allpokemons = await marketServices.getAllPokemons();
  res.status(200).send(allpokemons);
}

export async function tradeFromMarket(req, res) {
  const { id: userId } = res.locals.userData;
  const { pokeid, pokeintent } = req.params;
  const userCardId = await marketServices.getCardId(userId, pokeintent);

  const previousOwnerId = await marketServices.getOwnerId(pokeid);

  const trade = await marketServices.tradeFromMarket(
    userId,
    userCardId,
    previousOwnerId,
    pokeid,
    pokeintent
  );
  res.status(200).send(trade);
}

export async function deleteFromMarket(req, res) {
  const { id: userId } = res.locals.userData;
  const { id } = req.params;

  const deletedCard = await marketServices.deleteFromMarket(userId, id);

  res.status(202).send(deletedCard);
}

export async function searchFromMarketByNumber(req, res) {
  const { id: userId } = res.locals.userData;
  const { pokenumber } = req.params;

  const filteredMarket = await marketServices.searchFromMarketByNumber(
    userId,
    pokenumber
  );

  res.status(200).send(filteredMarket);
}

export async function searchFromMarketByOwner(req, res) {
  const { id: userId } = res.locals.userData;
  const { pokeowner } = req.params;

  const filteredMarket = await marketServices.searchFromMarketByOwner(
    userId,
    pokeowner
  );

  res.status(200).send(filteredMarket);
}

export async function searchFromMarketByName(req, res) {
  const { id: userId } = res.locals.userData;
  const { pokename } = req.params;

  const filteredMarket = await marketServices.searchFromMarketByName(
    userId,
    pokename
  );

  res.status(200).send(filteredMarket);
}

export async function searchFromMyMarketByNumber(req, res) {
  const { id: userId } = res.locals.userData;
  const { pokenumber } = req.params;

  const filteredMarket = await marketServices.searchFromMyMarketByNumber(
    userId,
    pokenumber
  );

  res.status(200).send(filteredMarket);
}

export async function searchFromMyMarketByName(req, res) {
  const { id: userId } = res.locals.userData;
  const { pokename } = req.params;

  const filteredMarket = await marketServices.searchFromMyMarketByName(
    userId,
    pokename
  );

  res.status(200).send(filteredMarket);
}
