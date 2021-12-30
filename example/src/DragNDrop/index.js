import React, { useState, useRef, useContext, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
} from 'react-flow-renderer';

import Sidebar from './Sidebar';

import './dnd.css';
import ActionNode from './CustomNodes/ActionNode';
import OutputNode from './CustomNodes/OutputNode';
import FlowContext from './FlowContext';


const nodeTypes = {
  actionNode: ActionNode,
  Output_Node: OutputNode
};


const onDragOver = (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
};

let id = 1;
const getId = () => `node_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const flowContext = useContext(FlowContext)

  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState([]);

  
  const onConnect = (params) => {
    const sourceHandleUsed = elements.find(
      (elem) => elem.sourceHandle === params.sourceHandle
    );

    if (!sourceHandleUsed /* && !targetHandleUsed*/) {
      setElements((els) => addEdge(params, els));
    }
  };

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onLoad = (_reactFlowInstance) =>
    setReactFlowInstance(_reactFlowInstance);

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (event) => {
    event.preventDefault();
    if (reactFlowInstance) {
      const node = JSON.parse(
        event.dataTransfer.getData("application/reactflow")
      );
      const { type, name } = node;
      const position = reactFlowInstance.project({
        x: event.clientX,
        y: event.clientY - 40
      });
      const newNodeId = getId();
      const newNode = {
        id: newNodeId,
        type,
        name,
        position,
        data: {
          internal: { onDelete: onElementsRemove, name: `${name}` },
          action_type: name.replace(/\s+/g, "_").toLowerCase()
        }
      };

      setElements((es) => es.concat(newNode));
    }
  };
console.log(elements)
    return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            elements={elements}
            nodeTypes={nodeTypes}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            onDrop={onDrop}
            onDragOver={onDragOver}
          >
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;