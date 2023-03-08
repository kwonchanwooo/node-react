import Layout from '../common/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const DetailWrap = styled.div`
	width: 100%;
	padding: 40px;
	background: #fff;
	box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.02);
`;

function Detail() {
	const params = useParams();
	const [Detail, setDetail] = useState(null);

	useEffect(() => {
		axios
			.post('/api/community/detail', params)
			.then((res) => {
				if (res.data.success) {
					setDetail(res.data.detail);
				} else {
					alert('상세글 호출에 실패했습니다.');
				}
			})
			.catch((err) => console.log(err));
	}, [params]);

	return (
		<Layout name={'Detail'}>
			{
				<DetailWrap>
					<h2>{Detail?.title}</h2>
					<p>{Detail?.content}</p>
				</DetailWrap>
			}
		</Layout>
	);
}

export default Detail;
