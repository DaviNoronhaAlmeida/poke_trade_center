import { connection } from "../database/database.js";

export async function getMarket(userId) {
  return await connection.query(
    `
      SELECT "usersPokemons".*, users."userName", p.number as "pokeIntentNumber", 
      p.name as "pokeIntentName", p."pokemonImage" as "pokeIntentImage", pokemons.number, 
      pokemons.name, pokemons."pokemonImage"
      FROM "usersPokemons"
      JOIN pokemons 
      ON "usersPokemons"."pokemonId" = pokemons.id
      JOIN users
      ON "usersPokemons"."userId" = users.id
      JOIN pokemons p
      ON "usersPokemons"."pokeIntent" = p.number
      WHERE "userId" <> $1
      AND "isForSale" = true
      ORDER BY "lastUpdate"
      `,
    [userId]
  );
}
// SELECT "usersPokemons".*, pokemons.number, pokemons.name, pokemons."pokemonImage"
// FROM "usersPokemons"
// JOIN pokemons
// ON "usersPokemons"."pokemonId" = pokemons.id
// JOIN users
// ON "usersPokemon"."userId" = users.id
// WHERE "userId" <> $1
// AND "isForSale" = true
// ORDER BY "lastUpdate"

export async function getMyMarket(userId) {
  return await connection.query(
    `
      SELECT "usersPokemons".*, users."userName", p.number as "pokeIntentNumber", 
      p.name as "pokeIntentName", p."pokemonImage" as "pokeIntentImage", pokemons.number, 
      pokemons.name, pokemons."pokemonImage"
      FROM "usersPokemons"
      JOIN pokemons 
      ON "usersPokemons"."pokemonId" = pokemons.id
      JOIN users
      ON "usersPokemons"."userId" = users.id
      JOIN pokemons p
      ON "usersPokemons"."pokeIntent" = p.number
      WHERE "userId" = $1
      AND "isForSale" = true
      ORDER BY "lastUpdate"
      `,
    [userId]
  );
}
export async function getCardId(userId, pokenumber) {
  return await connection.query(
    `
        SELECT "usersPokemons".*, pokemons.number, pokemons.name, pokemons."pokemonImage"
        FROM "usersPokemons"
        JOIN pokemons
        ON "usersPokemons"."pokemonId" = pokemons.id
        WHERE "userId" = $1
        AND pokemons.number = $2
        ORDER BY "lastUpdate"
    `,
    [userId, pokenumber]
  );
}

export async function postIntoMarket(cardId, pokeintent) {
  return await connection.query(
    `
        UPDATE "usersPokemons" SET "isForSale" = true, "pokeIntent" = $2, "lastUpdate" = NOW()
        WHERE id = $1
        RETURNING *
    `,
    [cardId, pokeintent]
  );
}

export async function validateOwner(userId, cardId) {
  return await connection.query(
    `
        SELECT *
        FROM "usersPokemons"
        WHERE "userId" = $1
        AND id = $2
    
    `,
    [userId, cardId]
  );
}

export async function getOwnerId(cardId) {
  return await connection.query(
    `
        SELECT *
        FROM "usersPokemons"
        WHERE id = $1
    `,
    [cardId]
  );
}

export async function updateOwner(ownerId, cardId) {
  return await connection.query(
    `
        UPDATE "usersPokemons" SET "userId" = $1, "isForSale" = false, "lastUpdate" = NOW(), "pokeIntent" = null
        WHERE id = $2
        RETURNING *
    `,
    [ownerId, cardId]
  );
}

export async function validateCardToTrade(pokeid, pokeintent) {
  return await connection.query(
    `
      SELECT "usersPokemons".*, pokemons.number, pokemons.name, pokemons."pokemonImage"
      FROM "usersPokemons"
      JOIN pokemons
      ON "usersPokemons"."pokemonId" = pokemons.id
      WHERE "usersPokemons".id = $1
      AND "usersPokemons"."pokeIntent" = $2
      AND "isForSale" = true
    `,
    [pokeid, pokeintent]
  );
}

