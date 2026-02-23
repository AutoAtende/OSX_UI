import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

// Serve framework CSS
app.use('/css', express.static(join(__dirname, '../../css')));

// Serve app files
app.use(express.static(__dirname));

// SPA catch-all
app.use((_req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Full demo running at http://localhost:${PORT}`);
});
