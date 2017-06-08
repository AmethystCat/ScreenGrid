import React from 'react';
import { connect } from 'react-redux';
import Container from './grid/container';
import axios from 'axios';

class Home extends React.Component {
	componentDidMount() {
		console.log(123);
		axios.get('/systemManage/scene/sceneList')
		.then(response => response.data)
		.then(data=>{console.log(data);});
	}
	render() {
		return (<Container />);
	}
}

export default connect()(Home);