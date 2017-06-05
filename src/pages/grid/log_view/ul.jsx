import React from 'react';

function Ul(props) {
    return (<ul>
        {props.list.map((log, index) => {
            return <li title={log} key={index}>{log}</li>;
        })}
    </ul>);
}

export default Ul;
