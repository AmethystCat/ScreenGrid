import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators from './action/action-creator';
import Test from './module';


let mapStateToProps = (state) => ({
	name: state.name,
	list: state.list,
	attr: state.attr
});

let mapDispatchToProps = (dispatch) => (bindActionCreators(actionCreators, dispatch));

class TestSub extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log(...this.props);
		return (<Test attr={this.props}/>);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TestSub);