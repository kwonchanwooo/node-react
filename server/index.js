const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

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
app.post('/api/send', (req, res) => {
	console.log(req.body);
	res.json({ success: true, result: req.body.name + '2' });
});
