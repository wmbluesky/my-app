import React, { useState } from 'react';
import Login from './components/Login';
import Chat from './components/Chat';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      <h1>欢迎使用聊天应用</h1>
      {isLoggedIn ? <Chat /> : <Login onLoginSuccess={handleLoginSuccess} />}
    </div>
  );
}

export default App;
