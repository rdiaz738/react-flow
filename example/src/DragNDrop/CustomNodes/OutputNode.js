import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';

export default memo(({ data, isConnectable }) => {
    console.log(data)
return (
<>
    <Handle
        type="target"
        position="top"
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
        />
    <input
    className="react-flow__node-output"
    onChange={data.onChange}
    defaultValue={data.label}
    />
</>
);
});