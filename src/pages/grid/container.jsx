import React from 'react';
import {connect} from 'react-redux';
import GridView from './grid_view/index';
import LogView from './log_view/log-view';

class Container extends React.Component {
    render() {
        return (
            <div className="grid-container">
                <GridView />
                <LogView />
            </div>);
    }
}

export default connect()(Container);