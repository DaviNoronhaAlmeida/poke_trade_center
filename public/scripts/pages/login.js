import { logar } from "../autenticar/logar.js";

export function login() {
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
                <input id="email" type="email" placeholder="E-mail">
                <input id="senha" type="password" placeholder="Senha">
                <button class="btnSign" id="SignUp" type="button">ENTRAR</button>
                <h4 id="erro"></h4>
                <a href="#cadastro">NÃO POSSUI UMA CONTA? FAÇA JÁ SEU CADASTRO</a>
            </form>
        </div>
    `;

    document.querySelector("#SignUp").addEventListener("click", logar);
}
