import { useState , useRef, useEffect } from "react";

const GlobalChat = () => {
  const [messages, setMessages] = useState([
   
  ]);

const messageendref  = useRef(null);

  
const scrollend = ()=>{

messageendref.current?.scrollIntoView({behaviour:"smooth"});

}

useEffect(()=>{

    scrollend();


},[messages])


  const [text, setText] = useState("");

  const sendMessage = () => {
    if (!text.trim()) return;  

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "You",
        text
      }
    ]);

    setText("");
  };

  return (
    <div  className="bg-orange-400 p-8 m-6 rounded-[10px]  mx-auto">
      {/* Header */}
      <div className="flex justify-center   ">
        <span className="bg-white p-2 rounded-[10px] text-3xl">🌍 Global Chat </span>
      </div>

      {/* Messages */}
      <div className="p-4 border-2 border-black m-2 rounded-lg h-80 overflow-y-auto bg-orange-300">
        {messages.map((msg) => (
          <div key={msg.id} >
            <strong>{msg.sender}:</strong> {msg.text}
            <div ref={messageendref} />
          </div>
           
        ))}
      </div>

      {/* Input */}
      <div>
        <input
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default GlobalChat;



