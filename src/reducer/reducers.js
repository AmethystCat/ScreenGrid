import {ADD_ATTR, ADD_LIST, ADD_LOG, ADD_NAME} from '../action/action-types';

export function name(state = '', action) {
	switch (action.type) {
		case ADD_NAME:
			return action.name;
		default:
			return state;
	}
}

export function list(state = [], action) {
	switch (action.type) {
		case ADD_LIST:
			return state.concat(action.list);
		default: 
			return state;
	}
}

export function attr(state = {}, action) {
	let {attr} = action;
	switch (action.type) {
		case ADD_ATTR:
			return {
				...state,
				attr
			};
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