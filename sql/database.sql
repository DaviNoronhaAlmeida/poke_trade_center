CREATE TABLE "users" (
	"id" serial NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"userName" TEXT NOT NULL,
	"userStatus" TEXT DEFAULT 'user',
	"userImage" TEXT DEFAULT '0.png',
	"dailyCardsTimeStamp" time without time zone,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "pokemons" (
	"id" serial NOT NULL,
	"number" integer NOT NULL UNIQUE,
	"name" varchar(30) NOT NULL UNIQUE,
	"pokemonImage" TEXT UNIQUE,
	CONSTRAINT "pokemons_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "usersPokemons" (
	"id" serial NOT NULL,
	"userId" integer NOT NULL,
	"pokemonId" integer NOT NULL,
	"isForSale" BOOLEAN DEFAULT 'false',
	"pokeIntent" integer,
	"lastUpdate" time with time zone NOT NULL DEFAULT NOW(),
	"deletedAt" time with time zone,
	CONSTRAINT "usersPokemons_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


ALTER TABLE "pokemonsTypes" ADD CONSTRAINT "pokemonsTypes_fk0" FOREIGN KEY ("pokemonId") REFERENCES "pokemons"("id");
ALTER TABLE "pokemonsTypes" ADD CONSTRAINT "pokemonsTypes_fk1" FOREIGN KEY ("typeId") REFERENCES "types"("id");

ALTER TABLE "usersPokemons" ADD CONSTRAINT "usersPokemons_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");
ALTER TABLE "usersPokemons" ADD CONSTRAINT "usersPokemons_fk1" FOREIGN KEY ("pokemonId") REFERENCES "pokemons"("id");


-- FEATURES FUTURAS

CREATE TABLE "types" (
	"id" serial NOT NULL,
	"name" varchar(30) NOT NULL UNIQUE,
	CONSTRAINT "types_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "pokemonsTypes" (
	"id" serial NOT NULL,
	"pokemonId" integer NOT NULL,
	"typeId" integer NOT NULL,
	CONSTRAINT "pokemonsTypes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);