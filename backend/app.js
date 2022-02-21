const port = 3000;
const config = require('./config');
const express = require('express');
const app = express();
const cors = require('cors');
const saveUserData = require('./routes/save');
const rankingData = require('./routes/ranking');
const updateData = require('./routes/update');
const deleteData = require('./routes/delete');

app.use(cors());

app.use('/delete', deleteData);
app.use('/update', updateData);
app.use('/ranking', rankingData);
app.use('/save', saveUserData);

app.listen(config.port, () => console.log(`listening on port: ${config.port}`));