import { fecharModal, market } from "../pages/index.js";
import { getToken } from "../autenticar/autenticar.js";

export function modalMercado() {
    document.querySelector("#modal").style.display = "flex";
    const mypokeName = this.dataset.mycard;
    const marketpokeName = this.dataset.marketname;
    const mypokeNum = this.dataset.mycardnum;
    const marketpokeNum = this.dataset.marketnum;

    document.querySelector("#modal-content").innerHTML = `
    <p id="textoTroca">Você tem certeza que deseja trocar a carta ${mypokeName} por ${marketpokeName}?</p>
    <div>
        <button type="button" class="negativobtn">NÂO</button>
        <button type="button" class="positivobtn" data-cardid="${marketpokeNum}" data-cardnum="${mypokeNum}">SIM</button>
    </div>
    `;

    document
        .querySelector(".negativobtn")
        .addEventListener("click", fecharModal);

    document.querySelector(".positivobtn").addEventListener("click", trocar);
}

async function trocar() {
    const id = this.dataset.cardid;
    const number = this.dataset.cardnum;

    const token = getToken();

    const pokeraw = await fetch(`/trade/${number}/${id}`, {
        method: "post",
        headers: new Headers({
            authorization: token,
            "Content-Type": "application/x-www-form-urlencoded",
        }),
    });

    if (pokeraw.status === 200) {
        document.querySelector("#modal-content").innerHTML = `
        <p id="textoTroca">Troca efetuada com sucesso!</p>
        <div>
            <button type="button" class="negativobtn">FECHAR</button>
        </div>
        `;
    }
    if (pokeraw.status === 404) {
        document.querySelector("#modal-content").innerHTML = `
        <p id="textoTroca">Você não possui esse pokemon para trocar!</p>
        <div>
            <button type="button" class="negativobtn">FECHAR</button>
        </div>
        `;
    }
    if (pokeraw.status === 400) {
        document.querySelector("#modal-content").innerHTML = `
        <p id="textoTroca">Carta não disponível para troca!</p>
        <div>
            <button type="button" class="negativobtn">FECHAR</button>
        </div>
        `;
    }
    if (pokeraw.status === 500) {
        document.querySelector("#modal-content").innerHTML = `
        <p id="textoTroca">Erro ao realizar troca!</p>
        <div>
            <button type="button" class="negativobtn">FECHAR</button>
        </div>
        `;
    }

    document
        .querySelector(".negativobtn")
        .addEventListener("click", fecharModal);
    market();
}
