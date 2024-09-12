// // src/pages/Supplier/Goals/Goals.jsx
// import React, { useEffect, useState } from 'react';
// import { Layout, Tabs, Modal, Input, Select, Button, notification } from 'antd';
// import Sidebar from '../../components/layout/sidebar/Sidebar';
// import Nav from '../../components/layout/navbar/Nav'; 
// import Resetbtn from '../../components/common/Button/Resetbtn';
// import Deletebtn from '../../components/common/Button/Deletebtn';
// import Addbtn from '../../components/common/Button/Addbtn';
// import "../Supplier/Goals.css";
// import { fetchData, saveGoals } from '../../services/apiService';

// const { Content } = Layout;
// const { confirm } = Modal;

// const Goals = () => {
//   const [activeTabKey, setActiveTabKey] = useState(null);
//   const [formData, setFormData] = useState({});
//   const [pillarData, setPillarData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isSaved, setIsSaved] = useState(false);

//   useEffect(() => {
//     const fetchPageData = async () => {
//       try {
//         const result = await fetchData();
//         setPillarData(result);
//         console.log(pillarData);
//         const energyTab = result.find(pillar => pillar.pillarName === 'Energy');
//         setActiveTabKey(energyTab ? energyTab.id : result[0].id);
//       } catch (error) {
//         console.error('Error fetching page content:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPageData();
//   }, []);

//   const handleGoalsSave = async () => {
//     setIsSaved(true);
//     try {
//       notification.success({
//         message: 'Fields Saved',
//         description: 'Your changes have been saved successfully.',
//       });
//     } catch (error) {
//       console.error('Error saving goals:', error);
//       notification.error({
//         message: 'Save Failed',
//         description: 'There was an error saving your changes.',
//       });
//     }
//   };

//   const handleNextClick = () => {
//     if (isSaved) {
//       confirm({
//         title: 'Are you sure you want to move to the next page?',
//         onOk() {
//           const currentIndex = pillarData.findIndex(item => item.pillarName === activeTabKey);
//           const nextIndex = (currentIndex + 1) % pillarData.length;
//           setActiveTabKey(pillarData[nextIndex].pillarName);
//           setIsSaved(false);
//         },
//       });
//     } else {
//       Modal.error({
//         title: 'Save Required',
//         content: 'Please save your changes before proceeding.',
//       });
//     }
//   };

//   const handleReset = () => {
//     // Reset the state to its initial values
//     // setPillarData([]); // or reset to initial pillar data if you have a predefined structure
//     setFormData({});
//     setIsSaved(false);
//     notification.info({
//       message: 'Form Reset',
//       description: 'All fields have been reset.',
//     });
//   };
  
//   const parseQuestionText = (text, inputFields, questionId) => {
//     const textParts = text.split(/(<[^>]+>)/g).map((part, index) => {
//       const matchedField = inputFields.find(field => `<${field.inputId}>` === part);
//       if (matchedField) {
//         const { inputId, inputType, options } = matchedField;
//         if (inputType === 'number') {
//           return (
//             <Input
//               key={`${questionId}-${inputId}-${index}`}
//               className="text-center mx-1 w-[60px] h-[28px]"
//             />
//           );
//         } else if (inputType === 'dropdown') {
//           return (
//             <Select
//               key={`${questionId}-${inputId}-${index}`}
//               className="mx-1 w-[150px] h-[28px]"
//             >
//               {options.map(option => (
//                 <Select.Option key={option} value={option}>
//                   {option}
//                 </Select.Option>
//               ))}
//             </Select>
//           );
//         }
//       } else {
//         return part;
//       }
//     });
//     return <span>{textParts}</span>;
//   };

//   const generateTabContent = (pillar) => {
//     return pillar.questions.map((question, index) => (
//       <div key={index} className="ml-10 mb-3 mt-3 flex">
//         <div className="question-container flex-1 mt-3 mb-3 mr-15">
//           <div className="question-text">
//             {parseQuestionText(question.text, question.inputFields, question.inputId)}
//           </div>
//         </div>
//         <div className="input-container ">
//           <Addbtn />
//           <Deletebtn />
//         </div>
//       </div>
//     ));
//   };

