import React, { useState, useEffect } from 'react'
import { Handle, useUpdateNodeInternals } from 'react-flow-renderer'

const ActionNode = ({ data, id, type }) => {
    const [formData, setFormData] = useState({})
    const updateNodeInternals = useUpdateNodeInternals()

    useEffect(() => {
        if (data.internal.name === 'Send Text') {
        data.formData = formData
        updateNodeInternals(id)
        }
    }, [formData])
if(data.internal.name === 'Send Text'){
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
export default ActionNode