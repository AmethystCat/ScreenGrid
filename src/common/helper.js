export const getNewConnections = (originConnections = [], requestConnectionObj = {}) => {
    let req_inPortId = requestConnectionObj.inPortId,
        req_outPortId = requestConnectionObj.outPortId;

    let filterConnections = originConnections.filter((connect) => {
        return (connect.inPortId === req_inPortId && connect.outPortId === req_outPortId);
    });

    if (originConnections.length > filterConnections.length) return filterConnections;
    let newConnections = originConnections.push({inPortId: req_inPortId, outPortId: req_outPortId});
    return newConnections;
};

export const refreshMatrix = async (promises) => {
    for (let promise of promises) {
        await promise;
    }
};