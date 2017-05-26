import React from 'react';

export default class T extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
	name: 'hello react'  	
  }

  render() {
    return (
      <div>{this.state.name}</div>
    );
  }
}
