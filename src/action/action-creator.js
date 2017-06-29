import axios from 'axios';
import {audio} from '../common/url-config';
import {getNewConnections, sceneFilter, responseExceptionFilter} from '../common/helper';

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
        return axios.get(audio.sceneListUrl)
            .then(response => responseExceptionFilter(response).data)
            .then(res => {
                if (!res.success) {
                    dispatch(showLoading(false));
                    throw '场景数据获取失败';
                }
                return res.data;
            })
            .then(sceneList => {
                if (sceneList.length) {
                    let cachedLoginInfo = window.localStorage.getItem('loginInfo');
                    let cacheSceneIds = JSON.parse(cachedLoginInfo ? cachedLoginInfo : '{}')['sceneIdSet'] || [];
                    let newSceneList = sceneFilter(sceneList, cacheSceneIds);
                    dispatch(setSceneList(newSceneList));
                    return newSceneList;
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
        return axios.get(audio.getListBySceneUrl, {
            params: {
                sceneId: currSceneId
            }
        })
            .then(response => response.data)
            .then(res => {
                if (!res.success) {
                    layerAlert(res.error);
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
    return axios.get(audio.getListBySceneAndTypeUrl, {
        params: {
            portTypeCode: 'input',
            audioMatrixId: getState().currentMatrixName.id,
            sceneId: getState().currentScene.id
        }
    });
};

const getMatrixOutputData = (getState) => {
    return axios.get(audio.getListBySceneAndTypeUrl, {
        params: {
            portTypeCode: 'output',
            audioMatrixId: getState().currentMatrixName.id,
            sceneId: getState().currentScene.id
        }
    });
};

const getMatrixInputAndOutputData = () => {
    return (dispatch, getState) => {
        return axios.all([getMatrixInputData(getState), getMatrixOutputData(getState)])
            .then(data => {
                return {
                    matrixInput: responseExceptionFilter(data[0].data).data,
                    matrixOutput: responseExceptionFilter(data[1].data).data
                };
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
        return axios.get(audio.get15MatrixLogsUrl, {
            params: {
                matrix: getState().currentMatrixName.id,
                sceneId: getState().currentScene.id,
                module: 'AUDIOMATRIXOPERATION'
            }
        })
            .then(response => responseExceptionFilter(response))
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
        return dispatch(getMatrixByScene(getState().currentScene.id))
            .then(matrixs => {
                if (matrixs.length) {
                    dispatch(setCurrentMatrix(matrixs[0]));
                }
            })
            .then(() => {
                return dispatch(getMatrixInputAndOutputData());
            })
            .then(data => {
                dispatch(setMatrixOriginData(data));
            })
            .then(() => {
                dispatch(initMatrixShown({
                    originData: getState().matrixOriginData,
                    section: getState().matrixSection
                }));
            })
            .then(() => dispatch(getConnections()))
            .then(() => dispatch(getLogs()));
    };
};

const changeMatrix = (currentMatrixId) => {
    return (dispatch, getState) => {
        let newCurrentMatrix = getState().matrixName.filter((matrix) => {
            return matrix.id === currentMatrixId;
        });
        dispatch(setCurrentMatrix(newCurrentMatrix[0]));
        return dispatch(getMatrixInputAndOutputData())
            .then(data => {
                dispatch(setMatrixOriginData(data));
            })
            .then(() => {
                dispatch(initMatrixShown({
                    originData: getState().matrixOriginData,
                    section: getState().matrixSection
                }));
            })
            .then(() => dispatch(getConnections()))
            .then(() => dispatch(getLogs()));
    };
};

const getConnections = () => {
    return (dispatch, getState) => {
        return axios.get(audio.connectionsUrl, {
            params: {
                audioMatrixId: getState().currentMatrixName.id
            }
        })
            .then(response => responseExceptionFilter(response))
            .then(res => {
                dispatch(setConnections(res.data.data));
            });
    };
};

const setConnections = (connections) => {
    return {
        type: 'setConnections',
        connections
    };
};

const setInToOutConnect = (connectObj) => {
    return (dispatch, getState) => {
        return axios.get(audio.inToOutConnectUrl, {
        	params: {
        		audioMatrixId: connectObj.audioMatrixId,
        		inPortId: connectObj.inPortId,
        		outPortId: connectObj.outPortId,
                mode: 'POINT'
        	}
        })
        .then(res => {
            if (res.data.success) {
                let connections = getState().connections;
                let newConnections = getNewConnections(connections, connectObj);
                dispatch(setConnections(newConnections));
            } else {
                layerAlert(res.data.error);
            }
        });
    };
};

const setInToOutDisconnect = (connectObj) => {
    return (dispatch, getState) => {
        return axios.get(audio.inToOutDisconnectUrl, {
            params: {
                audioMatrixId: connectObj.audioMatrixId,
                inPortId: connectObj.inPortId,
                outPortId: connectObj.outPortId,
                mode: 'POINT'
            }
        })
            .then(res => {
                if (res.data.success) {
                    let connections = getState().connections;
                    let newConnections = getNewConnections(connections, connectObj);
                    dispatch(setConnections(newConnections));
                } else {
                    layerAlert(res.data.error);
                }
            });
    };
};

const getConnectionByOut = (audioMatrixId, outPortId, connections) => {
    return (dispatch) => {
        return axios.get(audio.connectionByOutUrl, {
                params: {
                    audioMatrixId,
                    outPortId
                }
            })
            .then(res => {
                if (res.data.success) {
                    let currentPort = {
                            inMatrixPort: res.data.data,
                            outMatrixPort: outPortId
                        };
                    let newConnections = connections.push(currentPort);
                    dispatch(setConnections(newConnections));
                } else {
                    layerAlert(res.data.error);
                }
            });
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

const setMute = ({audioMatrixId, portId, mute, portType, isVirtual}) => {
    console.log({audioMatrixId, portId, mute, portType, isVirtual});
    return (dispatch, getState) => {
        dispatch(showLoading(true));
        return axios.get(audio.changeMuteUrl, {
            params: {
                audioMatrixId,
                portId,
                mute
            }
        })
        .then(res => {
            if (res.data.success) {
                let currentMatrixId = getState().currentMatrixName.id;
                return dispatch(changeMatrix(currentMatrixId));
                // 更改静音状态成功后更新矩阵数据的状态，要分虚拟矩阵和实体矩阵两种状态
                // portType: matrixInput / matrixOutput
                // let matrixOriginDataCopy = getState().matrixOriginData;
                // let newData = matrixOriginDataCopy[portType].map((el) => {
                //     if (isVirtual) {
                //         if (el.solidPort.id === portId) {
                //             el.solidPort.mute = mute;
                //         }
                //     } else if (el.id === portId) {
                //         el.mute = mute;
                //     }
                //     return el;
                // });
                // matrixOriginDataCopy[portType] = newData;
                // return dispatch(setMatrixOriginData(matrixOriginDataCopy));
            } else {
                layerAlert(res.data.error);
            }
        })
        .then(() => {
            dispatch(showLoading(false));
        });
    };
};

const setVolume = ({portId, volume, portType, isVirtual}) => {
    return (dispatch, getState) => {
        let matrixOriginDataCopy = getState().matrixOriginData;
        matrixOriginDataCopy[portType] = matrixOriginDataCopy[portType].map((el) => {
            if (isVirtual) {
                if (el['solidPort'].id === portId) {
                    el['solidPort'].volume = volume;
                }
            } else if (el.id === portId) {
                el.volume = volume;
            }
            return el;
        });
        dispatch(setMatrixOriginData(matrixOriginDataCopy));
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
    setConnections,
    setInToOutConnect,
    setInToOutDisconnect,
    getConnectionByOut,
    setMute,
    setVolume
};