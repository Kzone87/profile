const $cities = document.querySelectorAll('.cities>li');
const $cityNames = document.querySelectorAll('.cities .name');

// 만조 시간정보를 담아서 날씨요청 함수에서 UI 적용시 활용
let tideHighTime = [];

// 1.5초마다 추천 목록 1개씩 보여주기
const showRecommends = () => {
    const $recommends = document.querySelectorAll('.recommendContainer>.recommend');
    let setTime = 1500;
    $recommends.forEach(($recommend) => {
        setTimeout(() => {
            $recommend.style.height = '70px';
            $recommend.style.lineHeight = '70px';
            $recommend.style.fontSize = '20px';
        }, `${setTime}`);
        setTime += 1500;
    });
};

// 각 지역 한국이름을 화면에 표시
$cityNames.forEach(($cityName) => {
    // 로케이션데이터에서 이름이 같은 인덱스를 추출하고 그 인덱스에 맞는 객체를 가져와서 한국이름을 name요소에 할당
    const citiIdx = locations.cities.findIndex(city => city.name === $cityName.parentElement.className);
    $cityName.textContent = locations.cities[citiIdx].krName;
});

// 오늘의 조수간만 데이터 요청 및 추출 즉시실행 함수
(async function () {
    const $tide = document.querySelector('.weatherContainer>.tide');

    const tide = await (await fetch(`/tide`)).json();

    // 조수간만 임시데이터
    // const tide = {
    //     "result": {
    //         "data": [
    //             {
    //                 "tph_level": "107",
    //                 "tph_time": "2024-07-10 01:19:00",
    //                 "hl_code": "저조"
    //             },
    //             {
    //                 "tph_level": "857",
    //                 "tph_time": "2024-07-10 07:31:00",
    //                 "hl_code": "고조"
    //             },
    //             {
    //                 "tph_level": "185",
    //                 "tph_time": "2024-07-10 13:56:00",
    //                 "hl_code": "저조"
    //             },
    //             {
    //                 "tph_level": "770",
    //                 "tph_time": "2024-07-10 19:42:00",
    //                 "hl_code": "고조"
    //             }
    //         ],
    //         "meta": {
    //             "obs_post_id": "DT_0001",
    //             "obs_last_req_cnt": "19971/20000",
    //             "obs_lat": "37.45194",
    //             "obs_post_name": "인천",
    //             "obs_lon": "126.59222"
    //         }
    //     }
    // }

    // 각각의 조수데이터를 DOM요소로 만들어서 tide요소에 추가
    tide.result.data.forEach((data) => {
        const $span = document.createElement('span');
        const time = data.tph_time.split(" ")[1].slice(0, -3);
        if (data.hl_code === "고조") {
            $span.classList.add('high');
            $span.textContent = `만조  ${time}`;
            tideHighTime.push(time);
        } else if (data.hl_code === "저조") {
            $span.classList.add('row');
            $span.textContent = `간조  ${time}`;
        }
        $tide.appendChild($span);
    });
})(); //tide API

