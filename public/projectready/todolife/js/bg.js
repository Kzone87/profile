const $randomColor = document.querySelector('.random-color'); //아이콘

// 랜덤으로 색상과 보색을 리턴하는 함수
const exportColorFn = () => {
    // 1. RGB에 해당하는 0~255사이의 수치를 랜덤하게 추출
    const R = Math.floor(Math.random() * 256);
    const G = Math.floor(Math.random() * 256);
    const B = Math.floor(Math.random() * 256);

    // 2. RGB수치값을 조합하여 배경색 결정
    const bgColor = `rgb(${R},${G},${B})`;

    // 3. 보색추출 - 각각의 255에서 RGB값을 차감한다.
    const R_ = 255 - R;
    const G_ = 255 - G;
    const B_ = 255 - B;

    const complementaryColor = `rgb(${R_},${G_},${B_})`;

    return [bgColor, complementaryColor];
};

$randomColor.addEventListener('click', () => {
    const [bgColor, complementaryColor] = exportColorFn();

    document.body.style.backgroundColor = bgColor;
    document.body.style.color = complementaryColor;
    
    // section의 테두리 색을 보색으로 적용
    const $sections = document.querySelectorAll('section');

    $sections.forEach(($section)=>{
        $section.style.borderColor = complementaryColor;
    });
});