export async function cancelTrade(cardId) {
  return await connection.query(
    `
      UPDATE "usersPokemons" SET "isForSale" = false, "pokeIntent" = null, "lastUpdate" = NOW()
      WHERE id = $1
      RETURNING *
    `,
    [cardId]
  );
}

export async function searchFromMarketByNumber(userId, number) {
  return await connection.query(`
    SELECT "usersPokemons".*, users."userName", p.number as "pokeIntentNumber", 
    p.name as "pokeIntentName", p."pokemonImage" as "pokeIntentImage", pokemons.number, 
    pokemons.name, pokemons."pokemonImage"
    FROM "usersPokemons"
    JOIN pokemons 
    ON "usersPokemons"."pokemonId" = pokemons.id
    JOIN users
    ON "usersPokemons"."userId" = users.id
    JOIN pokemons p
    ON "usersPokemons"."pokeIntent" = p.number
    WHERE pokemons.number = $2
	  AND "userId" <> $1
    AND "isForSale" = true
    ORDER BY "lastUpdate"
  
  `, [userId, number])
}

export async function searchFromMarketByOwner(userId, owner) {
  return await connection.query(`
    SELECT "usersPokemons".*, users."userName", p.number as "pokeIntentNumber", 
    p.name as "pokeIntentName", p."pokemonImage" as "pokeIntentImage", pokemons.number, 
    pokemons.name, pokemons."pokemonImage"
    FROM "usersPokemons"
    JOIN pokemons 
    ON "usersPokemons"."pokemonId" = pokemons.id
    JOIN users
    ON "usersPokemons"."userId" = users.id
    JOIN pokemons p
    ON "usersPokemons"."pokeIntent" = p.number
    WHERE users."userName" ILIKE $2
	  AND "userId" <> $1
    AND "isForSale" = true
    ORDER BY "lastUpdate"
  
  `, [userId, `${owner}%`])
}

export async function searchFromMarketByName(userId, name) {
  return await connection.query(`
    SELECT "usersPokemons".*, users."userName", p.number as "pokeIntentNumber", 
    p.name as "pokeIntentName", p."pokemonImage" as "pokeIntentImage", pokemons.number, 
    pokemons.name, pokemons."pokemonImage"
    FROM "usersPokemons"
    JOIN pokemons 
    ON "usersPokemons"."pokemonId" = pokemons.id
    JOIN users
    ON "usersPokemons"."userId" = users.id
    JOIN pokemons p
    ON "usersPokemons"."pokeIntent" = p.number
    WHERE pokemons.name ILIKE $2
	  AND "userId" <> $1
    AND "isForSale" = true
    ORDER BY "lastUpdate"
  
  `, [userId, `${name}%`])
}

export async function searchFromMyMarketByNumber(userId, number) {
  return await connection.query(`
    SELECT "usersPokemons".*, users."userName", p.number as "pokeIntentNumber", 
    p.name as "pokeIntentName", p."pokemonImage" as "pokeIntentImage", pokemons.number, 
    pokemons.name, pokemons."pokemonImage"
    FROM "usersPokemons"
    JOIN pokemons 
    ON "usersPokemons"."pokemonId" = pokemons.id
    JOIN users
    ON "usersPokemons"."userId" = users.id
    JOIN pokemons p
    ON "usersPokemons"."pokeIntent" = p.number
    WHERE pokemons.number = $2
	  AND "userId" = $1
    AND "isForSale" = true
    ORDER BY "lastUpdate"
  
  `, [userId, number])
}


export async function searchFromMyMarketByName(userId, name) {
  return await connection.query(`
    SELECT "usersPokemons".*, users."userName", p.number as "pokeIntentNumber", 
    p.name as "pokeIntentName", p."pokemonImage" as "pokeIntentImage", pokemons.number, 
    pokemons.name, pokemons."pokemonImage"
    FROM "usersPokemons"
    JOIN pokemons 
    ON "usersPokemons"."pokemonId" = pokemons.id
    JOIN users
    ON "usersPokemons"."userId" = users.id
    JOIN pokemons p
    ON "usersPokemons"."pokeIntent" = p.number
    WHERE pokemons.name ILIKE $2
	  AND "userId" = $1
    AND "isForSale" = true
    ORDER BY "lastUpdate"
  
  `, [userId, `${name}%`])
}