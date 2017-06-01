import React from 'react';
import { connect } from 'react-redux';

export class Thead extends React.Component {
    render() {
        return (
            <thead>
            	<tr>
            		<th></th>
	            	{this.props.data.map((el, index) => {
	            		return <th key={index} data-id={el.id} width={20}>{el.name}</th>;	
	            	})}
	            </tr>
            </thead>
        );
    }
}

export default connect()(Thead);