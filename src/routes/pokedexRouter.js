import { Router } from "express";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import { signupSchema, signinSchema } from "../schemas/schemas.js"
import jwtMiddleware from "../middlewares/jwtMiddleware.js";
import { getMyPokedex, getMyPokemonsList } from "../controllers/pokedexController.js";

const pokedexRouter = Router();

pokedexRouter.get("/pokedex", jwtMiddleware, getMyPokedex);
pokedexRouter.get("/mypokemons", jwtMiddleware, getMyPokemonsList);

export default pokedexRouter;
