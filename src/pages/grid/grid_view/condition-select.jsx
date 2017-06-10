import React from 'react';
import {connect} from 'react-redux';

class Select extends React.Component {
    render() {
        let {placeholder, id, data = [], current, changeHandler} = this.props;
        return (
            <select id={id} value={current.id} onChange={(e) => {changeHandler(e, id);}}>
            	<option value="">{placeholder}</option>
            	{data.map((item, index) => {
            		return <option key={index} value={item.id}>{item.name}</option>;
            	})}
            </select>
        );
    }
}

export default connect()(Select);