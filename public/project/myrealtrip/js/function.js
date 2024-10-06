// 헤더 gnb메뉴 클릭시 원페이지 슬라이드
const $gnbMenus = document.querySelectorAll('.gnb>li>a');
const $slides = document.querySelectorAll('section>div');
const $h1 = document.querySelector('h1');

const arrTopVal = [];
$slides.forEach(($slide, idx) => {
    arrTopVal.push($slide.offsetTop);
});

// 메뉴 클릭시 메뉴 화면으로 슬라이드 이동
$gnbMenus.forEach(($gnbMenu, idx) => {
    $gnbMenu.addEventListener('click', (evt) => {
        evt.preventDefault();

        window.scrollTo({
            top: arrTopVal[idx] - 150,
            behavior: "smooth"
        });
    });
});

$h1.addEventListener('click', (evt) => {
    evt.preventDefault();
    window.scrollTo({
        top: arrTopVal[0] - 150,
        behavior: "smooth"
    });
});

let nowIdx = 0;
let oldIdx = nowIdx;

window.addEventListener('scroll', () => {
    const scrollTop = Math.ceil(window.scrollY); //노트북에서 소수점이 발생 할 수도 있기때문에 올림 처리

    for (let i = 0; i < $gnbMenus.length; i++) {

        if (scrollTop >= arrTopVal[i] - 400) {
            //활성화표시
            oldIdx = nowIdx;
            nowIdx = i;

            // 스크롤 높이값에 따른 메뉴의 활성화 표시
            $gnbMenus[oldIdx].classList.remove('on');
            $gnbMenus[nowIdx].classList.add('on');
        }
    }
});




// 시티슬라이드 좌우버튼 클릭시 슬라이드 이동 및 화살표 표시,숨김
const $cityPrev = document.querySelector('.cityslides>.prev');
const $cityNext = document.querySelector('.cityslides>.next');
const $cityContainer = document.querySelector('.cityslides-container');

$cityNext.addEventListener('click', (evt) => {
    evt.preventDefault();

    $cityContainer.style.marginLeft = -1100 + 'px';
    $cityNext.style.display = 'none';
    $cityPrev.style.display = 'block';
});

$cityPrev.addEventListener('click', (evt) => {
    evt.preventDefault();

    $cityContainer.style.marginLeft = 0 + 'px';
    $cityNext.style.display = 'block';
    $cityPrev.style.display = 'none';
});



// 매인베너 슬라이드
const $mainbanners = document.querySelectorAll('.mainbanner');
const $mainContainer = document.querySelector('.mainslides-container');
const $mainslide = document.querySelector('.mainslide');
const $mainPrev = document.querySelector('.mainslide>.prev');
const $mainNext = document.querySelector('.mainslide>.next');
const $mainSeletors = document.querySelectorAll('.mainslide>.selector>li');

// 백그라운드 이미지 일괄할당
$mainbanners.forEach(($mainbanner, idx) => {
    $mainbanner.style.backgroundImage = `url(./images/banner${idx + 1}.jpg)`
    $mainbanner.addEventListener('click', (evt) => { evt.preventDefault() });
});

$mainPrev.style.display = 'none';
// 메인슬라이드 함수
const mainSlide = () => {
    $mainContainer.style.marginLeft = -1100 * mainNow + 'px';
    $mainSeletors[mainNow].classList.add('on');
    $mainSeletors[mainOld].classList.remove('on');

    if (mainNow === 0) {
        $mainPrev.style.display = 'none';
        $mainNext.style.display = 'block';
    }
    else if (mainNow === 9) {
        $mainPrev.style.display = 'block';
        $mainNext.style.display = 'none';
    }
    else {
        $mainPrev.style.display = 'block';
        $mainNext.style.display = 'block';
    }
};