// 각도시의 날씨 데이터를 받아서 배열에 저장,가져온 데이터를 각각의 UI에 적용
(async function () {
    let cityWeathers = [];
    // 각 도시의 날씨정보를 받아서 도시이름 추가 및 배열에 저장
    for (let $cityName of $cityNames) {
        const $cityIcon = $cityName.nextElementSibling;
        const $cityTemp = $cityIcon.nextElementSibling;
        const $cityFeel = $cityTemp.nextElementSibling;
        const $cityWind = $cityFeel.nextElementSibling;

        const idx = locations.cities.findIndex(city => city.name === $cityName.parentElement.className);
        const cityData = locations.cities[idx];

        let data = await (await fetch(`/weather?lat=${cityData.lat}&lon=${cityData.lon}`)).json();

        // 도시 날씨 임시 데이터
        // let data = {
        //     "coord": {
        //         "lon": 127.73,
        //         "lat": 37.8853
        //     },
        //     "weather": [
        //         {
        //             "id": 804,
        //             "main": "Clouds",
        //             "description": "overcast clouds",
        //             "icon": "04d"
        //         }
        //     ],
        //     "base": "stations",
        //     "main": {
        //         "temp": 29.88,
        //         "feels_like": 33.41,
        //         "temp_min": 29.88,
        //         "temp_max": 29.88,
        //         "pressure": 1000,
        //         "humidity": 64,
        //         "sea_level": 1000,
        //         "grnd_level": 988
        //     },
        //     "visibility": 10000,
        //     "wind": {
        //         "speed": 1.87,
        //         "deg": 28,
        //         "gust": 2.48
        //     },
        //     "clouds": {
        //         "all": 98
        //     },
        //     "dt": 1720593792,
        //     "sys": {
        //         "type": 1,
        //         "id": 5510,
        //         "country": "KR",
        //         "sunrise": 1720556116,
        //         "sunset": 1720608791
        //     },
        //     "timezone": 32400,
        //     "id": 1845136,
        //     "name": "Chuncheon",
        //     "cod": 200
        // };
        data = { ...data, city: $cityName.parentElement.className, krName: cityData.krName };
        cityWeathers.push(data); // 데이터를 배열에 추가하는 예시입니다.

        // 가져온 데이터를 각각의 도시 UI에 적용
        $cityIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        $cityIcon.alt = data.weather[0].description;
        $cityIcon.title = data.weather[0].main;
        $cityTemp.textContent = data.main.temp + '°';
        $cityFeel.textContent = '체감' + data.main.feels_like + '°';
        $cityWind.textContent = `${data.wind.speed}m/s`;
    }//$cityName for

    let maxTemp = -Infinity;
    let minTemp = Infinity;
    let maxFeel = -Infinity;
    let minFeel = Infinity;
    let maxWind = -Infinity;

    let maxTempCity = null;
    let minTempCity = null;
    let maxFeelCity = null;
    let minFeelCity = null;
    let maxWindCity = null;

    let maxTempCityKr = null;
    let minTempCityKr = null;
    let maxFeelCityKr = null;
    let minFeelCityKr = null;
    let maxWindCityKr = null;
    // 최대온도,최소온도,최대풍속,최대체감,최소체감 도시를 추출
    for (cityWeather of cityWeathers) {
        if (cityWeather.main.temp > maxTemp) {
            maxTemp = cityWeather.main.temp;
            maxTempCity = cityWeather.city;
            maxTempCityKr = cityWeather.krName;
        }
        if (cityWeather.main.temp < minTemp) {
            minTemp = cityWeather.main.temp;
            minTempCity = cityWeather.city;
            minTempCityKr = cityWeather.krName;
        }
        if (cityWeather.main.feels_like > maxFeel) {
            maxFeel = cityWeather.main.feels_like;
            maxFeelCity = cityWeather.city;
            maxFeelCityKr = cityWeather.krName;
        }
        if (cityWeather.main.feels_like < minFeel) {
            minFeel = cityWeather.main.feels_like;
            minFeelCity = cityWeather.city;
            minFeelCityKr = cityWeather.krName;
        }
        if (cityWeather.wind.speed > maxWind) {
            maxWind = cityWeather.wind.speed;
            maxWindCity = cityWeather.city;
            maxWindCityKr = cityWeather.krName;
        }

    }//cityWeather for

    // 최대온도,최소온도,최대풍속 도시에 색상,굵기적용
    $cities.forEach(($city) => {
        if ($city.className === maxTempCity) {
            $city.children[2].style.color = "red";
            $city.children[2].style.fontWeight = "800";
        }
        if ($city.className === minTempCity) {
            $city.children[2].style.color = "blue";
            $city.children[2].style.fontWeight = "800";
        }
        if ($city.className === maxFeelCity) {
            $city.children[3].style.color = "red";
            $city.children[3].style.fontWeight = "800";
        }
        if ($city.className === minFeelCity) {
            $city.children[3].style.color = "blue";
            $city.children[3].style.fontWeight = "800";
        }
        if ($city.className === maxWindCity) {
            $city.lastElementChild.style.color = "green";
            $city.lastElementChild.style.fontWeight = "800";
        }
    });//cities.forEach


    // recommendContainer에 각각 맞는 데이터 출력
    // console.log(tideHighTime);
    const $maxTempCity = document.querySelector('.recommendContainer .maxTempCity');
    const $minTempCity = document.querySelector('.recommendContainer .minTempCity');
    const $tideHighTime = document.querySelector('.recommendContainer .tideHighTime');
    const $tideHighstart = document.querySelector('.recommendContainer .tideHighstart');
    const $maxFeelCity = document.querySelector('.recommendContainer .maxFeelCity');
    const $minFeelCity = document.querySelector('.recommendContainer .minFeelCity');
    const $maxWindCity = document.querySelector('.recommendContainer .maxWindCity');

    $maxTempCity.textContent = `${maxTempCityKr}:${maxTemp}°`;
    $maxTempCity.style.color = `#f33`;
    $minTempCity.textContent = `${minTempCityKr}:${minTemp}°`;
    $minTempCity.style.color = `#33f`;
    tideHighTime.forEach((time => {
        $tideHighTime.textContent += `${time} `;
        $tideHighTime.style.color = `#33f`;
        $tideHighstart.textContent = `${parseInt(tideHighTime[0])}`;
        $tideHighstart.style.color = `#f33`;
    }))
    $maxFeelCity.textContent = `${maxFeelCityKr}:${maxFeel}°`;
    $maxFeelCity.style.color = `#f33`;
    $minFeelCity.textContent = `${minFeelCityKr}:${minFeel}°`;
    $minFeelCity.style.color = `#33f`;
    $maxWindCity.textContent = `${maxWindCityKr}:${maxWind}m/s`;
    $maxWindCity.style.color = `green`;

    showRecommends();
})(); //openWeather API