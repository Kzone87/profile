
// 날짜시간을 가져오는 함수
const diplayTimeFn = () => {

    // 문제)날짜시간정보를 가진 객체 now를 선언하시오
    const now = new Date();

    // 시 hours
    const hours = now.getHours();
    // 분 minutes
    const minutes = now.getMinutes();
    // 초 seconds
    const seconds = now.getSeconds();

    // ampm구분
    const ampm = hours < 12 ? 'am' : 'pm';

    // 12시간 표기제
    const hours12 = hours % 12;

    // 두자리숫자로 변환
    const zeroHours = hours12 < 10 ? '0' + hours12 : hours12;
    const zeroMinutes = minutes < 10 ? '0' + minutes : minutes;
    const zeroSeconds = seconds < 10 ? '0' + seconds : seconds;

    let time = '';
    if (hours12 > 0) {
        time = `(${zeroHours}:${zeroMinutes}:${zeroSeconds} ${ampm})`;
    } else {
        time = `(${12}:${zeroMinutes}:${zeroSeconds} ${ampm})`;
    }

    const $time = document.querySelector('header .time');
    
    $time.textContent = time;
};


// 1초간격으로 콜백함수를 호출
setInterval(diplayTimeFn, 1000);
