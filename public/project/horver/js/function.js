const $hrzSelectors = document.querySelectorAll(".hrzcontainer>ul>li>a");
const $hrzArrowLeft = document.querySelector(".hrzcontainer>.hrzleft");
const $hrzArrowRight = document.querySelector(".hrzcontainer>.hrzright");

const $vtcSelectors = document.querySelectorAll(".vtccontainer>ul>li>a");
const $vtcUp = document.querySelector(".vtccontainer>.vtcup");
const $vtcdown = document.querySelector(".vtccontainer>.vtcdown");

let hrzNum = 0;
let nowHrzIdx = 0;
let preHrzIdx = nowHrzIdx;

let vtcNum = 0;
let nowVtcIdx = 0;
let preVtcIdx = nowVtcIdx;

// // 초기 호라이즌셀렉터 선택 기본값 함수
// for (i = 0; i < 6; i++) {
//   let stdId = i * 6 + nowHrzIdx + 1;
//   document
//     .querySelector(`.stdcontainer>li:nth-child(${stdId})`)
//     .setAttribute("style", "background-color: blue;");
// }

// // 초기 버티컬셀렉터 선택 기본값 함수
// for (i = 0; i < 6; i++) {
//   let stdId = 6 * nowVtcIdx + i + 1;
//   document
//     .querySelector(`.stdcontainer>li:nth-child(${stdId})`)
//     .setAttribute("style", "background-color: red;");
// }

// 호라이즌체인저함수
const hrzChanger = () => {
  $hrzSelectors[nowHrzIdx].parentElement.setAttribute("class", "onblue");
  $hrzSelectors[preHrzIdx].parentElement.removeAttribute("class");

  // console.log(hrzNum);

  for (i = 0; i < 6; i++) {
    let stdId = i * 6 + nowHrzIdx + 1;
    let stdIdPre = i * 6 + preHrzIdx + 1;

    // document
    //   .querySelector(`.stdcontainer>li:nth-child(${stdIdPre})`)
    //   .removeAttribute("style");

    document
      .querySelector(`.stdcontainer>li:nth-child(${stdId})`)
      .setAttribute("style", "background-color: rgba(0,0,255,0.5);");
  }
};

// 버티컬체인저함수
const vtcChanger = () => {
  $vtcSelectors[nowVtcIdx].parentElement.setAttribute("class", "onred");
  $vtcSelectors[preVtcIdx].parentElement.removeAttribute("class");

  // console.log(hrzNum);

  for (i = 0; i < 6; i++) {
    let stdId = 6 * nowVtcIdx + i + 1;
    let stdIdPre = 6 * preVtcIdx + i + 1;

    // document
    //   .querySelector(`.stdcontainer>li:nth-child(${stdIdPre})`)
    //   .removeAttribute("style");

    document
      .querySelector(`.stdcontainer>li:nth-child(${stdId})`)
      .setAttribute("style", "background-color: rgba(255,0,0,0.5);");
  }
};

// 모든 버티컬 셀렉터에 대한 이벤트 리스너
$vtcSelectors.forEach(($vtcSelector, Idx) => {
  $vtcSelector.addEventListener("click", (evt) => {
    evt.preventDefault();

    preVtcIdx = nowVtcIdx;
    nowVtcIdx = Idx;

    vtcChanger();
  });
});

// 버티컬업 이벤트리스너
$vtcUp.addEventListener("click", (evt) => {
  evt.preventDefault();

  preVtcIdx = nowVtcIdx;
  if (nowVtcIdx > 0) {
    nowVtcIdx--;
  } else {
    nowVtcIdx = 5;
  }

  vtcChanger();
});

// 버티컬다운 이벤트리스너
$vtcdown.addEventListener("click", (evt) => {
  evt.preventDefault();

  preVtcIdx = nowVtcIdx;
  if (nowVtcIdx < 5) {
    nowVtcIdx++;
  } else {
    nowVtcIdx = 0;
  }

  vtcChanger();
});

// 모든 호라이즌 셀렉터에 대한 이벤트 리스너
$hrzSelectors.forEach(($hrzSelector, Idx) => {
  $hrzSelector.addEventListener("click", (evt) => {
    evt.preventDefault();

    preHrzIdx = nowHrzIdx;
    nowHrzIdx = Idx;

    hrzChanger();
  });
});

// 호라이즌레프트애로우 이벤트리스너
$hrzArrowLeft.addEventListener("click", (evt) => {
  evt.preventDefault();

  preHrzIdx = nowHrzIdx;
  if (nowHrzIdx > 0) {
    nowHrzIdx--;
  } else {
    nowHrzIdx = 5;
  }

  hrzChanger();
});

// 호라이즌라이트애로우 이벤트리스너
$hrzArrowRight.addEventListener("click", (evt) => {
  evt.preventDefault();

  preHrzIdx = nowHrzIdx;
  if (nowHrzIdx < 5) {
    nowHrzIdx++;
  } else {
    nowHrzIdx = 0;
  }

  hrzChanger();
});
