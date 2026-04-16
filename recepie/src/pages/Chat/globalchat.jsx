import { useEffect, useState, useRef } from "react"
import { useContext } from "react"
import { ChatContext } from "../../context/chatcontext"
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { BackButton } from "../../components/UI/back"

const Globalchat = () => {

// here we use usecontext to get the data forwarded from contextpage.
const { 
    socket,
    connectionStatus,
    messages,
    sendMessage
} = useContext(ChatContext);


const [text , settext] = useState(""); 
const messagesEndRef = useRef(null);

useEffect(()=>{
    console.log("connected port is ",socket);
},[socket]);

useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

function sendmsg() {
    if(!text.trim()) return;
    sendMessage(text)
    settext("");
}

return (
  <div className="w-full pb-24 pt-24 min-h-screen bg-brand-50 px-4">
    <div className='max-w-4xl mx-auto mb-8'>
        <BackButton text="Back" />
    </div>
    
    <div className="max-w-4xl mx-auto h-[75vh] flex flex-col bg-white border border-brand-200 shadow-sm">
      
      {/* Header */}
      <div className="bg-brand-50 px-10 py-8 border-b border-brand-200 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <h1 className="text-3xl font-display italic text-brand-900">Exchange</h1>
            <p className="text-brand-600 font-semibold text-xs tracking-widest uppercase mt-2 flex items-center gap-2">
              <span className={`w-2 h-2 ${connectionStatus === 'connected' ? 'bg-secondary' : 'bg-primary'} block`}></span>
              {connectionStatus || 'Disconnected'}
            </p>
          </div>
        </div>
        <div className="text-brand-600 uppercase tracking-widest text-[10px] bg-white px-4 py-2 border border-brand-200 shadow-inner">
           Community Chat
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-10 space-y-8 bg-white">
        {messages?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-brand-400">
            <p className="font-display italic text-2xl text-brand-600 mb-2">The table is quiet</p>
            <p className="uppercase tracking-widest text-xs">Start a conversation.</p>
          </div>
        ) : (
          messages?.map((msg, index) => (
             <div key={index} className="flex flex-col gap-1 items-start">
               <div className="bg-brand-50 px-6 py-5 border border-brand-200 max-w-[85%] break-words shadow-sm">
                 <p className="text-brand-900 text-lg font-light leading-relaxed">{msg}</p>
               </div>
             </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-8 bg-brand-50 border-t border-brand-200">
        <div className="flex items-center gap-6 relative">
          <input
            value={text}
            onChange={(e) => settext(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendmsg()}
            type="text"
            className="w-full bg-white border border-brand-300 py-5 pl-6 pr-20 focus:ring-0 focus:border-brand-500 transition-all text-lg font-light placeholder-brand-400 rounded-none shadow-inner"
            placeholder="Share a thought..."
          />
          <button 
            onClick={sendmsg}
            disabled={!text.trim()}
            className="absolute right-4 p-3 text-brand-700 hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <PaperAirplaneIcon className="w-6 h-6 -rotate-45" />
          </button>
        </div>
      </div>

    </div>
  </div>
)
}

export default Globalchat