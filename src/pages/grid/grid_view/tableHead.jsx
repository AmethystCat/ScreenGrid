import React from 'react';
import { connect } from 'react-redux';

export class Thead extends React.Component {
    render() {
        return (
            <thead>
            	{this.props.data}
            </thead>
        );
    }
}

export default connect()(Thead);