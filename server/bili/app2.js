var express = require("express");
var app = express();
var request = require('request');
app.get('/', (req, res) => {
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

app.listen(5001, (err) => {
    if (!err) console.log('服务器2启动成功了');
})