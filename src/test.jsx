import React from 'react';

export default class T extends React.Component {
  state = {
	name: 'hello react'  	
  };

  render() {
    return (
      <div>{this.state.name}</div>
    );
  }
}
