var io = require('socket.io')
var Session = require('connect').middleware.session.Session;
var parseCookie = require('connect').utils.parseCookie;
var redis = require('redis');

module.exports = function(app) {
    var self = this
    self.app = app


    //set up the client session
    self.listen = function(options, listenCallback) {
        var sio = io.listen(self.app);

        sio.set('authorization', function (data, accept) {
            console.log('socket auth method called')
            if (data.headers.cookie) {
                data.cookie = parseCookie(data.headers.cookie);
                data.sessionID = data.cookie['connect.sid'];
                self.app.sessionStore.get(data.sessionID, function (err, session) {
                    if (err) {
                        accept(err.message, false);
                    } else {
                        // save the session data and accept the connection
                        data.session = session;
                        accept(null, true);
                    }
                });
            } else {
                return accept('No cookie transmitted.', true);
            }
        });

        sio.sockets.on('connection', function (socket) {
            console.log('A socket with sessionID ' + socket.handshake.sessionID
                + ' connected!');
            socket.on('message',function(from,msg){
                        console.log('message')
                               console.log(from+' : '+msg)
                           })
        });



        //return sio
        listenCallback(sio)


    }


}