var express = require("express");
var app = express();
var request = require('request');

app.use(express.urlencoded({
    extended: true
}))

app.post('/twirp/comic.v1.Comic/*', (req, res) => {
    var url = 'https://manga.bilibili.com' + req.url;
    request.post({
        url: url,
        form: req.body
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            res.send(body);
        } else {
            res.send(body);
        }
    });
})

app.get('/sprcmd', (req, res) => {
    var url = 'https://www.bilibili.com/index/recommend.json';
    request({
            url: url,
            gzip: true // 加上这句即可
        },
        function (error, response, body) {
            if (!error && response.statusCode === 200) {
                res.send(body);
            } else {
                res.send(body);
            }
        });
})


app.listen(54321, (err) => {
    if (!err) console.log('服务器启动成功了');
})