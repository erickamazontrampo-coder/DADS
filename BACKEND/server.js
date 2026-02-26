const express = require("express");
const fetch = require("node-fetch"); // <-- AGORA FUNCIONA
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const API_KEY = "sk_live_ku1o8KMI-zvrp_OjUEyCOOYp4ChA9VKoBxvzZR2hM3c";

app.post("/create-pix", async (req, res) => {
  const { value, cpf } = req.body;

  // DEBUG (IMPORTANTE)
  console.log("BODY RECEBIDO:", req.body);

  if (!value || !cpf) {
    return res.status(400).json({
      error: true,
      message: "Value ou CPF ausente"
    });
  }

  try {
    const url = `https://easy-pix.com/createPix?apiKey=${API_KEY}&value=${value}&cpf=${cpf}`;
    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.error("ERRO PIX:", err);
    res.status(500).json({ error: true });
  }
});
// O Render vai usar o process.env.PORT. Se estiver no seu PC, ele usa a 3000.
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Backend PIX rodando na porta ${PORT}`);
});
});
