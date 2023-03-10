//기존 일반 DB (Oracle, MySQL, MSSQL, MariaDB) 테이블 형식, SQL표준 명령어를 이용하여 DB입출력 관리
//MongoDB : 자바스크립트의 객체형태로 데이터를 저장하는 구조, NoSQL, JS문으로 DB입출력 관리
//Schema : 데이터베이스에 저장될 자료형식이나 키값을 강제하는 시스템적인 틀

const mongoose = require('mongoose');
//게시글 저장시 post모델에 데이터 추가될때 해당 글을 작성하는 사용자 정보도 userNum값을 이용해서
//User 모델의 데이터 다큐먼트를 참조해서 가져오기 위함
const postSchema = new mongoose.Schema(
	{
		title: String,
		content: String,
		communityNum: Number,
		userNum: Number,
	},
	{ collection: 'Posts' }
);

const Post = mongoose.model('Post', postSchema);
module.exports = { Post };
