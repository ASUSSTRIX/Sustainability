// // src/components/common/Button/Addbtn.jsx
// import React from 'react';
// import { Button } from 'antd';
// import { PlusOutlined } from '@ant-design/icons';

// const Addbtn = () => {
//   return (
//     <Button 
//       className="h-[28px] w-[28px] border-[#014D4E] text-[#014D4E] border-[1.5px] rounded-[50%] border-solid flex items-center justify-center"
//       icon={<PlusOutlined />}
//     />
//   );
// };

// export default Addbtn;

import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

function Addbtn({ onClick }) {
  return (
    <Button
      type="text"
      className="h-[27px] text-[#014D4E] bg-[rgba(1,77,78,0.3)] w-[65px] text-[10px] font-bold"
      onClick={onClick}
    >
      <PlusCircleOutlined className='text-[#014D4E] text-[15px]' /> Add
    </Button>
  );
}

export default Addbtn;
