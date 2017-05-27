import React from 'react';
import { connect } from 'react-redux';
import Ul from './ul';

class LogView extends React.Component {
    render() {
        return (
            <div className="log-w">
                <Ul list={this.props.logs}/>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        logs: state.logs
    };
};

export default connect(mapStateToProps)(LogView);