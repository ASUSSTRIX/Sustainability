import React from 'react';
import { Button } from 'antd'; 

const LoginButtons = () => {
  return (
    <div className="login-buttons">
      <Button type="primary" block>
        Admin Login – UST SSO
      </Button>
      <Button type="primary" block className="mt-4">
        Supplier Login – UST SSO
      </Button>
    </div>
  );
};

export default LoginButtons;
