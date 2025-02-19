import ParentLayout from "../../component/app-component/Parent";
import comingSoon from "../assets/comingsoon.avif";

const AppDashbord = () => {
  return (
    <ParentLayout>
      <div className="w-full h-screen overflow-x-hidden border-t flex flex-col justify-center items-center">
        <img src={comingSoon} className="h-40 w-64" alt="Coming Soon" />
      </div>
    </ParentLayout>
  );
};

export default AppDashbord;
