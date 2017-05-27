import React from 'react';
import { connect } from 'react-redux';

class Grid extends React.Component {
    render() {
        return (
            <div>grid</div>
        );
    }
}

export default connect()(Grid);