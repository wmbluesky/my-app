import React, { useState } from 'react';
import axios from 'axios';
import styles from './Login.module.css';

function Login({ onLoginSuccess }) {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const phoneRegex = /^1[3-9]\d{9}$/;

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleGetCode = () => {
    if (!phoneRegex.test(phone)) {
      alert('请输入有效的手机号码');
      return;
    }
  
    axios.post('http://localhost:3000/api/sendCode', { phone }).then((response) => {
      console.log(response.data);
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/loginOrRegister', { phone, code }).then((response) => {
      if (response.data.success) {
        // 登录或注册成功
        //alert('登录/注册成功');
        onLoginSuccess();
      } else {
        // 登录或注册失败
        alert(`登录/注册失败：${response.data.message}`);
      }
    });
  };

  

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2>登录/注册</h2>
        <form onSubmit={handleSubmit}>
          <label>
            手机号：
            <input type="tel" value={phone} onChange={handlePhoneChange} />
          </label>
          <br />
          <label>
            验证码：
            <input type="text" value={code} onChange={handleCodeChange} />
          </label>
          <br />
          <button type="button" onClick={handleGetCode}>
            获取验证码
          </button>
          <button type="submit">登录/注册</button>
        </form>
      </div>
    </div>
  );
}

export default Login;