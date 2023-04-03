import Layout from '../common/Layout';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const BtnSet = styled.div`
	display: flex;
	gap: 20px;
	margin-top: 20px;
	padding-bottom: 60px;
`;
const Form = styled.div`
	background-color: white;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-top: 60px;
	border-radius: 10px;
	margin-bottom: auto;
	box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.2);
`;

function Edit() {
	const params = useParams();
	const navigate = useNavigate();
	const [Detail, setDetail] = useState({});
	const [Title, setTitle] = useState('');
	const [Content, setContent] = useState('');

	const handleUpdate = () => {
		if (Title.trim() === '' || Content.trim() === '') return alert('모든 항목을 입력하세요');

		const item = {
			title: Title,
			content: Content,
			num: params.num,
		};

		axios
			.put('/api/community/edit', item)
			.then((res) => {
				if (res.data.success) {
					alert('글 수정이 완료되었습니다.');
					navigate(`/detail/${params.num}`);
				} else {
					alert('글 수정에 실패했습니다.');
				}
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		axios.get(`/api/community/detail/${params.num}`).then((res) => {
			if (res.data.success) {
				setDetail(res.data.detail);
			}
		});
	}, [params]);

	useEffect(() => {
		setTitle(Detail.title);
		setContent(Detail.content);
	}, [Detail]);

	return (
		<>
			<Layout name={'Edit'}>
				<Form>
					<label htmlFor='tit'>Title</label>
					<input type='text' id='tit' value={Title || ''} onChange={(e) => setTitle(e.target.value)} />
					<label htmlFor='con'>Content</label>
					<textarea
						name='cons'
						id='id'
						cols='30'
						rows='3'
						value={Content || ''}
						onChange={(e) => setContent(e.target.value)}
					></textarea>

					<BtnSet>
						<button onClick={() => navigate(-1)}>CANCEL</button>
						<button onClick={handleUpdate}>UPDATE</button>
					</BtnSet>
				</Form>
			</Layout>
		</>
	);
}

export default Edit;
