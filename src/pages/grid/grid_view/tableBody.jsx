import React from 'react';
import { connect } from 'react-redux';

export class Tbody extends React.Component {
    render() {
    	let {rows, cols} = this.props;
        return (
            <tbody>
            	{rows.map((row, index) => {
            		return <tr key={`r${index}`}>
	            			{cols.map((col, i) => {
	            				return <td key={`c${i}`}>{i === 0 ? row.id : ''}</td>;
	            			})}
	            			<td></td>
            			</tr>;
            	})}
            </tbody>
        );
    }
}

export default connect()(Tbody);