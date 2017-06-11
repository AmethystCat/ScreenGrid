import React from 'react';
import { connect } from 'react-redux';
import audioMute from '../../../assets/image/audio-mute.png';

export class Thead extends React.Component {
    render() {
        return (
            <thead>
            	<tr>
            		<th></th>
	            	{this.props.data.map((el, index) => {
	            		return <th key={index} width={20}>{el.name}<img src={audioMute} /><span>22</span></th>;
	            	})}
	            </tr>
            </thead>
        );
    }
}

export default connect()(Thead);