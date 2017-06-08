import React from 'react';

export default class Loading extends React.Component {
  	render() {
  		console.log(this.props.showLoading);
  		let classes = this.props.show ? 'loading' : 'loading hide';
    	return (
      		<div className={classes}>
        		<div className="spinner"></div>
    		</div>
    	);
  	}
}
