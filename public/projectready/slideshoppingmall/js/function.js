const $indicators = document.querySelectorAll('.slides-pagination a');
const $container = document.querySelector('.slides-container');


let nowIdx = 0;
let oldIdx = nowIdx;

const moveFn = () => {
    // 활성화 표시
    $indicators[nowIdx].parentElement.classList.add('on');
    $indicators[oldIdx].parentElement.classList.remove('on');

    // 컨테이너 이동 공식
    $container.style.left = -1120 * nowIdx + 'px';
};

$indicators.forEach(($indicator, idx) => {
    $indicator.addEventListener('click', (evt) => {
        evt.preventDefault();

        oldIdx = nowIdx;
        nowIdx = idx;

        moveFn();
    });
});

// 이전버튼
const $btnPrev = document.querySelector('.slides-prev');
$btnPrev.addEventListener('click', (evt) => {
    evt.preventDefault();
    
    oldIdx = nowIdx;
    nowIdx--;
    // if (nowIdx < 0) { nowIdx = 4 }
    nowIdx = nowIdx < 0 ? 4 : nowIdx;
    // nowIdx < 0 && nowIdx = 4;
    
    moveFn();
});

// 다음버튼
const $btnNext = document.querySelector('.slides-next');
$btnNext.addEventListener('click', (evt) => {
    evt.preventDefault();

    oldIdx = nowIdx;
    nowIdx++;
    // if (nowIdx > 4) { nowIdx = 0 }
    nowIdx = nowIdx > 4 ? 0 : nowIdx;
    
    moveFn();
});