import axios from 'axios';
import { useEffect, useMemo } from 'react';

function App() {
	const item = useMemo(() => ({ name: 'David' }), []);

	useEffect(() => {
		// /api/send로 item객체를 서버쪽에 전달
		axios
			.post('/api/send', item)
			.then((res) => {
				//서버쪽에서 응답이 성공적으로 넘어오면 해당 값을 콘솔로 출력
				console.log(res);
			})
			.catch((err) => console.log(err));
	}, [item]);

	return (
		<div className='App'>
			<h1>React</h1>
		</div>
	);
}

export default App;
