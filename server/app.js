const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const dbService = require('./dbService');
const { response, request } = require('express');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//create
app.post('/insert', (request, response) => {
    const { name } = request.body;
    console.log(name);
    const db = dbService.getDbServiceInstance();

    const result = db.insertNewName(name);

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

//read
app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getAllData();
    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

//update
app.patch('/update', (request, response) => {
    const {Id, name} = request.body;
    const db = dbService.getDbServiceInstance();
    const result = db.updateNameById(Id, name);
    result
        .then(data => response.json({success: data}))
        .catch(err => console.log(err));
})

//delete
app.delete('/delete/:Id', (request, response) => {
    const { Id } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.deleteRowById(Id);
    result
        .then(data => response.json({ success: data }))
        .catch(err => console.log(err));
});

//search
app.get('/search/:name', (request, response) => {
    const { name } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.searchByName(name);
    result
    .then(data => response.json({data: data}))
    .catch(err => console.log(err));
})

//starting server
app.listen(process.env.PORT, () => console.log('app is running'));