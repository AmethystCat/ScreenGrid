import React from 'react';
import { connect } from 'react-redux';

class HoverFloatingLayer extends React.Component {
    render() {
        return (
            <div className="floatingLayer-w">
                <div className="f-x layer-item"></div>
                <div className="f-y layer-item"></div>
            </div>
        );
    }
}
export default connect()(HoverFloatingLayer);
