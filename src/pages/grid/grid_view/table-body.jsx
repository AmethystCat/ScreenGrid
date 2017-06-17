import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from '../../../action/action-creator';
import audioBear from '../../../assets/image/audio-bear.png';
import audioBearMute from '../../../assets/image/audio-bear-active.png';

export class Tbody extends React.Component {
    clickHandler = (e) => {
        if (e.target.cellIndex === 0) return;
        let {rows, cols, currentMatrix, setInToOutConnect, getLogs} = this.props;
        // console.log(e.nativeEvent);
        console.log('col: ', cols[e.target.cellIndex - 1]);
        console.log('row: ', rows[e.target.parentNode.rowIndex - 1]);
        let clickedRow = rows[e.target.parentNode.rowIndex - 1],
            clickedCol = cols[e.target.cellIndex - 1];
        let connectObj = {
            audioMatrixId: currentMatrix.id,
            inPortId: clickedRow.id,
            outPortId: clickedCol.id
        };
        Promise.resolve(setInToOutConnect(connectObj))
            .then(getLogs());
        ;
    }

    mouseOverHandler = (e) => {
        let isFirstCol = e.target.cellIndex === 0;
        if (isFirstCol) return;
        this.props.showLayer(true);
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

    mouseEnterHandler = (e) => {
        let isFirstCol = e.target.cellIndex === 0;
        if (isFirstCol) return;
        this.props.showLayer(true);
    }

    mouseLeaveHandler = () => {
        this.props.showLayer(false);
    }

    getIsConnectClasses = (row, col, connections = []) => {
        let isConnect = false;
        let ouputId = col.id,
            inputId = row.id;
        connections.forEach((connect) => {
            (connect.outMatrixPort === ouputId && connect.inMatrixPort === inputId) && (isConnect = true);
        });
        return isConnect ? 'isConnect' : '';
    }

    openVolumeLayer = (portId, mute, portName, portTypeId, target) => {
        
        let {currentMatrix} = this.props;
        let _this = this;
        openVolumeLayer(currentMatrix.id, portId, mute, '', '', '', target, portName, function(currentVolume) {
            // params: audioMatrixId, portId, volmue, portType, inOrOutPortId
            _this.props.setVolume({
                audioMatrixId: currentMatrix.id, 
                portId: portTypeId,
                volume: currentVolume,
                portType: 'matrixOutput',
                inOrOutPortId: portId
            });
        });
    }

    render() {
    	let {rows, cols, connections = [], currentMatrix, setMute} = this.props;
        return (
            <tbody onMouseEnter={this.mouseEnterHandler} onMouseLeave={this.mouseLeaveHandler}>
            	{rows.map((row, index) => {
            		return <tr key={`r${index}`} onClick={this.clickHandler}>
	            			{cols.map((col, i) => {
                                if (i === 0) {
                                    return <td key={0}>
                                            {row.name}
                                            <img
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setMute({
                                                        audioMatrixId: currentMatrix.id, 
                                                        portId: row.portType.id,
                                                        mute: !row.mute,
                                                        portType: 'matrixOutput',
                                                        inOrOutPortId: row.id
                                                    });
                                                }}
                                                src={row.mute ? audioBearMute : audioBear}/>
                                            <span onClick={(e) => {
                                                e.stopPropagation();
                                                this.openVolumeLayer(row.id, row.mute, row.name, row.portType.id, e.target);
                                            }}>{row.volume || 0}</span>
                                        </td>;
                                } else {
                                    let classes = this.getIsConnectClasses(row, cols[i - 1], connections);
                                    return <td 
                                            key={`c${i}`}
                                            className={classes} 
                                            onMouseOver={this.mouseOverHandler}
                                        />;
                                }
	            			})}
                            {(() => {
                                return <td 
                                        key={'lastTd'}
                                        className={
                                            cols.length
                                            && this.getIsConnectClasses(row, cols[cols.length - 1], connections)}
                                        onMouseOver={this.mouseOverHandler}
                                    />;
                            })(rows, cols, connections)} 
            			</tr>;
            	})}
            </tbody>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        isShowLayer: state.showLayer,
        currentMatrix: state.currentMatrixName,
        connections: state.connections
    };
};

let mapDispatchToProps = (dispatch) => (bindActionCreators(actionCreators, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(Tbody);