import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from '../../../action/action-creator';
import audioMute from '../../../assets/image/audio-mute.png';
import audioBearMute from '../../../assets/image/audio-mute-active.png';

export class Thead extends React.Component {

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
        let {setMute, currentMatrix} = this.props;
        return (
            <thead>
            	<tr>
            		<th></th>
	            	{this.props.data.map((el, index) => {
	            		return <th key={index} width={20}>
                            {el.name}
                            <img 
                                onClick={() => {
                                    setMute({
                                        audioMatrixId: currentMatrix.id, 
                                        portId: el.portType.id,
                                        mute: !el.mute,
                                        portType: 'matrixOutput',
                                        inOrOutPortId: el.id
                                    });
                                }} 
                                src={el.mute ? audioBearMute : audioMute}/>
                            <span onClick={(e) => {
                                this.openVolumeLayer(el.id, el.mute, el.name, el.portType.id, e.target);
                            }} >{el.volume || 0}</span>
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