import React from 'react';

export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <div className="react-flow__node-input" onDragStart={(event) => onDragStart(event, 'Input_Node')} draggable>
        Input Node
      </div>
      <div className="react-flow__node-default"onDragStart={(event) => onDragStart(event, 'default')} draggable>
        Default Node
      </div>
      <div className="react-flow__node-output" onDragStart={(event) => onDragStart(event, 'Output_Node')} draggable>
        Output Node
      </div>
    </aside>
  );
};