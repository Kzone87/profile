const $addList = document.querySelector('.listContainer>.addList');
const $resetList = document.querySelector('.listContainer>.resetList');
const $inputListForm = document.querySelector('.listContainer>.inputListForm');
const $inputList = document.querySelector('.inputListForm>#inputList');
const $inputListButton = document.querySelector('.inputListForm>.inputList');
const $inputCancel = document.querySelector('.inputListForm>.inputCancel');

const $listInfo = document.querySelector('.infoContainer>.listInfo');
const $arrivalTime = document.querySelector('.infoContainer>.arrivalTime');
const $listCurWeather = document.querySelector('.infoContainer>.listCurWeather');
const $listCurRain = document.querySelector('.infoContainer>.listCurRain');
const $duration = document.querySelector('.infoContainer>.duration');
const $prevWeather = document.querySelector('.infoContainer>.prevWeather');
const $nextWeather = document.querySelector('.infoContainer>.nextWeather');

const $editList = document.querySelector('.infoContainer>.editList');
const $deleteList = document.querySelector('.infoContainer>.deleteList');
const $streetView = document.querySelector('.infoContainer>.streetView');
const $mapView = document.querySelector('.infoContainer>.mapView');

const $editListForm = document.querySelector('.infoContainer>.editListForm');
const $editListBtn = document.querySelector('.editListForm>.editListBtn');
const $editCancelBtn = document.querySelector('.editListForm>.editCancelBtn');
const $editListInput = document.querySelector('.editListForm>#editListInput');
let selectedList = null;

// 리스트 클릭시 강조효과 부여 및 초기화(재클릭시 동작하기 위한 초기화)
const listEffectFn = (DOM) => {
    DOM.style.animation = 'changeBgColor 1s cubic-bezier(0, 1.75, 0.54, -0.21)';
    setTimeout(() => {
        DOM.style.animation = 'none';
    }, 1000);
};//listEffectFn

// 인포컨테이너 요소들에 리스트 클릭시 효과 적용 함수
const infoEffectFn = (DOM) => {
    DOM.style.animation = 'arrivalBgChange 2s cubic-bezier(0, 1.75, 0.54, -0.21)';
    setTimeout(() => {
        DOM.style.animation = 'none';
    }, 2000);
};//infoEffectFn

