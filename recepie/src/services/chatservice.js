// in react we don't have to declare the ws websocket 
// browser already has websocket enabled .

let socket = null;

const Frontserver =()=>{

if(!socket){

socket = new WebSocket({port:8080})

}

return socket

}

export const sendMessages = (msg) => {

if(socket && socket.readyState === WebSocket.OPEN){
    socket.send(msg)
}

}


export default Frontserver;