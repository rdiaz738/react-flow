import React, { useState, useEffect } from 'react'
import { Handle, useUpdateNodeInternals } from 'react-flow-renderer'

const InputNode = ({ data, id, type }) => {
    const [formData, setFormData] = useState({})
    const updateNodeInternals = useUpdateNodeInternals()

    useEffect(() => {
        if (data.internal.name === 'Input Node') {
        data.formData = formData
        updateNodeInternals(id)
        }
    }, [formData])
if(data.internal.name === 'Input Node'){
    console.log(data)
    return (
        <div>
        <Handle
            type="target"
            position="left"
            onConnect={(params) => console.log('handle onConnect', params)}
            isConnectable            
            />
        <input
        className="react-flow__node-input"
        defaultValue={data.internal.name}
        onChange={(e) => setFormData((prevState) => ({ ...prevState, message: e.target.value }))}
        />
        <Handle
        type="source"
        position="right"
        isConnectable
        />
        </div>
    )
}
else{ return (null)}


}
export default InputNode