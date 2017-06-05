import React from 'react';
import { connect } from 'react-redux';
import Ul from './ul';

class LogView extends React.Component {
    render() {
        return (
            <div className="logs-w">
                <div className="logs-title">操 作 日 志</div>
                <div className="logs-border"></div>
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