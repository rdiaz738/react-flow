import React, { memo, FC, CSSProperties } from 'react';
import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';
import Node, { contentStyle as style } from './NodeStyles';

const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

const FunctionNode: FC<NodeProps> = ({ data, selected }) => {
return (
    <Node
    label={data.label?data.label:"Some Function"}
    selected={selected}
    color={"Lavender"}
    content={
        <>
        <div style={style.contentHeader}>{"Inputs"}</div>
        {data.hasOwnProperty("inputs")?
        data.inputs.map((input: { label: {} | null | undefined; type: string; }) => (
            <div
            key={"i-" + input.label}
            style={{ ...style.io, ...style.textLeft } as React.CSSProperties}
            >
            {input.label}
            <Handle
                type="target"
                position={Position.Left} 
                id={"i-" + input.label + "__" + input.type}
                onConnect={onConnect}
                style={{ ...style.handle, ...style.left }}
            />
            </div>
        ))
        :null}
        <div style={style.contentHeader}>{"Outputs"}</div>
        {data.hasOwnProperty('outputs')?
        data.outputs.map((output: { label: {} | null | undefined; type: string; }) => (
            <div
            key={"o-" + output.label}
            style={{ ...style.io, ...style.textRight } as React.CSSProperties}
            >
            {output.label}
            <Handle
                type="source"
                position={Position.Right} 
                onConnect={onConnect}
                id={"o-" + output.label + "__" + output.type}
                style={{ ...style.handle, ...style.right }}
   
            />
            </div>
        )):null}
        </>
    }
    />
);
};

export default memo(FunctionNode);
