import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import actionCreators from '../../../action/action-creator';
import {refreshMatrix} from '../../../common/helper';
import {video} from '../../../common/url-config';
import axios from 'axios';

export class Operation extends React.Component {

    getConnectionByOut = (videoMatrixId, outPortId, connections) => {
        axios.get(video.connectionByOutUrl, {
            params: {
                videoMatrixId,
                outPortId
            }
        })
        .then(res => {
            if (res.data.success) {
                let currentPort = {
                    inMatrixPort: res.data.data,
                    outMatrixPort: outPortId
                };
                // 连接记录中对当前请求的输出源对应的输入源进行更新操作
                // connections.push(currentPort);
                let newConnections = connections.map((connect) => {
                    if (connect.outMatrixPort === currentPort.outMatrixPort) {
                        currentPort.inMatrixPort && (connect.inMatrixPort = currentPort.inMatrixPort);
                    }
                    return connect;
                });
                this.props.setConnections(newConnections);
            } else {
                alert(res.data.error);
            }
        });
    }

    refresh = () => {
        let {outPorts = [], currentMatrixId, connections} = this.props;
        let promises = outPorts.map((outPort) => {
            return this.getConnectionByOut(currentMatrixId, outPort.id, connections);
        });
        refreshMatrix(promises);
    };

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
                <div className="connect refresh-wrap">
                    <i></i>
                    <span onClick={this.refresh}>刷新</span>
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        outPorts: state.matrixShown.output,
        currentMatrixId: state.currentMatrixName.id,
        connections: state.connections
    };
};

let mapDispatchToProps = (dispatch) => (bindActionCreators(actionCreators, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(Operation);