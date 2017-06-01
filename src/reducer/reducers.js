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
				rowSection = state.row,
				colSection = state.col;
			let updatedRowSectionStart = (rowSection[0] + givenSection.row),
				updatedRowSectionEnd = (rowSection[1] + givenSection.row),
				updatedColSectionStart = (colSection[0] + givenSection.col),
				updatedColSectionEnd = (colSection[1] + givenSection.col);

			let finalRowSectionStart = (updatedRowSectionStart > 0) && updatedRowSectionStart || 0;

			let finalRowSectionEnd = (updatedRowSectionEnd > 0) && updatedRowSectionEnd || rowSection[1];

			let finalColSectionStart = (updatedColSectionStart > 0) && updatedColSectionStart || 0;

			let finalColSectionEnd = (updatedColSectionEnd > 0) && updatedColSectionEnd || colSection[1];

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