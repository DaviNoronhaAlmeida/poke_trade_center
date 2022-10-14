import * as page from "./pages/index.js";

window.addEventListener("load", trocarPagina);

window.addEventListener("hashchange", trocarPagina);

function trocarPagina() {
    let hash = window.location.hash;

    switch (hash) {
        case "":
            page.login();
            break;
        case "#cadastro":
            page.cadastro();
            break;
        case "#inicio":
            page.home();
            break;
        case "#mercado":
            page.market();
            break;
        case "#pokedex":
            page.pokemons();
            break;
        case "#perfil":
            page.perfil();
            break;
        case "#meuspedidos":
            page.meuspedidos();
            break;
        default:
            page.pagina404();
            break;
    }
}
