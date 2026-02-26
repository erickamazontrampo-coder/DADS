
let valorSelecionado = 0;

function abrirPix(valor) {
  valorSelecionado = valor;
  document.getElementById("pix-modal").style.display = "flex";
}

function fecharPix() {
  document.getElementById("pix-modal").style.display = "none";
  document.getElementById("pix-result").style.display = "none";
  document.getElementById("cpf-input").value = "";
}

function gerarPix() {
  const cpf = document.getElementById("cpf-input").value.trim();

  if (!/^\d{11}$/.test(cpf)) {
    alert("CPF inválido. Digite apenas 11 números.");
    return;
  }

  fetch("http://localhost:3000/create-pix", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      value: valorSelecionado,
      cpf: cpf
    })
  })
  .then(res => res.json())
  .then(data => {
    if (!data.code) {
      alert("Erro ao gerar PIX");
      return;
    }

    document.getElementById("pix-result").style.display = "block";
    document.getElementById("pix-code").value = data.code;

    document.getElementById("pix-qrcode").src =
      "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" +
      encodeURIComponent(data.code);
  })
  .catch(() => {
    alert("Erro de conexão com o servidor");
  });
}