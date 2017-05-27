import React from 'react';
import { connect } from 'react-redux';
import Select from './condition-select';

class Condition extends React.Component {
    render() {
        return (
            <div className="condition-w">
                <Select placeholder="请选择场景" />
                <Select placeholder="请选择矩阵名" />
            </div>
        );
    }
}

export default connect()(Condition);