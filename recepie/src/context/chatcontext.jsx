import { createContext , useEffect , useState } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({children}) => {

const [socket , setsocket] = useState(null);
const [messages , setmessage] = useState([]);
const [connectionStatus , setconnectionStatus] = useState("disconnected");


useEffect(()=>{

const ws = new WebSocket("ws://localhost:8080");

setsocket(ws);

ws.onopen = () => {
    console.log("backend server connected");
    setconnectionStatus("connected");
};

ws.onmessage = (event) => {

console.log("message from server", event.data);

setmessage((prev)=>[
    ...prev,
    event.data
]);

};

ws.onclose = () => {
    console.log("server closed");
    setconnectionStatus("disconnected");
};

ws.onerror = (err) => {
    console.log("socket error", err);
};

},[]);






function sendMessage(msg){

if(socket && socket.readyState === WebSocket.OPEN){

socket.send(msg);

}

}


return(

<ChatContext.Provider
value={{
    socket,
    messages,
    connectionStatus,
    sendMessage
}}
>

{children}

</ChatContext.Provider>

)

}