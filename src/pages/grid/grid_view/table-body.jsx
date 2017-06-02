import React from 'react';
import { connect } from 'react-redux';

export class Tbody extends React.Component {
    clickHandler = (e) => {
        let {rows, cols} = this.props;
        // console.log(e.nativeEvent);
        console.log('col: ', cols[e.target.cellIndex - 1]);
        console.log('row: ', rows[e.target.parentNode.rowIndex - 1]);
    }
    render() {
    	let {rows, cols} = this.props;
        return (
            <tbody>
            	{rows.map((row, index) => {
            		return <tr key={`r${index}`} onClick={this.clickHandler}>
	            			{cols.map((col, i) => {
	            				return <td key={`c${i}`}>{i === 0 ? row.name : ''}</td>;
	            			})}
	            			<td></td>
            			</tr>;
            	})}
            </tbody>
        );
    }
}

export default connect()(Tbody);