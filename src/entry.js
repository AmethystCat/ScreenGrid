import React from 'react';
import ReactDOM from 'react-dom';
import App from './application.jsx';
import { AppContainer } from 'react-hot-loader';

import 'babel-polyfill';
import './assets/style/index.less';

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