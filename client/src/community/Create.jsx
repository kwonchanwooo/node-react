import axios from 'axios';
import { useState, useEffect } from 'react';
import Layout from '../common/Layout';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Create() {
	const user = useSelector((store) => store.user);
	const navigate = useNavigate();
	const [Tit, setTit] = useState('');
	const [Con, setCon] = useState('');

	const handleCreate = () => {
		if (Tit.trim() === '' || Con.trim() === '') return alert('제목과 본문을 모두 입력하세요');
		//글 저장시 서보 요청을 보낼때 현재 로그인되어 있는 사용자의 고유 아이디값을 같이 전달
		const item = { title: Tit, content: Con, uid: user.uid };

		axios
			.post('/api/community/create', item)
			.then((res) => {
				if (res.data.success) {
					alert('글 저장이 완료되었습니다. ');
					navigate('/list');
				} else {
					alert('글 저장에 실패했습니다.');
				}
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		if (user.uid === '') navigate('/');
	}, [navigate, user]);

	return (
		<Layout name={'Post'}>
			<label htmlFor='tit'>Title</label>
			<input type='text' id='tit' value={Tit} onChange={(e) => setTit(e.target.value)} />
			<br />
			<label htmlFor='con'>Content</label>
			<textarea name='cons' id='id' cols='30' rows='3' value={Con} onChange={(e) => setCon(e.target.value)}></textarea>
			<br />
			<button onClick={handleCreate}>SEND</button>
		</Layout>
	);
}

export default Create;
