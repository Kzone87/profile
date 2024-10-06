const $chatClosers = document.querySelectorAll('.chatclose');
const $chatPages = document.querySelectorAll('.chatpage');
const $chatPage = document.querySelector('.chatpage');
const $chatInputs = document.querySelectorAll('.chatinput');
const $qwertys = document.querySelectorAll('.qwerty');
const $chatContainers = document.querySelectorAll('.chatcontainer');

const $previews = document.querySelectorAll('.preview');
const $lastchats = document.querySelectorAll('.chatcontainer p:last-child>.chat');

const $minichats = document.querySelectorAll('.minichat');

const $textInputs = document.querySelectorAll('.textinput');
const $chatList = document.querySelector('.chatlist');

const $miniProfiles = document.querySelectorAll('.minichat>.frame>img');
const $chatNames = document.querySelectorAll('.chatname');
const $chatTimes = document.querySelectorAll('.chattime');


// 상대방 채팅 맨처음에 미니프로필 사진,채팅상대 이름 첨부
$miniProfiles.forEach(($miniProfile, idx) => {
    for (i = 0; i < $chatPages[idx].children[1].children.length; i++) {
        const chat = $chatPages[idx].children[1].children[i];
        const chatClass = $chatPages[idx].children[1].children[i].getAttribute('class');
        // const prevClass = $chatPages[idx].children[1].children[i].previousElementSibling.getAttribute('class');
        if (chatClass === 'friendschat') {
            const chatMiniProf = document.createElement('img');
            const name = document.createElement('span');
            const miniSrc = $miniProfile.getAttribute('src');
            chatMiniProf.setAttribute('class', 'miniprofile');
            chatMiniProf.setAttribute('src', `${miniSrc}`);
            chatMiniProf.setAttribute('alt', `#`);
            name.setAttribute('class', 'name');
            name.textContent = $chatNames[idx].textContent;
            chat.insertBefore(name, chat.firstChild);
            chat.insertBefore(chatMiniProf, chat.firstChild);
        }
        else { continue; }
    }
});

