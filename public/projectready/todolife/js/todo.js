
const $todoList = document.querySelector('.todo>.list');

let editTodoId = null;

const $frmTodoAdd = document.querySelector('.todo form[name=frmTodoAdd]');
const $frmTodoEdit = document.querySelector('.todo form[name=frmTodoEdit]');

const $addTaskInput = $frmTodoAdd.lastElementChild;
const $editTaskInput = $frmTodoEdit.lastElementChild;

const reRenderTodoFn = () => {

    // 먼저 ul모든 직계자식 li를 삭제
    while ($todoList.childElementCount > 0) {
        $todoList.removeChild($todoList.firstElementChild);
    }

    // for문을 이용해서 todos배열에 저장된 목록을 화면에 출력
    for (let i = 0; i < state.todos.length; i++) {
        const todo = state.todos[i];

        // 동적으로 ul.list에 추가할 태그를 생성
        const $li = document.createElement('li');
        $li.id = todo.id;

        const $h3 = document.createElement('h3');
        $h3.textContent = todo.tit;

        const $chk_i = document.createElement('i');
        if (todo.complete) {
            $chk_i.classList.add('insert', 'fas', 'fa-check-square');
            $h3.classList.add('complete');
        } else {
            $chk_i.classList.add('insert', 'far', 'fa-square');
            $h3.classList.remove('complete');
        }

        const $edit_i = document.createElement('i');
        $edit_i.classList.add('fas', 'fa-edit');

        const $del_i = document.createElement('i');
        $del_i.classList.add('del', 'fas', 'fa-times-circle');

        // 동적으로 생성한 요소를 ul.li에 추가하여 조립
        $li.append($chk_i, $h3, $edit_i, $del_i);
        $todoList.appendChild($li);
    }//end of for


    // 모든 완료체크 버튼에 대한 클릭이벤트
    const $checkIcons = document.querySelectorAll('.todo>.list i.insert');
    $checkIcons.forEach(($checkIcon) => {
        $checkIcon.addEventListener('click', (evt) => {
            editTodoId = parseInt($checkIcon.parentElement.id);
            // console.log(editTodoId);
            state.todos = state.todos.map(todo => todo.id === editTodoId ? { ...todo, complete: !todo.complete } : todo);

            saveStateFn();

            reRenderTodoFn();
        });
    });


    // 수정아이콘에 대한 클릭이벤트
    const $editIcons = document.querySelectorAll('.todo>.list i.fa-edit');
    $editIcons.forEach(($editIcon) => {
        $editIcon.addEventListener('click', (evt) => {
            // 에디트폼 출력,애드폼 숨김
            $frmTodoAdd.classList.remove('on');
            $frmTodoEdit.classList.add('on');

            editTodoId = parseInt($editIcon.parentElement.id);

            // state.todos배열의 원소중 id속성값이 editTodoId와 일치하는 원소의 tit를 가져온다
            // 그러기 위해서는 .findIndex를 이용하여 해당 인덱스를 추출한다.
            const idx = state.todos.findIndex(todo => todo.id === editTodoId);
            $editTaskInput.value = state.todos[idx].tit; //수정할 항목의 제목
            $editTaskInput.focus();
            // console.log(idx); 
        });
    });

    // 삭제아이콘에 대한 클릭이벤트
    /* 
    const $delIcons = document.querySelectorAll('.todo>.list i.del');
    $delIcons.forEach(($delIcon) => {
        $delIcon.addEventListener('click', () => {
            const delId = parseInt($delIcon.parentElement.id);

            state.todos = state.todos.filter(todo => todo.id !== delId);
            saveStateFn();
            reRenderTodoFn();
        });
    });
    */
    const $delIcons = document.querySelectorAll('.todo>.list i.del');
    $delIcons.forEach(($delIcon) => {
        $delIcon.addEventListener('click', (evt) => {
            const $li = evt.currentTarget.parentElement;
            $li.remove(); //화면에서 해당 li삭제

            // 로컬스토리지에서 삭제
            state.todos = state.todos.filter(todo => todo.id !== parseInt($li.id));

            saveStateFn(); //로컬스토리지에 현재 스테이트 저장
            reRenderTodoFn();
        });
    });

};//reRenderTodoFn()


reRenderTodoFn();

// todo수정폼에 대한 submit이벤트
$frmTodoEdit.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const tit = $editTaskInput.value.trim();

    if (tit === '' || tit === null) {
        alert('투두 제목을 입력해 주세요');
        $editTaskInput.focus();
        return;
    }

    state.todos = state.todos.map(todo => todo.id === editTodoId ? { ...todo, tit } : todo);

    saveStateFn();

    $frmTodoAdd.classList.add('on'); //신규입력폼
    $frmTodoEdit.classList.remove('on'); //수정폼
    $addTaskInput.focus();

    reRenderTodoFn();

});


// todo입력폼에 대한 submit이벤트
$frmTodoAdd.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const tit = $addTaskInput.value.trim();

    if (tit === '' || tit === null) {
        alert('Todo 제목을 입력해 주세요~!');
        $addTaskInput.focus();
        return;
    }

    const newTodo = { id: state.nextTodoId, tit, complete: false };

    state.todos.push(newTodo);
    // 다음번에 사용할 아이디값 증가
    state = { ...state, nextTodoId: state.nextTodoId + 1 };

    saveStateFn();
    reRenderTodoFn();

    $addTaskInput.value = '';
});