//   const items = pillarData.map(pillar => ({
//     key: pillar.pillarName,
//     label: pillar.pillarName,
//     children: generateTabContent(pillar),
//   }));

//   return (
//     <Layout>
//       <Nav />
//       <Layout>
//         <Sidebar />
//         <Content style={{ backgroundColor: '#EAF5FF', padding: '24px' }}>
//           <Content className="ml-[43px] bg-white mb-[17px] rounded-b-[20px] w-[975px] h-auto shadow-md">
//             {loading ? (
//               <div>Loading...</div>
//             ) : (
//               <Tabs
//                 activeKey={activeTabKey}
//                 items={items}
//                 onChange={(key) => setActiveTabKey(key)}
//                 tabBarStyle={{
//                   backgroundColor: '#014D4E',
//                   height: '45px',
//                   marginBottom: 0,
//                 }}
//                 className="custom-tabs"
//                 tabBarGutter={0}
//               />
//             )}
//           </Content>
//           <div className="w-[975px] flex justify-end gap-2.5">
//           <Resetbtn onClick={handleReset} />

//             <Button
//               className="h-[30px] w-[87px] border-[#014D4E] text-[#014D4E] border-[1.5px] rounded-[10px] border-solid"
//               onClick={handleGoalsSave}
//             >
//               Save
//             </Button>
//             <Button 
//               className="h-[30px] w-[87px] border-[#014D4E] text-[#014D4E] border-[1.5px] rounded-[10px] border-solid"
//               onClick={handleNextClick}
//             >
//               Next
//             </Button>
//           </div>
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default Goals;
// src/pages/Supplier/Goals/Goals.jsx

// import React, { useEffect, useState } from 'react';
// import { Layout, Tabs, Modal, Input, Select, Button, notification } from 'antd';
// import Sidebar from '../../components/layout/sidebar/Sidebar';
// import Nav from '../../components/layout/navbar/Nav'; 
// import Resetbtn from '../../components/common/Button/Resetbtn';
// import Deletebtn from '../../components/common/Button/Deletebtn';
// import Addbtn from '../../components/common/Button/Addbtn';
// import "../Supplier/Goals.css";
// import { fetchData, saveGoals } from '../../services/apiService';

// const { Content } = Layout;
// const { confirm } = Modal;

// const Goals = () => {
//   const [activeTabKey, setActiveTabKey] = useState(null);
//   const [pillarData, setPillarData] = useState([]);
//   const [formData, setFormData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [isSaved, setIsSaved] = useState(false);

//   useEffect(() => {
//     const fetchPageData = async () => {
//       try {
//         const result = await fetchData();
//         setPillarData(result);
//         const energyTab = result.find(pillar => pillar.pillarName === 'Energy');
//         setActiveTabKey(energyTab ? energyTab.id : result[0].id);
//       } catch (error) {
//         console.error('Error fetching page content:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPageData();
//   }, []);

//   const handleGoalsSave = async () => {
//     setIsSaved(true);
//     try {
//       notification.success({
//         message: 'Fields Saved',
//         description: 'Your changes have been saved successfully.',
//       });
//     } catch (error) {
//       console.error('Error saving goals:', error);
//       notification.error({
//         message: 'Save Failed',
//         description: 'There was an error saving your changes.',
//       });
//     }
//   };

//   const handleReset = () => {
//     // Reset form data to empty state
//     setFormData({});
//     setIsSaved(false);
//     notification.info({
//       message: 'Form Reset',
//       description: 'All fields have been reset.',
//     });
//   };

//   const handleNextClick = () => {
//     if (isSaved) {
//       confirm({
//         title: 'Are you sure you want to move to the next page?',
//         onOk() {
//           const currentIndex = pillarData.findIndex(item => item.pillarName === activeTabKey);
//           const nextIndex = (currentIndex + 1) % pillarData.length;
//           setActiveTabKey(pillarData[nextIndex].pillarName);
//           setIsSaved(false);
//         },
//       });
//     } else {
//       Modal.error({
//         title: 'Save Required',
//         content: 'Please save your changes before proceeding.',
//       });
//     }
//   };

