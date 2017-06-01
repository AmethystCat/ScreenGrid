import React from 'react';
import { connect } from 'react-redux';
import Container from './grid/container';

class Home extends React.Component {
	render() {
		return (<Container />);
	}
}

export default connect()(Home);