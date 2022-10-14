import { cadastrar } from "../autenticar/cadastrar.js";

export function cadastro() {
    document.querySelector("body").style.backgroundColor = "#212529";
    document.querySelector("#conteiner").style.display = "none";
    document.querySelector("#entrar").style.display = "flex";

    document.querySelector("header").innerHTML = `
        <div class="bol">
            <div id="azbol"></div>
            <div id="vermbol"></div>
            <div id="amabol"></div>
            <div id="verdbol"></div>
        </div>
        <div id="comple"></div>
    `;

    document.querySelector("footer").innerHTML = ``;

    document.querySelector("#entrar").innerHTML = `
    <div id="login">
        <div id="leftDiv">
            <img id="maiorball" src="./assets/logotrade.png" alt="imgPokeball">
        </div>
        <form id="rightDiv">
            <input id="nomeC" type="text" placeholder="Nome" maxlength="20">
            <input id="emailC" type="email" placeholder="E-mail">
            <input id="senhaC" type="password" placeholder="Senha">
            <input id="senhaconfC" type="password" placeholder="Confirmar Senha">
            <button class="btnSign" type="button" id="cadastrar">CADASTAR</button>
            <h4 id="erro"></h4>
            <a href="">JÁ POSSUI UMA CONTA? FAÇA LOGIN PRA CONTINUAR</a>
        </form>
    </div>
    `;

    document.querySelector("#cadastrar").addEventListener("click", cadastrar);
}
