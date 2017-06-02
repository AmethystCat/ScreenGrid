import {ADD_LOG} from '../action/action-types';

export function matrixOriginData(state = {}, action) {
	switch (action.type) {
		default:
			return state;
	}
}

export function matrixShown(state = {input: [], output: []}, action) {
	switch (action.type) {
		case 'init':
			let matrix = action.matrixObj;
			let section = matrix.section;
			let originData = matrix.originData;
			let newState = {
					...state,
					input: originData.matrixInput.slice(section.row[0], section.row[1]),
					output: originData.matrixOutput.slice(section.col[0], section.col[1])
				};
			return newState;
		default:
			return state;
	}
}

export function matrixSection(state = {row: [0, 0], col: [0, 0]}, action) {
	switch (action.type) {
		case 'setSection':
			let givenSection = action.givenSection,
				matrixOriginData = action.matrixOriginData,

				rowSection = state.row,
				colSection = state.col,
				
				rowLen = matrixOriginData.matrixInput.length,
				colLen = matrixOriginData.matrixOutput.length;

			let limitRowNum = state.row[1] - state.row[0];
			let limitColNum = state.col[1] - state.col[0];

			let updatedRowSectionStart = (rowSection[0] + givenSection.row),
				updatedRowSectionEnd = (rowSection[1] + givenSection.row),

				updatedColSectionStart = (colSection[0] + givenSection.col),
				updatedColSectionEnd = (colSection[1] + givenSection.col);

			let finalRowSectionStart = updatedRowSectionStart,
				finalRowSectionEnd = updatedRowSectionEnd,
				finalColSectionStart = updatedColSectionStart,
				finalColSectionEnd = updatedColSectionEnd;

			if (updatedRowSectionStart <= 0) {
				finalRowSectionStart = 0;
				finalRowSectionEnd = 0 + limitRowNum;
			}

			if (updatedColSectionStart <= 0) {
				finalColSectionStart = 0;
				finalColSectionEnd = 0 + limitColNum;
			}

			if(updatedRowSectionEnd > rowLen) {
				finalRowSectionEnd = rowLen;
				finalRowSectionStart = rowLen - limitRowNum;
			}

			if (updatedColSectionEnd > colLen) {
				finalColSectionEnd = colLen;
				finalColSectionStart = colLen - limitColNum;
			}

			let newState = {
					row: [finalRowSectionStart, finalRowSectionEnd],
					col: [finalColSectionStart, finalColSectionEnd]
				};
			return newState;
		default:
			return state;
	}
}

export function connections(state = [], action) {
	switch (action.type) {
		default:
			return state;
	}
}

export function scene(state = [], action) {
	switch (action.type) {
		default:
			return state;
	}
}

export function currentScene(state = '', action) {
	switch (action.type) {
		default:
			return state;
	}
}

export function matrixName(state = [], action) {
	switch (action.type) {
		default:
			return state;
	}
}

export function currentMatrixName(state = '', action) {
	switch (action.type) {
		default:
			return state;
	}
}

export function coordinate(state = { startX: 0, startY: 0, lastX: 0, lastY: 0 }, action) {
	switch (action.type) {
		case 'setCoordinate':
			let newState = {
				...state,
				...action.coordinate
			};
			return newState;
		default:
			return state;
	}
}

export function logs(logs = [], action) {
	let {log} = action;
	switch (action.type) {
        case ADD_LOG:
            return {
                ...logs,
                log
            };
        default:
            return logs;
	}
}