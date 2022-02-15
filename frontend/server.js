const express = require('express');
const app = express();
const port = 3001;
app.use(express.static('src'));

app.listen(port, () => console.log(`listening on port: ${port}`));