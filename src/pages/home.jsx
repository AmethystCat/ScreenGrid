import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators from '../action/action-creator';
import Container from './grid/container';


let mapStateToProps = (state) => ({
	name: state.name,
	list: state.list,
	attr: state.attr,
	logs: state.logs
});

let mapDispatchToProps = (dispatch) => (bindActionCreators(actionCreators, dispatch));

class TestSub extends React.Component {
	render() {
		return (<Container attr={this.props}/>);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TestSub);