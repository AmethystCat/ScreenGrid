import React from 'react';

function Ul(props) {
    return (<ul>
        {props.list.map((log, index) => {
            return <li title={log.matrixPort + log.description + (log.toMatrixPort || '')} key={index}>
				<span>
					{index+1}. {log.matrixPort}
					<span className="description">{log.description}</span>
					{log.toMatrixPort || ''}
				</span>
			</li>;
        })}
    </ul>);
}

export default Ul;
