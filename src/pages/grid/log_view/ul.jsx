import React from 'react';

function Ul(props) {
    return (<ul>
        {props.list.map((log, index) => {
        	let {operation} = log;
			let logContent = '',
				logContentEl;
        	if (operation === 'CONNECT' || operation === 'DISCONNECT') {
				logContentEl = <span>
						{log.matrixPort}
						<span className="description">{log.description}</span>
						{log.toMatrixPort}
					</span>;
				logContent = `${log.matrixPort}${log.description}${log.toMatrixPort}`;
        	} else {
				logContentEl = <span>{log.matrixPort}<span className="description">{log.description}</span></span>;
				logContent = `${log.matrixPort}${log.description}`;
        	}
            return <li title={logContent} key={index}>
            		{index+1}. {logContentEl}
            	</li>;
        })}
    </ul>);
}

export default Ul;