// 현재 로컬 스토리지에 저장된 마이리스트를 화면에 렌더링 하는 함수
const reRenderMyList = () => {
    // 기존 마이리스트를 화면에서 모두 삭제
    // 마이리스트는 모두 동적으로 생성되기에 함수가 실행될때마다 함수 안에서 재정의
    const $myLists = document.querySelectorAll('.listContainer>.myList');
    $myLists.forEach(($myList) => { $myList.remove() });

    // 로컬스토리지에서 마이리스트 객체를 담은 배열을 매번 다시 불러옴
    const myLists = JSON.parse(localStorage.getItem('locations')).myLists;
    // 로케이션 마이리스트 배열에 존재하는 객체를 기준으로 요소 재구성
    myLists.forEach((myList) => {
        const $listContainer = document.querySelector('.myList>.listContainer');
        const $myList = document.createElement('p');
        $myList.classList.add('myList');
        $myList.textContent = myList.name;
        $listContainer.appendChild($myList);


        // 요소들에 클릭 효과 부여
        $myList.addEventListener('click', async () => {
            // 색상 강조효과 부여 및 초기화(재클릭시 동작하기 위한 초기화)
            selectedList = myList.name;
            listEffectFn($myList);
            $listInfo.textContent = `${myList.name}를 향해 떠나볼까요~!`;
            infoEffectFn($listInfo);

            // 현재 목적지 날씨를 가져와서 화면에 적용
            const data = await (await fetch(`/weather?lat=${myList.lat}&lon=${myList.lon}`)).json();

            // 데이터의 영어상태를 한국어로 변환
            // data.weather[0].main => Thunderstorm, Drizzle, Rain, Snow, Clear, Clouds, aAtmosphere(Smoke,Haze,Dust,Fog,Sand,Ash,Squall,Tornado)
            let weatherKr = null;
            console.log(data.weather[0].main);
            switch (data.weather[0].main) {
                case 'Thunderstorm': weatherKr = '천둥번개'; break;
                case 'Drizzle': weatherKr = '이슬비'; break;
                case 'Rain': weatherKr = '비내림'; break;
                case 'Snow': weatherKr = '눈내림'; break;
                case 'Clear': weatherKr = '맑음'; break;
                case 'Clouds': weatherKr = '흐림'; break;
                case 'Smoke': weatherKr = '매우흐림'; break;
                case 'Haze': weatherKr = '약한안개'; break;
                case 'Dust': weatherKr = '먼지많음'; break;
                case 'Fog': weatherKr = '짙은안개'; break;
                case 'Sand': weatherKr = '모래바람'; break;
                case 'Ash': weatherKr = '재흩날림'; break;
                case 'Squall': weatherKr = '소나기'; break;
                case 'Tornado': weatherKr = '태풍'; break;
                case 'Mist': weatherKr = '안개'; break;
            };
            // 안내문에 현재날씨정보 및 애니메이션효과 적용
            $listCurWeather.textContent = `현재날씨 ${weatherKr} 체감기온 ${data.main.feels_like}°입니다`;
            infoEffectFn($listCurWeather);

            // 목적지 현재 강수량 표시
            if (data.rain) {
                $listCurRain.textContent = `현재 시간당 강수량은 ${data.rain["1h"]}mm입니다`;
                infoEffectFn($listCurRain);
            } else if (data.snow) {
                $listCurRain.textContent = `현재 시간당 강설량은 ${data.snow["1h"]}mm입니다`;
                infoEffectFn($listCurRain);
            } else {
                $listCurRain.textContent = `현재 시간당 강수량은 ${0}mm입니다`;
                infoEffectFn($listCurRain);
            }



            // 현재위치에서 목적지까지 소요 시간을 계산하여 화면에 적용

            // // naver cors에러에 따른 프록시서버 테스트->프론트엔드 프로젝트로 개발해보자~!
            // async function success(postion) {
            //     const coords = postion.coords;
            //     const lat = coords.latitude;
            //     const lon = coords.longitude;
            //     const start = `${lon},${lat}`;
            //     const goal = `${myList.lon},${myList.lat},name=${myList.name}`;
            //     // console.log(goal);
            //     const option = 'trafast';
            //     const direction5Data = await (await fetch(`http://localhost:3000/api/map-direction/v1/driving?start=${start}&goal=${goal}&option=${option}`)).json();
            //     console.log(direction5Data);
            //     console.log((direction5Data.route.trafast[0].summary.duration)/1000/60);
            // }
            // function error(err) {
            //     alert('위치 정보 제공에 동의해주세요~!');
            //     console.warn(`ERROR(${err.code}): ${err.message}`);
            // }
            // navigator.geolocation.getCurrentPosition(success, error);



            // 현재위치에서 목적지까지 소요 시간을 계산하여 화면에 적용
            // getCurrentPosition도 비동기 방식이지만 promise객체를 반환하지 않음
            // await방식으로 작동하기 위해 promise객체를 반환하는 함수로 변환
            const getCurrentPosition = () => {
                return new Promise((resolve, reject) => {
                    function reject(err) {
                        alert('위치 정보 제공에 동의해주세요~!');
                        console.warn(`ERROR(${err.code}): ${err.message}`);
                    }
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                })
            };


            async function fetchDirections(origin, destination) {
                try {
                    const response = await fetch(`/directions?origin=${origin}&destination=${destination}`);
                    const data = await response.json();
            
                    return data;

                } catch (error) {
                    console.error('Error:', error);
                }
            }

            const currentPosition = await getCurrentPosition();
            const curLat = currentPosition.coords.latitude;
            const curlon = currentPosition.coords.longitude;

            const origin = `${curlon},${curLat}`; // 현재 위치
            const destination = `${myList.lon},${myList.lat}`; // 예시 목적지

            const kakaoData = await fetchDirections(origin, destination);


            // 카카오길찾기 API로부터 응닫받은 데이터를 화면에 표시하는 함수
            const kakaoExpressFn = async (duration) => {
                // 목적지 도착 예상시간을 화면에 표시->예상시간과 현재시간을 mill단위로 합친 후에 새로운 Date객체를 생성
                const nowMill = new Date().valueOf();
                // kakaoData.routes[0].sections[0].duration * 1000;
                const arrivalTime = new Date(nowMill + duration);
                // console.log(arrivalTime);

                // arrivalTime 을 12시간표시제 2자리수 표기 arrivalHours,arrivalMinutes로 변환, 오전 오후 표시 추가
                const ampm = arrivalTime.getHours() > 12 ? '오후' : '오전';
                let arrivalHours = arrivalTime.getHours() > 12 ? arrivalTime.getHours() - 12 : arrivalTime.getHours();
                arrivalHours = arrivalHours < 10 ? `0${arrivalHours}` : arrivalHours;
                const arrivalMinutes = arrivalTime.getMinutes() < 10 ? `0${arrivalTime.getMinutes()}` : arrivalTime.getMinutes();

                $arrivalTime.textContent = `예상 도착시간은 ${ampm} ${arrivalHours}시${arrivalMinutes}분 입니다`;
                infoEffectFn($arrivalTime);


                // 도착지 날씨 예보를 확인하여 화면에 적용
                const forecastData = await (await fetch(`/forecast?lat=${myList.lat}&lon=${myList.lon}`)).json();

                // 현재시간이후 3시간 단위예보 객체 2개 추출
                const idx = forecastData.list.findIndex(forecast => new Date(forecast.dt_txt).valueOf() > nowMill);
                // console.log(idx);
                const firstForecast = forecastData.list[idx];
                const secondForecast = forecastData.list[idx + 1];
                let firstHours = new Date(firstForecast.dt_txt).getHours();
                let firstAmpm = firstHours > 11 ? '오후' : '오전';
                firstHours = firstHours > 12 ? firstHours - 12 : firstHours;
                firstHours = firstHours < 10 ? `0${firstHours}` : firstHours;
                let secondHours = new Date(secondForecast.dt_txt).getHours();
                let secondAmpm = secondHours > 11 ? '오후' : '오전'
                secondHours = secondHours > 12 ? secondHours - 12 : secondHours;
                secondHours = secondHours < 10 ? `0${secondHours}` : secondHours;
                // console.log(firstForecast);

                $prevWeather.textContent = `${firstAmpm} ${firstHours}시 예상기온:${firstForecast.main.temp}° 강수확률${Math.ceil(firstForecast.pop * 100)}% 입니다`;
                infoEffectFn($prevWeather);
                $nextWeather.textContent = `${secondAmpm} ${secondHours}시 예상기온:${secondForecast.main.temp}° 강수확률${Math.ceil(secondForecast.pop * 100)}% 입니다`;
                infoEffectFn($nextWeather);
            };//kakaoExpressFn

            // 현재위치에 가까운 경우 예상소요시간 외에 다른정보만 표시
            if (kakaoData.routes[0].result_code === 104) {
                $duration.textContent = `5m이내의 목적지는 예상시간을 표시할수 없습니다.`;
                infoEffectFn($duration);
                const duration = 0;
                kakaoExpressFn(duration);
            } else {
                const listDuration = Math.floor(kakaoData.routes[0].sections[0].duration / 60);
                const listHour = Math.floor(listDuration / 60);
                const listMinute = listDuration % 60;
                $duration.textContent = `예상 소요시간은 ${listHour}시간${listMinute}분 입니다`;
                infoEffectFn($duration);
                const duration = kakaoData.routes[0].sections[0].duration * 1000
                kakaoExpressFn(duration);
            }
        });
    });


};//reRenderMyList

