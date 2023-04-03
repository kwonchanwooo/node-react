import Layout from '../common/Layout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from '../firebase';
import styled from 'styled-components';
import axios from 'axios';

const BtnSet = styled.div`
	margin-top: 20px;
	display: flex;
	gap: 20px;
	padding-bottom: 60px;
`;

const Form = styled.div`
	background-color: white;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-top: 60px;
	border-radius: 10px;
	margin-bottom: auto;
	box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.2);
`;

const Input = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 60%;
	height: 40px;
	margin-bottom: 40px;

	label {
		height: 40px;
		width: 20%;
		margin-right: 20px;
		> h2 {
			font-size: 15px;
			display: flex;
			line-height: 1.8;
		}
	}
	input {
		width: 70%;
		height: 40px;

		border-radius: 10px;
	}
`;

function Join() {
	const navigate = useNavigate();
	const [Email, setEmail] = useState('');
	const [Pwd1, setPwd1] = useState('');
	const [Pwd2, setPwd2] = useState('');
	const [Name, setName] = useState('');

	const handleJoin = async () => {
		if (!(Name && Email && Pwd1 && Pwd2)) return alert('모든 양식을 입력하세요.');
		if (Pwd1 !== Pwd2) return alert('비밀번호 2개를 동일하게 입력하세요.');

		let createdUser = await firebase.auth().createUserWithEmailAndPassword(Email, Pwd1);
		await createdUser.user.updateProfile({ displayName: Name });
		firebase.auth().signOut();

		const item = {
			displayName: createdUser.user.multiFactor.user.displayName,
			uid: createdUser.user.multiFactor.user.uid,
		};

		axios.post('/api/user/join', item).then((res) => {
			if (res.data.success) {
				navigate('/login');
			} else return alert('회원가입에 실패했습니다.');
		});
	};

	return (
		<Layout name={'Join'}>
			<Form>
				<Input>
					<label htmlFor='Email'>
						<h2>이메일</h2>
					</label>
					<input type='email' value={Email} placeholder='이메일 주소를 입력하세요.' onChange={(e) => setEmail(e.target.value)} />
				</Input>
				<Input>
					<label htmlFor='Pwd1'>
						<h2>비밀번호</h2>
					</label>
					<input type='password' value={Pwd1} placeholder='비밀번호를 입력하세요.' onChange={(e) => setPwd1(e.target.value)} />
				</Input>
				<Input>
					<label htmlFor='Pwd2'>
						<h2>비밀번호 확인</h2>
					</label>

					<input type='password' value={Pwd2} placeholder='비밀번호를 재입력하세요.' onChange={(e) => setPwd2(e.target.value)} />
				</Input>
				<Input>
					<label htmlFor='Name'>
						<h2>사용자명</h2>
					</label>

					<input type='text' value={Name} placeholder='사용자명을 입력하세요.' onChange={(e) => setName(e.target.value)} />
				</Input>
				<BtnSet>
					<button onClick={() => navigate(-1)}>가입취소</button>
					<button onClick={handleJoin}>회원가입</button>
				</BtnSet>
			</Form>
		</Layout>
	);
}

export default Join;