//   const parseQuestionText = (text, inputFields, questionId) => {
//     const textParts = text.split(/(<[^>]+>)/g).map((part, index) => {
//       const matchedField = inputFields.find(field => `<${field.inputId}>` === part);
//       if (matchedField) {
//         const { inputId, inputType, options } = matchedField;
//         if (inputType === 'number') {
//           return (
//             <Input
//               key={`${questionId}-${inputId}-${index}`}
//               className="text-center mx-1 w-[60px] h-[28px]"
//               value={formData[inputId] || ''}
//               onChange={(e) => setFormData({ ...formData, [inputId]: e.target.value })}
//             />
//           );
//         } else if (inputType === 'dropdown') {
//           return (
//             <Select
//               key={`${questionId}-${inputId}-${index}`}
//               className="mx-1 w-[150px] h-[28px]"
//               value={formData[inputId] || ''}
//               onChange={(value) => setFormData({ ...formData, [inputId]: value })}
//             >
//               {options.map(option => (
//                 <Select.Option key={option} value={option}>
//                   {option}
//                 </Select.Option>
//               ))}
//             </Select>
//           );
//         }
//       } else {
//         return part;
//       }
//     });
//     return <span>{textParts}</span>;
//   };

//   const generateTabContent = (pillar) => {
//     return pillar.questions.map((question, index) => (
//       <div key={index} className="ml-10 mb-3 mt-3 flex">
//         <div className="question-container flex-1 mt-3 mb-3 mr-15">
//           <div className="question-text">
//             {parseQuestionText(question.text, question.inputFields, question.inputId)}
//           </div>
//         </div>
//         <div className="input-container ">
//           <Addbtn />
//           <Deletebtn />
//         </div>
//       </div>
//     ));
//   };

//   const items = pillarData.map(pillar => ({
//     key: pillar.pillarName,
//     label: pillar.pillarName,
//     children: generateTabContent(pillar),
//   }));
// console.log(formData)
//   return (
//     <Layout>
//       <Nav />
//       <Layout>
//         <Sidebar />
//         <Content style={{ backgroundColor: '#EAF5FF', padding: '24px' }}>
//           <Content className="ml-[43px] bg-white mb-[17px] rounded-b-[20px] w-[975px] h-auto shadow-md">
//             {loading ? (
//               <div>Loading...</div>
//             ) : (
//               <Tabs
//                 activeKey={activeTabKey}
//                 items={items}
//                 onChange={(key) => setActiveTabKey(key)}
//                 tabBarStyle={{
//                   backgroundColor: '#014D4E',
//                   height: '45px',
//                   marginBottom: 0,
//                 }}
//                 className="custom-tabs"
//                 tabBarGutter={0}
//               />
//             )}
//           </Content>
//           <div className="w-[975px] flex justify-end gap-2.5">
//             <Resetbtn onClick={handleReset} />
//             <Button
//               className="h-[30px] w-[87px] border-[#014D4E] text-[#014D4E] border-[1.5px] rounded-[10px] border-solid"
//               onClick={handleGoalsSave}
//             >
//               Save
//             </Button>
//             <Button 
//               className="h-[30px] w-[87px] border-[#014D4E] text-[#014D4E] border-[1.5px] rounded-[10px] border-solid"
//               onClick={handleNextClick}
//             >
//               Next
//             </Button>
//           </div>
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default Goals;

// src/pages/Supplier/Goals/Goals.jsx
import React, { useEffect, useState } from 'react';
import { Layout, Tabs, Modal, Input, Select, Button, notification } from 'antd';
import Sidebar from '../../../components/layout/sidebar/Sidebar';
import Nav from '../../../components/layout/navbar/Nav'; 
import Resetbtn from '../../../components/common/Button/Resetbtn';
import Deletebtn from '../../../components/common/Button/Deletebtn';
import Addbtn from '../../../components/common/Button/Addbtn';
import "./Goals.css";
import { fetchData, saveGoals } from '../../../services/apiService';

