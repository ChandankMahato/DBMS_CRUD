const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const dbService = require('./dbService');
const { response } = require('express');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));

//create
app.post('/insert', (req, res) => {
    const {name} = req.body;
    console.log(name);
    const db = dbService.getDbServiceInstance();
    
    const result = db.insertNewName(name);

    result
    .then(data => res.json({succees:true}))
    .catch(err => console.log(err));
});

//read
app.get('/getAll', (req, res) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getAllData();
    result
    .then(data => res.json({data: data}))
    .catch(err => console.log(err));
});

//update


//delete


//starting server
app.listen(process.env.PORT, () => console.log('app is running'));