const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

//express에서 client안쪽 build폴더까지의 경로를 static으로 지정
app.use(express.static(path.join(__dirname, '../client/build')));

app.listen(port, () => {
	mongoose
		.connect('mongodb+srv://dcodelab:!abcd1234@cluster0.vbms1jy.mongodb.net/?retryWrites=true&w=majority')
		.then(() => console.log(`Server app listening on port ${port}`))
		.catch((err) => console.log(err));
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
