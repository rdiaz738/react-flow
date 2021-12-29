import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';

export default memo(({ data, isConnectable }) => {
    console.log(data)
    const node = data
return (
<>
    <Handle
        type="target"
        position="left"
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
        />
    <input
    className="react-flow__node-input"
    onChange={(e)=>data.onChange(e, node, "label")}
    defaultValue={data.label}
    />
    <Handle
    type="source"
    position="right"
    isConnectable={isConnectable}
    />
</>
);
});