(function () {
    const quotes = [
        { msg: '노력을 대신할수 있는것은 없습니다.', author: '토마스 에디슨' },
        { msg: '말은 쉽지, 코드를 보여 줘.', author: 'Linus Torvalds' },
        { msg: '컴퓨터가 이해할 수 있는 코드는 어느 바보나 다 짤 수 있다.좋은 프로그래머는 사람이 이해할 수 있는 코드를 짠다.', author: 'Martin Fowler' },
        { msg: '프로그래밍 언어로 작성한 프로그램이 상관 없는 것에 주의해야 한다면 그 언어는  하위 언어이다.', author: 'Alan J. Perlis' },
        { msg: '붓과 물감을 공부하면 누군가 전문 화가가 될 수 있겠지만 컴퓨터 과학 교육은 이제 아무도 전문 프로그래머로 만들지 못한다.', author: 'Eric S. Raymond' },
        { msg: '올바로 동작하지 않더라도 걱정말아라. 모든 것이 그랬다면, 넌 직업을 잃었을테니까.', author: 'Mosher’s Law' },
        { msg: '좋은 디자인은 그 때문에 소모되는 비용보다 빠르게 가치가 쌓인다.', author: 'Thomas C. Gale' },
        { msg: '이론상, 이론과 실제는 같다. 실제로는, 그렇지 않다.', author: 'Yoggi Berra' },
        { msg: '튀어난 팀 없이 튀어난 소프트웨어는 얻을 수 없다. 그리고 대부분의 소프트웨어 팀은 역기능적 가정과 같이 움직인다.', author: 'Jim McCarthy' },
        { msg: '컴퓨터 시스템 분석은 아이 양육과 같다. 견딜 수 없는 피해를 줄 순 있어도 성공을 보장할 순 없다.', author: 'Tom DeMarco' }
    ];

    const idx = Math.floor(Math.random() * quotes.length);
    const quote = quotes[idx];

    const $msg = document.querySelector('header .msg');
    const $author = $msg.nextElementSibling;

    $msg.textContent = quote.msg;
    $author.textContent = quote.author;
})();