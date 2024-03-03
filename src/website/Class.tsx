import ClassView from "../component/web-component/Class";

const Class = () => {
  return (
    <>
      {/* <!-- Header Start --> */}
      <div className="container-fluid bg-sub-head-image mb-5">
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: 400 }}
        >
          <h3 className="display-3 font-weight-bold text-white">Our Classes</h3>
          <div className="d-inline-flex text-white">
            <p className="m-0">
              <a className="text-white" href="">
                Home
              </a>
            </p>
            <p className="m-0 px-2">/</p>
            <p className="m-0">Our Classes</p>
          </div>
        </div>
      </div>
      {/* <!-- Header End --> */}

      <ClassView />
    </>
  );
};

export default Class;
