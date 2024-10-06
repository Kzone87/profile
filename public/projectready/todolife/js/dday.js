
const $inputBox = document.querySelector('.dday>.inputbox');
const $ddayList = $inputBox.nextElementSibling;

// 추가,수정폼
const $frmDdayAdd = document.querySelector('.dday form[name=frmAdd]');
const $frmDdayEdit = document.querySelector('.dday form[name=frmEdit]');

const $editTit = document.querySelector('.dday input[name=editTit]');
const $editDate = document.querySelector('.dday input[name=editDate]');

const $btnDdayAdd = document.querySelector('.dday>.tit>.add'); //디데이 추가버튼
const $addTit = document.querySelector('.dday input[name=addTit]');
const $addDate = document.querySelector('.dday input[name=addDate]');

const $btnClearDday = document.querySelector('.dday>.tit>h2>span');

let editDdayId = null; //수정할 항목의 아이디

// 로컬스토리이제 저장된 데이터를 화면에 출력하는 함수
const reRenderDdayFn = () => {

    // $ddayList 요소안의 모든 기존목록을 삭제
    while ($ddayList.children.length > 0) {
        $ddayList.removeChild($ddayList.firstElementChild);
    }


    // for문을 이용해서 Dday 배열데이터를 화면에 출력
    for (let i = 0; i < state.dday.length; i++) {
        // console.log(state.Dday[i].tit);

        const Dday = state.dday[i];

        // 동적으로 ul.list에 추가할 태그를 생성
        const $li = document.createElement('li');
        // $li.setAttribute('id', Dday.id);
        $li.id = Dday.id;

        // 삭제아이콘  <i class="fas fa-times-circle"></i>
        const $del_i = document.createElement('i');
        $del_i.classList.add('fas', 'fa-times-circle');

        // D-3,내용
        const $h3 = document.createElement('h3');
        const $p = document.createElement('p');

        // 수정아이콘   <i class="fas fa-edit"></i>
        const $edit_i = document.createElement('i');
        $edit_i.classList.add('fas', 'fa-edit');

        // Dday 계산
        const today = new Date().valueOf();
        const savedDday = parseInt(Dday.date);

        const millPerDay = (savedDday - today) / (1000 * 60 * 60 * 24);
        const remainDay = Math.ceil(millPerDay); // 오늘을 기준으로 남아있는 날 수

        $h3.textContent = `D-${remainDay}`;

        // 남은 날수에 따른 제목색상
        if (remainDay < 3) {
            $h3.style.color = '#f00';
        } else if (remainDay < 7) {
            $h3.style.color = 'orange';
        }

        $p.textContent = Dday.tit;

        // 완성된태그 i, h3, p, i 를 $li에 추가하여 조립
        $li.append($del_i, $h3, $p, $edit_i); //append는 여러개의 자식요소 추가 가능

        // 완성된 태그 li를 ul.list에 추가하여 조립
        $ddayList.appendChild($li); //appendChild는 한개의 자식요소만 추가 가능

    }//end of for


    // 수정 버튼에 대한 클릭이벤트 구문
    const $editIcons = document.querySelectorAll('.dday>.list i:last-child');
    $editIcons.forEach(($editIcon, idx) => {
        $editIcon.addEventListener('click', (evt) => {
            $inputBox.classList.toggle('show');
            $frmDdayAdd.classList.remove('on');
            $frmDdayEdit.classList.add('on');

            // 화살표함수에서는 this대신 evt.currentTarget 사용
            // editDdayId = evt.currentTarget.parentElement.id;
            editDdayId = parseInt($editIcon.parentElement.id);

            /*
                state.dday배열의 원소중 id속성값이 
                editDdayId 와 일치하는 원소의 tit, date 값을 가져온다.
             */

            const idx = state.dday.findIndex((dday) => dday.id === editDdayId);
            // console.log(state.Dday[idx]);

            // 날짜 추출후 input[type=date] 형식에 맞게 변환 2024-06-25
            let savedDate = new Date(state.dday[idx].date);

            let year = savedDate.getFullYear();
            let month = savedDate.getMonth() + 1;
            let date = savedDate.getDate();

            // 2자리 표기
            month = month < 10 ? `0${month}` : month;
            date = date < 10 ? `0${date}` : date;

            savedDate = `${year}-${month}-${date}`;

            $editTit.value = state.dday[idx].tit;
            $editDate.value = savedDate;

            $editTit.focus();
        });
    });


    // 삭제버튼에 대한 클릭이벤트 구문
    const $delIcons = document.querySelectorAll('.dday>.list i:first-child');
    $delIcons.forEach(($delIcon) => {
        $delIcon.addEventListener('click', (evt) => {
            const $li = $delIcon.parentElement;

            $li.classList.add('complete');

            // 0.5초후 삭제예약
            setTimeout(() => {
                $li.remove(); //현재 돔트리에서만 삭제

                // 로컬스토리지에서도 삭제
                // const id = parseInt($li.id);
                // for (i = 0; i < state.dday.length; i++) {
                //     if (state.dday[i].id === id) {
                //         state.dday.splice(i, 1);
                //     }
                // }

                // 필터를 이용한 방법 - 간단하게 배열을 편집할수 있다!
                state.dday = state.dday.filter((dday) => { return parseInt($li.id) !== dday.id });
                
                saveStateFn();
            }, 500);

        });
    });
};

