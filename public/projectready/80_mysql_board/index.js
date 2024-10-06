// dotenv 사용설정(가장 상단에 위치 권장)
require("dotenv").config();
// const dotenv = require('dotenv');
// dotenv.config();
const express = require('express');
const app = express();
const path = require('path');
const boardRouter = require('./routes/boardrouter');
app.set("PORT", process.env.PORT || 7700);




// ejs뷰스폴더 설정
const viewPath = path.resolve(__dirname, 'views');
app.set('view engine', 'ejs');
app.set('views', viewPath);
// app.use();

// 정적파일(public) 설정
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

// post방식으로 보내온 데이터 수신 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.render('index.ejs');
});


app.use('/board', boardRouter);


//잘못된 요청에 대한 처리를 담당하는 미들웨어 등록
app.use((req, res, next) => {
    const html404 = path.resolve(__dirname, 'public', 'errors', '404.html');
    res.status(404).sendFile(html404);
});

app.listen(app.get("PORT"), () => {
    console.log(`${app.get("PORT")}번 포트에서 서버 대기중`);
});