let mainNow = 0;
let mainOld = mainNow;
$mainNext.addEventListener('click', (evt) => {
    evt.preventDefault();

    mainOld = mainNow;
    mainNow++;
    mainOld = mainNow > 9 ? 8 : mainOld;
    mainNow = mainNow > 9 ? 9 : mainNow;

    mainSlide();
});

$mainPrev.addEventListener('click', (evt) => {
    evt.preventDefault();

    mainOld = mainNow;
    mainNow--;
    mainOld = mainNow < 0 ? 1 : mainOld;
    mainNow = mainNow < 0 ? 0 : mainNow;

    mainSlide();
});

// 메인슬라이드 마우스 오버시 5초마다 자동 넘어감 1~9반복
let mainKey;
$mainslide.addEventListener('mouseover', () => {
    mainKey = setInterval(() => {
        mainOld = mainNow;
        mainNow++;
        mainNow = mainNow > 9 ? 0 : mainNow;

        mainSlide();
    }, 4000);
});

$mainslide.addEventListener('mouseout', () => {
    clearInterval(mainKey);
});






// 핫플레이스 슬라이더
const $hotplaces = document.querySelectorAll('.hotplace-container>.hotplace');
const $hotContainer = document.querySelector('.hotplace-container');
const $hotPrev = document.querySelector('.hotplace-slide>.prev');
const $hotNext = document.querySelector('.hotplace-slide>.next');

// 핫플레이스 이미지 일괄할당
$hotplaces.forEach(($hotplace, idx) => {
    $hotplace.style.backgroundImage = `url(./images/hotplace_${idx + 1}.png)`;
    $hotplace.addEventListener('click', (evt) => { evt.preventDefault() });
});
// 핫슬라이드 함수
const hotSlide = () => {
    $hotContainer.style.marginLeft = -1100 * hotNow + 'px';
    if (hotNow === 6) { $hotContainer.style.marginLeft = -1100 * 5.5 + 'px'; }

    if (hotNow === 0) {
        $hotPrev.style.display = 'none';
        $hotNext.style.display = 'block';
    }
    else if (hotNow === 6) {
        $hotPrev.style.display = 'block';
        $hotNext.style.display = 'none';
    }
    else {
        $hotPrev.style.display = 'block';
        $hotNext.style.display = 'block';
    }
};

$hotPrev.style.display = 'none';
// 핫플레이스 슬라이드 기능

let hotNow = 0;

$hotNext.addEventListener('click', (evt) => {
    evt.preventDefault();
    hotNow++;
    hotNow = hotNow > 6 ? 6 : hotNow;
    hotSlide();
});

$hotPrev.addEventListener('click', (evt) => {
    evt.preventDefault();

    hotNow--;
    hotNow = hotNow < 0 ? 0 : hotNow;
    hotSlide();
});

// 시티패스 이미지 일괄적용
const $citypassS = document.querySelectorAll('.citypass-container>.citypass');

$citypassS.forEach(($citypass, idx) => {
    $citypass.style.backgroundImage = `url(./images/citypass_${idx + 1}.png)`;
    $citypass.addEventListener('click', (evt) => { evt.preventDefault() });
});







// 필수티켓 슬라이더
const $mustticket = document.querySelectorAll('.mustticket-container>.mustticket');
const $mustContainer = document.querySelector('.mustticket-container');
const $mustPrev = document.querySelector('.mustticket-slide>.prev');
const $mustNext = document.querySelector('.mustticket-slide>.next');

// 필수티켓 이미지 일괄적용
const $musttickets = document.querySelectorAll('.mustticket-container>.mustticket');

$musttickets.forEach(($mustticket, idx) => {
    $mustticket.style.backgroundImage = `url(./images/mustticket${idx + 1}.png)`;
    $mustticket.addEventListener('click', (evt) => { evt.preventDefault() });
});


