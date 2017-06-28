export const getNewConnections = (originConnections = [], requestConnectionObj = {}) => {
    let req_inId = requestConnectionObj.inPortId,
        req_outId = requestConnectionObj.outPortId;
    let newConnections = originConnections.slice(0);

    let status = {
            col: false,
            row: false
        };

    originConnections.forEach((connect) => {
        if (!status.col) {
            status.col = connect.outMatrixPort === req_outId;
            status.row = connect.inMatrixPort === req_inId;
        }
    });
    console.log(status);
    let isSameCol = status.col;
    let isSameRow = status.row;
    // 不同列
    if (!isSameCol) {
        newConnections.push({outMatrixPort: requestConnectionObj.outPortId, inMatrixPort: requestConnectionObj.inPortId});
    }
    // 同列不同行
    if (isSameCol) {
        if (!isSameRow) {
            newConnections = newConnections.map((connect) => {
                if (connect.outMatrixPort === req_outId) {
                    connect.inMatrixPort = req_inId;
                }
                return connect;
            });
        }
    }
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