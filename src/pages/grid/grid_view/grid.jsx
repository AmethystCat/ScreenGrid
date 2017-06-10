import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from '../../../action/action-creator';
import Thead from './table-head';
import Tbody from './table-body';
import HoverFloatingLayer from './floating-layer';
import Operation from './operation';
import audioMute from '../../../assets/image/audio-mute.png';
import audioBear from '../../../assets/image/audio-bear.png';

export class Grid extends React.Component {

	initMatrix = () => {
		const { matrixOriginData, matrixSection, initMatrixShown } = this.props;
		initMatrixShown({
			originData: matrixOriginData,
			section: matrixSection
		});
	}

	refreshMatrix = () => {
		let { coordinate, matrixOriginData } = this.props;
		let matrixSize = 20;
		let rowSection = Math.floor(-(coordinate.lastY - coordinate.startY) / matrixSize);
		let colSection = Math.floor(-(coordinate.lastX - coordinate.startX) / matrixSize);
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
		// 原理同 27行
		setTimeout(() => {
			this.refreshMatrix();
		}, 0);
	}

    render() {
        return (
            <div className="grid-main">
            	<table id="table" onMouseDown={this.mouseDownHandler} onMouseUp={this.mouseUpHandler}>
            		<Thead data={this.props.tableHead} />
            		<Tbody cols={this.props.tableHead} rows={this.props.tableBody} />
            	</table>

				<table>
					<thead>
						<tr>
							<th></th>
							<th>输出1<img src={audioMute} /><span>22</span></th>
							<th>输出2<img src={audioMute} /><span>700</span></th>
							<th>输出3<img src={audioMute} /><span>233</span></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>输入1<img src={audioBear}/><span>1</span></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>输入2<img src={audioBear}/><span>2</span></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>输入3<img src={audioBear}/><span>3</span></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
					</tbody>
				</table>
            	<HoverFloatingLayer />
            	<Operation />
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