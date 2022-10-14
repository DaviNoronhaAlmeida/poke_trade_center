export function pagina404() {
    document.querySelector("header").innerHTML = ``;
    document.querySelector("footer").innerHTML = ``;

    document.getElementById("conteiner").innerHTML = `
    <div id="p404">
        <h1>404</h1>
        <h2>Página não encontrada</h2>
    </div>
    `;
}
