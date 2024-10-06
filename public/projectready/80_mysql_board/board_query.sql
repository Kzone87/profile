-- 데이터베이스생성
CREATE DATABASE nodejs default character set utf8;

USE nodejs;


/*
 	auto_increment는 주로 기본키가 들어가는 컬럼에 사용되며, 
 	레코드가 삽입될때 자동으로 증가하는 정수값을 가지도록 하여
 	각각의 레코드를 구별할수 있게 한다. 1부터 시작
 */

--         글제목, 작성자명, 글내용, 글비번
--         조회수, 등록일, 식별자(주키 primary key)
CREATE TABLE first_board (
	num int primary key auto_increment comment '식별자',
	title varchar(255) not null comment '글제목',
	content text comment '글내용',
	name varchar(50) not null comment '작성자명',
	pwd varchar(255) not null comment '비밀번호',
	regdate datetime default now() comment '등록일',
	count int default 0 comment '조회수'
)default character set utf8;

SHOW tables;

desc first_board;

INSERT INTO  first_board (title,name,content,pwd)
VALUES ('아기공룡둘리','둘리','엄마찾아 빙하타고 쌍문동에 왔어요','2222');
INSERT INTO  first_board (title,name,content,pwd)
VALUES ('달려라하니','하니','달려라 달려라 달려라 하니','1234');


SELECT * FROM first_board;



DELETE FROM 테이블명 WHERE 조건식;
DELETE FROM first_board WHERE num > 0;
DELETE FROM first_board WHERE num = 1;
DELETE FROM first_board WHERE num = 2;

-- UPDATE first_board set num = 1 where num = 8;


















