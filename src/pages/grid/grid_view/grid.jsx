import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from '../../../action/action-creator';
import Thead from './tableHead';
import Tbody from './tableBody';

export class Grid extends React.Component {
	componentWillMount() {
		this.initMatrix();
	}

	initMatrix = () => {
		const { matrixOriginData, matrixSection, initMatrixShown } = this.props;
		initMatrixShown({
			originData: matrixOriginData,
			section: matrixSection
		});
	}

	refreshMatrix = () => {
		let { coordinate, matrixOriginData } = this.props;
		let rowSection = Math.ceil(-(coordinate.lastX - coordinate.startX) / 20);
		let colSection = Math.ceil(-(coordinate.lastY - coordinate.startY) / 20);
		this.props.setSection({row: rowSection, col: colSection}, matrixOriginData);
		// 将init放入事件队列，强制位于setSection后面，防止init与setSection同时执行或者init先执行完导致状态刷新不正确，
		// 实际redux-devtool测试中，init与setSection同时执行导致状态刷新失败。
		setTimeout(() => {
			this.initMatrix();
		}, 0);
	}

	setCoordinate = (coordinate) => {
		this.props.setCoordinate(coordinate);
	}

	setSection = (givenSection) => {
		this.props.setSection(givenSection);
	}

	getCurrentMouseCoordinate = (event) => {
		let e = event.nativeEvent;
		return {x: e.clientX, y: e.clientY};
	} 

	mouseDownHandler = (e) => {
		let coordinate = this.getCurrentMouseCoordinate(e);
		this.setCoordinate({startX: coordinate.x, startY: coordinate.y});
	}

	mouseUpHandler = (e) => {
		let coordinate = this.getCurrentMouseCoordinate(e);
		this.setCoordinate({lastX: coordinate.x, lastY: coordinate.y});
		this.refreshMatrix();
	}

    render() {
        return (
            <div className="grid-main">
            	<table cellSpacing="5" onMouseDown={this.mouseDownHandler} onMouseUp={this.mouseUpHandler}>
            		<Thead data={this.props.tableHead} />
            		<Tbody cols={this.props.tableHead} rows={this.props.tableBody} />
            	</table>
            </div>
        );
    }
}

let mapStateTpProps = (state) => {
	return {
		matrixOriginData: state.matrixOriginData,
		matrixSection: state.matrixSection,
		coordinate: state.coordinate,
		tableHead: state.matrixShown.output,
		tableBody: state.matrixShown.input
	};
};

let mapDispatchToProps = (dispatch) => (bindActionCreators(actionCreators, dispatch));

export default connect(mapStateTpProps, mapDispatchToProps)(Grid);