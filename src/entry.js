import React from 'react';
import ReactDOM from 'react-dom';
import App from './application.jsx';
import { AppContainer } from 'react-hot-loader';

import './testStyle.less';

// let a = <h1>Hello react!</h1>

const render = () => {
	ReactDOM.render(
		<AppContainer>
			<App/>
		</AppContainer>, document.getElementById('app')
	);	
};

render();

// Hot Module Replacement API
if(module.hot){module.hot.accept('./application.jsx', render);}