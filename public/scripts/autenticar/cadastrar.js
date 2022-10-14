export async function cadastrar() {
    const nome = document.querySelector("#nomeC").value;
    const email = document.querySelector("#emailC").value;
    const senha = document.querySelector("#senhaC").value;
    const senhaconf = document.querySelector("#senhaconfC").value;

    const erro = document.getElementById("erro");

    if (nome === "") {
        erro.style.display = "block";
        erro.textContent = "O campo Nome precisa ser preenchido!";
        return;
    }
    if (email === "") {
        erro.style.display = "block";
        erro.textContent = "O campo E-mail precisa ser preenchido!";
        return;
    }
    const re = /\S+@\S+\.\S+/;
    const valid = re.test(email);
    if (!valid) {
        erro.style.display = "block";
        erro.textContent = "E-mail inválido!";
        return;
    }
    if (senha.length < 6) {
        erro.style.display = "block";
        erro.textContent = "A senha precisa ter no mínimo 6 digitos!";
        return;
    }
    if (senhaconf === "") {
        erro.style.display = "block";
        erro.textContent = "O campo Confirmar Senha precisa ser preenchido!";
        return;
    }
    if (senha !== senhaconf) {
        erro.style.display = "block";
        erro.textContent = "As senhas não são iguais!";
        return;
    }

    const response = await fetch("/signup", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: senha,
            userName: nome,
            userStatus: "user",
        }),
    });

    if (response.status === 201) {
        window.location.hash = "";
        return;
    }
    if (response.status === 409) {
        erro.style.display = "block";
        erro.textContent = "E-mail já cadastrado!";
        return;
    }
}
