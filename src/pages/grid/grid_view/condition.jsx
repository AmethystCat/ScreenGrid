import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from '../../../action/action-creator';
import Select from './condition-select';

class Condition extends React.Component {
    render() {
    	let {scene, currentScene, matrixName, currentMatrixName} = this.props;
        return (
            <div className="condition-w">
                <Select 
                	placeholder="请选择场景" 
                	id={'scene'} 
                	data={scene} 
                	current={currentScene}
                	/> 
                <Select 
                	placeholder="请选择矩阵名" 
                	id={'matrixName'} 
                	data={matrixName} 
                	current={currentMatrixName}/>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
	return {
		scene: state.scene,
		currentScene: state.currentScene,
		matrixName: state.matrixName,
		currentMatrixName: state.currentMatrixName
	};
};

let mapDispatchToProps = (dispatch) => (bindActionCreators(actionCreators, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(Condition);