// // src/components/common/Button/Deletebtn.jsx
// import React from 'react';
// import { Button } from 'antd';
// import { DeleteOutlined } from '@ant-design/icons';

// const Deletebtn = () => {
//   return (
//     <Button 
//       className="h-[28px] w-[28px] border-[#014D4E] text-[#014D4E] border-[1.5px] rounded-[50%] border-solid flex items-center justify-center"
//       icon={<DeleteOutlined />}
//     />
//   );
// };

// export default Deletebtn;


import React from 'react';
import { Button } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

export default function Deletebtn({ onClick }) {
  return (
    <Button
      type="text"
      className="h-[27px] text-[#F22F23] bg-[rgba(242,47,35,0.3)] w-[65px] text-[10px] font-bold"
      onClick={onClick}
    >
      <CloseCircleOutlined className="text-[15px] text-[#F22F23]" />
      Delete
    </Button>
  );
}
