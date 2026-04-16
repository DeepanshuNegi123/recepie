import {WebSocketServer} from 'ws';


const wss = new WebSocketServer({server});

wss.on('connection',(socket)=>{
    console.log("client has been connected");


socket.on("message",(event)=>{



    
})






})