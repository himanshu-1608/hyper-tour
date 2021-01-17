const dotenv = require('dotenv').config();

module.exports = {
    mongoUrl : process.env.mongourl,
    secret: process.env.bcrypt_secret_key,
    times: parseInt(process.env.salt_times)
}