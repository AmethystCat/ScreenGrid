export function name(state = '', action) {
	console.log('reducer add_name: ', action);
	switch (action.type) {
		case 'ADD_NAME':
			return action.name;
		default:
			return state;
	}
}

export function list(state = [], action) {
	console.log('reducer add_list: ', action);
	switch (action.type) {
		case 'ADD_LIST':
			return state.concat(action.list);
		default: 
			return state;
	}
}

export function attr(state = {}, action) {
	let {attr} = action;
	console.log('reducer add_attr: ', action);
	switch (action.type) {
		case 'ADD_ATTR':
			return {
				...state,
				attr
			};
		default:
			return state;
	}
}