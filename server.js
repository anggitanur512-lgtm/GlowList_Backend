const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Selamat datang di GlowList Awas Apiiiii!');
})

app.listen(PORT, () => {
    console.log(`Server GlowList jalan di http://localhost:${PORT}`);
})