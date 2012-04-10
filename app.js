/**

 Set up your express application, etc
 **/
var SocketHandler = require('lib/socketHandler.js')

var socketHandler = new SocketHandler(app)
socketHandler.listen(options, function (socketHandler) {
    GLOBAL.socketHandler = app.socketHandler = socketHandler

    //Add your socket handers
    require('./lib/exampleSocket')(app)
});

