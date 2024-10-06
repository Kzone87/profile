

// 변수선언부
const $thumbs = document.querySelectorAll('.thumbs');
const $maimframe = document.querySelector('.mainframe');
const $prev = document.querySelector('.prev');
const $next = document.querySelector('.next');

let nowIdx = 0;
let oldIdx = nowIdx;


// 함수선언부
const changeFrameFn = () => {
    // 클릭이벤트리스너 안에들어가는 함수이므로 event변수로 이벤트객체를 받아 처리
    event.preventDefault();

    // 썸네일 클릭시 on클래스부여(빨간테두리적용) 및 이전요소 on클래스 제거
    $thumbs[nowIdx].parentElement.setAttribute('class', 'on');
    $thumbs[oldIdx].parentElement.removeAttribute('class');


    // 이미지태그로는 css속성변화에 따른 트랜지션 효과 적용 불가
    // const bigSrc = $thumbs[nowIdx].getAttribute('href');
    // $maimframe.setAttribute('src', bigSrc);

    // 메인프레임을 p태그로 변환 및 bgi속성을 변경하는 방식으로 트랜지션효과 적용 
    // $maimframe.setAttribute('style', `background-image: url(./images/big${nowIdx + 1}.jpg);`)

    // 위의 셋어트리뷰트 명령어와 마찬가지로 인라인 코딩방식으로 style을 적용하기 때문에 이미지 경로는 html파일이 위치한 곳에서 ./images폴더로 바로 들어감(css속성적용할때 처럼 ./..를 이용해 상위폴더로 이동할 필요가 없음)
    $maimframe.style.backgroundImage = `url(./images/big${nowIdx + 1}.jpg)`;


    // 현재썸네일에 들어있는 href값을 받아서 메이프레임의 href값에 할당(각 이미지에 맞는 상품페이지 주소 설정 가능)
    const nowUrl = $thumbs[nowIdx].getAttribute('href');
    $maimframe.parentElement.setAttribute('href', nowUrl);
};


// 이벤트리스너 선언부
$thumbs.forEach((thumb, idx) => {
    thumb.addEventListener('click', (event) => {
        oldIdx = nowIdx;
        nowIdx = idx;

        changeFrameFn();
    });
});

$prev.addEventListener('click', (event) => {
    oldIdx = nowIdx;

    if (nowIdx > 0) {
        nowIdx--;
    } else {
        nowIdx = 8;
    }
    // console.log(nowIdx);
    changeFrameFn();
});

$next.addEventListener('click', (event) => {
    oldIdx = nowIdx;

    if (nowIdx < 8) {
        nowIdx++;
    } else {
        nowIdx = 0;
    }

    changeFrameFn();
});