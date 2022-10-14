import { getToken } from "../autenticar/autenticar.js";
import { cancelarTroca } from "../usersFunctions/cancelarTroca.js";

export async function pesquisarMeusPedidos() {
    const pesquisa = document.getElementById("pesquisar").value;
    const filtro = document.getElementById("filter").value;

    const token = getToken();

    const pokeraw = await fetch(
        `/mymarket/search/${filtro.replaceAll('"', "")}/${pesquisa}`,
        {
            method: "GET",
            headers: new Headers({
                authorization: token,
                "Content-Type": "application/json",
            }),
        }
    );
    const market = await pokeraw.json();

    if (market.length === 0) {
        return (document.querySelector(
            "table"
        ).innerHTML = `<h1 style="color:#fff;text-shadow:1px 0 #000">Não há resultados!</h1>`);
    }

    document.getElementById("conteiner").innerHTML = `
        <div id="barraSearch">
            <input placeholder="PESQUISAR" type="text" id="pesquisar">
            <select name="filtro" id="filter">
                <option value="byname">Pokemon</option>
                <option value="bynumber">Numero</option>   
            </select>
            <button type="button" id="search"><span>Procurar</span><span class="material-icons">search</span></button>
        </div>

        
        <table>
            <tr>
                <th>Numero</th>
                <th>Proprietário</th>
                <th>Pokemon</th>
                <th>Em Troca de</th>
                <th>Gotch ya</th>
            </tr>
        </table>
    `;

    market.forEach((pokemon) => {
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
                <button class="tabelabtn cancelbtn" data-pokeintent="${
                    pokemon.pokeIntentName
                }" data-mycardname="${pokemon.name}" data-mycardid="${
            pokemon.id
        }">Cancelar</button>
            </td>
        </tr>
        `;
    });

    document
        .getElementById("search")
        .addEventListener("click", pesquisarMeusPedidos);

    const td = document.querySelectorAll("td button");
    td.forEach((td) => {
        td.addEventListener("click", cancelarTroca);
    });
}
