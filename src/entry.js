import React from 'react';
import ReactDOM from 'react-dom';
import T from './test.jsx';
import { AppContainer } from 'react-hot-loader';

import './testStyle.less';

// let a = <h1>Hello react!</h1>

const render = () => {
	ReactDOM.render(
		<AppContainer>
			<T/>
		</AppContainer>, document.getElementById('app'));	
};

render();

// Hot Module Replacement API
if(module.hot){module.hot.accept('./test.jsx', render);}