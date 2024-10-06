const express = require('express');
const router = express.Router();
const dbcon = require('./../database/mysql'); //데이터베이스 모듈 연결
const path = require('path');
const bcrypt = require('bcrypt'); // 비밀번호 암호화 모듈


router.get('/', (req, res) => {
    res.redirect('/board/list');
});

// 리스트폼 라우팅
router.get('/list', async (req, res) => {

    try {
        // console.log(`dbcon =`, dbcon); // 커넥션객체 상태확인
        const sql = `
            SELECT num, title, content, name, count, date_format(regdate, '%y-%m-%d') as regdate
            FROM first_board
        `;
        const [list] = await dbcon.query(sql);
        // console.log('list =', list);

        res.render('board/list.ejs', { list });

    } catch (error) {
        console.error('DB 에러 :', error);
        res.status(500).sendFile(path.resolve(__dirname, '../public', 'errors', '500.html'));
    }
});


// 글쓰기폼 페이지로 이동
router.get('/write', (req, res) => {
    res.render('board/write.ejs');
});

// 데이터를 받아서 새글 등록
router.post('/write', async (req, res) => {

    // 1. 클라이언트가 보내온 데이터 수신
    const { title, content, name, pwd } = req.body;

    try {
        // 1-1. 비밀번호 암호화
        const hashedPwd = await bcrypt.hash(pwd, 10);

        // 2. 쿼리문 작성
        const sql = `
            insert into first_board (title, content, name, pwd)
            values (?,?,?,?);
        `;

        // 3. 쿼리문 실행
        await dbcon.query(sql, [title, content, name, hashedPwd]);

        // 4. /board/list로 재요청
        res.redirect('/board/list');

    } catch (error) {
        console.error('DB에러 :', error);
        res.status(500).sendFile(path.resolve(__dirname, '../public', 'errors', '500.html'));
    }
});


// 게시글보기
router.get('/content/:num', async (req, res) => {
    // 1. 클라이언트가 보내온 데이터 수신
    const num = parseInt(req.params.num);
    // console.log(`num = ${num}`);

    try {
        // 2. 쿼리문작성 - num = num인 레코드를 가져오는 쿼리문
        const sql = `
        select num, title, content, name, date_format(regdate, "%y-%m-%d-%h-%i-%s") as regdate, count
        from first_board
        where num = ?
        `;

        // 3. 쿼리문실행
        const [rows, table] = await dbcon.query(sql, [num]); //구조분해할당
        // console.log('rows =', rows); //배열
        // console.log('table =', table); //배열
        // console.log('rows.length =', rows.length); //배열길이
        if (rows.length > 0) {
            // 조회수증가 -> 레코드수정
            rows[0].count++; //불러온 레코드데이터에 1증가
            // 데이터베이스 안의 레코드상 count를 1증가
            const sql = `
                update first_board set count=count+1 where num = ?;
            `;
            await dbcon.query(sql, [num]);

            res.render('board/content.ejs', rows[0]);
        } else {
            res.status(404).sendFile(path.resolve(__dirname, '../public', 'errors', '404.html'));
        }
    } catch (error) {
        console.error('DB에러 :', error);
        res.status(500).sendFile(path.resolve(__dirname, '../public', 'errors', '500.html'));
    }
});

// 비밀번호 확인페이지로 이동
router.get('/pwd/:mode/:num', (req, res) => {
    const { mode, num } = req.params;

    res.render('board/pwd.ejs', { mode, num });
});


// 비밀번화 확인후 수정/삭제경로로 리다이렉트
router.post('/pwd', async (req, res) => {
    try {
        // 1. 클라이언트가 보내온 데이터 수신
        const { mode, num, pwd } = req.body;
        const parsedNum = parseInt(num);
        const sql = `
            select * from first_board where num = ?
        `;
        const [rows] = await dbcon.query(sql, [parsedNum]);

        // 데이터 유무 및 패스워드 일치여부에 따라 리다이렉트 분기
        if (rows.length > 0) { // num에 해당하는 데이터 존재유무 확인
            const match = await bcrypt.compare(pwd, rows[0].pwd);
            if (match) { // 비밀번호가 일치했을떄
                switch (mode) {
                    case 'edit': res.redirect(`/board/edit/${parsedNum}`); break;
                    case 'del': res.redirect(`/board/del/${parsedNum}`); break;
                }
            } else { // 비밀번호가 일치하지 않았을떄
                res.redirect(`/board/pwd/${mode}/${parsedNum}?error=incorrect-password`);
            }
        } else {// num에 해당하는 데이터가 없을경우
            res.redirect('/board/list');
        }
    } catch (error) {
        console.error('DB에러 :', error);
        res.status(500).sendFile(path.resolve(__dirname, '../public', 'errors', '500.html'));
    }
});


// 게시글 수정폼으로 이동
router.get('/edit/:num', async (req, res) => {
    const num = parseInt(req.params.num);
    try {
        const sql = `
            select * from first_board where num = ?
        `;
        const [rows] = await dbcon.query(sql, [num]);

        res.render('board/edit.ejs', rows[0]);
    } catch (error) {
        console.error('DB에러 :', error);
        res.status(500).sendFile(path.resolve(__dirname, '../public', 'errors', '500.html'));
    }
});


// 게시글 수정
router.post('/edit', async (req, res) => {
    const { title, content, name } = req.body;
    const num = parseInt(req.body.num);

    try {
        const sql = `
            update first_board 
            set title = ?, content = ?, name = ?
            where num = ?
        `;
        await dbcon.query(sql, [title, content, name, num]);

        res.redirect(`/board/content/${num}`);
    } catch (error) {
        console.error('DB에러 :', error);
        res.status(500).sendFile(path.resolve(__dirname, '../public', 'errors', '500.html'));
    }
});


// 게시글 삭제
router.get('/del/:num', async (req, res) => {
    const num = parseInt(req.params.num);

    try {
        const sql = `
        delete from first_board where num = ?
        `;
        await dbcon.query(sql, [num]);

        res.redirect('/board/list');

    } catch (error) {
        console.error('DB에러 :', error);
        res.status(500).sendFile(path.resolve(__dirname, '../public', 'errors', '500.html'));
    }
});

// 백엔드 DB작업의 핵심 CRUD

module.exports = router;