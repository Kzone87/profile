/*
navigator 객체는 
    1.브라우저와 운영체제 정보를 제공
    2.현재 브라우저가 위치정보를 제공하는지 확인할때 사용
    3.현재 Host 컴퓨터의 위도와 경도 값을 추출할 때 사용
*/

// GPS위치정보 동의시 실행할 함수
const currentGeoFn = (position) => {

    const lat = position.coords.latitude; //위도
    const lon = position.coords.longitude; //경도

    console.log('lat =', lat);
    // console.log('lon =', lon);

    const APIKey = '34c7bad5f2c3b68857d1108858b1c478';

    // 비동기방식(AJAX)으로 현재날씩 데이터를 받아와서 출력
    (async function () {

        // 날씨정보를 제공하는 오픈웨더맵의 API서비스
        // units=metric옵션은 섭시온도로 설정
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`;


        // console.log(`url = ${url}`);

        const data = await (await fetch(url)).json();

        // console.log(`typeofdata =`, typeof data);
        // console.log(`data =`, data);


        // 1. 현재지역명 출력
        const $city = document.querySelector('.weather .city');
        $city.textContent = data.name;

        // 2. 현재날씨와 기온
        const weather = data.weather[0].main;
        const temp = data.main.temp;

        const $weatherTemp = document.querySelector('.weather h3');
        $weatherTemp.textContent = `${weather}/${temp}`;

        // 3. 날씨이미지
        const $weatherImg = document.querySelector('.weather .current>img');
        $weatherImg.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);

        // $weatherImg.setAttribute('alt',`${data.weather[0].description}`);
        $weatherImg.alt = data.weather[0].description;
        $weatherImg.title = data.weather[0].description;

    })();


    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`;

    // 비동기방식(AJAX)으로 오늘 날씨예보 데이터를 받아와서 출력
    (async function () {
        const info = await (await fetch(forecastURL)).json();
        // console.log('info =', info);

        /*
            오늘 날씨 예보에 대한 시나리오

            1. 사용자에게 필요한 날씨정보 시간대를 09:00 ~ 21:00으로 가정
            2. 현재시간이 낮12시 이후라면 pm6,pm9 에 대한 날씨정보를 제공
            3. 현재시간이 낮12시 이후가 아니라면 am9 , pm12 에 대한 날씨정보를 제공

            4. 오전9시,오후 12/6/9시에 해당하는 데이터만을 4개의 변수에 각각 저장
              1) .dt_txt에서 날짜값을 가져와서 진짜 날짜객체로 변환
              2) 40개의 예보데이터중 어떤게 오늘날짜의 예보데이터인지 전수조사
                (1) 현재시간기준 이전자정 시간정보를 밀리세컨즈로 변환
                (2) 예보데이터의 이전자정 시간정보를 밀리세컨즈로 변환
        */

        let today9am = null; //오늘오전 9예보를 저장할 변수
        let today12pm = null; //오늘오전 9예보를 저장할 변수
        let today6pm = null; //오늘오전 9예보를 저장할 변수
        let today9pm = null; //오늘오전 9예보를 저장할 변수

        // 오늘에 해당하는 이전자정시간정보를 밀리세컨즈로 변환
        const todayDateMill = new Date().setHours(0, 0, 0, 0);
        // console.log('todayDateMill =', todayDateMill);

        // 필요한 데이터만을 찾아내기 위한 전수조사
        for (let forecast of info.list) {

            const forecastDate = new Date(forecast.dt_txt);// 예보데이터의 날짜객체
            const forecastHour = forecastDate.getHours();//예보데이터의 시간추출
            const forecastMill = forecastDate.setHours(0, 0, 0, 0);//예보데이터의 이전자정시간정보를 밀리세컨즈로 변환

            // const forecastHour = parseInt(forecast.dt_txt.split(' ')[1]);//예보데이터의 시간추출

            // 만약 같은날 4개의 예보를 저장할 변수에 각 시간에 해당하는 forecast를 할당
            if (todayDateMill === forecastMill) {
                switch (forecastHour) {
                    case 9: today9am = forecast; break;
                    case 12: today12pm = forecast; break;
                    case 18: today6pm = forecast; break;
                    case 21: today9pm = forecast; break;
                }
            }
        }

        // console.log('today9am =', today9am);
        // console.log('today12pm =', today12pm);
        // console.log('today6pm =', today6pm);
        // console.log('today9pm =', today9pm);

        const currentHour = new Date().getHours();

        let firstForecast = null; //첫번째 예보
        let secondForecast = null; //두번째 예보

        // 현재시간에 따라 위 두 예보변수에 값 할당 
        if (currentHour > 12) {
            firstForecast = today6pm;
            secondForecast = today9pm;
        } else {
            firstForecast = today9am;
            secondForecast = today12pm;
        }

        // console.log('firstForecast =', firstForecast);
        // console.log('secForecast =', secForecast);

        // 오늘 첫번째 예보 출력
        const $todayFirstFrame = document.querySelector('.today p:nth-of-type(1)>.frame');
        const $todayFirstImg = $todayFirstFrame.firstElementChild;
        const $todayFirstWhen = $todayFirstFrame.nextElementSibling.firstElementChild;
        const $todayFirstTemp = $todayFirstFrame.nextElementSibling.lastElementChild;

        $todayFirstImg.src = `https://openweathermap.org/img/wn/${firstForecast.weather[0].icon}@2x.png`;
        $todayFirstImg.alt = firstForecast.weather[0].main;
        $todayFirstImg.title = firstForecast.weather[0].description;
        $todayFirstWhen.textContent = `${new Date(firstForecast.dt_txt).getHours()}시`;
        $todayFirstTemp.textContent = `${firstForecast.main.temp}º`;


        // 오늘 두번째 예보 출력
        const $todaySecondFrame = document.querySelector('.today p:nth-of-type(2)>.frame');
        const $todaySecondImg = $todaySecondFrame.firstElementChild;
        const $todaySecondWhen = $todaySecondFrame.nextElementSibling.firstElementChild;
        const $todaySecondTemp = $todaySecondFrame.nextElementSibling.lastElementChild;

        $todaySecondImg.src = `https://openweathermap.org/img/wn/${secondForecast.weather[0].icon}@2x.png`;
        $todaySecondImg.alt = secondForecast.weather[0].main;
        $todaySecondImg.title = secondForecast.weather[0].description;
        $todaySecondWhen.textContent = `${new Date(secondForecast.dt_txt).getHours()}시`;
        $todaySecondTemp.textContent = `${secondForecast.main.temp}º`;

    })();


    // 비동기방식(AJAX)으로 내일 날씨예보 데이터를 받아와서 출력
    (async function () {

        const info = await (await fetch(forecastURL)).json() //비동기방식으로 날씨 데이터를 받아오는 fetch() 코드작성

        let tomorrow9am = null;
        let tomorrow6pm = null;

        const today = new Date().setHours(0, 0, 0, 0);

        for (let forecast of info.list) {
            const infoDate = new Date(forecast.dt_txt).setHours(0, 0, 0, 0);
            const infoHour = new Date(forecast.dt_txt).getHours();
            if (today + (24 * 60 * 60 * 1000) === infoDate) {
                switch (infoHour) {
                    case 9: tomorrow9am = forecast; break;
                    case 18: tomorrow6pm = forecast; break;
                }
            }
        }
        // console.log(tomorrow9am);
        // console.log(tomorrow6pm);

        // 내일 첫번째 예보를 출력하는 코드
        const $tomorrowFirstFrame = document.querySelector('.tomorrow p:nth-of-type(1)>.frame');

        $tomorrowFirstFrame.firstElementChild.src = `https://openweathermap.org/img/wn/${tomorrow9am.weather[0].icon}@2x.png`
        $tomorrowFirstFrame.firstElementChild.alt = tomorrow9am.weather[0].main;
        $tomorrowFirstFrame.firstElementChild.title = tomorrow9am.weather[0].description;
        $tomorrowFirstFrame.nextElementSibling.firstElementChild.textContent = `${new Date(tomorrow9am.dt_txt).getHours()}시`;
        $tomorrowFirstFrame.nextElementSibling.lastElementChild.textContent = `${tomorrow9am.main.temp}º`;


        // 내일 두번째 예보를 출력하는 코드
        const $tomorrowSecondFrame = document.querySelector('.tomorrow p:nth-of-type(2)>.frame');

        $tomorrowSecondFrame.firstElementChild.src = `https://openweathermap.org/img/wn/${tomorrow6pm.weather[0].icon}@2x.png`
        $tomorrowSecondFrame.firstElementChild.alt = tomorrow6pm.weather[0].main;
        $tomorrowSecondFrame.firstElementChild.title = tomorrow6pm.weather[0].description;
        $tomorrowSecondFrame.nextElementSibling.firstElementChild.textContent = `${new Date(tomorrow6pm.dt_txt).getHours()}시`;
        $tomorrowSecondFrame.nextElementSibling.lastElementChild.textContent = `${tomorrow6pm.main.temp}º`;
    })();

    //비동기방식(AJAX)으로 내일 날씨예보 데이터를 받아와서 출력
    /*
        (async function () {
        const info = await (await fetch(forecastURL)).json();
        // console.log(`info =`, info);
        let tomorrow9am = null;
        let tomorrow6pm = null;

        // 내일날짜 설정
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const tomorrowMill = tomorrow.setHours(0, 0, 0, 0); //이전자정시간
        // console.log(`tomorrowMill = ${tomorrowMill}`);

        //  필요한 데이터를 추출하기 위한 전수조사
        for (let forecast of info.list) {
            const forecastDate = new Date(forecast.dt_txt);
            const forecastHours = forecastDate.getHours();
            const forecastMill = forecastDate.setHours(0, 0, 0, 0);

            // 2개의 날씨예보를 저장할 변수에 각 시간에 해당하는 forecast를 할당
            if (tomorrowMill === forecastMill) {
                switch (forecastHours) {
                    case 9: tomorrow9am = forecast; break;
                    case 18: tomorrow6pm = forecast; break;
                }
            }
        }//for

        // 내일 첫번쨰 예보 출력
        const $tomorrowFirstFrame = document.querySelector('.tomorrow p:nth-of-type(1)>.frame');
        const $tomorrowFirstImg = $tomorrowFirstFrame.firstElementChild;
        const $tomorrowFirstTemp = $tomorrowFirstFrame.nextElementSibling.lastElementChild;

        $tomorrowFirstImg.src = `https://openweathermap.org/img/wn/${tomorrow9am.weather[0].icon}@2x.png`;
        $tomorrowFirstImg.alt = tomorrow9am.weather[0].main;
        $tomorrowFirstImg.title = tomorrow9am.weather[0].description;
        $tomorrowFirstTemp.textContent = tomorrow9am.main.temp;

        // 내일 두번쨰 예보 출력
        const $tomorrowSecondFrame = document.querySelector('.tomorrow p:nth-of-type(2)>.frame');
        const $tomorrowSecondImg = $tomorrowSecondFrame.firstElementChild;
        const $tomorrowSecondTemp = $tomorrowFirstFrame.nextElementSibling.lastElementChild;

        $tomorrowSecondImg.src = `https://openweathermap.org/img/wn/${tomorrow6pm.weather[0].icon}@2x.png`;
        $tomorrowSecondImg.alt = tomorrow6pm.weather[0].main;
        $tomorrowSecondImg.title = tomorrow6pm.weather[0].description;
        $tomorrowSecondTemp.textContent = tomorrow6pm.main.temp;

    })();
    */


};

// 에러가 발생할경우 실행할 함수
const errGeoFn = () => {
    alert('브라우저가 GPS 위치정보 기능을 지원하지 않습니다.');
};

navigator.geolocation.getCurrentPosition(currentGeoFn, errGeoFn);