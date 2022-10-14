import { headerFooter } from "./index.js";
import { getToken } from "../autenticar/autenticar.js";

export async function home() {
    const token = getToken();

    const pokeraw = await fetch("/home", {
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

    document.querySelector("body").style.backgroundColor = "#a63232";
    document.querySelector("#conteiner").style.display = "flex";
    document.querySelector("#entrar").style.display = "none";

    headerFooter();

    if (pokemons.status === "previousCards") {
        document.getElementById("conteiner").innerHTML = `
        <div id="perfil">
            <div id="perfilImg">
                <div class="img"></div>
            </div>
            <div id="testPer"><p>Olá ${pokemons.classification} ${
            pokemons.userName
        }</p></div>
        </div>

        <div id="central">
            <div id="textFig">
                <p >Figurinhas Ganhas Hoje:</p>
            </div>
            <div id="campoFig">
                <div id="c0" style="background-image: url('/image/${pokemons.cards[0].pokemonImage.replaceAll(
                    '"',
                    ""
                )}')"></div>
                <div id="c1" style="background-image: url('/image/${pokemons.cards[1].pokemonImage.replaceAll(
                    '"',
                    ""
                )}')"></div>
                <div id="c2" style="background-image: url('/image/${pokemons.cards[2].pokemonImage.replaceAll(
                    '"',
                    ""
                )}')"></div>
                <div id="c3" style="background-image: url('/image/${pokemons.cards[3].pokemonImage.replaceAll(
                    '"',
                    ""
                )}')"></div>
                <div id="c4" style="background-image: url('/image/${pokemons.cards[4].pokemonImage.replaceAll(
                    '"',
                    ""
                )}')"></div>
            </div>
        </div>
        `;
    } else {
        document.getElementById("conteiner").innerHTML = `
        <div id="perfil">
            <div id="perfilImg">
                <div class="img"></div>
            </div>
            <div id="testPer"><p>Olá ${pokemons.classification} ${pokemons.userName}</p></div>
        </div>

        <div id="central">
            <div id="textFig">
                <p >Figurinhas Ganhas Hoje:</p>
            </div>
            <div id="campoFig">
                <div id="c0" data-image="${pokemons.cards[0].pokemonImage}"></div>
                <div id="c1" data-image="${pokemons.cards[1].pokemonImage}"></div>
                <div id="c2" data-image="${pokemons.cards[2].pokemonImage}"></div>
                <div id="c3" data-image="${pokemons.cards[3].pokemonImage}"></div>
                <div id="c4" data-image="${pokemons.cards[4].pokemonImage}"></div>
            </div>
        </div>
        `;

        const cardsDaily = document.querySelectorAll("#campoFig div");
        cardsDaily.forEach((card) => {
            card.addEventListener("click", mostrar);
        });
    }

    document.querySelector(
        "#perfilImg"
    ).style.backgroundImage = `url('/image/${pokemons.userImage.replaceAll(
        '"',
        ""
    )}')`;

    if (pokemons.classification === "Treinador") {
        document.querySelector(".img").style.backgroundImage =
            "url(../../assets/pokeball.png)";
    } else if (pokemons.classification === "Líder de ginásio") {
        document.querySelector(".img").style.backgroundImage =
            "url(../../assets/ultra.png)";
    } else if (pokemons.classification === "Mestre Pokemon") {
        document.querySelector(".img").style.backgroundImage =
            "url(../../assets/master.png)";
    }
}

function mostrar() {
    const pokeImg = this.dataset.image.replaceAll('"', "");
    const id = this.id;

    document.getElementById(
        `${id}`
    ).style.backgroundImage = `url(/image/${pokeImg})`;
}
