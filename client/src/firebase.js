import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyCG5kKIpqQN_7YJ6wYWhvNzOB8x_P4jUnc',
	authDomain: 'dcode-may.firebaseapp.com',
	projectId: 'dcode-may',
	storageBucket: 'dcode-may.appspot.com',
	messagingSenderId: '538598286383',
	appId: '1:538598286383:web:2eb6c7c0cdef0ae70a52da',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
