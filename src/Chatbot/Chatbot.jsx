import React, { useState } from 'react';
import axios from 'axios';
import "./chatbot.css";
import SendIcon from '@mui/icons-material/Send';
import LoadingIcon from './LoadingIcon';
import AssistantIcon from '@mui/icons-material/Assistant';

function Chatbot() {
    const [prompt, setPrompt] = useState('');
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

    const sendMessage = () => {
        if (prompt && !waiting) {
            const newMessage = {
                timestamp: new Date().toLocaleTimeString(),
                sender: 'user',
                content: prompt,
            };
            setChatLog(prevChatLog => [...prevChatLog, newMessage]);
            setPrompt('');
            setWaiting(true);
            axios.post('http://localhost:8000/chatbot', { prompt })
                .then(response => {
                    const botMessage = {
                        timestamp: new Date().toLocaleTimeString(),
                        sender: 'bot',
                        content: response.data,
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
                    setChatLog(prevChatLog => prevChatLog.filter(message => message.sender !== 'user'));
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
                    <div className="chatlog">
                        {chatLog.map((message, index) => {
                            const messageClass = message.sender === 'bot' ? 'chatloggpt' : 'chatloguser';
                            return (
                                <div key={index} className={messageClass}>
                                    <p>{message.content}</p>
                                </div>
                            );
                        })}
                        {waiting && <LoadingIcon />}
                        {serviceUnavailable && <p>Service unavailable</p>}
                    </div>
                    <input 
                        className="promptbox" 
                        value={prompt} 
                        onChange={(e) => setPrompt(e.target.value)} 
                        onKeyPress={handleKeyPress}  // Add this line
                    />
                    <button className="submit" onClick={sendMessage}><SendIcon style={{ color: "white" }}/></button>
                </div>
            )}
            <div className="openchat" onClick={() => setChatOpen(!chatOpen)}>
                <AssistantIcon style={{ color: "white" }} />
            </div>
        </>
    );
}

export default Chatbot;
