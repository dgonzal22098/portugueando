// server.js
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const PORT = 3001; // puedes cambiarlo

app.use(cors()); // permite peticiones desde tu frontend

// 🚨 CAMBIA ESTOS DATOS CON LOS TUYOS
const METABASE_SITE_URL =  "http://localhost:3000";
const METABASE_SECRET_KEY = "d97dd1c77980a6109a01efa565fdeda607a86c26333d03dcae2dcada556af89c"; // la encuentras en Settings > Admin > Embedding

app.get("/metabase-url", (req, res) => {
    const payload = {
        resource: { question: 72 }, // ID de la pregunta o dashboard
        params: {}, // filtros si los tienes
        exp: Math.round(Date.now() / 1000) + (10 * 60) // expira en 10 minutos
    };

    const token = jwt.sign(payload, METABASE_SECRET_KEY);

    const iframeUrl = `${METABASE_SITE_URL}/embed/question/${token}#bordered=true&titled=true`;

    res.json({ iframeUrl });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
