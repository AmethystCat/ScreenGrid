import React from 'react';
import {connect} from 'react-redux';

class Select extends React.Component {
    render() {
        let {placeholder} = this.props;
        return (
            <select name="scene" id="scene">
                <option value="0">{placeholder}</option>
            </select>
        );
    }
}

export default connect()(Select);