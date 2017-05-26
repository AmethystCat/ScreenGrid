import React from 'react';
import { connect } from 'react-redux';

class Test extends React.Component {
	constructor(props) {
		super(props);
	}

	addName = () => {
		const { add_name } = this.props.attr;
		let n = this.props.name + 1;
		add_name(n);
	}

	render() {
		console.log(this.props);
	    return (<div>
	    	<button type="button" onClick={this.addName}>name change</button>
	    		<br/>{this.props.attr.name}
	    	</div>);
	}
}

let mapStateToProps = (state) => {
	return {
		name: state.name
	};
};

export default connect(mapStateToProps)(Test);