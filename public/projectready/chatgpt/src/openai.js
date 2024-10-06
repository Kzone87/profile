const dotenv = require('dotenv');
dotenv.config();

/*
  dotenv 사용하는 이유

  dotenv는 환경변수를 .env파일에 저장하고 process.env로 로드하는 의존성 모듈이다.
  개발과정에서 서버주소, 고유 API KEY 값 등 보안이 이루어져야 하는 정보들을 다루게 된다. 
  만약 이러한 정보들이 오픈소스(깃허브)에 공개될 경우, 해킹을 당하거나 보안적인 면에서 위험할 수 있다.
  이러한 문제로 dotenv 패키지를 이용하여 환경변수 파일(.env)을 따로 만들어 관리하기를 권고한다.
*/

// dotenv모듈을 이용해 중요한 정보를 분리해서 관리
const apiKey = process.env.OPENAI_API_KEY;
const url = process.env.REQUEST_URL;

// console.log(apiKey);
// console.log(url);

async function callChatGPT(prompt) {
    const option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",  // 사용할 AI 모델
            messages: [{
                role: "user", // 메시지생성 주체 user | assistant
                content: prompt // 입력메시지
            },],
            temperature: 0.8, // 출력 다양성
            max_tokens: 1024, // 응답메시지 최대토큰(단어)수
            top_p: 1.0, // 토큰 샘플링 확률
            frequency_penalty: 0.5, // 잘 안쓰는 단어 억제
            presence_penalty: 0.5, // 동일한 단어나 구문 반복 억제
            stop: ["Human"], // 생성된 텍스트에서 종료 구문을 설정
        })
    };

    try {
        // GPT에게 비동기요청
        const gptAnswer = await fetch(url, option);
        const data = await (gptAnswer).json();
        return data.choices[0].message.content;
    } catch (err) {
        console.error('오류메세지:', err);
        return '오류가 발생하엿습니다.';
    }
};

module.exports = callChatGPT;