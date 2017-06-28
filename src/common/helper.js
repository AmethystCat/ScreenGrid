export const getNewConnections = (originConnections = [], requestConnectionObj = {}) => {
    let req_inPortId = requestConnectionObj.inPortId,
        req_outPortId = requestConnectionObj.outPortId;
    let newConnections = originConnections.slice(0);

    // 过滤是否含有相同的坐标
    let filterConnections = originConnections.filter((connect) => {
        return (connect.inMatrixPort === req_inPortId && connect.outMatrixPort === req_outPortId);
    });
    // 如果含有相同的坐标（filterConnections.length > 0），表示要将该方块点灭，将该坐标从原数组中移除
    if (filterConnections.length) {
        newConnections = originConnections.filter((connect) => {
            return !(connect.inMatrixPort === filterConnections[0].inMatrixPort && connect.outMatrixPort === filterConnections[0].outMatrixPort);
        });
        return newConnections;
    };
    // 反之，如果filterConnections.length == 0， 表示该方块为点亮，要存进原数组并返回
    newConnections.push({inMatrixPort: req_inPortId, outMatrixPort: req_outPortId});

    return newConnections;
};

export const refreshMatrix = async (promises) => {
    for (let promise of promises) {
        await promise;
    }
};

export const sceneFilter = (sceneList = [], cacheSceneIds = []) => {
    if (!sceneList.length || !cacheSceneIds.length) return sceneList;
    let newSceneList = cacheSceneIds.map((id) => {
        return sceneList.filter((scene) => {
            return id === scene.id;
        })[0];
    });
    return newSceneList;
};