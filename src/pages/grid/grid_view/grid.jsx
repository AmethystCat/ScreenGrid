import React from 'react';
import { connect } from 'react-redux';
import TableHead from './tableHead';
import TableBody from './tableBody';

export class Grid extends React.Component {
    render() {
    console.log(this.props.tableHead);
        return (
            <div className="grid-main">
                asdlfkj
            	<table>
            		<TableHead data={this.props.tableHead}/>
            		<TableBody data={this.props.tableBody}/>
            	</table>
            </div>
        );
    }
}

let mapStateTpProps = (state) => {
    console.log(state);
	return {
		tableHead: state.tableHead,
		tableBody: state.tableBody
	};
};

export default connect(mapStateTpProps)(Grid);