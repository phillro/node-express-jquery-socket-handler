//var ElasticSearchClient = require('elasticsearchclient');
var ejs = require('ejs')
    , fs = require('fs');
var redis = require("redis")

module.exports = function (app) {

    var articleEntryTemplate = fs.readFileSync(__dirname + '/../views/partials/viewer_article_entry.ejs', 'utf8');

    var streamHandler = app.socketHandler
        .of('/example_ns')
        .on('connection', function (socket) {
            console.log('client connected to article_stream socket')


            socket.on('random', function (data) {
                console.log("example_ns")

                var randomness = function () {
                    self.emit('exampleM')
                    socket.emit('eventMsg', {event:'example_ns', data:{random_num:Math.random()}});
                }
                setTimeout(randomness, 5000)
            })


        })
        .on('error', function (err) {
        })

}