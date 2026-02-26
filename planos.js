const buttons = document.querySelectorAll(".btn-purchase");

buttons.forEach(btn => {
    btn.addEventListener("click", async () => {
        const value = btn.dataset.value;

        const cpf = prompt("Digite seu CPF:");
        if (!cpf) return;

        const res = await fetch("http://localhost:3000/create-pix", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                value,
                cpf,
                user_id: "123456"
            })
        });

        const data = await res.json();

        if (!data.code || !data.pixId) {
            alert("Erro ao gerar PIX");
            return;
        }

        alert(`PIX GERADO:\n\n${data.code}`);

        // começa a checar pagamento
        checkPayment(data.pixId, value);
    });
});

function checkPayment(pixId, value) {
    const interval = setInterval(async () => {
        const res = await fetch(`http://localhost:3000/check-pix/${pixId}`);
        const data = await res.json();

        if (data.status === "verified") {
            clearInterval(interval);

            localStorage.setItem("plano", value);
            alert("✅ Pagamento confirmado!");
        }

        if (data.status === "expired") {
            clearInterval(interval);
            alert("⏰ PIX expirou");
        }
    }, 5000);
}