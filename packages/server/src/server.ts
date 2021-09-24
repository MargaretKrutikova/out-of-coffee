import express from 'express';
import path from 'path';

const app = express();
const port = 8008;
const serverDir = process.cwd();
const buildDir = path.join(serverDir, "../client/public");
app.use(express.static(path.join(__dirname, 'build')));

// @ts-ignore
app.get('/ping', function (req, res) {
  return res.send('pong');
});

// @ts-ignore
app.get('/', function (req, res) {
  res.sendFile(path.join(buildDir, 'index.html'));
});

app.listen(port, () => console.log("listening on port", port));