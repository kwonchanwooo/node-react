import { Routes, Route } from 'react-router-dom';
import Header from './common/Header';
import Main from './common/Main';
import Create from './community/Create';
import Detail from './community/Detail';
import List from './community/List';
import Edit from './community/Edit';
import GlobalStyle from './GlobalStyle';
import Join from './user/Join';
import Loign from './user/Loign';

import firebase from './firebase';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser, logoutUser } from './redux/userSlice';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		firebase.auth().onAuthStateChanged((userInfo) => {
			//컴포넌트 마운트시 firebase로 받은 유저정보가 없으면 (로그인 상태가 아니면)
			//logout함수를 호출해서 유저정보를 비우는 액션객체 반환하고 해당 액션객체를 dispatch로 리듀서에 전달
			if (userInfo === null) dispatch(logoutUser());
			//firebase로 받은 유저정보가 있으면 (로그인 상태이면)
			//loginUser함수 호출시 인수로 로그인된 정보값을 전달해서 해당 정보가 담긴 액션겍체를 생성후 dispatch로 전달
			else dispatch(loginUser(userInfo.multiFactor.user));
		});
	}, [dispatch]);

	useEffect(() => {
		//firebase.auth().signOut();
	}, []);

	return (
		<>
			<GlobalStyle />
			<Header />

			<Routes>
				<Route path='/' element={<Main />} />
				<Route path='/list' element={<List />} />
				<Route path='/create' element={<Create />} />
				<Route path='/detail/:num' element={<Detail />} />
				<Route path='/edit/:num' element={<Edit />} />

				<Route path='/join' element={<Join />} />
				<Route path='/login' element={<Loign />} />
			</Routes>
		</>
	);
}

export default App;
