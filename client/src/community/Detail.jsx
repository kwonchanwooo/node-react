import Layout from '../common/Layout';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const DetailWrap = styled.div`
	width: 100%;
	padding: 40px;
	background: #fff;
	box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.02);
	border-radius: 10px;
	box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.2);
`;

const BtnSet = styled.nav`
	display: flex;
	gap: 20px;
	margin-top: 20px;
`;

function Detail() {
	const user = useSelector((store) => store.user);
	const params = useParams();
	const navigate = useNavigate();
	const [Detail, setDetail] = useState(null);

	const handleDelete = () => {
		if (!window.confirm('정말 삭제하겠습니까?')) return;

		axios
			.delete(`/api/community/delete/${params.num}`)
			.then((res) => {
				if (res.data.success) {
					alert('게시글이 삭제되었습니다.');
					navigate('/list');
				} else {
					alert('게시글 삭제에 실패했습니다.');
				}
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		axios
			.get(`/api/community/detail/${params.num}`)
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
				<>
					<DetailWrap>
						<h2>{Detail?.title}</h2>
						<p>{Detail?.content}</p>
						<span>작성자: {Detail?.writer.displayName}</span>
						{Detail?.createdAt === Detail?.updatedAt ? (
							<p>작성일: {Detail?.createdAt.split('T')[0]}</p>
						) : (
							<p>수정일: {Detail?.updatedAt.split('T')[0]}</p>
						)}
					</DetailWrap>

					{/* 로그인된 사용자의 아이디와 글작성한 사용자의 아이디가 동일할 때에만 수정, 삭제버튼 출력 */}
					{user.uid === Detail?.writer.uid && (
						<BtnSet>
							<button>
								<Link to={`/edit/${params.num}`}>Edit</Link>
							</button>
							<button onClick={handleDelete}>Delete</button>
						</BtnSet>
					)}
				</>
			}
		</Layout>
	);
}

export default Detail;
