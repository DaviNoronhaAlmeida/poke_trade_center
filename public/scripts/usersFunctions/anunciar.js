import { fecharModal, pokemons } from "../pages/index.js";
import { getToken } from "../autenticar/autenticar.js";

export async function anunciar() {
    document.querySelector("#modal").style.display = "flex";
    const cardId = this.parentNode.id;
    const token = getToken();

    const pokeraw = await fetch("/allpokemons", {
        method: "GET",
        headers: new Headers({
            authorization: token,
            "Content-Type": "application/x-www-form-urlencoded",
        }),
    });
    const pokemons = await pokeraw.json();

    document.querySelector("#modal-content").innerHTML = `
    <h1>Anunciar carta</h1>
    <div id="modalAnunciar">
        <p>Em troca:</p>
        <select name="anunciar" id="intencao"></select>   
    </div>
    <div>
        <button type="button" class="negativobtn">CANCELAR</button>
        <button type="button" class="positivobtn" id="${cardId}" >CONFIRMAR</button>
    </div>
    `;

    pokemons.forEach((pokemon) => {
        document.querySelector(
            "#intencao"
        ).innerHTML += `<option value="${pokemon.id}">${pokemon.name}</option>`;
    });

    document
        .querySelector(".negativobtn")
        .addEventListener("click", fecharModal);

    document.querySelector(".positivobtn").addEventListener("click", postar);
}

async function postar() {
    const pokeId = this.id;
    const pokeIntend = document.querySelector("#intencao").value;

    const token = getToken();

    await fetch(`/market/${pokeId}/${pokeIntend}`, {
        method: "POST",
        headers: new Headers({
            authorization: token,
            "Content-Type": "application/x-www-form-urlencoded",
        }),
    });

    pokemons();
    fecharModal();
}
