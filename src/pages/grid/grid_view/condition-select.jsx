import React from 'react';
import {connect} from 'react-redux';

class Select extends React.Component {
    render() {
        let {placeholder, id, data, current} = this.props;
        return (
            <select name="scene" id={id} value={current.id}>
            	<option value="">{placeholder}</option>
            	{data.map((item, index) => {
            		return <option key={index} value={item.id}>{item.name}</option>;
            	})}
            </select>
        );
    }
}

export default connect()(Select);