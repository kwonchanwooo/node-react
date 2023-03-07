import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function List() {
	const [List, setList] = useState([]);

	useEffect(() => {
		axios
			.post('/api/read')
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
		<Layout name={'List'}>
			{List.map((post) => {
				return (
					<article key={post._id}>
						<h2>
							<Link to={`/detail/${post.communityNum}`}>{post.title}</Link>
						</h2>
					</article>
				);
			})}
		</Layout>
	);
}

export default List;
