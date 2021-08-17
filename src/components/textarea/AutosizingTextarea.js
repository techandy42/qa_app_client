import React, { useEffect, useRef } from 'react'
import autosize from 'autosize'

export default function AutosizingTextarea({ labelName, fieldName, type, value, handleChange }) {
  const textareaRef = useRef(null)

  useEffect(() => {
    autosize(textareaRef.current)
  }, [])

  return (
    <div>
      <label htmlFor={fieldName}>{labelName}</label>
      <textarea ref={textareaRef} id={fieldName} name={fieldName} type={type} value={value} onChange={handleChange} />
    </div>
  )
}
