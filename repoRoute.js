const express = require('express');
const routes = express.Router();

let userName = "";
let repoName = "";
let info = [];
routes.post('/', (req, res, next)=> {
    userName = req.body.username;
    repoName = req.body.reponame;
    info = [userName, repoName];

    console.log(userName, repoName);
});

routes.get('/helperPage', (req, res, next)=> {
    res.send(info);
    console.log('response sent');
    res.end();
    // res.redirect(req.baseUrl);
});

module.exports = routes;