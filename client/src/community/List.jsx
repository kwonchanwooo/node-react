import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';

function List() {
	const [Posts, setPosts] = useState([]);

	useEffect(() => {
		axios
			.post('/api/read')
			.then((res) => {
				if (res.data.success) {
					console.log(res.data.communityList);
					setPosts(res.data.communityList);
					//요청은 성공해서 응답은 받았으나 DB로 데이터 가져오는것을 실패했을때
				} else {
					console.log('데이터 요청에 실패했습니다.');
				}
			})
			//요청 자체가 실패했을떄
			.catch((err) => console.log(err));
	}, []);

	return (
		<Layout name={'List'}>
			{Posts.map((post) => {
				return (
					<article key={post._id}>
						<h2>{post.title}</h2>
						<p>{post.content}</p>
					</article>
				);
			})}
		</Layout>
	);
}

export default List;
