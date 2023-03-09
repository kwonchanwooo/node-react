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

function App() {
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
