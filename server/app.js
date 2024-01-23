const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const testRoutes = require('./routes/test.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', testRoutes);

//starting server
app.listen(process.env.PORT, () => console.log('app is running'));