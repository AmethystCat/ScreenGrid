import React from 'react';
import { connect } from 'react-redux';
import Condition from './condition';
import Grid from './grid';

class GridView extends React.Component {
    render() {
        return (
            <div className="gird-w">
                <Condition />
                <Grid />
            </div>
        );
    }
}
export default connect()(GridView);
