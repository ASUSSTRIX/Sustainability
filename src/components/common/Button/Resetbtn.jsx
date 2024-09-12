// src/components/common/Button/Resetbtn.jsx
import React from 'react';
import { Button } from 'antd';

const Resetbtn = ({ onClick }) => {
  return (
    <Button
      className="h-[30px] w-[87px] border-[#014D4E] text-[#014D4E] border-[1.5px] rounded-[10px] border-solid"
      onClick={onClick}
    >
      Reset
    </Button>
  );
};

export default Resetbtn;
