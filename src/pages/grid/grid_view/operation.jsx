import React from 'react';
import { connect } from 'react-redux';

export class Operation extends React.Component {
  render() {
    return (
      <div className="operation-wrap">
          <div className="connect connected-wrap">
            <i></i>
            <span>已连接</span>
          </div>
          <div className="connect unconnected-wrap">
            <i></i>
            <span>未连接</span>
          </div>
      </div>
    );
  }
}

export default connect()(Operation);