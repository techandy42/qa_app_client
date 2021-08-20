import React, { useEffect, useRef } from 'react'
import autosize from 'autosize'

export default function AutosizingTextarea({ labelName, fieldName, value, handleChange, isQuestionField, section }) {
  const textareaRef = useRef(null)

  useEffect(() => {
    autosize(textareaRef.current)
  }, [])

  return (
    <div>
      {isQuestionField ? (
        <>
          <label htmlFor={fieldName}>{labelName}</label>
          <textarea maxLength="1000" ref={textareaRef} id={fieldName} name={fieldName} value={value} onChange={handleChange} />
        </>
      ) : (
        <>
          <textarea maxLength="1000" ref={textareaRef} value={value} onChange={(e) => handleChange(e, section)} />
        </>
      )}
    </div>
  )
}