// 현재 위치를 이름과 함께 저장하고 화면에 표시하는 함수
const addNewLocation = () => {
    // 이름 유효성 검사
    if ($inputList.value === '' || $inputList.value === null) {
        alert('추가할 장소의 이름을 정해주세요~!');
        return;
    }

    // 현재위치를 받아와서 저장
    const listName = $inputList.value;
    function success(postion) {
        const coords = postion.coords;
        const lat = coords.latitude;
        const lon = coords.longitude;

        // 현재위치에 해당하는 객체를 생성하여 로케이션 데이터에 추가
        const newList = { name: `${listName}`, lat: `${lat}`, lon: `${lon}`, roadCondition: 'three', complexity: 'three', accessibility: 'three', comfortness: 'three' };
        locations.myLists.push(newList);

        // 추가된 데이터를 로컬스토리지에 저장
        saveLocations();
        reRenderMyList();
        $inputList.value = '';
    }

    function error(err) {
        alert('위치 정보 제공에 동의해주세요~!');
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error);

    $inputListForm.style.display = 'none';
    $addList.style.display = 'block';
    listEffectFn($addList);
};//addNewLocation

reRenderMyList();
// 리스트 추가버튼 이벤트 핸들러
$addList.addEventListener('click', () => {
    // 클릭시 인풋리스트 보여주기
    $addList.style.display = 'none';
    $inputListForm.style.display = 'flex';
    // 색상 강조효과 부여 및 초기화(재클릭시 동작하기 위한 초기화)
    listEffectFn($inputListForm);

    $inputList.focus();
});
// 리스트 초기화 이벤트 핸들러
$resetList.addEventListener('click', async () => {
    if (confirm('정말로 목록을 초기화 하시겠습니까? \n 초기화한 목록은 복구할 수 없습니다.')) {
        resetLocations();
        reRenderMyList();
        location.reload();
    }
});


