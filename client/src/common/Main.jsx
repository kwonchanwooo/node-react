import Layout from './Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Item = styled.article`
	width: 45%;
	height: 300px;
	padding: 30px 40px;
	background: white;
	border-radius: 10px;

	margin-bottom: 50px;
	margin-right: 5%;
	float: left;
	box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.2);

	&:nth-of-type(even) {
		margin-right: 0;
	}
	display: flex;
	flex-direction: column;

	justify-content: space-between;
	.desc {
		display: flex;
		align-items: flex-end;
		flex-direction: column;
	}
	&:hover {
		transform: scale(1.01);
		transition: 0.3s;
		background: #e9c4c4;
	}
`;
const Box = styled.div`
	margin-top: 50px;
	width: 100%;
	height: 200px;
	p {
		color: black;
		opacity: 0.6;
		font-size: 20px;
		letter-spacing: 1.2px;
	}
`;
const Title = styled.h2`
	font-size: 50px;
	a {
		color: black;
		opacity: 0.7;
		&:hover {
			opacity: 1;
		}
	}
`;

function Main() {
	const [List, setList] = useState([]);

	useEffect(() => {
		axios.get('/api/community/read/6').then((res) => {
			if (res.data.success) setList(res.data.communityList);
		});
	}, []);

	return (
		<Layout name={'담벼락'}>
			<Box>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam itaque facilis commodi officiis. Consectetur fugiat
					laboriosam eaque nam praesentium laborum delectus quae impedit sequi aliquid illo ex non enim, eveniet totam, iste
					provident. Natus earum eveniet aperiam possimus molestias rem esse error ducimus commodi fugit dolorem voluptas, tenetur
					sunt obcaecati.
				</p>
			</Box>
			{List.map((post) => {
				return (
					<Item key={post._id}>
						<Title>
							<Link to={`/detail/${post.communityNum}`}>{post.title}</Link>
						</Title>
						<div className='desc'>
							{' '}
							<p>작성자: {post.writer.displayName}</p>
							{post.createdAt === post.updatedAt ? (
								<p>작성일: {post.createdAt.split('T')[0]}</p>
							) : (
								<p>수정일: {post.updatedAt.split('T')[0]}</p>
							)}
						</div>
					</Item>
				);
			})}
		</Layout>
	);
}

export default Main;
