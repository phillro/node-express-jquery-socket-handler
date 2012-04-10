//var ElasticSearchClient = require('elasticsearchclient');
var ejs = require('ejs')
    , fs = require('fs');
var redis = require("redis")

module.exports = function (app) {

    var articleEntryTemplate = fs.readFileSync(__dirname + '/../views/partials/viewer_article_entry.ejs', 'utf8');

    var streamHandler = app.socketHandler
        .of('/example_ns')
        .on('connection', function (socket) {
            socket.on('random', function (data) {
                var randomness = function () {
                    socket.emit('eventMsg', {event:'example_ns', data:{random_num:Math.random()}});
                }
                setTimeout(randomness, 5000)
            })


        })
        .on('error', function (err) {
        })

}