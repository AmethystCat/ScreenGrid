import {ADD_LOG} from '../action/action-types';
const initMatrixShown = (matrixObj) => {
	return {
		type: 'init',
		matrixObj
	};
};

const addLog = (log) => {
	return {
		type: ADD_LOG,
		log
	};
};

const setCoordinate = (coordinate) => {
	return {
		type: 'setCoordinate',
		coordinate
	};
};

const setSection = (givenSection, matrixOriginData) => {
	return {
		type: 'setSection',
		givenSection,
		matrixOriginData
	};
};

const showLayer = (show = false) => {
	return {
		type: 'showLayer',
		show
	};
};

const showLoading = (show = true) => {
	return {
		type: 'showLoading',
		show
	};
};
export default {initMatrixShown, addLog, setCoordinate, setSection, showLayer, showLoading};