import { Input } from "@material-tailwind/react";
import logo from "../assets/logo.png";

const LoginScreen = () => {
  console.log("Login Screen :::: ");
  return (
    <div className="h-[100vh] w-[100%] bg-gray-200 flex justify-center items-center">
      <div className="shadow-2xl h-[70%] w-[25%] rounded bg-white p-4 flex flex-col items-center">
        <img src={logo} className="h-[150px] w-[150px]" />
        <Input
          label="Input With Icon"
          icon={<i className="fas fa-heart" />}
          crossOrigin={undefined}
        />
      </div>
    </div>
  );
};

export default LoginScreen;
