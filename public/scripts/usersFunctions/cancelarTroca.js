import { fecharModal, meuspedidos } from "../pages/index.js";
import { getToken } from "../autenticar/autenticar.js";

export async function cancelarTroca() {
    const id = this.dataset.mycardid;
    const mypokename = this.dataset.mycardname;
    const intentpokename = this.dataset.pokeintent;

    document.querySelector("#modal").style.display = "flex";

    document.querySelector("#modal-content").innerHTML = `
    <h1 id="textoCancelar">Cancelar o pedido de troca de ${mypokename} por ${intentpokename}?</h1>
    <div>
        <button type="button" class="negativobtn">NÂO</button>
        <button type="button" class="positivobtn" data-id="${id}" >SIM</button>
    </div>
    `;

    document
        .querySelector(".negativobtn")
        .addEventListener("click", fecharModal);

    document.querySelector(".positivobtn").addEventListener("click", cancelar);
}

async function cancelar() {
    const id = this.dataset.id;

    const token = getToken();

    const pokeraw = await fetch(`/mymarket/${id}`, {
        method: "DELETE",
        headers: new Headers({
            authorization: token,
            "Content-Type": "application/x-www-form-urlencoded",
        }),
    });

    if (pokeraw.status === 202) {
        document.querySelector("#modal-content").innerHTML = `
        <h1 id="textoCancelar">Pedido de troca cancelado!</h1>
        <div>
            <button type="button" class="negativobtn">FECHAR</button>
        </div>
        `;
    }
    if (pokeraw.status === 500 || pokeraw.status === 404) {
        document.querySelector("#modal-content").innerHTML = `
        <h1 id="textoCancelar">Ocorreu um erro no cancelamento de troca!</h1>
        <div>
            <button type="button" class="negativobtn">FECHAR</button>
        </div>
        `;
    }

    document
        .querySelector(".negativobtn")
        .addEventListener("click", fecharModal);

    meuspedidos();
}
