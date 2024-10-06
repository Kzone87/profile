const $login = document.getElementById('login');
const $content = $login.nextElementSibling;

const $loginForm = $login.firstElementChild;
const $username = $loginForm.children[1];

const $user = document.querySelector('p>.user');

// 로컬스토리지의 state.username에 따라 UI 선택
if (state.username !== '') {
    $content.style.display = 'block';
    $login.style.display = 'none';
} else {
    $content.style.display = 'none';
    $login.style.display = 'flex';
}

// 로그인 폼에 대한 submit이벤트 구문
$loginForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const username = $username.value.trim();

    $login.style.display = 'none'; //로그인폼 숨김처리
    $content.style.display = 'block'; //컨텐츠 노출

    // 로컬스토리지에 username값 저장
    state = { ...state, username };
    saveStateFn();

    $user.textContent = username;
});

// 새로고침시 로컬스토리지에 저장된 유저네임적용 즉시실행함수
(function () {
    $user.textContent = state.username;
})();