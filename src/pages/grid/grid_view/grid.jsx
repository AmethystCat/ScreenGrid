import React from 'react';
import { connect } from 'react-redux';
import Thead from './tableHead';
import Tbody from './tableBody';

export class Grid extends React.Component {
    render() {
        return (
            <div className="grid-main">
            	<table>
            		<Thead data={this.props.tableHead} />
            		<Tbody cols={this.props.tableHead} rows={this.props.tableBody} />
            	</table>
            </div>
        );
    }
}

let mapStateTpProps = (state) => {
	return {
		tableHead: state.OutputShow,
		tableBody: state.InputShow
	};
};

export default connect(mapStateTpProps)(Grid);