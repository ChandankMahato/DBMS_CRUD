const test = require('../databaseService/test');
const db = test.getDbServiceInstance();

exports.Insert = (request, response) => {
    const {Cname, Cnumber, Caddress, Cfavorite, Cdues} = request.body.data;
    const result = db.insertNewName(Cname, Cnumber, Caddress, Cfavorite, Cdues);

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
};

exports.Get = (request, response) => {
    const result = db.getAllData();
    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
}

exports.Update = (request, response) => {
    const {Cname, Cnumber, Caddress, Cfavorite, Cdues} = request.body.data;
    const result = db.updateNameById(Cname, Cnumber, Caddress, Cfavorite, Cdues);
    result
        .then(data => response.json({success: data}))
        .catch(err => console.log(err));
}

exports.Delete = (request, response) => {
    const { Id } = request.params;
    const result = db.deleteRowById(Id);
    result
        .then(data => response.json({ success: data }))
        .catch(err => console.log(err));
}

exports.Search = (request, response) => {
    const { name } = request.params;

    const result = db.searchByName(name);
    result
    .then(data => response.json({data: data}))
    .catch(err => console.log(err));
}