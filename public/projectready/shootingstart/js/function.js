const $container = document.querySelector('.container');
const $shooter = document.querySelector('.shooter');
const $targets = document.querySelectorAll('.targets');
const $missiles = document.querySelectorAll('.missile');
const $score = document.querySelector('.score');

$shooter.style.left = '300px';
$shooter.style.top = '760px';
let key = null;
let score = 0;

// 키보드 누를시 발생하는 이벤트 핸들러
window.addEventListener('keydown', (evt) => {
    // console.log($shooter.style.left);
    console.log(evt.code);
    if (evt.code === 'ArrowLeft') {
        // 왼쪽키 누를시 슈터를 왼쪽으로 이동
        if (parseInt($shooter.style.left) < 10) {
            $shooter.style.left = $shooter.style.left;
        } else {
            $shooter.style.left = parseInt($shooter.style.left) - 10 + 'px';
        }
    } else if (evt.code === 'ArrowRight') {
        // 오른쪽 키 누를시 슈터를 오른쪽으로 이동
        // console.log($shooter.style.right);
        if (parseInt($shooter.style.left) > (740 - 150)) {
            $shooter.style.left = $shooter.style.left;
        } else {
            $shooter.style.left = parseInt($shooter.style.left) + 10 + 'px';
        }
    } else if (evt.code === 'Space') {
        // 스페이스 버튼 누를시 미사일 생성 및 위치 조정
        const $missile = document.createElement('div');
        $missile.classList.add('missile');
        $container.appendChild($missile);
        $missile.style.position = 'absolute';
        $missile.style.top = parseInt($shooter.style.top) - 20 + 'px';
        $missile.style.left = parseInt($shooter.style.left) + 75 - 10 + 'px';

        // 미사일은 0.001초마다 위로 3px씩 이동
        const missilekey = setInterval(() => {
            $missile.style.top = parseInt($missile.style.top) - 3 + 'px';
            // console.log($missile.style.top);
            // 미사일이 화면끝까지 가면 인터벌 종료 및 미사일 제거
            if (parseInt($missile.style.top) < -10) {
                clearInterval(missilekey);
                $missile.remove();
            }
            // console.log($missile.offsetLeft);
            // 모든 타겟에 대해 미사일과 만날시 함께 소멸/스코어 상승
            $targets.forEach(($target) => {
                if ($target.offsetLeft < $missile.offsetLeft < $target.offsetLeft + 100 && $target.offsetTop > $missile.offsetTop) {
                    $target.remove();
                    $missile.remove();
                    score++;
                    $score.textContent = score;
                }
            });
        }, 1);
    }
});

