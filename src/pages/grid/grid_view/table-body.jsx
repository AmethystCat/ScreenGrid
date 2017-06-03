import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from '../../../action/action-creator';

export class Tbody extends React.Component {
    clickHandler = (e) => {
        if (e.target.cellIndex === 0) return;
        let {rows, cols} = this.props;
        // console.log(e.nativeEvent);
        console.log('col: ', cols[e.target.cellIndex - 1]);
        console.log('row: ', rows[e.target.parentNode.rowIndex - 1]);
    }

    mouseOverHandler = (e) => {
        if (e.target.cellIndex === 0 || !this.props.isShowLayer) return;
        let table = document.getElementById('table');
        let fx = document.getElementById('fx'),
            fy = document.getElementById('fy');
        // 格子之间的间隔由td的border来控制，因为border-collapse合并，两行之间的宽度即为td的border宽度，
        // 即实际一个td边框的宽度只取设定好的border一半的宽度，
        // 所以浮层也只取一半的偏移量
        let tdBorder = 6;
        fx.style.top = e.target.offsetTop + table.offsetTop + tdBorder/2 + 'px';
        fy.style.left = e.target.offsetLeft + table.offsetLeft + tdBorder/2 + 'px';
    }

    mouseEnterHandler = () => {
        this.props.showLayer(true);
    }

    mouseLeaveHandler = () => {
        this.props.showLayer(false);
    }

    render() {
    	let {rows, cols} = this.props;
        return (
            <tbody onMouseEnter={this.mouseEnterHandler} onMouseLeave={this.mouseLeaveHandler}>
            	{rows.map((row, index) => {
            		return <tr key={`r${index}`} onClick={this.clickHandler}>
	            			{cols.map((col, i) => {
	            				return <td onMouseOver={this.mouseOverHandler} key={`c${i}`}>{i === 0 ? row.name : ''}</td>;
	            			})}
	            			<td onMouseOver={this.mouseOverHandler}></td> 
            			</tr>;
            	})}
            </tbody>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        isShowLayer: state.showLayer
    };
};

let mapDispatchToProps = (dispatch) => (bindActionCreators(actionCreators, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(Tbody);