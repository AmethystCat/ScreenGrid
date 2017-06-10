import React from 'react';

function Ul(props) {
    return (<ul>
        {props.list.map((log, index) => {
            return <li title={log.description} key={index}>{log.description}</li>;
        })}
    </ul>);
}

export default Ul;
