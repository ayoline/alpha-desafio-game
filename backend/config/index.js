const dotenv = require('dotenv');
dotenv.config();
const config = {
    port: process.env.PORT,
    timer: process.env.ROUND_TIME
};

module.exports = config;