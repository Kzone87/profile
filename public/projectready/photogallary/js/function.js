const $thumbs = document.querySelectorAll("section>.container>ul>li>a");
const $screen = document.querySelector(".screen");
const $leftArrow = document.querySelector(".leftArrow");
const $rightArrow = document.querySelector(".rightArrow");

let nowIdx = 0;
let preIdx = nowIdx;

$thumbs.forEach(($thumb, Idx) => {
  $thumb.addEventListener("click", (evt) => {
    evt.preventDefault();

    preIdx = nowIdx;
    nowIdx = Idx;

    const nowAlt = $thumbs[nowIdx].firstElementChild.getAttribute("alt");
    const nowImg = $thumbs[nowIdx].getAttribute("href");

    $thumbs[preIdx].parentElement.removeAttribute("class");
    $thumbs[nowIdx].parentElement.setAttribute("class", "on");
    $screen.firstElementChild.setAttribute("src", nowImg);
    $screen.firstElementChild.setAttribute("alt", nowAlt);
  });
});

$leftArrow.addEventListener("click", (evt) => {
  evt.preventDefault();

  preIdx = nowIdx;

  if (nowIdx > 0) {
    nowIdx--;
  } else {
    nowIdx = 8;
  }

  const nowAlt = $thumbs[nowIdx].firstElementChild.getAttribute("alt");
  const nowImg = $thumbs[nowIdx].getAttribute("href");

  $thumbs[preIdx].parentElement.removeAttribute("class");
  $thumbs[nowIdx].parentElement.setAttribute("class", "on");
  $screen.firstElementChild.setAttribute("src", nowImg);
  $screen.firstElementChild.setAttribute("alt", nowAlt);
});

$rightArrow.addEventListener("click", (evt) => {
  evt.preventDefault();

  preIdx = nowIdx;

  if (nowIdx < 8) {
    nowIdx++;
  } else {
    nowIdx = 0;
  }

  const nowAlt = $thumbs[nowIdx].firstElementChild.getAttribute("alt");
  const nowImg = $thumbs[nowIdx].getAttribute("href");

  $thumbs[preIdx].parentElement.removeAttribute("class");
  $thumbs[nowIdx].parentElement.setAttribute("class", "on");
  $screen.firstElementChild.setAttribute("src", nowImg);
  $screen.firstElementChild.setAttribute("alt", nowAlt);
});
