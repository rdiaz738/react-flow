import React, { useState, DragEvent, MouseEvent } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  OnLoadParams,
  Elements,
  Connection,
  Edge,
  ElementId,
  FlowElement,
  Node,
} from 'react-flow-renderer';

import Sidebar from './Sidebar';
import FunctionNode from './ColorSelectorNode'
import './dnd.css';
import { select } from 'd3-selection';
import NodeDetails from './NodeDetails';
const initialElements = [{ id: '1', type: 'input', data: { label: 'input node' }, position: { x: 250, y: 5 } }];
const nodeTypes = {
  selectorNode: FunctionNode,
};

const onDragOver = (event: DragEvent) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
};

let id = 0;
const getId = (): ElementId => `dndnode_${id++}`;

const DnDFlow = () => {
  const [reactFlowInstance, setReactFlowInstance] = useState<OnLoadParams>();
  const [elements, setElements] = useState<Elements>(initialElements);
  const [selectedElement, setSelectedElement] = useState<FlowElement>()
  const [show, setShow] = useState(false)
  const onConnect = (params: Connection | Edge) => setElements((els) => addEdge(params, els));
  const onElementsRemove = (elementsToRemove: Elements) => setElements((els) => removeElements(elementsToRemove, els));
  const onLoad = (_reactFlowInstance: OnLoadParams) => setReactFlowInstance(_reactFlowInstance);
  const onElementClick = (_: MouseEvent, element: FlowElement) => {
    setSelectedElement(element)
    setShow(true)
  }

  const onDrop = (event: DragEvent) => {
    event.preventDefault();

    if (reactFlowInstance) {
      const type = event.dataTransfer.getData('application/reactflow');
      const position = reactFlowInstance.project({ x: event.clientX, y: event.clientY - 40 });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setElements((es) => es.concat(newNode));
    }
  };

  return (
    <div className="dndflow">
      <ReactFlowProvider>
      <Sidebar />
        <div className="reactflow-wrapper">
          <ReactFlow
            elements={elements}
            onConnect={onConnect}
            onElementClick={onElementClick}
            onElementsRemove={onElementsRemove}
            nodeTypes={nodeTypes}
            onLoad={onLoad}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onPaneClick={() =>
              setShow(false)
            }
          >
            <Controls />
          </ReactFlow>
        </div>
        {show?
        <NodeDetails selected={selectedElement} />
      :null}
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
