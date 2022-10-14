import { modalMercado } from "../usersFunctions/trocar.js";
import { headerFooter } from "./index.js";
import { getToken } from "../autenticar/autenticar.js";
import { pesquisar } from "../usersFunctions/pesquisar.js";

export async function market() {
    headerFooter();

    const token = getToken();

    const pokeraw = await fetch("/market", {
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

    document.getElementById("conteiner").innerHTML = `
    <div id="barraSearch">
        <input placeholder="PESQUISAR" type="text" id="pesquisar">
        <select name="filtro" id="filter">
            <option value="byname">Pokemon</option>
            <option value="bynumber">Numero</option>  
            <option value="byowner">Proprietário</option>
        </select>
        <button type="button" id="search"><span>Procurar</span><span class="material-icons">search</span></button>
    </div>
    
    <table>
        <tr>
            <th class="numberpoke">Numero</th>
            <th>Proprietário</th>
            <th>Pokemon</th>
            <th>Em Troca de</th>
            <th class="btntable">Gotch ya</th>
        </tr>
    </table>`;

    pokemons.forEach((pokemon) => {
        document.querySelector("table").innerHTML += `
        <tr>
            <td>N°${pokemon.number}</td>
            <td>${pokemon.userName}</td>
            <td>
                <div class="ftMarket" style="background-image: url('/image/${pokemon.pokemonImage.replaceAll(
                    '"',
                    ""
                )}')"></div>
                <p>${pokemon.name}</p>
            </td>

            <td>
                <div class="ftMarket" style="background-image: url('/image/${pokemon.pokeIntentImage.replaceAll(
                    '"',
                    ""
                )}')"></div>
                <p>${pokemon.pokeIntentName}</p>
            </td>

            <td>
                <button class="tabelabtn" data-mycard="${
                    pokemon.pokeIntentName
                }" data-mycardnum="${
            pokemon.pokeIntentNumber
        }" data-marketname="${pokemon.name}" data-marketnum="${
            pokemon.id
        }">Trocar</button>
            </td>
        </tr>
        `;
    });

    document.getElementById("search").addEventListener("click", pesquisar);

    const td = document.querySelectorAll("td button");
    td.forEach((td) => {
        td.addEventListener("click", modalMercado);
    });
}
