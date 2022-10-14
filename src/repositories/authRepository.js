import { connection } from "../database/database.js";

export async function createUser({ email, password, userName, userStatus }) {
    return await connection.query(
        `
      INSERT INTO users(email, password, "userName", "userStatus") VALUES($1, $2, $3, $4);
    `,
        [email, password, userName, userStatus]
    );
}

export async function findUserByEmail(email) {
    return await connection.query(
        `
        SELECT * FROM users 
        WHERE email = $1
      `,
        [email]
    );
}

export async function getUserData(id) {
    return await connection.query(
        `
    SELECT users.id, users.email, users.password, users."userName", users."userImage", users."userStatus", extract (epoch from users."dailyCardsTimeStamp") AS "dailyCardsTimeStamp", COUNT(DISTINCT "usersPokemons"."pokemonId") as pokedex
    FROM users
    LEFT JOIN "usersPokemons"
    ON users.id = "usersPokemons"."userId"
    WHERE users.id = $1
    GROUP BY users.id
  `,
        [id]
    );
}

export async function updateUserData(password, userName, id) {
    return await connection.query(
        `
    UPDATE users SET "password" = $1, "userName" = $2
    WHERE id = $3
    RETURNING *
  `,
        [password, userName, id]
    );
}

export async function updateTimestamp(id) {
    return await connection.query(
        `
    UPDATE users SET "dailyCardsTimeStamp" = NOW()
    WHERE id = $1
    RETURNING *
  `,
        [id]
    );
}

export async function updateUserPic(userImage, id) {
    return await connection.query(
        `
    UPDATE users SET "userImage" = $1
    WHERE id = $2
    RETURNING *
  `,
        [userImage, id]
    );
}
