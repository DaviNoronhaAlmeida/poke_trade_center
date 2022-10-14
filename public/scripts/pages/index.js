import { login } from "./login.js";
import { cadastro } from "./cadastro.js";
import { home } from "./home.js";
import { market } from "./mercado.js";
import { meuspedidos } from "./meusPedidos.js";
import { perfil } from "./perfil.js";
import { pokemons } from "./pokedex.js";
import { pagina404 } from "./pagina404.js";
import { modalsair } from "./modalSair.js";

function fecharModal() {
    document.querySelector("#modal").style.display = "none";
}

function headerFooter() {
    document.querySelector("header").innerHTML = `
    <div class="bol">
        <div id="azbol"></div>
        <div id="vermbol"></div>
        <div id="amabol"></div>
        <div id="verdbol"></div>
    </div>
    <div>
        <img src="./assets/logocenter.png" id="logo" />
    </div>
    <h2 id="sair">SAIR</h2>
    <div id="comple"></div>
    `;

    document.querySelector("footer").innerHTML = `
    <div class="fot"><a href="#inicio">PÁGINAL INICIAL</a></div>
    <div class="fot"><a href="#mercado">MERCADO</a></div>
    <div class="fot"><a href="#pokedex">POKEMONS</a></div>
    <div class="fot"><a href="#perfil">PERFIL</a></div>
    `;

    document.querySelector("#sair").addEventListener("click", modalsair);
}

export {
    login,
    cadastro,
    home,
    market,
    meuspedidos,
    perfil,
    pokemons,
    pagina404,
    fecharModal,
    headerFooter,
};
