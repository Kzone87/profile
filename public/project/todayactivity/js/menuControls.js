(function () {
    const $h1 = document.querySelector('header>h1');
    const $whereMenu = document.querySelector('.gnb>.whereMenu');
    const $listMenu = document.querySelector('.gnb>.listMenu');
    const $scoreMenu = document.querySelector('.gnb>.scoreMenu');
    const $main = document.querySelector('main');

    $h1.addEventListener('click', () => {
        $main.style.marginLeft = '0px';
    });

    $whereMenu.addEventListener('click', () => {
        $main.style.marginLeft = '0px';
    });

    $listMenu.addEventListener('click', () => {
        $main.style.marginLeft = '-1200px';
    });

    $scoreMenu.addEventListener('click', () => {
        $main.style.marginLeft = '-2400px';
    });
})();