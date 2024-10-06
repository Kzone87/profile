// 슬라이드 이미지 저장
const $frame = document.querySelector('.visual>.visual-frame');
const $selectors = document.querySelectorAll('.selector-container a');
const $play = document.querySelector('.visual-play');
const $pause = document.querySelector('.visual-pause');
const $visualName = document.querySelector('.visual>.name');
const $visualIntro = document.querySelector('.visual>.intro');
const $link = document.querySelector('.visual-frame>.link');
const $selectContainer = document.querySelector('.selector-container');

$frame.style.backgroundImage = `url('./images/heonhwa.jpg')`;

const changeFn = () => {
    $selectors[nowIdx].classList.add('on');
    $selectors[oldIdx].classList.remove('on');
    $frame.style.backgroundImage = `url('./images/${$selectors[nowIdx].id}.jpg')`;
    $visualName.textContent = $selectors[nowIdx].nextElementSibling.textContent;
    $visualIntro.textContent = $selectors[nowIdx].nextElementSibling.nextElementSibling.textContent;
    $link.setAttribute('href', `${$selectors[nowIdx].nextElementSibling.nextElementSibling.nextElementSibling.textContent}`);
};

let nowIdx = 0;
let oldIdx = nowIdx;

$selectors.forEach(($selector, idx) => {
    $selector.addEventListener('click', (evt) => {
        evt.preventDefault();

        oldIdx = nowIdx;
        nowIdx = idx;

        changeFn();
    });
});

// 자동재생 플레이 중지
let key;
$play.addEventListener('click', (evt) => {
    let streetNow = 0;
    evt.preventDefault();
    $frame.style.backgroundImage = `url('./images/${$selectors[nowIdx].id}${5}.png')`;
    $selectContainer.style.display = 'none';
    // 인터벌이벤트 중복실행 방지
    if ($play.classList.contains('playing')) { return; }
    $play.classList.add('playing');

    key = setInterval(() => {
        $frame.style.backgroundImage = `url('./images/${$selectors[nowIdx].id}${streetNow}.png')`;
        streetNow++;
        streetNow = streetNow > 5 ? 0 : streetNow;
    }, 2000);
});

$pause.addEventListener('click', (evt) => {
    evt.preventDefault();

    // 인터벌이벤트 중복실행 방지 해제
    $play.classList.remove('playing');
    clearInterval(key);
    $selectContainer.style.display = 'block';
    $frame.style.backgroundImage = `url('./images/${$selectors[nowIdx].id}.jpg')`;
});