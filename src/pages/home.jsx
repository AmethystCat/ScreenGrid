import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from '../action/action-creator';
import Container from './grid/container';

class Home extends React.Component {
	componentDidMount() {
		this.props.initRequest();
	}
	render() {
		return (<Container />);
	}
}

let mapStateToProps = (state) => {
	return {
		scene: state.scene
	};
};

let mapDispatchToProps = (dispatch) => (bindActionCreators(actionCreators, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(Home);