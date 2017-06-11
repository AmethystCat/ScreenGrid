import {expect} from 'chai';
import actionCreators from '../src/action/action-creator.js';
let {getNewConnections} = actionCreators; 

describe('helper: getNewConnectoins test', function() {
	it('should_origin_connections_reduce_given_element_when_givenElement_is_exist_in_it', function() {
		// given
		let originConnections = [
				{outMatrixPort: '40289f0d5c865cb7015c865fb8fe0014', inMatrixPort: '40289f0d5c865cb7015c865fb8fa0002'},
		        {outMatrixPort: '40289f0d5c865cb7015c865fb8fc000e', inMatrixPort: '40289f0d5c865cb7015c865fb8fa0004'},
		        {outMatrixPort: '40289f0d5c865cb7015c865fb8fc000d', inMatrixPort: '40289f0d5c865cb7015c865fb8fa0005'}
			],
			requestConnectionObj = {
				inPortId: '40289f0d5c865cb7015c865fb8fa0002',
				outPortId: '40289f0d5c865cb7015c865fb8fe0014'
			};
		// when
		let newConnections = getNewConnections(originConnections, requestConnectionObj);
		let expectConnections = [
				{outMatrixPort: '40289f0d5c865cb7015c865fb8fc000e', inMatrixPort: '40289f0d5c865cb7015c865fb8fa0004'},
		        {outMatrixPort: '40289f0d5c865cb7015c865fb8fc000d', inMatrixPort: '40289f0d5c865cb7015c865fb8fa0005'}
			];
		// then
		expect(newConnections).to.eql(expectConnections);
	});

	it('should_origin_connections_add_given_element_when_given_is_not_in_it', function() {
		// given
		let originConnections = [
		        {outMatrixPort: '40289f0d5c865cb7015c865fb8fc000e', inMatrixPort: '40289f0d5c865cb7015c865fb8fa0004'},
		        {outMatrixPort: '40289f0d5c865cb7015c865fb8fc000d', inMatrixPort: '40289f0d5c865cb7015c865fb8fa0005'}
			],
			requestConnectionObj = {
				inPortId: '40289f0d5c865cb7015c865fb8fa0002',
				outPortId: '40289f0d5c865cb7015c865fb8fe0014'
			};
		// when
		let newConnections = getNewConnections(originConnections, requestConnectionObj);
		let expectConnections = [
		        {outMatrixPort: '40289f0d5c865cb7015c865fb8fc000e', inMatrixPort: '40289f0d5c865cb7015c865fb8fa0004'},
		        {outMatrixPort: '40289f0d5c865cb7015c865fb8fc000d', inMatrixPort: '40289f0d5c865cb7015c865fb8fa0005'},
		        {outMatrixPort: '40289f0d5c865cb7015c865fb8fe0014', inMatrixPort: '40289f0d5c865cb7015c865fb8fa0002'}
			];
		// then
		expect(newConnections).to.eql(expectConnections);
	});

	it('should_origin_connections_add_given_element_when_given_element_is_not_in_it_and_in_the_same_row', function() {
		// given
		let originConnections = [
		        {outMatrixPort: '40289f0d5c865cb7015c865fb8fc000e', inMatrixPort: '40289f0d5c865cb7015c865fb8fa0004'},
		        {outMatrixPort: '40289f0d5c865cb7015c865fb8fc000d', inMatrixPort: '40289f0d5c865cb7015c865fb8fa0005'}
			],
			requestConnectionObj = {
				inPortId: '40289f0d5c865cb7015c865fb8fa0004',
				outPortId: '40289f0d5c865cb7015c865fb8fe0014'
			};
		// when
		let newConnections = getNewConnections(originConnections, requestConnectionObj);
		let expectConnections = [
		        {outMatrixPort: '40289f0d5c865cb7015c865fb8fc000e', inMatrixPort: '40289f0d5c865cb7015c865fb8fa0004'},
		        {outMatrixPort: '40289f0d5c865cb7015c865fb8fc000d', inMatrixPort: '40289f0d5c865cb7015c865fb8fa0005'},
		        {outMatrixPort: '40289f0d5c865cb7015c865fb8fe0014', inMatrixPort: '40289f0d5c865cb7015c865fb8fa0004'}
			];
		// then
		expect(newConnections).to.eql(expectConnections);
	});

	it('should_origin_connections_add_given_element_when_given_element_is_not_in_it_and_in_the_same_col', function() {
		// given
		let originConnections = [
		        {outMatrixPort: '40289f0d5c865cb7015c865fb8fc000e', inMatrixPort: '40289f0d5c865cb7015c865fb8fa0004'},
		        {outMatrixPort: '40289f0d5c865cb7015c865fb8fc000d', inMatrixPort: '40289f0d5c865cb7015c865fb8fa0005'}
			],
			requestConnectionObj = {
				inPortId: '40289f0d5c865cb7015c865fb8fa0002',
				outPortId: '40289f0d5c865cb7015c865fb8fc000d'
			};
		// when
		let newConnections = getNewConnections(originConnections, requestConnectionObj);
		let expectConnections = [
		        {outMatrixPort: '40289f0d5c865cb7015c865fb8fc000e', inMatrixPort: '40289f0d5c865cb7015c865fb8fa0004'},
		        {outMatrixPort: '40289f0d5c865cb7015c865fb8fc000d', inMatrixPort: '40289f0d5c865cb7015c865fb8fa0005'},
		        {outMatrixPort: '40289f0d5c865cb7015c865fb8fc000d', inMatrixPort: '40289f0d5c865cb7015c865fb8fa0002'}
			];
		// then
		expect(newConnections).to.eql(expectConnections);
	})
});