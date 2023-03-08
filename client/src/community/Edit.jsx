import Layout from '../common/Layout';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Edit() {
	const params = useParams();
	const [Detail, setDetail] = useState({});
	const [Title, setTitle] = useState('');
	const [Content, setContent] = useState('');

	//순서1 - 처음 컴포넌트 마운트시 서버쪽에 데이터 요청후 응답값을 Detail에 옮겨담음
	useEffect(() => {
		axios.post('/api/community/detail', params).then((res) => {
			if (res.data.success) {
				setDetail(res.data.detail);
			}
		});
	}, [params]);

	//순서2 - Detail에 값이 담아지면 Title, Content에 제목, 본문을 분리해서 저장
	useEffect(() => {
		setTitle(Detail.title);
		setContent(Detail.content);
	}, [Detail]);

	return (
		//input의 value에 Title, Content값을 등록해서 onChange이벤트가 발생할 때마다 상태관리
		<Layout name={'Post'}>
			<label htmlFor='tit'>Title</label>
			<input type='text' id='tit' value={Title || ''} onChange={(e) => setTitle(e.target.value)} />
			<br />
			<label htmlFor='con'>Content</label>
			<textarea name='cons' id='id' cols='30' rows='3' value={Content || ''} onChange={(e) => setContent(e.target.value)}></textarea>
			<br />
			<button>UPDATE</button>
		</Layout>
	);
}

export default Edit;
