import React from 'react';

function Ul(props) {
    return (<ul>
        {props.list.map((log, index) => {
        	let {operation} = log;
        	let logContent = '';
        	if (operation === 'CONNECT' || operation === 'DISCONNECT') {
        		logContent = `${log.matrixPort}${log.description}${log.toMatrixPort}`;
        	} else {
        		logContent = `${log.matrixPort}${log.description}`;
        	}
            return <li title={log.description} key={index}>
            		{logContent}
            	</li>;
        })}
    </ul>);
}

export default Ul;
