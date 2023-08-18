const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const codes = new Map();

app.post('/api/sendCode', (req, res) => {
  const { phone } = req.body;
  const code = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  codes.set(phone, code);
  console.log(`发送验证码：${code} 至手机号：${phone}`);
  res.send({ success: true });
});

app.post('/api/loginOrRegister', (req, res) => {
  const { phone, code } = req.body;
  if (codes.get(phone) === code) {
    res.send({ success: true, message: '验证码正确'});
  } else {
    res.send({ success: false, message: '验证码错误' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


const axios = require('axios');


const openai = {
  apiKey: '',
  apiUrl: 'https://api.openai.com/v1/chat/completions',
};

app.post('/api/sendMessage', async (req, res) => {
    const { message } = req.body;
  
    try {
      const response = await axios.post(
        openai.apiUrl,
        {
          model: "gpt-3.5-turbo",
          prompt: message,
          max_tokens: 50,
          n: 1,
          stop: null,
          temperature: 0.5,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openai.apiKey}`,
          },
        }
      );
  
      const aiReply = response.data.choices[0].text.trim();
      res.send({ success: true, aiReply });
    } catch (error) {
      console.error('OpenAI API调用失败', error);
      console.error('错误详细信息：', error.response.data);
      res.status(500).send({ success: false, message: '智能回复失败' });
    }
  });
