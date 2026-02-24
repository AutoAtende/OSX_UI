import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const docsDir = __dirname;
const rootDir = join(__dirname, '..');

const app = express();

app.use('/css', express.static(join(rootDir, 'dist')));
app.use('/docs', express.static(docsDir));

app.use(express.static(docsDir));

app.use((_req, res) => {
  res.sendFile(join(docsDir, 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Documentation running at http://localhost:${PORT}`);
});
