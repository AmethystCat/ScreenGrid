import React from 'react';
import {connect} from 'react-redux';
import GridView from './grid_view/index';
import LogView from './log_view/log-view';

import Loading from '../../components/loading';

class Container extends React.Component {
    render() {
    	console.log(this.props.showLoading);
        return (
            <div className="grid-container">
                <GridView />
                <LogView />
                <Loading show={this.props.showLoading}/>
            </div>);
    }
}

let mapStateToProps = (state) => {
	return {
		showLoading: state.showLoading
	};
};

export default connect(mapStateToProps)(Container);