import Layout from './Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Item = styled.article`
	width: 100%;
	padding: 30px 40px;
	background: #fff;
	box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.02);
	margin-bottom: 50px;
`;

function Main() {
	const [List, setList] = useState([]);

	useEffect(() => {
		axios.get('/api/community/read/3').then((res) => {
			if (res.data.success) setList(res.data.communityList);
		});
	}, []);

	return (
		<Layout name={'Main'}>
			{List.map((post) => {
				return (
					<Item key={post._id}>
						<h2>
							<Link to={`/detail/${post.communityNum}`}>{post.title}</Link>
						</h2>
						<p>작성자: {post.writer.displayName}</p>
						{post.createdAt === post.updatedAt ? <p>작성일: {post.createdAt.split('T')[0]}</p> : <p>수정일: {post.updatedAt.split('T')[0]}</p>}
					</Item>
				);
			})}
		</Layout>
	);
}

export default Main;
