import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Item = styled.article`
	width: calc(100% / 3.2);
	padding: 30px 40px;
	background: white;
	margin-bottom: 50px;
	box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.02);
	border-radius: 10px;
	box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.2);

	float: left;
	margin-right: 10px;
	height: 200px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	&:hover {
		transform: scale(1.01);
		transition: 0.3s;
		background: #e9c4c4;
	}
	.desc {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}
`;

function List() {
	const [List, setList] = useState([]);

	useEffect(() => {
		axios
			.get('/api/community/read/0')
			.then((res) => {
				if (res.data.success) {
					setList(res.data.communityList);
					//요청은 성공해서 응답은 받았으나 DB로 데이터 가져오는것을 실패했을때
				} else {
					console.log('데이터 요청에 실패했습니다.');
				}
			})
			//요청 자체가 실패했을떄
			.catch((err) => console.log(err));
	}, []);

	return (
		<Layout name={'목록'}>
			{List.map((post, idx) => {
				return (
					<Item key={post._id}>
						<h2>
							<Link to={`/detail/${post.communityNum}`}>{post.title}</Link>
						</h2>
						<div className='desc'>
							<span>작성자: {post.writer.displayName}</span>
							<span>글 번호 : {idx + 1}</span>
						</div>
					</Item>
				);
			})}
		</Layout>
	);
}

export default List;
