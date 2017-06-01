import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducer/index';

// const enhancer = () => {
// 	 compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
// };

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function(initialState) {
	let store = createStore(rootReducer, initialState, composeEnhancers(
			applyMiddleware(thunk)
		));
 
	if (module.hot) {
		module.hot.accept('../reducer', () => {
			const nextRootReducer = require('../reducer/index');
			store.replaceReducer(nextRootReducer);
		});
	}
	return store;
};