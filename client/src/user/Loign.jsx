import Layout from '../common/Layout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from '../firebase';
import styled from 'styled-components';

const BtnSet = styled.div`
	display: flex;
	gap: 20px;
	margin-top: 20px;
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

function Loign() {
	const navigate = useNavigate();
	const [Email, setEmail] = useState('');
	const [Pwd, setPwd] = useState('');
	const [Err, setErr] = useState('');

	const handleLogin = async () => {
		if (!(Email && Pwd)) return alert('모든 값을 입력하세요');

		try {
			await firebase.auth().signInWithEmailAndPassword(Email, Pwd);
			navigate('/');
		} catch (err) {
			if (err.code === 'auth/user-not-found') setErr('존재하지 않는 이메일입니다.');
			else if (err.code === 'auth/wrong-password') setErr('비밀번호 정보가 일치하지 않습니다.');
			else setErr('로그인에 실패했습니다');
		}
	};

	return (
		<Layout name={'Login'}>
			<Form>
				<Input>
					<label htmlFor='Email'>이메일</label>
					<input type='email' value={Email} placeholder='이메일 주소를 입력하세요.' onChange={(e) => setEmail(e.target.value)} />
				</Input>
				<Input>
					<label htmlFor='Pwd'>비밀번호</label>

					<input type='password' value={Pwd} placeholder='비밀번호를 입력하세요.' onChange={(e) => setPwd(e.target.value)} />
				</Input>
				<BtnSet>
					<button onClick={handleLogin}>로그인</button>
					<button onClick={() => navigate('/join')}>회원가입</button>
				</BtnSet>
				{Err !== '' && <p>{Err}</p>}
			</Form>
		</Layout>
	);
}

export default Loign;
