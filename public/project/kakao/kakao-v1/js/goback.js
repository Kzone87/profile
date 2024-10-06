const $goback = document.querySelector(".goback");

$goback.addEventListener('click', () => {
    history.back();
});