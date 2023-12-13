// const socket = io("http://localhost:8000", { transports: ["websocket"] });
const socket = io("https://aryan-kohli-chat-app-backend.onrender.com", { transports: ["websocket"] });

const form = document.getElementById('send-container');
const inputmsg = document.getElementById('input');
const messagecontainer = document.querySelector('.messages');
const usercount = document.getElementById('userCount');
var audio = new Audio('tone.m4a');
const userName = prompt("Enter Your name");
socket.emit('new-user-joined',userName);
const change_count =(count)=>{
    usercount.innerText=`${count}`;
}
socket.on('prev-count',len=>{

    change_count(len);
})
let count =0;


const append_userjoined =(message , position)=>{
    const newmsg = document.createElement('div');
    newmsg.innerText=message;
    newmsg.classList.add('msg2');
    newmsg.classList.add(position);
    messagecontainer.append(newmsg);
   
}
const append_userleft =(message , position)=>{
    const newmsg = document.createElement('div');
    newmsg.innerText=message;
    newmsg.classList.add('msg3');
    newmsg.classList.add(position);
    messagecontainer.append(newmsg);
    console.log("dbks");
}
const append =(message , position)=>{
    const newmsg = document.createElement('div');
    newmsg.innerText=message;
    newmsg.classList.add('msg');
    newmsg.classList.add(position);
    messagecontainer.append(newmsg);
    console.log("dbks");
    audio.play();
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = input.value;
    append(`You : ${message}`,'right');
    socket.emit('send',`${message}`);
    input.value="";
})
socket.on('user-joined-msg',data=>{

    append_userjoined(`${data.newuser} has joined the chat`,'left');
    change_count(data.userCount);
})
socket.on('receive',data=>{
    
    append(`${data.Username} : ${data.message}`,'left');
})
socket.on('left-msg',data =>{
    append_userleft(`${data.leftUserName} has left the chat`,'left');
    change_count(data.userCount);

   
})

