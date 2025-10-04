import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/api/rate', async (req, res) => {
  const { base = 'USD', target = 'EUR' } = req.query;
  try {
    const response = await fetch(`https://api.exchangerate.host/latest?base=${base}&symbols=${target}`);
    const data = await response.json();
    res.json({ rate: data.rates[target] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Błąd podczas pobierania kursu walut.' });
  }
});

app.listen(PORT, () => console.log(`✅ Server działa na http://localhost:${PORT}`));
