const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('GlowList Backend API berjalan!  ');
})

app.listen(PORT, () => {
    console.log(`Server GlowList jalan di http://localhost:${PORT}`);
})