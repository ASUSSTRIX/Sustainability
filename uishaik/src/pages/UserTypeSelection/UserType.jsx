// import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import 'antd/dist/reset.css'; // Import Ant Design reset styles
import './userType.css'; // If needed for additional custom styles

const UserType = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Admin Login Button */}
      <Link to="/admin-login">
        <Button
          type="primary"
          size="large"
          className="w-[340px] h-[60px] rounded-full bg-[#1F405A] mt-2"
        >
          Admin Login - UST SSO
        </Button>
      </Link>
      
      {/* Supplier Login Button */}
      <Link to="/supplier-login" className="mt-8">
        <Button
          type="primary"
          size="large"
          className="w-[340px] h-[60px] rounded-full bg-[#1F405A]"
        >
          Supplier Login - UST SSO
        </Button>
      </Link>
    </div>
  );
};

export default UserType;
