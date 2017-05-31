import {ADD_LOG} from '../action/action-types';

export function matrixInput(state = [], action) {
	switch (action.type) {
		default:
			return state;
	}
}

export function matrixOutput(state = [], action) {
	switch (action.type) {
		default:
			return state;
	}
}

export function InputShow(state = [], action) {
	switch (action.type) {
		default:
			return state;
	}
}

export function OutputShow(state = [], action) {
	switch (action.type) {
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

export function limitRow(state = [], action) {
	switch (action.type) {
		default:
			return state;
	}
}

export function limitCol(state = [], action) {
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

export function coordinate(state = {
		startX: 0,
	    startY: 0,
	    lastX: 0,
	    lastY: 0
	}, action) {
	switch (action.type) {
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