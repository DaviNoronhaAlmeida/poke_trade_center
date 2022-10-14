import { fecharModal } from "./index.js";

export function modalsair() {
    document.querySelector("#modal").style.display = "flex";

    document.querySelector("#modal-content").innerHTML = `
    <h1>VOCÊ TEM CERTEZA 
    QUE DESEJA SAIR?</h1>
    <div>
        <button type="button" class="negativobtn">NÂO</button>
        <button type="button" class="positivobtn">SIM</button>
    </div>
    `;

    document
        .querySelector(".negativobtn")
        .addEventListener("click", fecharModal);

    document.querySelector(".positivobtn").addEventListener("click", logout);
}

function logout() {
    localStorage.removeItem("token");
    window.location.hash = "";
    fecharModal();
}
