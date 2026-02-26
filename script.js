// TRAVA: SE JÁ ESTIVER LOGADO, NÃO MOSTRA LOGIN
if (localStorage.getItem("token")) {
    window.location.href = "planos.html";
}

const loginBox = document.getElementById("login-box");
const registerBox = document.getElementById("register-box");
const showRegister = document.getElementById("show-register");
const showLogin = document.getElementById("show-login");
const statusMessageEl = document.getElementById("status-message");

showRegister.addEventListener("click", () => {
    loginBox.style.display = "none";
    registerBox.style.display = "flex";
    statusMessage("");
});

showLogin.addEventListener("click", () => {
    loginBox.style.display = "flex";
    registerBox.style.display = "none";
    statusMessage("");
});

function statusMessage(msg) {
    statusMessageEl.innerText = msg;
}

function generateToken() {
    return "_" + Math.random().toString(36).substr(2, 9);
}

// REGISTRO
document.getElementById("register-btn").addEventListener("click", () => {
    const username = document.getElementById("register-username").value.trim();
    const password = document.getElementById("register-password").value.trim();

    if (!username || !password) return statusMessage("Preencha todos os campos");

    let users = JSON.parse(localStorage.getItem("users") || "{}");
    if (users[username]) return statusMessage("Usuário já existe");

    users[username] = { password, token: generateToken() };
    localStorage.setItem("users", JSON.stringify(users));

    statusMessage("Conta criada! Faça login.");
});

// LOGIN
document.getElementById("login-btn").addEventListener("click", () => {
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (!username || !password) return statusMessage("Preencha todos os campos");

    let users = JSON.parse(localStorage.getItem("users") || "{}");
    if (!users[username] || users[username].password !== password)
        return statusMessage("Usuário ou senha incorretos");

    localStorage.setItem("token", users[username].token);

    window.location.href = "planos.html";
});