// 채팅창 인풋 이벤트 핸들러
let order = 0;
$textInputs.forEach(($textInput, idx) => {
    $textInput.addEventListener('keydown', (evt) => {
        // evt.target.value;
        // console.log(evt.key);
        if (evt.key === 'Enter') {
            // 인풋창에 글자입력시 해당 채팅방에 추가
            if (evt.target.value === '') { return; }
                const newChatP = document.createElement('p');
                const newChatSpan = document.createElement('span');

                newChatP.setAttribute('class', `mychat`);
                newChatSpan.setAttribute('class', 'chat');
                newChatSpan.textContent = evt.target.value;
                newChatP.appendChild(newChatSpan);
                $chatContainers[idx].appendChild(newChatP);
                evt.target.value = '';
                // 마지막에 입력 한 채팅내용 프리뷰에 할당
                $previews[idx].textContent = newChatP.textContent;
                // 입력한 채팅방 하단으로 이동
                order++;
                $minichats[idx].setAttribute('style', `order: ${order};`);
                // 텍스트입력시 스크롤 하단 고정
                $chatContainers[idx].scrollTop = $chatContainers[idx].scrollHeight;

                // 새로입력한 채팅 시간 프리뷰,채팅창에 할당
                const now = new Date();
                let nowHour = now.getHours();
                let nowMinute = now.getMinutes();
                // 오전,오후 구분
                if (nowHour < 12) {
                    nowHour = '오전' + nowHour;
                } else {
                    nowHour = '오후' + (nowHour - 12);
                }
                const newChatTime = document.createElement('span');
                newChatTime.setAttribute('class', 'date');
                newChatTime.textContent = `${nowHour}:${nowMinute}`;
                newChatP.appendChild(newChatTime);
                $chatTimes[idx].textContent = `${nowHour}:${nowMinute}`;

            // createChat('mychat',evt.target.value);


            // 응답시스템 개발메지시 표시(1초후)
            setTimeout(() => {
                // createChat('friendschat','응답시스템 개발중입니다.');
                const newChatP = document.createElement('p');
                const newChatSpan = document.createElement('span');

                newChatP.setAttribute('class', `friendschat`);
                newChatSpan.setAttribute('class', 'chat');
                newChatSpan.textContent = '응답시스템을 개발중입니다';
                newChatP.appendChild(newChatSpan);
                $chatContainers[idx].appendChild(newChatP);
                evt.target.value = '';
                // 마지막에 입력 한 채팅내용 프리뷰에 할당
                $previews[idx].textContent = newChatP.textContent;
                // 입력한 채팅방 하단으로 이동
                order++;
                $minichats[idx].setAttribute('style', `order: ${order};`);
                // 텍스트입력시 스크롤 하단 고정
                $chatContainers[idx].scrollTop = $chatContainers[idx].scrollHeight;

                // 새로입력한 채팅 시간 프리뷰,채팅창에 할당
                const now = new Date();
                let nowHour = now.getHours();
                let nowMinute = now.getMinutes();
                // 오전,오후 구분
                if (nowHour < 12) {
                    nowHour = '오전' + nowHour;
                } else {
                    nowHour = '오후' + (nowHour - 12);
                }
                const newChatTime = document.createElement('span');
                newChatTime.setAttribute('class', 'date');
                newChatTime.textContent = `${nowHour}:${nowMinute}`;
                newChatP.appendChild(newChatTime);
                $chatTimes[idx].textContent = `${nowHour}:${nowMinute}`;

                // 채팅방 해당 프로필 사진,이름 가져와서 생성 및 할당
                const chatMiniProf = document.createElement('img');
                const name = document.createElement('span');
                const miniSrc = $miniProfiles[idx].getAttribute('src');
                chatMiniProf.setAttribute('class', 'miniprofile');
                chatMiniProf.setAttribute('src', `${miniSrc}`);
                chatMiniProf.setAttribute('alt', `#`);
                name.setAttribute('class', 'name');
                name.textContent = $chatNames[idx].textContent;
                newChatP.insertBefore(name, newChatP.firstChild);
                newChatP.insertBefore(chatMiniProf, newChatP.firstChild);
            }, 1000);
        }
    });
});

// 미니챗 클릭시 화면에 채팅페이지 표시
$minichats.forEach(($minichat, idx) => {
    $minichat.addEventListener('click', () => {
        $chatPages[idx].setAttribute('style', 'height: 100%;');
        $chatPages[idx].firstElementChild.firstElementChild.setAttribute('style', 'display:initial;');
        $chatPages[idx].firstElementChild.setAttribute('style', 'display:initial;');
        $chatPages[idx].lastElementChild.firstElementChild.setAttribute('style', 'height: 50px;');
        $chatPages[idx].lastElementChild.lastElementChild.setAttribute('style', 'display:initial;');
        $chatPages[idx].children[1].setAttribute('style', 'display:grid;');

        $chatList.setAttribute('style', 'display:none;');
    });
});

// 뒤로가기 클릭시 채팅페이지 숨김
$chatClosers.forEach(($chatCloser, idx) => {
    $chatCloser.addEventListener('click', (evt) => {
        evt.preventDefault();
        for (i = 0; i < $chatClosers.length; i++) {
            $chatPages[i].setAttribute('style', 'height: 0;');
            $chatClosers[i].setAttribute('style', 'display:none;');
            $chatClosers[i].parentElement.setAttribute('style', 'display:none;');
            $chatInputs[i].setAttribute('style', 'height: 0;');
            $qwertys[i].setAttribute('style', 'display:none;');
            $chatContainers[i].setAttribute('style', 'display:none;');

            $chatList.setAttribute('style', 'display:flex;');
        }
    });
});

// 각 채팅방 마지막 메시지를 미니챗 프리뷰에 표시
for (i = 0; i < $previews.length; i++) {
    $previews[i].textContent = $lastchats[i].textContent;
}



