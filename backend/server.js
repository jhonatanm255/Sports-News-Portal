const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

// Habilitar CORS
app.use(cors());

// Función para agregar un retraso
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Endpoint para obtener tweets de una cuenta
app.get("/api/tweets/:account", async (req, res) => {
  const { account } = req.params;
  const normalizedAccount = account.replace("@", "");

  console.log(`Fetching tweets for account: ${normalizedAccount}`);

  try {
    // Agrega un retraso de 2 segundos entre solicitudes
    await delay(2000);

    // Hacemos la solicitud a Nitter
    const nitterUrl = `https://nitter.net/${normalizedAccount}`;
    const response = await axios.get(nitterUrl, {
      timeout: 10000,
    });

    const html = response.data;
    console.log("HTML obtained:", html);

    // Parseamos el HTML con Cheerio
    const $ = cheerio.load(html);
    const tweets = [];

    // Extraemos los tweets (ajusta el selector según la estructura de Nitter)
    $(".timeline").each((index, element) => {
      const tweetText = $(element).text().trim();
      tweets.push(tweetText);
    });

    console.log("Tweets found:", tweets);

    // Enviamos los tweets como JSON
    res.json({ tweets });
  } catch (error) {
    console.error("Error fetching tweets:", error);

    // Enviamos un mensaje de error detallado
    res.status(500).json({
      error: "Error fetching tweets",
      details: error.message,
      account: normalizedAccount,
    });
  }
});

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
