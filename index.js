import express from 'express';
import path from 'path';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

// 환경변수 로드
dotenv.config();

const app = express();
const PORT = process.env.PORT || 80;


// __dirname을 ES 모듈에 맞게 처리
const __dirname = path.resolve(); // 현재 작업 디렉토리 경로

// public 폴더를 정적 파일 제공 폴더로 설정
app.use(express.static(path.join(__dirname, 'public')));

// JSON 요청 본문 파싱을 위한 미들웨어
app.use(express.json()); // JSON 요청 본문을 파싱할 수 있도록 설정

// 기본 라우트 설정
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Tide API 요청 처리
app.get('/tide', async (req, res) => {
    // 오늘 날짜를 데이터 요청방식에 맞게 변환
    const now = new Date();
    let month = now.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    let date = now.getDate();
    date = date < 10 ? `0${date}` : date;

    const today = `${now.getFullYear()}${month}${date}`;

    try {
        const response = await fetch(`http://www.khoa.go.kr/api/oceangrid/tideObsPreTab/search.do?ServiceKey=${process.env.TIDE_KEY}&ObsCode=DT_0001&Date=${today}&ResultType=json`);
        const tideData = await response.json();
        res.json(tideData); // Tide 데이터를 JSON 형식으로 반환
    } catch (error) {
        console.error('Error fetching tide data:', error);
        res.status(500).send('Internal Server Error'); // 에러 처리
    }
});

// 날씨 데이터 요청 라우트
app.get('/weather', async (req, res) => {
    const { lat, lon } = req.query; // 쿼리 매개변수에서 lat과 lon 가져오기

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_KEY}&units=metric`);
        const data = await response.json();

        if (response.ok) {
            res.json(data); // 날씨 데이터를 클라이언트로 반환
        } else {
            res.status(response.status).json(data); // 오류 발생 시 상태 코드와 함께 반환
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// 카카오 길찾기 API 요청 라우트
app.get('/directions', async (req, res) => {
    const { origin, destination } = req.query; // 쿼리 매개변수에서 origin과 destination 가져오기

    // origin과 destination이 제공되지 않았을 경우 처리
    if (!origin || !destination) {
        return res.status(400).json({ error: 'Origin and Destination are required.' });
    }

    const apiUrl = 'https://apis-navi.kakaomobility.com/v1/directions';
    const queryParams = new URLSearchParams({
        origin,
        destination,
        car_hipass: 'true',
        summary: 'true'
    });

    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `KakaoAK ${process.env.KAKAO_KEY}` // 환경변수에서 Kakao API 키를 가져옵니다.
        }
    };

    try {
        const response = await fetch(`${apiUrl}?${queryParams.toString()}`, requestOptions);
        const kakaoData = await response.json();

        if (!response.ok) {
            throw new Error(kakaoData.message || 'Failed to fetch directions');
        }

        res.json(kakaoData); // 카카오 API에서 반환된 데이터를 클라이언트로 반환
    } catch (error) {
        console.error('Error fetching directions data:', error);
        res.status(500).json({ error: 'Error fetching directions data' });
    }
});

// Kakao 주소 검색 API 요청 라우트
app.get('/address', async (req, res) => {
    const { query } = req.query; // 쿼리 매개변수에서 query 가져오기

    if (!query) {
        return res.status(400).json({ error: 'Query is required.' });
    }

    try {
        const response = await fetch(`https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(query)}`, {
            method: 'GET',
            headers: { 'Authorization': `KakaoAK ${process.env.KAKAO_KEY}` } // 환경변수에서 Kakao API 키를 가져옵니다.
        });
        const data = await response.json();

        if (response.ok) {
            res.json(data); // Kakao API에서 반환된 데이터를 클라이언트로 반환
        } else {
            res.status(response.status).json(data); // 오류 발생 시 상태 코드와 함께 반환
        }
    } catch (error) {
        console.error('Error fetching address data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// 5일 날씨 예보 요청 라우트
app.get('/forecast', async (req, res) => {
    const { lat, lon } = req.query; // 쿼리 매개변수에서 lat과 lon 가져오기

    // lat과 lon이 제공되지 않았을 경우 처리
    if (!lat || !lon) {
        return res.status(400).json({ error: 'Latitude and Longitude are required.' });
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_KEY}&units=metric`);
        const forecastData = await response.json();

        if (response.ok) {
            res.json(forecastData); // 예보 데이터를 클라이언트로 반환
        } else {
            res.status(response.status).json(forecastData); // 오류 발생 시 상태 코드와 함께 반환
        }
    } catch (error) {
        console.error('Error fetching forecast data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// OpenAI API 엔드포인트 주소를 변수로 저장
const apiEndpoint = 'https://api.openai.com/v1/chat/completions'

// ChatGPT API 가족 모델 라우트
app.post('/ai/family', async (req, res) => {
    const { messages } = req.body; // 요청 본문에서 messages 추출

    if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'Messages are required and should be an array.' });
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a very kind family member,answer like you are my family, we are having a normal conversation,speak korean,answer shortly,use Comfortable way of speaking",
                },
                ...messages // 클라이언트에서 전달받은 대화 기록 포함
            ],
            temperature: 0.8,
            max_tokens: 1024,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0.5,
            stop: ["Human"],
        }),
    };

    try {
        const response = await fetch(apiEndpoint, requestOptions);
        const data = await response.json();
        const aiResponse = data.choices[0].message.content;
        res.json({ response: aiResponse }); // 응답을 JSON 형태로 반환
    } catch (error) {
        console.error('OpenAI API 호출 중 오류 발생:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// ChatGPT API 조언자 모델 라우트
app.post('/ai/advisor', async (req, res) => {
    const { messages } = req.body; // 클라이언트에서 보낸 메시지 배열 추출

    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Messages are required and should be an array.' });
    }

    // OpenAI API 요청 옵션 정의
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a strongly helpful Advisor",
                },
                ...messages, // 클라이언트에서 보낸 메시지 배열 추가
            ],
            temperature: 0.8,
            max_tokens: 1024,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0.5,
            stop: ["Human"],
        }),
    };

    try {
        const response = await fetch(apiEndpoint, requestOptions);
        const data = await response.json();
        const aiResponse = data.choices[0].message.content;
        
        res.json({ response: aiResponse }); // 응답을 JSON 형태로 반환
    } catch (error) {
        console.error('OpenAI API 호출 중 오류 발생:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// 서버 시작
app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
