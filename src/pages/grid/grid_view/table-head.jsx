import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from '../../../action/action-creator';
import audioMute from '../../../assets/image/audio-mute.png';
import audioBearMute from '../../../assets/image/audio-mute-active.png';

export class Thead extends React.Component {

    openVolumePanel = (params) => {
        let {currentMatrixId, portId, portName, mute, target, isVirtual} = params;
        let _this = this;
        openVolumeLayer(currentMatrixId, portId, mute, '', '', '', target, portName, function(currentVolume) {
            _this.props.setVolume({
                audioMatrixId: currentMatrixId, 
                portId: portId,
                volume: currentVolume,
                portType: 'matrixOutput',
                isVirtual
            });
        });
    }

    render() {
        let {setMute, currentMatrix, data = []} = this.props;
        let isVirtual = currentMatrix.virtual;
        return (
            <thead>
            	<tr>
            		<th></th>
	            	{data.map((el, index) => {
	            		return <th key={index} width={20}>
                            {el.name}
                            <img 
                                onClick={() => {
                                    setMute({
                                        audioMatrixId: isVirtual ? (el.solidAudioMatrix ? el.solidAudioMatrix.id : '') : currentMatrix.id,
                                        portId: isVirtual ? (el.solidPort ? el.solidPort.id : '') : el.id,
                                        mute: !(isVirtual ? (el.solidPort ? el.solidPort.mute : false) : el.mute),
                                        portType: 'matrixOutput',
                                        isVirtual
                                    });
                                }} 
                                src={(isVirtual ? (el.solidPort ? el.solidPort.mute : false) : el.mute) ? audioBearMute : audioMute}/>
                            <span onClick={(e) => {
                                let currentMatrixId = isVirtual ? (el.solidAudioMatrix ? el.solidAudioMatrix.id : '') : currentMatrix.id,
                                    portId = isVirtual ? (el.solidPort ? el.solidPort.id : '') : el.id,
                                    portName = el.name,
                                    mute = isVirtual ? (el.solidPort ? el.solidPort.mute : false) : el.mute,
                                    target = e.target;
                                this.openVolumePanel({currentMatrixId, portId, portName, mute, target, isVirtual});
                            }} >{(isVirtual ? (el.solidPort ? el.solidPort.volume : 0) : el.volume) || 0}</span>
                        </th>;
	            	})}
	            </tr>
            </thead>
        );
    }
};

let mapStateTpProps = (state) => {
    return {
        currentMatrix: state.currentMatrixName
    };
};

let mapDispatchToProps = (dispatch) => (bindActionCreators(actionCreators, dispatch));

export default connect(mapStateTpProps, mapDispatchToProps)(Thead);