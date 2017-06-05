import React from 'react';
import { connect } from 'react-redux';
import Select from './condition-select';

class Condition extends React.Component {
    render() {
        return (
            <div className="condition-w">
                <span>场景</span><Select placeholder="请选择场景" />
                <span>矩阵名</span><Select placeholder="请选择矩阵名" />
            </div>
        );
    }
}

export default connect()(Condition);