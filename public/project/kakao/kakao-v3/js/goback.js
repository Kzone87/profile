const $goback = document.querySelector(".goback");

$goback.addEventListener('click', () => {
    history.back();
});

// 모바일 슬라이더 현재시간 표시
setInterval(() => {
    const localTime = new Date();
    let localHour = localTime.getHours();
    let localMinute = localTime.getMinutes();
    let ampmHour = 0;
    let zeroHour = 0;
    let zeroMinute = 0;
    let ampm = '';

    if (localHour < 12 || localHour == 24) { ampm = '오전' } else { ampm = '오후' }
    if (localHour > 12) { ampmHour = localHour - 12 } else { ampmHour = localHour }

    if (ampmHour < 10) { zeroHour = '0' + ampmHour } else { zeroHour = ampmHour }
    if (localMinute < 10) { zeroMinute = '0' + localMinute } else { zeroMinute = localMinute }

    const $mTime = document.querySelector('.mslider .time');
    const localNow = `${ampm} ${zeroHour} : ${zeroMinute}`;
    $mTime.textContent = localNow;
}, 1000);