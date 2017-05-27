import React from 'react';

function Ul(props) {
    return (<ul>
        {props.list.map((log, index) => {
            return <li key={index}>{log}</li>;
        })}
    </ul>);
}

export default Ul;
