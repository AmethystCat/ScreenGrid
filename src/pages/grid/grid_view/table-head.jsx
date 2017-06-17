import React from 'react';
import { connect } from 'react-redux';
import audioMute from '../../../assets/image/audio-mute.png';
import audioBearMute from '../../../assets/image/audio-mute-active.png';

export class Thead extends React.Component {
    render() {
        return (
            <thead>
            	<tr>
            		<th></th>
	            	{this.props.data.map((el, index) => {
	            		return <th key={index} width={20}>
                            {el.name}
                            <img src={el.mute ? audioBearMute : audioMute}/>
                            <span>{el.volume || 0}</span>
                        </th>;
	            	})}
	            </tr>
            </thead>
        );
    }
}

export default connect()(Thead);