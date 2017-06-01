import {expect} from 'chai';
import {matrixShown, matrixSection} from '../src/reducer/reducers.js';

const matrixOriginData = {
        	matrixInput: [
	            {id: 'i-1', name: '输入源1'}, 
	            {id: 'i-2', name: '输入源2'}, 
	            {id: 'i-3', name: '输入源3'}
	        ],
	        matrixOutput: [
	            {id: 'o-1', name: '输出源1'}, 
	            {id: 'o-2', name: '输出源2'}, 
	            {id: 'o-3', name: '输出源3'}
	        ]
    	},
	    matrixOriginSection = {
	        row: [0, 2],
	        col: [0, 2]
	    };

describe('reducer测试', function() {
    it('matrixShown: should_return_right_matrix_shown_data_when_input_matrix_origin_data_and_matrix_section', function(){
    	// given
    	let state = {
	    		input: [],
	    		output: []
    		};
    	let matrixObj = {
	    		originData: matrixOriginData,
	    		section: matrixOriginSection
	    	};
	    let action = {
	    	type: 'init',
	    	matrixObj
	    };
	    let	expectData = {
	    		input: [{id: 'i-1', name: '输入源1'}, {id: 'i-2', name: '输入源2'}],
	    		output: [{id: 'o-1', name: '输出源1'}, {id: 'o-2', name: '输出源2'}]
	    	};
    	// when
        const actualMatrixShownData = matrixShown(state, action);
        // then
        expect(actualMatrixShownData).to.eql(expectData);
    });

    describe('matrixSection: 根据鼠标拖动动态改变取值区间测试', function() {
    	it('{row: [0, 2], col: [0, 2]} => {row: [3, 5], col: [2, 4]}, when givenSection = {row: 3, col: 2}', function() {
    		// given
	    	let givenSection = {
	    		row: 3,
	    		col: 2
	    	};
	    	let action = {
	    		type: 'setSection',
	    		givenSection
	    	};
	    	let expectSection = {
	    		row: [3, 5],
	    		col: [2, 4]
	    	};
	    	// when
	    	const actualMatrixSection = matrixSection(matrixOriginSection, action);
	    	// then
	    	expect(actualMatrixSection).to.eql(expectSection);
    	});

    	it('{row: [0, 2], col: [0, 2]} => {row: [0, 2], col: [0, 2]}, when givenSection = {row: -3, col: -2}', function() {
	    	// given
	    	let givenSection = {
	    		row: -3,
	    		col: -2
	    	};
	    	let action = {
	    		type: 'setSection',
	    		givenSection
	    	};
	    	let expectSection = matrixOriginSection;
	    	// when
	    	const actualMatrixSection = matrixSection(matrixOriginSection, action);
	    	// then
	    	expect(actualMatrixSection).to.eql(expectSection);
	    });

	    it('{row: [0, 2], col: [0, 2]} => {row: [0, 2], col: [2, 4]}, when givenSection = {row: -3, col: 2}', function() {
	    	// given
	    	let givenSection = {
	    		row: -3,
	    		col: 2
	    	};
	    	let action = {
	    		type: 'setSection',
	    		givenSection
	    	};
	    	let expectSection = {
	    		row: [0, 2],
	    		col: [2, 4]
	    	};
	    	// when
	    	const actualMatrixSection = matrixSection(matrixOriginSection, action);
	    	// then
	    	expect(actualMatrixSection).to.eql(expectSection);
	    });

	    it('{row: [0, 2], col: [2, 4]} => {row: [3, 5], col: [0, 2]}, when givenSection = {row: 3, col: -2}', function() {
	    	// given
	    	let givenSection = {
		    		row: 3,
		    		col: -2
		    	};
	    	let action = {
		    		type: 'setSection',
		    		givenSection
		    	};
	    	let matrixOriginSection = {
			        row: [0, 2],
			        col: [2, 4]
			    };
	    	let expectSection = {
		    		row: [3, 5],
		    		col: [0, 2]
		    	};
	    	// when
	    	const actualMatrixSection = matrixSection(matrixOriginSection, action);
	    	// then
	    	expect(actualMatrixSection).to.eql(expectSection);
	    });
    });
});
