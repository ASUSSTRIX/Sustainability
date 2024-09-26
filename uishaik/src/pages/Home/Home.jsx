
// import React from 'react';
// import { Typography, Card, Image } from 'antd';
// import loginImage from '../../../src/assets/loginImage.jpg';
// import UserType from '../../../src/pages/UserTypeSelection/UserType';

// const { Title, Paragraph } = Typography;

// const Home = () => {
//   return (
//     <div className="flex h-screen w-screen">
//       {/* Left section */}
//       <div className="bg-[#1F405A] p-8 w-1/3 flex flex-col gap-4 ">
//         <div>
//         <Title class="text-[50px] text-white className=flex items-start">Sustainability Program</Title>

//         <Paragraph className="text-white text-xl ">
//           Welcome to Sustainability Portal, your destination for accessing sustainability reports
//         </Paragraph>
//         </div>
//         <div className='mt-[55px]'>
//         <Image
//           src={loginImage}
//           alt="Person working on computer"
//           class="w-[340px] h-[50px]"
//           preview={false}
//         />
//         </div>
//       </div>

//       {/* Right section */}
//       <div className="flex-grow bg-gray-100 flex items-center justify-center p-8">
//         <Card
//           className="w-full max-w-md shadow-lg rounded-lg"
//           style={{ textAlign: 'center' }}
//         >
//           <Title level={1.5} font-bold>Sustainability Login</Title>
//           <Paragraph className="text-base font-semibold">Please select a method below to log into the Sustainability portal.</Paragraph>
//           {/* Use the UserType component here */}
//           <UserType />
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Home;
import React from 'react';
import { Typography, Card, Image } from 'antd';
import loginImage from '../../../src/assets/loginImage.jpg';
import UserType from '../../../src/pages/UserTypeSelection/UserType';

const { Title, Paragraph } = Typography;

const Home = () => {
  return (
    <div className="flex h-screen w-screen">
      {/* Left section */}
      <div className="bg-[#1F405A] p-8 w-1/3 flex flex-col justify-center gap-4">
        <div>
        <Title class="text-[50px] text-white className=flex items-start">Sustainability Program</Title>

       <Paragraph className="text-white text-xl ">
         Welcome to Sustainability Portal, your destination for accessing sustainability reports
        </Paragraph>
        </div>
        <div className="mt-auto flex justify-center">
          <Image
            src={loginImage}
            alt="Person working on computer"
            className="w-[300px] h-auto"
            preview={false}
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex-grow bg-gray-100 flex items-center justify-center p-8">
        <Card
          className="w-full max-w-md shadow-lg rounded-lg"
          style={{ textAlign: 'center' }}
        >
          <Title level={2}>Sustainability Login</Title>
          <Paragraph className="text-base font-semibold">
            Please select a method below to log into the Sustainability portal.
          </Paragraph>
          {/* Use the UserType component here */}
          <UserType />
        </Card>
      </div>
    </div>
  );
};

export default Home;
