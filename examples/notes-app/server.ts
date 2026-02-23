import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use('/css', express.static(join(__dirname, '../../css')));
app.use(express.static(__dirname));

app.get('*', (_req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Notes app running at http://localhost:${PORT}`);
});
