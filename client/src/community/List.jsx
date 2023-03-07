import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect } from 'react';

function List() {
	useEffect(() => {
		axios
			.post('/api/read')
			.then((res) => {
				if (res.data.success) {
					console.log(res.data.communityList);
					//요청은 성공해서 응답은 받았으나 DB로 데이터 가져오는것을 실패했을때
				} else {
					console.log('데이터 요청에 실패했습니다.');
				}
			})
			//요청 자체가 실패했을떄
			.catch((err) => console.log(err));
	}, []);
	return <Layout name={'List'}></Layout>;
}

export default List;
