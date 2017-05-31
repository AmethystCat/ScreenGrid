import React from 'react';
import { connect } from 'react-redux';

export class Tbody extends React.Component {
    render() {
        return (
            <tbody>
            	{this.props.data}
            </tbody>
        );
    }
}

export default connect()(Tbody);