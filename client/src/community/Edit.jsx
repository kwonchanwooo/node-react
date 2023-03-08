import Layout from '../common/Layout';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Edit() {
	const params = useParams();
	const [Detail, setDetail] = useState({});
	const [Title, setTitle] = useState('');
	const [Content, setContent] = useState('');

	useEffect(() => {
		axios.post('/api/community/detail', params).then((res) => {
			if (res.data.success) {
				console.log(res.data.detail);
				setDetail(res.data.detail);
			}
		});
	}, [params]);

	useEffect(() => {
		console.log(Detail);
		setTitle(Detail.title);
		setContent(Detail.content);
	}, [Detail]);

	return (
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
