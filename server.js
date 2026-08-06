const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const mysql = require('mysql2')
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'glowlist_db'
});
db.connect(err => {
    if (err) {
        console.error('Gagal konek ke database:', err)
    } else {
        console.log('berhasil konek ke database GlowList')
    }
})

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Selamat datang di GlowList Awas Apiiiii!');
})
app.get('/produk', (req, res) => {
    const sql = 'SELECT * FROM produk';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err});
        res.json(results);
    })
})

app.post('/produk', (req, res) => {
    const {judul, deskripsi, harga, id_kategori } = req.body;

    if (!judul || !harga || !deskripsi) {
        return res.status(400).json({ message: 'judul, harga, deskripsi wajib diisi'});
    }

    const sql = 'INSERT INTO produk (judul, deskripsi, harga, id_kategori, tgl_input) VALUES (?, ?, ?,?, NOW())';
    db.query(sql, [judul, deskripsi, harga, id_kategori], (err,result) => {
        if(err) return res.status(500).json({ error: err.sqlMessage});
        res.json({
            message: 'Produk berhasil di tambahkan!',
            id_produk: result.insertId
        })
    })
})

app.get('/kategori', (req, res) => {
    const sql = 'SELECT * FROM kategori';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err});
        res.json(results);
    })
})
app.listen(PORT, () => {
    console.log(`Server GlowList jalan di http://localhost:${PORT}`);
})
