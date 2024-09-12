import React from 'react';
import Addbtn from './Button/Addbtn';
import Deletebtn from "./Button/Deletebtn"


const TabContent = ({ pillar }) => {
  const parseQuestionText = (text, inputFields, questionId) => {
    const textParts = text.split(/(<[^>]+>)/g).map((part, index) => {
      const matchedField = inputFields.find(
        (field) => `<${field.inputId}>` === part
      );
      if (matchedField) {
        const { inputId, inputType, options } = matchedField;
        if (inputType === 'number') {
          return (
            <input
              key={`${questionId}-${inputId}-${index}`}
              className="font-semibold text-center mx-1 w-[60px]  border-0 border-b-[1.5px] border-dotted rounded-none border-gray-500"
            />
          );
        } else if (inputType === 'dropdown') {
          return (
            <select
              key={`${questionId}-${inputId}-${index}`}
              className="font-semibold text-center w-[150px] h-[28px] border-0 border-b-[1.5px] border-dotted rounded-none border-gray-500"
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          );
        }
      } else {
        return part;
      }
    });
    return <span>{textParts}</span>;
  };

  const generateTabContent = (pillar) => {
    return pillar.questions.map((question, index) => (
      <div key={index} className="ml-10 mb-3 mt-3 flex">
        <div className="question-container flex-1 mt-3 mb-3 mr-15">
          <div className="question-text">
            {parseQuestionText(
              question.text,
              question.inputFields,
              question.inputId
            )}
          </div>
        </div>
        <div className="input-container mr-[15px]">
          <Addbtn />
          <Deletebtn />
        </div>
      </div>
    ));
  };

  return <>{generateTabContent(pillar)}</>;
};

export default TabContent;
