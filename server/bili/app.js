var express = require("express");
var app = express();
var router = express.Router();
var request = require('request');


app.use(express.urlencoded({ extended: true }))
app.post('/*', (req, res) => {
    var url = 'https://manga.bilibili.com'+req.url;
    request.post({
        url: url,
        form:req.body
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            res.send(body);
        } else {
            res.send(body);
        }
    });
})

app.listen(5000, (err) => {
    if (!err) console.log('服务器启动成功了');
})