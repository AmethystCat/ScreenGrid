import { createStore } from 'redux';
import rootReducer from '../reducer/index';

export default function(data) {
	let store = createStore(rootReducer, data,
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
 
	if (module.hot) {
		module.hot.accept('../reducer', () => {
			const nextRootReducer = require('../reducer/index');
			store.replaceReducer(nextRootReducer);
		});
	}
	return store;
};