const { Content } = Layout;
const { confirm } = Modal;

const Goals = () => {
  const [activeTabKey, setActiveTabKey] = useState(null);
  const [formData, setFormData] = useState({});
  const [pillarData, setPillarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const result = await fetchData();
        setPillarData(result);
        const energyTab = result.find(pillar => pillar.pillarName === 'Energy');
        setActiveTabKey(energyTab ? energyTab.id : result[0].id);
      } catch (error) {
        console.error('Error fetching page content:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPageData();
  }, []);

  const handleGoalsSave = async () => {
    setIsSaved(true);
    try {
      notification.success({
        message: 'Fields Saved',
        description: 'Your changes have been saved successfully.',
      });
    } catch (error) {
      console.error('Error saving goals:', error);
      notification.error({
        message: 'Save Failed',
        description: 'There was an error saving your changes.',
      });
    }
  };

  const handleNextClick = () => {
    if (isSaved) {
      confirm({
        title: 'Are you sure you want to move to the next page?',
        onOk() {
          const currentIndex = pillarData.findIndex(item => item.pillarName === activeTabKey);
          const nextIndex = (currentIndex + 1) % pillarData.length;
          setActiveTabKey(pillarData[nextIndex].pillarName);
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

 const handleReset = () => {
    // Reset the form data to its initial state and notify user
    const resetData = pillarData.reduce((acc, pillar) => {
      pillar.questions.forEach(question => {
        question.inputFields.forEach(input => {
          acc[input.inputId] = '';
        });
      });
      return acc;
    }, {});

    setFormData(resetData);
    setIsSaved(false);
    notification.info({
      message: 'Form Reset',
      description: 'All fields have been reset.',
    });
  };

  const parseQuestionText = (text, inputFields, questionId) => {
    const textParts = text.split(/(<[^>]+>)/g).map((part, index) => {
      const matchedField = inputFields.find(field => `<${field.inputId}>` === part);
      if (matchedField) {
        const { inputId, inputType, options } = matchedField;
        if (inputType === 'number') {
          return (
            <Input
              key={`${questionId}-${inputId}-${index}`}
              className="text-center mx-1 w-[60px] h-[28px]"
              value={formData[inputId] || ''}
              onChange={(e) => setFormData({ ...formData, [inputId]: e.target.value })}
            />
          );
        } return (
          <Select
            key={`${questionId}-${inputId}-${index}`}
            className="mx-1 w-[150px] h-[28px]"
            value={formData[inputId] || ''}
            onChange={(value) => setFormData({ ...formData, [inputId]: value })}
          >
            {options.map(option => (
              <Select.Option key={option} value={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
        );
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
            {parseQuestionText(question.text, question.inputFields, question.inputId)}
          </div>
        </div>
        <div className="input-container">
          <Addbtn />
          <Deletebtn />
        </div>
      </div>
    ));
  };

  const items = pillarData.map(pillar => ({
    key: pillar.pillarName,
    label: pillar.pillarName,
    children: generateTabContent(pillar),
  }));

  return (
    <Layout>
      <Nav />
      <Layout>
        <Sidebar />
        <Content style={{ backgroundColor: '#EAF5FF', padding: '24px' }}>
          <Content className="ml-[43px] bg-white mb-[17px] rounded-b-[20px] w-[975px] h-auto shadow-md">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <Tabs
                activeKey={activeTabKey}
                items={items}
                onChange={(key) => setActiveTabKey(key)}
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
          <div className="w-[975px] flex justify-end gap-2.5">
            <Resetbtn onClick={handleReset} />
            <Button
              className="h-[30px] w-[87px] border-[#014D4E] text-[#014D4E] border-[1.5px] rounded-[10px] border-solid"
              onClick={handleGoalsSave}
            >
              Save
            </Button>
            <Button 
              className="h-[30px] w-[87px] border-[#014D4E] text-[#014D4E] border-[1.5px] rounded-[10px] border-solid"
              onClick={handleNextClick}
            >
              Next
            </Button>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Goals;


