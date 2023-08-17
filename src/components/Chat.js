import React, { useState } from 'react';
import axios from 'axios';
import './Chat.css';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { text: inputMessage, sender: 'user' }]);
      setInputMessage('');
  
      axios.post('http://localhost:3000/api/sendMessage', { message: inputMessage }).then((response) => {
        if (response.data.success) {
          setMessages([...messages, { text: inputMessage, sender: 'user' }, { text: response.data.aiReply, sender: 'ai' }]);
        } else {
          alert(`智能回复失败：${response.data.message}`);
        }
      });
    }
  };

  return (
    <div className="chatContainer">
      <div className="chatBox">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="inputBox">
        <input
          type="text"
          value={inputMessage}
          onChange={handleInputChange}
          placeholder="输入消息并按回车发送"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
        />
        <button onClick={handleSendMessage}>发送</button>
      </div>
    </div>
  );
}

export default Chat;