//  확인 취소에 대한 이벤트 핸들러
$inputListButton.addEventListener('click', (evt) => {
    evt.preventDefault(); //submit이벤트 동작 방지
    addNewLocation();
});
$inputCancel.addEventListener('click', (evt) => {
    $inputListForm.style.display = 'none';
    $addList.style.display = 'block';
    // 색상 강조효과 부여 및 초기화(재클릭시 동작하기 위한 초기화)
    listEffectFn($addList);
    $inputList.value = '';
});
$inputList.addEventListener('keydown', (evt) => {
    if (evt.key === 'Enter') {
        evt.preventDefault(); //submit이벤트 동작 방지
        addNewLocation();

    } else if (evt.key === 'Escape') {
        // console.log(evt.key);//Escape
        $inputListForm.style.display = 'none';
        $addList.style.display = 'block';
        // 색상 강조효과 부여 및 초기화(재클릭시 동작하기 위한 초기화)
        listEffectFn($addList);
        $inputList.value = '';
    } else {
        return;
    }
});


// 목록수정 클릭 이벤트 핸들러
$editList.addEventListener('click', () => {
    if (selectedList === null) { return alert('아직 선택된 리스트가 없습니다!') };
    $editListForm.style.display = 'flex';
    $editList.style.display = 'none';
    $deleteList.style.display = 'none';
    listEffectFn($editListForm);
    $editListInput.value = selectedList;
    $editListInput.focus();
});

// 리스트 삭제이벤트 핸들러
$deleteList.addEventListener('click', () => {
    if (selectedList === null) { return alert('아직 선택된 리스트가 없습니다!') };
    if (confirm(`정말로 ${selectedList}를 삭제하시겠습니까?`)) {
        locations = JSON.parse(localStorage.getItem('locations'));
        const selectedIdx = locations.myLists.findIndex(myList => myList.name === selectedList);
        locations.myLists.splice(selectedIdx, 1);
        listEffectFn($deleteList);
        saveLocations();
        reRenderMyList();
        selectedList = null;
        location.reload();
    }
});

// 리스트 수정이벤트 핸들러
$editListForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    $editListForm.style.display = 'none';
    $editList.style.display = 'block';
    $deleteList.style.display = 'block';

    locations = JSON.parse(localStorage.getItem('locations'));
    const selectedIdx = locations.myLists.findIndex(myList => myList.name === selectedList);
    // console.log(selectedIdx);
    const editedList = { ...locations.myLists[selectedIdx], name: $editListInput.value };
    locations.myLists.splice(selectedIdx, 1, editedList);
    selectedList = $editListInput.value;
    $editListInput.value = '';
    listEffectFn($editList);

    saveLocations();
    reRenderMyList();
});
// 리스트 수정 취소 이벤트 핸들러
$editCancelBtn.addEventListener('click', () => {
    $editListForm.style.display = 'none';
    $editList.style.display = 'block';
    $deleteList.style.display = 'block';
    listEffectFn($editList);
});