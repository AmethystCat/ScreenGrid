import {ADD_ATTR, ADD_LIST, ADD_LOG, ADD_NAME} from '../action/action-types';
const add_name = (name) => {
	return {
		type: ADD_NAME,
		name
	};
};

const add_list = (item) => {
	return {
		type: ADD_LIST,
		item
	};
};

const add_attr = (attr) => {
	return {
		type: ADD_ATTR,
		attr
	};
};

const add_log = (log) => {
	return {
		type: ADD_LOG,
		log
	};
};

export default {add_name, add_list, add_attr, add_log};