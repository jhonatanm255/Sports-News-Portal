const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware para permitir CORS
app.use(cors());

// Configuración de CSP con Helmet
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'", // Permite scripts en línea (necesario para el widget de Twitter)
          "https://platform.twitter.com",
          "https://*.twitter.com",
        ],
        frameSrc: [
          "'self'",
          "https://platform.twitter.com",
          "https://*.twitter.com",
        ],
        connectSrc: ["'self'", "https://*.twitter.com"],
      },
    },
  })
);

// Sirve los archivos estáticos de la aplicación React
app.use(express.static(path.join(__dirname, "dist")));

// Ruta principal para servir la aplicación React
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
