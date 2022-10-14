import { connection } from "../database/database.js";

export async function getNewCards(num1, num2, num3, num4, num5) {
  return await connection.query(
    `
      SELECT * FROM pokemons
      WHERE number = $1 
      OR number = $2
      OR number = $3
      OR number = $4
      OR number = $5
    `,
    [num1, num2, num3, num4, num5]
  );
}

export async function insertNewCards(num1, num2, num3, num4, num5, id) {
  return await connection.query(
    `
      INSERT INTO "usersPokemons" ("userId", "pokemonId", "isForSale") VALUES 
      ($6, $1, false),
      ($6, $2, false),
      ($6, $3, false),
      ($6, $4, false),
      ($6, $5, false)        
    `,
    [num1, num2, num3, num4, num5, id]
  );
}

export async function getOlderCards(id) {
  return await connection.query(`
  SELECT "usersPokemons".id, pokemons.number, pokemons.name, pokemons."pokemonImage"  
  FROM "usersPokemons"
  JOIN pokemons
  ON "usersPokemons"."pokemonId" = pokemons.id
  WHERE "userId" = $1
  ORDER by id
  DESC
  LIMIT 5
  `, [id])
}

