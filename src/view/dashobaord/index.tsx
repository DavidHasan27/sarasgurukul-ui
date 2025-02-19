import ParentLayout from "../../component/app-component/Parent";

const AppDashbord = () => {
  return (
    <ParentLayout>
      <div className="w-full h-screen overflow-x-hidden border-t flex flex-col justify-center items-center">
        <img
          src="/img/app/coming-soon.png"
          className="h-30 w-30"
          alt="Coming Soon"
        />
      </div>
    </ParentLayout>
  );
};

export default AppDashbord;
