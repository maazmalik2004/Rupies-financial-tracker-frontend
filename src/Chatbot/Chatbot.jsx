import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';
import LoadingIcon from './LoadingIcon';
import AssistantIcon from '@mui/icons-material/Assistant';
import CloseIcon from '@mui/icons-material/Close';
import "./chatbot.css";

function Chatbot() {
    const [message, setPrompt] = useState("");
    const [chatLog, setChatLog] = useState([
        {
            timestamp: new Date().toLocaleTimeString(),
            sender: 'bot',
            content: 'How may I assist you today?',
        }
    ]);
    const [waiting, setWaiting] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);
    const [serviceUnavailable, setServiceUnavailable] = useState(false);
    
    // Create a reference to the chat log div
    const chatLogRef = useRef(null);
    
    // Automatically scroll to the bottom of the chat log div when chatLog changes
    useEffect(() => {
        if (chatLogRef.current) {
            chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
        }
    }, [chatLog]);
    
    const sendMessage = () => {
        if (message && !waiting) {
            const newMessage = {
                timestamp: new Date().toLocaleTimeString(),
                sender: 'user',
                content: message,
            };
            setChatLog(prevChatLog => [...prevChatLog, newMessage]);
            setPrompt("");
            setWaiting(true);
            axios.post('http://localhost:8000/chatbot', { message })
                .then(response => {
                    const botMessage = {
                        timestamp: new Date().toLocaleTimeString(),
                        sender: 'bot',
                        content: response.data.response,
                    };
                    setChatLog(prevChatLog => [...prevChatLog, botMessage]);
                    setWaiting(false);
                    setServiceUnavailable(false);
                })
                .catch(error => {
                    console.error('Error fetching response:', error);
                    setWaiting(false);
                    setServiceUnavailable(true);
                    // Remove the last unanswered user prompt from chatLog
                    setChatLog(prevChatLog => prevChatLog.filter((message, index, array) => index !== array.map(m => m.sender).lastIndexOf('user') || message.sender !== 'user'));
                });
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <>
            {chatOpen && (
                <div className="chatbox">
                    <div className="chatlog" ref={chatLogRef}>
                        {chatLog.map((message, index) => {
                            const messageClass = message.sender === 'bot' ? 'chatloggpt' : 'chatloguser';
                            return (
                                <div key={index} className={messageClass}>
                                    <p>{message.content}</p>
                                </div>
                            );
                        })}
                        {waiting && <LoadingIcon />}
                        {serviceUnavailable && !waiting && <p style={{color:"turquoise"}}>Service unavailable</p>}
                    </div>
                    <input 
                        className="promptbox" 
                        value={message} 
                        onChange={(e) => setPrompt(e.target.value)} 
                        onKeyPress={handleKeyPress}  
                    />
                    <button className="submit" onClick={sendMessage}><SendIcon style={{ color: "white" }}/></button>
                </div>
            )}
            <div className="openchat" onClick={() => setChatOpen(!chatOpen)}>
            {(chatOpen)
                ?(<CloseIcon style={{ color: "white"}}/>):(<AssistantIcon style={{ color: "white" }} />)}
            </div>
        </>
    );
}

export default Chatbot;
