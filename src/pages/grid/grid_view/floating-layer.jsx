import React from 'react';
import { connect } from 'react-redux';

class HoverFloatingLayer extends React.Component {
    render() {
    	let classes = this.props.showLayer ? 'floatingLayer-w' : 'floatingLayer-w hide';
        return (
            <div className={classes}>
                <div id="fx" className="f-x layer-item"></div>
                <div id="fy" className="f-y layer-item"></div>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
	return {
		showLayer: state.showLayer
	};
};

export default connect(mapStateToProps)(HoverFloatingLayer);
