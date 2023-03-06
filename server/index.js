const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 5000;
const { Post } = require('./model/postSchema.js');

//클라이언트에서 보내는 데이터를 전달받도록 설정 (body-parser)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//express에서 client안쪽 build폴더까지의 경로를 static으로 지정
app.use(express.static(path.join(__dirname, '../client/build')));

//mongoDB 접속 구문
app.listen(port, () => {
	mongoose
		.connect('mongodb+srv://dcodelab:!abcd1234@cluster0.vbms1jy.mongodb.net/?retryWrites=true&w=majority')
		.then(() => console.log(`Server app listening on port ${port}`))
		.catch((err) => console.log(err));
});

//기본 라우터 설정
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

//리액트 요청 라우터
app.post('/api/create', (req, res) => {
	console.log(req.body);

	//postSchema가 적용된 Post모델 생성함수를 호출해서 데이터를 저장한 인스턴스 생성
	const PostModel = new Post({
		title: req.body.title,
		content: req.body.content,
	});

	//게시글 인스턴스에서 save메서드 호출하면 DB에 데이터가 저장됨
	//이때 save메서드는 프로미스 객체를 반환하므로 데이저 저장이 성공하면 then, 그렇지 않으면 catch문 실행
	PostModel.save()
		.then(() => res.json({ success: true }))
		.catch(() => res.json({ success: false }));
});
