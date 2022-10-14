export async function logar() {
    const email = document.querySelector("#email").value;
    const senha = document.querySelector("#senha").value;
    const erro = document.getElementById("erro");

    if (email === "" || senha === "") {
        erro.style.display = "block";
        erro.textContent = "Informe o E-mail e Senha!";
        return;
    }
    const re = /\S+@\S+\.\S+/;
    const valid = re.test(email);
    if (!valid) {
        erro.style.display = "block";
        erro.textContent = "E-mail inválido!";
        return;
    }

    const response = await fetch("/signin", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: senha }),
    });

    const token = await response.json();
    localStorage.setItem("token", JSON.stringify(token));

    if (response.status === 200) {
        window.location.hash = "#inicio";
        return;
    }
    if (response.status === 401 || senha.length < 6) {
        erro.style.display = "block";
        erro.textContent = "E-mail ou senha inválido!";
        return;
    }
    if (response.status === 409) {
        erro.style.display = "block";
        erro.textContent = "Usuário não encontrado, crie uma conta!";
        return;
    }
}
