// import { WebSocketServer } from "ws";


const { WebSocketServer } = require('ws');
const wss = new WebSocketServer({port:8080});


const users = new Map(); // here we will be storing connected users.


console.log("web socket server has been started on port 8080");

function broadcast(message, excludeSocket = null) {
    const payload = JSON.stringify(message);
    users.forEach((userData, clientSocket) => {
        if (clientSocket !== excludeSocket && clientSocket.readyState === 1) {
            clientSocket.send(payload);
        }
    });
}

wss.on('connection',(socket)=>{

    const userId =  Math.random().toString(36).substring(2, 8);
    const username = `user_${userId}`;
    console.log(`${username} has been connected`);
    users.set(socket, {id:userId, name:username});
    socket.send(JSON.stringify({type:'welcome',message:`welcome ${username}!`, yourid:userId}));
 
    // notifying others

    broadcast({type:'info', message:`${username} has joined.`},socket);


socket.on('message',(data)=>{

   const user = users.get(socket);
        let parsed;
        try {
            parsed = JSON.parse(rawData.toString());
        } catch {
            parsed = { type: 'message', data: rawData.toString(), format: 'text' };
        }

        // broadcast({ type: 'message', from: user.name, data: parsed.data, format: parsed.format || 'text' }, socket);

   console.log(`${user.name}: ${data.toString()}`);

//   console.log(users);

// users.forEach((e)=>{
// //    console.log(e);
//    socket.send(`${user.name}: ${data.toString()}`)
   
// })



   
   

})


// bacic working of the map here 
/* 

const map = new map();
map.set("a", 12);
console.log(map.get("a"));
console.log(map.get())

*/   


socket.on('close',(e)=>{
    
    const user  = users.get(socket);
    console.log(`user disconnected `,user.name);
    console.log(socket);
    console.log(e);

})

 socket.on('error', (err) => {
        console.log(`Socket error from ${username}:`, err.message);
    });




})

wss.on('error', (err) => {
    console.error('WebSocket Server Error:', err.message);
});