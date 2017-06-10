import React from 'react';

export default class Loading extends React.Component {
  	render() {
  		let classes = this.props.show ? 'loading' : 'loading hide';
    	return (
      		<div className={classes}>
        		<div className="spinner"></div>
    		</div>
    	);
  	}
}
