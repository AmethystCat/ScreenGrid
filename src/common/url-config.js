let video = {
		sceneListUrl: '/icmc/systemManage/scene/sceneList',
		getListBySceneUrl: '/icmc/systemManage/videoMatrix/getListByScene',
		getListBySceneAndTypeUrl: '/icmc/systemManage/videoMatrixPort/getListBySceneAndType',
		connectionsUrl: '/icmc/operation/videoMatrixOperation/connections',
		inToOutConnectUrl: '/icmc/operation/videoMatrixOperation/inToOutConnect',
		connectionByOutUrl: '/icmc/operation/videoMatrixOperation/connectionByOut',
		get15MatrixLogsUrl: '/icmc/internal/matrixLog/get15MatrixLogs'
	};
let audio = {
	sceneListUrl: '/icmc/systemManage/scene/sceneList',
	getListBySceneUrl: '/icmc/systemManage/audioMatrix/getListByScene',
	getListBySceneAndTypeUrl: '/icmc/systemManage/audioMatrixPort/getListBySceneAndType',
	connectionsUrl: '/icmc/operation/audioMatrixOperation/connections',
	inToOutConnectUrl: '/icmc/operation/audioMatrixOperation/inToOutConnect',
	nToOutDisconnectUrl: '/icmc/operation/audioMatrixOperation/inToOutDisconnect',
	changeMuteUrl: '/icmc/operation/videoMatrixOperation/changeMute',
	changeVolumeUrl: '/icmc/operation/videoMatrixOperation/changeVolume',
	connectionByOutUrl: '/icmc/operation/audioMatrixOperation/connectionByOut',
	get15MatrixLogsUrl: '/icmc/internal/matrixLog/get15MatrixLogs'
};
export { video , audio };