reRenderDdayFn();

// 디데이 수정폼에 대한 submit 이벤트
$frmDdayEdit.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const tit = $editTit.value.trim();


    // 유효성 검사,오늘 이후의 날짜만 입력 가능하도록 수정
    // const today = new Date().setHours(0, 0, 0, 0);
    // console.log(inputDate);
    // console.log(today);

    // if (inputDate.valueOf() < (today + (1000 * 60 * 60 * 24))) {
    //     alert('오늘 이후의 날짜를 입력해주세요~');
    //     $editDate.focus();
    //     return;
    // }


    // 지정날짜에 해당하는 이전 자정 시간정보를 밀리세컨즈로 변환
    const inputDate = new Date($editDate.value).setHours(0, 0, 0, 0);
    const today = new Date().setHours(0, 0, 0, 0);

    // console.log(`inputDate = `, inputDate);
    // console.log(`today = `, today);
    const getDay = (inputDate - today) / (24 * 60 * 60 * 1000);
    // console.log(`getDay = `, getDay);

    // 유효성검사
    if (tit === '' || tit === null) {
        alert('디데이 목표를 입력해주세요~');
        $editTit.focus();
        return;
    } else if (getDay < 1) {
        alert('오늘 이후의 날짜를 선택해주세요~');
        $editDate.focus();
        return;
    } else if (isNaN(getDay)) {
        alert('날짜를 선택해 주세요~');
        $editDate.focus();
        return;
    }

    // 수정된 값을 state변수에 반영하여 localStorage에 저장
    // 기존 state를 복사한 새로운 state에 수정사항을 반영(원본보존)
    state.dday = state.dday.map(dday => dday.id === editDdayId ? { ...dday, tit, date: inputDate } : dday);

    // console.log(state.dday);
    // localStorage.setItem('state', JSON.stringify(state)); //문자열로 변환하여 저장
    saveStateFn(); // initialState.js에서 정의

    //수정폼 숨김
    $inputBox.classList.toggle('show', false);
    $frmDdayAdd.classList.add('on');
    $frmDdayEdit.classList.remove('on');

    // 로컬스토리지에 저장된 데이터를 화면에 다시 출력
    reRenderDdayFn();
});


// 디데이 추가버튼에 대한 클릭 이벤트
$btnDdayAdd.addEventListener('click', () => {

    // 디데이 입력창 보이기/숨기기
    if (!$frmDdayEdit.classList.contains('on')) {
        $inputBox.classList.toggle('show');
    }

    $frmDdayAdd.classList.add('on');
    $frmDdayEdit.classList.remove('on');

    $addTit.focus();
});


// 디데이 추가폼에 대한 submit 이벤트
$frmDdayAdd.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const tit = $addTit.value.trim();
    const inputDate = new Date($addDate.value).setHours(0, 0, 0, 0);
    const today = new Date().setHours(0, 0, 0, 0);
    const getDay = (inputDate - today) / (24 * 60 * 60 * 1000); //정수

    // 유효성 검사
    if (tit === '' || tit === null) {
        alert('디데이 목표를 입력해주세요~');
        $addTit.focus();
        return;
    } else if (getDay < 1) {
        alert('오늘 이후의 날짜를 설정해주세요~');
        $addDate.focus();
        return;
    } else if (isNaN(getDay)) {
        alert('날짜를 선택해주세요~');
        $addDate.focus();
        return;
    }

    const newDday = { id: state.nextDdayId, tit, date: inputDate };

    state = { ...state, nextDdayId: state.nextDdayId + 1 };
    state.dday.push(newDday);

    saveStateFn();

    $inputBox.classList.toggle('show', false);
    $addTit.value = '';
    $addDate.value = '';

    reRenderDdayFn();
});


// 전체데이터 삭제
$btnClearDday.addEventListener('click', () => {
    // 수동삭제
    // const $lis = document.querySelectorAll('.list>li');

    // // 돔트리에 존재하는 list의 자식요소 li 모두 삭제
    // $lis.forEach(($li) => {
    //     $li.remove();
    // });

    // 로컬스토리지에서 dday모두 삭제
    state.dday = state.dday.splice();
    saveStateFn();

    // 로컬스토리지 초기화후 리렌더링 함으로써 자연스럽게 돔트리 초기화
    reRenderDdayFn();
});