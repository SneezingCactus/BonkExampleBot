const axios = require('axios').default;
const socketio = require('socket.io-client');

axios
.get('https://b2florida1.bonk.io/myapp/peerjs/id')          // gets peer id
.then(pid => {
    var socket = socketio("https://b2florida1.bonk.io");    // creates the socket connection
    var sidcount = 1;                                       // sidcount gives each player a different id
    socket.on('connect', function(){                        // when socket connects
        console.log("Connected!");
        socket.emit(12, {                                   // tell server to create a new room
            "peerID":pid.data,
            "roomName":"testroom",
            "maxPlayers":6,
            "password":"",
            "dbid":0,
            "guest":true,
            "minLevel":0,
            "maxLevel":999,
            "latitude":-1.2345,
            "longitude":-3.1416,
            "country":"US",
            "version":40,
            "hidden":0,
            "quick":false,
            "mode":"custom",
            "guestName":"testbot",
            "avatar":{ "layers":[], "bc":14477173 }
        })
    });
    socket.on(4, function(unknown, peerid, name, guest, level, avatar){   // when a player joins
        socket.emit(11,{"sid":sidcount,"gs":{"map":{"v":12,"s":{"re":false,"nc":false,"pq":1,"gd":25,"fl":false},"physics":{"shapes":[],"fixtures":[],"bodies":[],"bro":[],"joints":[],"ppm":12},"spawns":[],"capZones":[],"m":{"a":"testbot","n":"testmap","dbv":2,"dbid":-1,"authid":-1,"date":"","rxid":0,"rxn":"","rxa":"","rxdb":1,"cr":[],"pub":false,"mo":""}},"gt":2,"wl":3,"q":false,"tl":false,"tea":false,"ga":"b","mo":"b","world":{"timeMS":30},"bal":[],"sa1s":4,"sa1r":3,"sa1t":500}})       // send initial data
        if(guest){
            socket.emit(10,{"message":`Hello, fellow ${name}! You are a guest.`});
        }
        else{
            socket.emit(10,{"message":`Hello, fellow ${name}! Your current level is ${level}.`});
        }
        sidcount++;     //increase sidcount
    })
})
