const port = 3000;
const config = require('./config');
const express = require('express');
const app = express();
const cors = require('cors');
const order = require('./order');
const savedata = require('./savedata');
const deletedata = require('./delete');
const updatedata = require('./update');

app.use(cors());
app.use('/order', order);
app.use('/save', savedata);
app.use('/delete', deletedata);
app.use('/update', updatedata);

app.listen(config.port, () => console.log(`listening on port: ${config.port}`));