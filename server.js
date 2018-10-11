const express = require('express');
const app = express();
const repoRoute = require('./repoRoute.js');
const downloadRoute = require('./downloadRoute.js');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/repoPage.html', repoRoute);
app.use('/download', downloadRoute);
app.use('/', express.static(__dirname + '/public_static'));

let repoNames = [];
let userName = "";

app.post('/', (req, res, next)=> {
    userName = req.body.username;
    repoNames = req.body.repoNames;
    console.log(userName, repoNames);
});

app.get('/', (req, res)=> {
    res.send(userName);
});

app.listen(9090, ()=> {
    console.log('Server has started');
});