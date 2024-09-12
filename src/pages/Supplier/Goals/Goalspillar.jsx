import React, { useEffect, useState } from 'react';
import { Layout, Tabs, Modal, Input, Select, Button, notification } from 'antd';
import Resetbtn from '../../../components/common/Button/Resetbtn';
import Deletebtn from '../../../components/common/Button/Deletebtn';
import Addbtn from '../../../components/common/Button/Addbtn';
import "./Goals.css";
import { fetchData, saveGoals } from '../../../services/apiService';
import { useForm, Controller } from 'react-hook-form';

const { Content } = Layout;
const { confirm } = Modal;

const Goalspillar = () => {
  const [activeTabKey, setActiveTabKey] = useState(null);
  const [pillarData, setPillarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [errors, setErrors] = useState({}); // Track validation errors
  const { control, handleSubmit, getValues, reset, formState: { errors: formErrors } } = useForm();

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const result = await fetchData();
        setPillarData(result);
        const energyTab = result.find(pillar => pillar.pillarName === 'Energy');
        setActiveTabKey(energyTab ? energyTab.pillarName : result[0].pillarName);
      } catch (error) {
        console.error('Error fetching page content:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPageData();
  }, []);

  const validateQuestionFields = (questions) => {
    const newErrors = {};
    questions.forEach((question, index) => {
      if (question.inputFields) {
        question.inputFields.forEach((field) => {
          if (field.value === undefined || field.value === '') {
            if (!newErrors[index]) {
              newErrors[index] = {};
            }
            newErrors[index][field.inputId] = 'Required';
          }
        });
      }
    });
    return newErrors;
  };

  // const handleGoalsSave = () => {
  //   console.log(pillarData, "pillarData")
  //   setIsSaved(true);
  //   console.log('Save success');
  //   notification.success({
  //     message: 'Fields Saved',
  //     description: 'Your changes have been saved successfully.',
  //   });
  // };

  const handleNextClick = () => {
    if (isSaved) {
      confirm({
        title: 'Are you sure you want to move to the next page?',
        onOk() {
          const currentIndex = pillarData.findIndex(item => item.pillarName === activeTabKey);
          const nextIndex = (currentIndex + 1) % pillarData.length;
          setActiveTabKey(pillarData[nextIndex].pillarName); // Update to pillarName
          setIsSaved(false);
        },
      });
    } else {
      Modal.error({
        title: 'Save Required',
        content: 'Please save your changes before proceeding.',
      });
    }
  };

  const handleAddQuestion = (pillarId, questionIndex) => {
    const pillar = pillarData.find(pillar => pillar._id === pillarId);
    if (pillar) {
      const currentQuestions = pillar.questions;
      console.log(currentQuestions);
      const newErrors = validateQuestionFields(currentQuestions);
      console.log(Object.keys(newErrors).length > 0);

      if (Object.keys(newErrors).length > 0 && newErrors[questionIndex]) {
        setErrors(prevErrors => ({
          ...prevErrors,
          [pillarId]: {
            ...prevErrors[pillarId],
            [questionIndex]: newErrors[questionIndex]
          }
        }));
        return; // Prevent adding if there are validation errors
      }

      // Check if the current input fields are not empty
      const areAllFieldsFilled = () => {
        return currentQuestions.every((question, index) => {
          return question.inputFields.every(field => {
            const fieldValue = getValues(`field_${pillarId}_${index}_${field.inputId}`);
            return fieldValue && fieldValue.trim() !== '';
          });
        });
      };
      console.log(areAllFieldsFilled);
      if (!areAllFieldsFilled) {
        notification.error({
          message: 'Validation Error',
          description: 'Please fill out all required fields before adding a new question.',
        });
        return;
      }

      setPillarData(prevPillarData =>
        prevPillarData.map(pillar => {
          if (pillar._id === pillarId) {
            const newQuestions = [...pillar.questions];
            const newQuestion = { ...newQuestions[questionIndex] }; // Clone the question to add
            newQuestions.splice(questionIndex + 1, 0, newQuestion); // Add the new question
            return { ...pillar, questions: newQuestions };
          }
          return pillar;
        })
      );

      setErrors(prevErrors => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[pillarId]?.[questionIndex];
        return updatedErrors;
      }); // Clear errors if addition is successful
    }
  };

  const handleDeleteQuestion = (pillarId, questionIndex) => {
    console.log(`Pillar ID: ${pillarId}, Question Index: ${questionIndex}`);
    setPillarData(prevPillarData => {
      const newPillarData = prevPillarData?.map(pillar => {
        if (pillar?._id === pillarId) {
          const updatedQuestions = pillar?.questions?.map((question, index) => {
            if (index === questionIndex) {
              console.log(`Marking question ${question.questionId} as deleted.`);
              notification.error({
                message: 'Question Marked for Deletion',
                description: 'The question has been marked as deleted but remains in the list.',
              });
              return { ...question, deleted: true };
            }
            return question;
          });
          return { ...pillar, questions: updatedQuestions };
        }
        return pillar;
      });
      console.log('Updated pillar data:', newPillarData);
      return newPillarData;
    });
  };


  const handleInputChange = (pillarId, questionId, inputId, value) => {

    console.log(pillarId, questionId, inputId, value, "test")
    setPillarData(prevPillarData =>
      prevPillarData.map(pillar => {
        if (pillar._id === pillarId) {
          const newQuestions = pillar.questions.map(question => {
            if (question.questionId === questionId) {
              const newInputFields = question.inputFields.map(field => {
                if (field.inputId === inputId) {
                  return { ...field, value };
                }
                return field;
              });
              return { ...question, inputFields: newInputFields };
            }
            return question;
          });
          return { ...pillar, questions: newQuestions };
        }
        console.log(pillar, "pillar")
        return pillar;
      })
    );
  };


  const parseQuestionText = (text, inputFields, questionId, pillarId) => {
    const textParts = text.split(/(<[^>]+>)/g).map((part, index) => {
      const matchedField = inputFields.find(field => `<${field.inputId}>` === part);
      if (matchedField) {
        const { inputId, inputType, options } = matchedField;
        const errorMessage = errors[pillarId] && errors[pillarId][questionId] && errors[pillarId][questionId][inputId];

        if (inputType === 'number') {
          return (
            <>
              <Controller
                key={`${questionId}-${inputId}-${index}`}
                name={`field_${pillarId}_${questionId}_${inputId}`}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    className="font-semibold  text-center mx-1 w-[75px] text-[#014D4E] border-b-[1px] border-dashed border-[#014D4E] mb-[2px] "
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      handleInputChange(pillarId, questionId, inputId, e.target.value);
                    }}
                  />
                )}
              />
              {errorMessage && <div className="error-message" style={{ color: 'red' }}>{errorMessage}</div>}
            </>
          );
        } else if (inputType === 'dropdown') {
          return (
            <>
              <Controller
                name={`field_${pillarId}_${questionId}_${inputId}`}
                control={control}
                
                defaultValue=""
                render={({ field }) => (
                  <select
                    {...field}
                    value={field.value || ""} // Ensure empty string is handled
                    
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      handleInputChange(pillarId, questionId, inputId, e.target.value);
                    }}
                    className="font-semibold  text-center mx-1 w-[75px] text-[#014D4E] border-b-[1px] border-dashed border-[#014D4E] mb-[2px] "
                  >
                    <option value="" disabled hidden>
                    </option>
                    {options.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
              />

              {errorMessage && <div className="error-message" style={{ color: 'red' }}>{errorMessage}</div>}
            </>
          );
        }
      } else {
        return part;
      }
    });
    return <span>{textParts}</span>;
  };

  const generateTabContent = (pillar) => {
    return pillar.questions
      .filter(question => !question.deleted) // Filter out deleted questions
      .map((question, index) => (
        <div key={index} className="ml-10 mb-3 mt-3 flex">
          <div className="question-container flex-1 mt-3 mb-3 mr-15">
            <div className="question-text">
              {parseQuestionText(question.text, question.inputFields, question.questionId, pillar._id)}
            </div>
          </div>
          <div className="input-container mr-[15px] flex">
            <Addbtn onClick={() => handleAddQuestion(pillar._id, index)} />
            {/* {pillar.questions.length > 1 && !question.deleted && <Deletebtn onClick={() => handleDeleteQuestion(pillar._id, index)} />} */}
            {
              <Button
                onClick={() =>
                  handleDeleteQuestion(pillar._id, index)
                }
                disabled={pillar.questions.length <= 3 && !question.deleted
                }
                className="h-[27px] text-[#F22F23] bg-[rgba(242,47,35,0.3)] w-[65px] text-[10px] font-bold"
              >
                Delete
              </Button>
            }
          </div>
        </div>
      ));
  };

  const items = pillarData.map(pillar => ({
    key: pillar.pillarName,
    label: pillar.pillarName,
    children: generateTabContent(pillar),
  }));
  // const onSubmit = () => {
  //   const questionsToDelete = pillarData.flatMap(pillar =>
  //     pillar?.questions?.filter(question => question.deleted)
  //   );

  //   console.log('Questions marked for deletion:', questionsToDelete);

  //   if (questionsToDelete.length > 1) {
  //     // Perform actual deletion (e.g., API call)
  //     console.log('Deleting questions:', questionsToDelete);

  //     notification.error({
  //       message: 'Questions Deleted',
  //       description: 'Selected questions have been deleted.',
  //     });
  //   }

  //   // Clear the deleted flags
  //   setPillarData(prevPillarData => {
  //     const updatedPillarData = prevPillarData.map(pillar => ({
  //       ...pillar,
  //       questions: pillar.questions.filter(question => !question.deleted)
  //     }));

  //     console.log('Final pillar data after saving:', updatedPillarData);
  //     return updatedPillarData;
  //   });
  //   handleGoalsSave();
  // };
  const onSubmit = async () => {
    try {
      // Prepare the data
      const goals = {
        pillarData: pillarData.map(pillar => ({
          pillarName: pillar.pillarName,
          questions: pillar.questions.map(question => ({
            questionId: question.questionId,
            inputFields: question.inputFields.map(field => ({
              inputId: field.inputId,
              value: field.value,
            }))
          }))
        }))
      };
  
      // Call the API to save data
      const savedData = await saveGoals(goals);
      console.log('Saved Data:', savedData);
  
      // Notify user of success
      notification.success({
        message: 'Success',
        description: 'Goals have been saved successfully!',
      });
    } catch (error) {
      console.error('Error saving goals:', error);
  
      // Notify user of error
      notification.error({
        message: 'Error',
        description: 'There was an error saving the goals. Please try again.',
      });
    }
  };
  
  // const handleReset = () => {
  //   reset(); // Reset form fields
  //   setPillarData(prevPillarData =>
  //       prevPillarData.map(pillar => ({
  //           ...pillar,
  //           questions: pillar.questions.map(question => ({
  //               ...question,
  //               inputFields: question.inputFields.map(field => ({
  //                   ...field,
  //                   value: "" // Clear each field value
  //               }))
  //           }))
  //       }))
  //   ); // Reset pillarData to initial state
  //   setIsSaved(false); // Reset save status
  //   setErrors({}); // Clear validation errors
  //   notification.info({
  //         message: 'Form Reset',
  //         description: 'All fields have been reset.',
  //       });
  // };
  //   const handleReset = () => {
  //     reset(); // Reset form fields

  //     setPillarData(prevPillarData =>
  //         prevPillarData.map(pillar => ({
  //             ...pillar,
  //             questions: pillar.questions.map(question => ({
  //                 ...question,
  //                 inputFields: question.inputFields.map(field => ({
  //                     ...field,
  //                     value: field.inputType === 'dropdown' ? "" : "" // Reset dropdowns and other fields to empty string
  //                 }))
  //             }))
  //         }))
  //     );

  //     setIsSaved(false); // Reset save status
  //     setErrors({}); // Clear validation errors

  //     notification.info({
  //         message: 'Form Reset',
  //         description: 'All fields have been reset.',
  //     });
  // };
  const handleReset = () => {
    reset(); // Reset form fields managed by react-hook-form

    setPillarData(prevPillarData =>
      prevPillarData.map(pillar => ({
        ...pillar,
        questions: pillar.questions.map(question => ({
          ...question,
          inputFields: question.inputFields.map(field => ({
            ...field,
            value: field.inputType === 'dropdown' ? "" : "" // Reset both dropdowns and other fields to an empty string
          }))
        }))
      }))
    );

    setIsSaved(false); // Reset save status
    setErrors({}); // Clear validation errors

    notification.info({
      message: 'Form Reset',
      description: 'All fields have been reset.',
    });
  };

  return (
    <>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Content className="ml-[43px] bg-white mb-[17px] rounded-b-[20px] w-auto h-auto shadow-md">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Tabs
              activeKey={activeTabKey}
              items={items}
              onChange={key => setActiveTabKey(key)}
              tabBarStyle={{
                backgroundColor: '#014D4E',
                height: '45px',
                marginBottom: 0,
              }}
              className="custom-tabs"
              tabBarGutter={0}
            />
          )}
        </Content>
        <div className="w-auto flex justify-end gap-2.5">
          <Resetbtn onClick={handleReset} />

          <Button
            className="h-[30px] w-[87px] border-[#014D4E] text-[#014D4E] border-[1.5px] rounded-[10px] border-solid"
            onClick={handleNextClick}
          >
            Next
          </Button>
          <Button
            className="h-[30px] w-[87px] border-[#014D4E] text-[#014D4E] border-[1.5px] rounded-[10px] border-solid"
            htmlType="submit"
          >
            Save
          </Button>
        </div>
      </form>
    </>
  );
};

export default Goalspillar;
