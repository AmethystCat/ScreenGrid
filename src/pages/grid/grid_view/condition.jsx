import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from '../../../action/action-creator';
import Select from './condition-select';

class Condition extends React.Component {
	changeScene = (e, sceneId) => {
		sceneId === 'scene' && this.props.changeScene(e.target.value);
	}
	changeMatrix = (e, matrixId) => {
		matrixId === 'matrix' && this.props.changeMatrix(e.target.value);
	}
    render() {
    	let {scene, currentScene, matrixName, currentMatrixName} = this.props;
    	let sceneDisplay = scene.filter(scene => scene['displayed']);
        return (
            <div className="condition-w">
                <span>场景</span>
				<Select
                	placeholder="请选择场景" 
                	id={'scene'} 
                	data={sceneDisplay}
                	current={currentScene}
                	changeHandler={this.changeScene}
                	/> 
				<span>矩阵名</span>
                <Select 
                	placeholder="请选择矩阵名" 
                	id={'matrix'} 
                	data={matrixName}
                	changeHandler={this.changeMatrix}
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
