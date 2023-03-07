const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 5000;
const { Post } = require('./model/postSchema.js');
const { Counter } = require('./model/counterSchema.js');

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

//글 저장 라우터
//글 저장 순서 -> Counter모델로 글번호 가져옴 -> body-parser로 제목, 본문 가져와서 글번호 추가후 저장 -> 저장 완료후 카운터 모델의 글번호 증가
app.post('/api/create', (req, res) => {
	Counter.findOne({ name: 'counter' })
		.exec()
		.then((doc) => {
			const PostModel = new Post({
				title: req.body.title,
				content: req.body.content,
				communityNum: doc.communityNum,
			});

			PostModel.save().then(() => {
				//$inc(증가), $dec(감소), $set(새로운 값으로 변경)
				Counter.updateOne({ name: 'counter' }, { $inc: { communityNum: 1 } })
					.then(() => {
						res.json({ success: true });
					})
					.catch((err) => {
						console.log(err);
						res.json({ success: false });
					});
			});
		})
		.catch((err) => console.log(err));
});

//글 목록 요청 라우터
app.post('/api/read', (req, res) => {
	Post.find()
		.exec()
		.then((doc) => {
			res.json({ success: true, communityList: doc });
		})
		.catch((err) => {
			console.log(err);
			res.json({ success: false });
		});
});

//글 상제정보 요청 라우터
app.post('/api/detail', (req, res) => {
	Post.findOne({ communityNum: req.body.num })
		.exec()
		.then((doc) => res.json({ success: true, detail: doc }))
		.catch((err) => res.json({ success: false, err: err }));
});
