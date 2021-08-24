import React from 'react'

export default function AnswerSections({ answer }) {
  return (
    <div className="container-answer">
      {answer.sections.map((section) => {
        return (
          <>
            {section.isImageUrl ? (
              <>
                <img className="picture" src={section.content} alt="image not found" />
              </>
            ) : (
              <>
                <p className="paragraph">{section.content}</p>
              </>
            )}
          </>
        )
      })}
    </div>
  )
}
