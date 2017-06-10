import axios from 'axios';
import {video} from '../common/url-config';

const initMatrixShown = (matrixObj) => {
	return {
		type: 'init',
		matrixObj
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

const getSceneList = () => {
	return (dispatch) => {
		return axios.get(video.sceneListUrl)
			.then(response => response.data)
			.then(res=>{
				if (!res.success) {
					dispatch(showLoading(false));
					throw '场景数据获取失败';
				}
				return res.data;
			})
			.then(data => {
				if (data.length) {
					dispatch(setSceneList(data));
					return data;
				}
			});
	};
};

const setSceneList = (scenes) => {
	return {
		type: 'setSceneList',
		scenes
	};
};

const setCurrentScene = (currentScene) => {
	return {
		type: 'setCurrentScene',
		currentScene
	};
};

const getMatrixByScene = (currSceneId) => {
	return (dispatch) => {
		return axios.get(video.getListBySceneUrl, {
			params: {
				sceneId: currSceneId
			}
		})
		.then(response => response.data)
		.then(res=>{
			if (!res.success) {
				throw '矩阵数据获取失败';
			}
			return res.data;
		})
		.then(data => {
			dispatch(setMatrixList(data));
			return data;
		});
	};
};

const setMatrixList = (matrixs) => {
	return {
		type: 'setMatrixList',
		matrixs
	};
};

const setCurrentMatrix = (currMatrix) => {
	return {
		type: 'setCurrentMatrix',
		currMatrix
	};
};

const getMatrixInputData = (getState) => {
	return axios.get(video.getListBySceneAndTypeUrl, {
			params: {
				portTypeCode: 'input',
				videoMatrixId: getState().currentMatrixName.id,
				sceneId: getState().currentScene.id
			}
		});
};

const getMatrixOutputData = (getState) => {
	return axios.get(video.getListBySceneAndTypeUrl, {
			params: {
				portTypeCode: 'output',
				videoMatrixId: getState().currentMatrixName.id,
				sceneId: getState().currentScene.id
			}
		});
};

const getMatrixInputAndOutputData = () => {
	return (dispatch, getState) => {
		return axios.all([getMatrixInputData(getState), getMatrixOutputData(getState)])
			.then(data => {
				console.log(data);
				let matrixOriginData = {
					matrixInput: data[0].data.data,
					matrixOutput: data[1].data.data
				};
				return matrixOriginData;
			});
	};
};

const setMatrixOriginData = (matrixOriginData) => {
	return {
		type: 'setMatrixOriginData',
		matrixOriginData
	};
};

const getLogs = () => {
	return (dispatch, getState) => {
		return axios.get(video.get15MatrixLogsUrl, {
			params: {
				matrix: getState().currentMatrixName.id,
				sceneId: getState().currentScene.id,
				module: 'VIDEOMATRIXOPERATION'
			}
		})
		.then(res => {
			dispatch(setLogs(res.data.data));
		});
	};
};

const setLogs = (logs) => {
	return {
		type: 'setLogs',
		logs
	};
};

const changeScene = (currentSceneId) => {
	return (dispatch, getState) => {
		dispatch(setCurrentScene({id: currentSceneId}));
		return dispatch(getMatrixByScene( getState().currentScene.id) )
			.then(matrixs => {
				if (matrixs.length) {
					dispatch(setCurrentMatrix(matrixs[0]));
				}
			})
			.then( () => {return dispatch(getMatrixInputAndOutputData());} )
			.then(data => {dispatch(setMatrixOriginData(data));})
			.then(() => {
				dispatch(initMatrixShown({
					originData: getState().matrixOriginData,
					section: getState().matrixSection
				}));
			})
			.then( () => dispatch(getConnections()) )
			.then( () => dispatch(getLogs()) );
	};
};

const changeMatrix = (currentMatrixId) => {
	return (dispatch, getState) => {
		dispatch(setCurrentMatrix({id: currentMatrixId}));
		return dispatch( getMatrixInputAndOutputData() )
			.then(data => {dispatch(setMatrixOriginData(data));})
			.then(() => {
				dispatch(initMatrixShown({
					originData: getState().matrixOriginData,
					section: getState().matrixSection
				}));
			})
			.then( () => dispatch(getConnections()) )
			.then( () => dispatch(getLogs()) );
	};
};

const getConnections = () => {
	return (dispatch, getState) => {
		return axios.get(video.connectionsUrl, {
			params: {
				videoMatrixId: getState().currentMatrixName.id
			}
		})
		.then(res => {dispatch(setConnections(res.data.data));});
	};
};

const setConnections = (connections) => {
	return {
		type: 'setConnections',
		connections
	};
};

const initRequest = () => {
	return (dispatch) => {
		dispatch(showLoading(true));
		return dispatch(getSceneList())
			.then(scenes => {
				dispatch(setSceneList(scenes));
				return scenes;
			})
			.then(scenes => {
				if (scenes.length) {
					let currentScene = scenes[0];
					return dispatch(changeScene(currentScene.id));
				}
			})
			.then(() => dispatch(showLoading(false)));
	};
};

export default {
	initRequest, 
	initMatrixShown, 
	getMatrixInputAndOutputData, 
	setMatrixOriginData,
	setCoordinate, 
	setSection, 
	showLayer, 
	showLoading, 
	getSceneList,
	getLogs,
	changeScene,
	changeMatrix,
	getConnections,
	setConnections
};