const express = require('express');
const fs = require('fs');
const download = require('download');
const routes = express.Router();


routes.post('/', (req, res, next)=> {
    let username = req.body.username;
    let reponame = req.body.reponame;
    console.log(username, reponame);

    download(`http://github.com/${username}/${reponame}/archive/master.zip`, __dirname).then(() => {
        console.log('done!');
    });

    download(`http://github.com/${username}/${reponame}/archive/master.zip`).then(data => {
        fs.writeFileSync(`${__dirname}//${reponame}.zip`);
    })

    download(`github.com/${username}/${reponame}/archive/master.zip`).pipe(fs.createWriteStream(__dirname + `/${reponame}.zip`))

    Promise.all([
        `github.com/${username}/${reponame}/archive/master.zip`
    ].map(x => download(x, __dirname))).then(() => {
        console.log('Files downloaded');
        let filePath = __dirname + '/' + reponame + '-master.zip';
        console.log(filePath);
        res.setHeader('Content-disposition', 'attachment; filename=' + reponame +'-master.zip');
        res.redirect(req.baseUrl);
        // res.download(filePath);//, reponame + '-master.zip'); 
        // res.end();
    });
});

routes.post('/downloadSingle', (req, res, next)=> {
    console.log(req.body);
    let fileName = req.body.file;
    console.log(fileName);
    // curl.request(`https://raw.githubusercontent.com/${username}/${reponame}/master/${fileName}`, (err, stdout, meta)=> {
    //     console.log('%s %s', meta.cmd, meta.args.join(' '));
    // });
    res.redirect(req.baseUrl);
});

module.exports = routes;