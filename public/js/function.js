document.querySelectorAll('.gnb a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // 기본 클릭 동작 방지

        const targetId = this.getAttribute('href'); // 클릭한 링크의 href 값 가져오기
        
        // 'home' 링크일 경우 최상단으로 스크롤
        if (targetId === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // 부드러운 스크롤
            });
            return;
        }

        const targetSection = document.querySelector(targetId); // 해당 섹션 선택

        // 헤더의 높이를 가져옵니다.
        const headerHeight = document.querySelector('header').offsetHeight; // 헤더 높이
        const titleElement = targetSection.querySelector('h2') || targetSection.querySelector('h3'); // h2 또는 h3 선택
        const titleHeight = titleElement ? titleElement.offsetHeight : 0; // 제목 높이

        // 목표 위치 계산 (헤더 높이와 제목 높이를 반영)
        const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - headerHeight - titleHeight; // 제목 높이 반영

        // 해당 위치로 부드럽게 스크롤합니다.
        window.scrollTo({
            top: targetPosition, // 수정된 목표 위치
            behavior: 'smooth' // 부드러운 스크롤
        });
    });
});
