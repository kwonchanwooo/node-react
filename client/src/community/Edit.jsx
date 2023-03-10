import Layout from '../common/Layout';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const BtnSet = styled.div`
	display: flex;
	gap: 20px;
	margin-top: 20px;
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

	//순서1 - 처음 컴포넌트 마운트시 서버쪽에 데이터 요청후 응답값을 Detail에 옮겨담음
	useEffect(() => {
		axios.get(`/api/community/detail/${params.num}`).then((res) => {
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
		<>
			<Layout name={'Edit'}>
				<label htmlFor='tit'>Title</label>
				<input type='text' id='tit' value={Title || ''} onChange={(e) => setTitle(e.target.value)} />
				<label htmlFor='con'>Content</label>
				<textarea name='cons' id='id' cols='30' rows='3' value={Content || ''} onChange={(e) => setContent(e.target.value)}></textarea>

				<BtnSet>
					<button onClick={() => navigate(-1)}>CANCEL</button>
					<button onClick={handleUpdate}>UPDATE</button>
				</BtnSet>
			</Layout>
		</>
	);
}

export default Edit;
