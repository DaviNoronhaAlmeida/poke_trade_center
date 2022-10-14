import { anunciar } from "../usersFunctions/anunciar.js";
import { headerFooter } from "./index.js";
import { getToken } from "../autenticar/autenticar.js";

export async function pokemons() {
    headerFooter();
    document.getElementById("conteiner").innerHTML = "";
    const token = getToken();

    const pokeraw = await fetch("/pokedex", {
        method: "GET",
        headers: new Headers({
            authorization: token,
            "Content-Type": "application/x-www-form-urlencoded",
        }),
    });

    if (pokeraw.status === 401) {
        window.location.hash = "";
        return;
    }

    const pokemons = await pokeraw.json();

    pokemons.forEach((pokemon) => {
        let ausente = "";
        let btn = "";
        if (!pokemon.hasIt) {
            ausente = "ausente";
        }
        if (pokemon.quantity === 0) {
            btn = "disabled";
        }
        document.getElementById("conteiner").innerHTML += `
        <div class="cardConteiner">
            <div class="card" id="${pokemon.id}">
                <img class="${ausente} cardImage" src="/image/${pokemon.pokemonImage}" alt="">
                <p>Quantidade: ${pokemon.quantity}</p>
                <button type="button" ${btn} >Anunciar</button>
            </div>
        </div>
    `;
    });

    const cards = document.querySelectorAll(".card button");
    cards.forEach((card) => {
        card.addEventListener("click", anunciar);
    });
}
