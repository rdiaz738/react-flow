import React, { useState, useEffect } from 'react'
import { Handle, useUpdateNodeInternals } from 'react-flow-renderer'

const OutputNode = ({ data, id, type }) => {
    const [formData, setFormData] = useState({})
    const updateNodeInternals = useUpdateNodeInternals()

    useEffect(() => {
        if (data.internal.name === 'Output Node') {
        data.formData = formData
        updateNodeInternals(id)
        }
    }, [formData])
if(data.internal.name === 'Output Node'){
    return (
        <div>
        <Handle
            type="target"
            position="top"
            onConnect={(params) => console.log('handle onConnect', params)}
            isConnectable            
            />
        <input
            defaultValue={data.internal.name}
            className="react-flow__node-output"
            onChange={(e) => setFormData((prevState) => ({ ...prevState, message: e.target.value }))}
        />
        </div>
    )
}
else{ return (null)}


}
export default OutputNode