// 필수티켓 함수
const mustSlide = () => {
    $mustContainer.style.marginLeft = -1100 * mustNow + 'px';
    if (mustNow === 3) { $mustContainer.style.marginLeft = -1100 * 2.5 + 'px'; }

    if (mustNow === 0) {
        $mustPrev.style.display = 'none';
        $mustNext.style.display = 'block';
    }
    else if (mustNow === 3) {
        $mustPrev.style.display = 'block';
        $mustNext.style.display = 'none';
    }
    else {
        $mustPrev.style.display = 'block';
        $mustNext.style.display = 'block';
    }
};

$mustPrev.style.display = 'none';

// 필수티켓 슬라이드 기능

let mustNow = 0;

$mustNext.addEventListener('click', (evt) => {
    evt.preventDefault();
    mustNow++;
    mustNow = mustNow > 3 ? 3 : mustNow;
    mustSlide();
});

$mustPrev.addEventListener('click', (evt) => {
    evt.preventDefault();

    mustNow--;
    mustNow = mustNow < 0 ? 0 : mustNow;
    mustSlide();
});





// 시티패스 이미지 일괄적용
const $recommends = document.querySelectorAll('.recommend-container>.recommend');

$recommends.forEach(($recommend, idx) => {
    $recommend.style.backgroundImage = `url(./images/recommend${idx + 1}.png)`;
    $recommend.addEventListener('click', (evt) => { evt.preventDefault() });
});





// 제주교통 슬라이더
const $transport = document.querySelectorAll('.transport-container>.transport');
const $transContainer = document.querySelector('.transport-container');
const $transPrev = document.querySelector('.transport-slide>.prev');
const $transNext = document.querySelector('.transport-slide>.next');

// 제주교통 이미지 일괄적용
const $transports = document.querySelectorAll('.transport-container>.transport');

$transports.forEach(($transport, idx) => {
    $transport.style.backgroundImage = `url(./images/transport${idx + 1}.png)`;
    $transport.addEventListener('click', (evt) => { evt.preventDefault() });
});


// 제주교통 함수
const transSlide = () => {
    $transContainer.style.marginLeft = -1100 * transNow + 'px';
    if (transNow === 4) { $transContainer.style.marginLeft = -1100 * 3.25 + 'px'; }

    if (transNow === 0) {
        $transPrev.style.display = 'none';
        $transNext.style.display = 'block';
    }
    else if (transNow === 4) {
        $transPrev.style.display = 'block';
        $transNext.style.display = 'none';
    }
    else {
        $transPrev.style.display = 'block';
        $transNext.style.display = 'block';
    }
};

$transPrev.style.display = 'none';

// 제주교통 슬라이드 기능

let transNow = 0;

$transNext.addEventListener('click', (evt) => {
    evt.preventDefault();
    transNow++;
    transNow = transNow > 4 ? 4 : transNow;
    transSlide();
});

$transPrev.addEventListener('click', (evt) => {
    evt.preventDefault();

    transNow--;
    transNow = transNow < 0 ? 0 : transNow;
    transSlide();
});


// 앵커태그 작동방지
const $infoAs = document.querySelectorAll('a');
$infoAs.forEach(($infoA) => {
    $infoA.addEventListener('click', (evt) => {
        evt.preventDefault();
    });
});


// aside 버튼클릭 챗컨테이너 보여주기 and 닫기버튼 표시
const $chat = document.querySelector('aside>.chat');
const $chatClose = document.querySelector('aside>.close');
const $chatContainer = document.querySelector('aside>.chat-container');

$chat.addEventListener('click', () => {
    $chatClose.style.display = 'block';
    $chatContainer.style.display = 'block';
});

$chatClose.addEventListener('click', () => {
    $chatClose.style.display = 'none';
    $chatContainer.style.display = 'none';
});

// footer 1:1 채팅상담 클릭시 챗컨테이너 표시
const $help = document.querySelector('.helpdesk>.help');
$help.addEventListener('click', (evt) => {
    evt.preventDefault();
    $chat.click();
});