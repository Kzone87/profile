const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

const direction5Id = '';
const direction5Key = '';

// CORS 설정
app.use(cors());

// 경로 설정
app.get('/api/map-direction/v1/driving', async (req, res) => {
    const { start, goal, option } = req.query;

    try {
        const response = await axios.get('https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving', {
            params: { start, goal, option },
            headers: {
                'X-NCP-APIGW-API-KEY-ID': direction5Id,
                'X-NCP-APIGW-API-KEY': direction5Key
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from Naver API' });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server is running on http://localhost:${PORT}`);
});
