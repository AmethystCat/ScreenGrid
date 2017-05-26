import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import Test from '../src/test.jsx';
 describe('testting', function() {
 	it('test jsx 测试', function(){
 		const T = shallow(<Test/>);
 		expect(T.state().name).to.equal('hello react');
 		expect(T.text()).to.equal('hello react');
 	});
 });