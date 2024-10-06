const path = require('path');
const callChatGPT = require('./src/openai.js');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();


app.set('PORT', process.env.PORT || 7000);


// ejs설정(동적파일 설정)
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'src', 'views'));

// 정적파일 설정
const publicPath = path.resolve(__dirname, 'src', 'public');
app.use(express.static(publicPath));

// 포스트방식으로 보내온 데이터를 req.body에 넣어준다.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// 라우팅 설정
app.get('/', (req, res) => {
    res.render('index');
});

// 잘못된 요청에대한 처리(루트라우트 경로로 이동 처리)
app.get('/*', (req, res) => {
    res.redirect('/');
});


// 클라이언트에서 보내온 메세지 수신
app.post('/chat', async (req, res) => {
    const message = req.body.message;
    // console.log(message);
    const response = await callChatGPT(message);

    if (response) {
        res.json({ response });
    } else {
        res.status(500).json({ 'error': 'Fail ChatGPT API' });
    }
});




app.listen(app.get('PORT'), (req, res) => {
    console.log(`${app.get('PORT')}번 포트에서 서버 대기중`);
});