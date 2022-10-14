import { fecharModal, perfil } from "../pages/index.js";
import { getToken } from "../autenticar/autenticar.js";

export function editarperfil() {
    const name = this.dataset.nome;

    document.querySelector("#modal").style.display = "flex";

    document.querySelector("#modal-content").innerHTML = `
    <h1>Editar Perfil</h1>
    <div id="formEditar">
        <div>
            <label for="nameEdit" >Nome:</label>
            <input type="text" id="nameEdit" maxlength="20" value="${name}"/>
        </div>

        <div>
            <label for="senhaEdit" >Senha:</label>
            <input type="password" id="senhaEdit" />
        </div>

        <div>
            <label for="senhaConfEdit" >Confirmar:</label>
            <input type="password" id="senhaConfEdit" />
        </div>

        <p id="erroEdit"></p>

    </div>
    <div>
        <button type="button" class="negativobtn">CANCELAR</button>
        <button type="button" class="positivobtn">SALVAR</button>
    </div>
    `;

    document
        .querySelector(".negativobtn")
        .addEventListener("click", fecharModal);

    document
        .querySelector(".positivobtn")
        .addEventListener("click", salvarEdit);
}

async function salvarEdit() {
    const nome = document.getElementById("nameEdit").value;
    const senha = document.getElementById("senhaEdit").value;
    const senhaConf = document.getElementById("senhaConfEdit").value;

    if (senha.length < 6) {
        document.getElementById("erroEdit").style.display = "block";
        document.getElementById("erroEdit").textContent = "Senha inválida!";
        return;
    }
    if (senha !== senhaConf) {
        document.getElementById("erroEdit").style.display = "block";
        document.getElementById("erroEdit").textContent =
            "As senhas não são iguais!";
        return;
    }

    const token = getToken();

    const pokeraw = await fetch("/user", {
        method: "PUT",
        headers: new Headers({
            authorization: token,
            "Content-Type": "application/json",
        }),
        body: JSON.stringify({ userName: nome, password: senha }),
    });

    if (pokeraw.status === 200) {
        const { token: newToken } = await pokeraw.json();
        localStorage.setItem("token", JSON.stringify(newToken));
        perfil();
        fecharModal();
        return;
    }
    if (pokeraw.status === 422 || pokeraw.status === 500) {
        document.getElementById("erroEdit").style.display = "block";
        document.getElementById("erroEdit").textContent =
            "Ocorreu um erro ao salvar as alterações!";
        return;
    }
}

export async function trocarft() {
    const token = getToken();

    const pokeraw = await fetch("/mypokemons", {
        method: "GET",
        headers: new Headers({
            authorization: token,
            "Content-Type": "application/x-www-form-urlencoded",
        }),
    });
    const pokemons = await pokeraw.json();

    document.querySelector("#modal").style.display = "flex";

    document.querySelector("#modal-content").innerHTML = `
    <h1>Escolha seu avatar</h1>
    <div id="modalAnunciar">
        <select name="trocarft" id="trocarftmodal"></select>  
        <p id="erroEdit"></p> 
    </div>
    <div>
        <button type="button" class="negativobtn">CANCELAR</button>
        <button type="button" class="positivobtn">SALVAR</button>
    </div>
    `;

    pokemons.forEach((pokemon) => {
        document.querySelector(
            "#trocarftmodal"
        ).innerHTML += `<option value="${pokemon.pokemonImage}">${pokemon.name}</option>`;
    });

    document
        .querySelector(".negativobtn")
        .addEventListener("click", fecharModal);

    document.querySelector(".positivobtn").addEventListener("click", salvarft);
}

async function salvarft() {
    const image = document.getElementById("trocarftmodal").value;

    const token = getToken();

    const pokeraw = await fetch("/userpic", {
        method: "PUT",
        headers: new Headers({
            authorization: token,
            "Content-Type": "application/json",
        }),
        body: JSON.stringify({ userImage: image }),
    });

    const { token: newToken } = await pokeraw.json();
    localStorage.setItem("token", JSON.stringify(newToken));

    if (pokeraw.status === 200) {
        perfil();
        fecharModal();
        return;
    }
    if (pokeraw.status === 422 || pokeraw.status === 500) {
        document.getElementById("erroEdit").style.display = "block";
        document.getElementById("erroEdit").textContent =
            "Ocorreu um erro ao salvar as alterações!";
        return;
    }
}
