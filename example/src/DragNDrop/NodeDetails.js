import React from 'react';

export const NodeDetails = (props) =>{
    console.log(props)
    if(props.selected){
    return (
        <div className="updatenode__controls">
            <label>label:</label>
            <input value={props.selected.data.label}  />
        </div>
    );}
    else{return null}
}

export default NodeDetails