export const LoadNodeFunctions = (type, nodeClass) => {
    return nodeClass[`do${type}`];
};
