const io = require("socket.io")(8000, {
  cors: {
    // origin: "http://127.0.0.1:5500",
    origin: "https://aryan-kohli-chat-app.netlify.app/",

    methods: ["GET", "POST"]
  }
});
const users ={}


io.on('connection', socket =>{ 
    
    socket.on('new-user-joined',name=>{
        console.log(name , " has joined the chat .");
        // it states that a particular connection bana hai, then hum uska name use kr rhe hai // the name 'new-user-joined' is a custom name not predefined
        users[socket.id]=name;
        var length = Object.keys(users).length;
        console.log(length , " are no. of online users");
        socket.broadcast.emit('user-joined-msg',{newuser:name , userCount:length});
        socket.emit('prev-count',length);
        // yeah sabko msg bhejhega ki new user aaya hai // the name 'user-joined' is a custom name not predefine
    })

    socket.on('send',message =>{
        socket.broadcast.emit('receive',{message:message , Username : users[socket.id]})
    })

    socket.on('disconnect' , message=>{
           var length = Object.keys(users).length;
        console.log(length , " are no. of online users");
        length--;
        socket.broadcast.emit('left-msg',{leftUserName :users[socket.id] , userCount:length });
        delete users[socket.id];  
    })

})