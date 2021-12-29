import React, { useState, useRef, useContext, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
} from 'react-flow-renderer';

import Sidebar from './Sidebar';

import './dnd.css';
import InputNode from './CustomNodes/InputNode';
import OutputNode from './CustomNodes/OutputNode';
import FlowContext from './FlowContext';


const nodeTypes = {
  Input_Node: InputNode,
  Output_Node: OutputNode
};


let id = 0;
const getId = () => `${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const flowContext = useContext(FlowContext)

  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState([]);

  
  const onConnect = (params) => setElements((els) => addEdge(params, els));
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onLoad = (_reactFlowInstance) =>
    setReactFlowInstance(_reactFlowInstance);

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onChange = (event, data, field) =>{
    console.log(event.target.value, data, field)
    console.log(elements)
  }

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    const newNodeId = getId();
    const newNode = {
      id: newNodeId,
      type,
      position,
      data: {
        id:newNodeId,
        type,
        onChange:onChange,
        label: `${type}` },
    };

    setElements((es) => es.concat(newNode));
  };
  useEffect(() => {
    setElements(elements);
  }, [elements, setElements]);
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