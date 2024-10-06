const $frmMsg = document.querySelector('form');
const $msg = document.getElementById('msg');
const $characters = document.querySelectorAll('.charContainer>p');
const $dialogs = document.querySelectorAll('.dialogContainer>.dialog');
const $dialog = document.querySelector('.dialogContainer>.dialog');
const $friendDial = document.querySelector('.dialog.friend');
const $expertDial = document.querySelector('.dialog.expert');
const $translatorDial = document.querySelector('.dialog.translator');

// 메세지 출력함수
const addMessageFn = (msg, me, className) => {
    const $li = document.createElement('li');
    me && ($li.style.textAlign = 'right');
    me && ($li.style.marginLeft = '30%');
    const $span = document.createElement('span');
    me && ($span.style.backgroundColor = '#ff0');
    me || $li.classList.add('response');

    $span.textContent = msg;
    $li.appendChild($span);
    if (className === 'friend') {
        $friendDial.firstElementChild.appendChild($li);
        $friendDial.scrollTo(0, $friendDial.firstElementChild.scrollHeight);
    } else if (className === 'expert') {
        $expertDial.firstElementChild.appendChild($li);
        $expertDial.scrollTo(0, $expertDial.firstElementChild.scrollHeight);
    } else if (className === 'translator') {
        $translatorDial.firstElementChild.appendChild($li);
        $translatorDial.scrollTo(0, $translatorDial.firstElementChild.scrollHeight);
    }
};

// 서버로 메세지 전송 및 응답 화면적용 함수
const sendMessageFn = async (message, className) => {
    let charMessage = null;
    if (className === 'friend') {
        charMessage = message + ',answer like friend ,speak Korean';
    } else if (className === 'expert') {
        charMessage = message;
    } else if (className === 'translator') {
        charMessage = message + 'translate to korean';
    }

    const response = await fetch("/chat", {
        method: 'post',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ 'message': charMessage })
    });
    const data = await response.json();
    addMessageFn(data.response, false, className);
};

// 채팅내용 입력시 GPT API로 요청 및 응답 화면에 적용
$frmMsg.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const message = $msg.value.trim();
    // alert(message);

    addMessageFn(message, true, $frmMsg.className);
    sendMessageFn(message, $frmMsg.className);
    $msg.value = '';
});

// 캐릭터선택 이벤트핸들러
$characters.forEach(($character) => {
    $character.addEventListener('click', () => {
        $characters.forEach($character => $character.classList.remove('on'));
        $character.classList.add('on');
        $frmMsg.classList.remove('friend', 'expert', 'translator');
        $frmMsg.classList.add(`${$character.id}`);
        $dialogs.forEach($dialog => $dialog.style.display = 'none');
        for (let $dialog of $dialogs) {
            if ($dialog.classList.contains(`${$character.id}`)) {
                $dialog.style.display = 'block';
            }
        }
    });
});