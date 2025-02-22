import { Popover, PopoverHandler } from "@material-tailwind/react";
import SGTeamInfopopup from "../component/SGTeamInfoPopup";
import { useState } from "react";
import { useAppSelector } from "../redux/store";
import { RAHATANI_BRANCH } from "../utils/constants";

const Teachers = () => {
  const branch = useAppSelector((state: any) => state.website.branch);
  const [openPopover1, setOpenPopover1] = useState(false);
  const [openPopover2, setOpenPopover2] = useState(false);
  const triggers = {
    onMouseEnter: () => setOpenPopover1(true),
    onMouseLeave: () => setOpenPopover1(false),
  };
  const triggers2 = {
    onMouseEnter: () => setOpenPopover2(true),
    onMouseLeave: () => setOpenPopover2(false),
  };
  return (
    <>
      {/* <!-- Header Start --> */}
      <div className="container-fluid bg-sub-head-image mb-5">
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: 400 }}
        >
          <h3 className="display-3 font-weight-bold text-white">Our Team</h3>
          <div className="d-inline-flex text-white">
            <p className="m-0">
              <a className="text-white" href="">
                Home
              </a>
            </p>
            <p className="m-0 px-2">/</p>
            <p className="m-0">Our Team</p>
          </div>
        </div>
      </div>
      {/* <!-- Header End --> */}

      {/* <!-- Team Start --> */}
      <div className="container-fluid pt-5">
        <div className="container">
          <div className="text-center pb-2">
            <p className="section-title px-5">
              <span className="px-2">Our Founders & Directors</span>
            </p>
            <h1 className="mb-4">Meet Our Founder & Directors</h1>
          </div>
          {branch === RAHATANI_BRANCH ? (
            <div className="row justify-center">
              <div className="col-md-6 col-lg-3 text-center team mb-5">
                <div
                  className="position-relative overflow-hidden mb-4"
                  style={{ borderRadius: "100%" }}
                >
                  <img
                    className="img-fluid w-100"
                    src="img/team-1.jpg"
                    alt=""
                  />
                </div>
                <h4>Sarika Ozarkar</h4>
                <i>Founder & Creative Director</i>
              </div>
              <div className="col-md-6 col-lg-3 text-center team mb-5">
                <div
                  className="position-relative overflow-hidden mb-4"
                  style={{ borderRadius: "100%" }}
                >
                  <img
                    className="img-fluid w-100"
                    src="img/team-2.jpg"
                    alt=""
                  />
                </div>
                <h4>Shashidhar Birajdar</h4>
                <i>Founder</i>
              </div>
              {/* <div className="col-md-6 col-lg-3 text-center team mb-5">
              <div
                className="position-relative overflow-hidden mb-4"
                style={{ borderRadius: "100%" }}
              >
                <img className="img-fluid w-100" src="img/team-3.jpg" alt="" />
                <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute">
                  <a
                    className="btn btn-outline-light text-center mr-2 px-0"
                    style={{ width: 38, height: 38 }}
                    href="#"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    className="btn btn-outline-light text-center mr-2 px-0"
                    style={{ width: 38, height: 38 }}
                    href="#"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    className="btn btn-outline-light text-center px-0"
                    style={{ width: 38, height: 38 }}
                    href="#"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
              <h4>Mollie Ross</h4>
              <i>Dance Teacher</i>
            </div>
            <div className="col-md-6 col-lg-3 text-center team mb-5">
              <div
                className="position-relative overflow-hidden mb-4"
                style={{ borderRadius: "100%" }}
              >
                <img className="img-fluid w-100" src="img/team-4.jpg" alt="" />
                <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute">
                  <a
                    className="btn btn-outline-light text-center mr-2 px-0"
                    style={{ width: 38, height: 38 }}
                    href="#"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    className="btn btn-outline-light text-center mr-2 px-0"
                    style={{ width: 38, height: 38 }}
                    href="#"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    className="btn btn-outline-light text-center px-0"
                    style={{ width: 38, height: 38 }}
                    href="#"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
              <h4>Donald John</h4>
              <i>Art Teacher</i>
            </div>
            <div className="col-md-6 col-lg-3 text-center team mb-5">
              <div
                className="position-relative overflow-hidden mb-4"
                style={{ borderRadius: "100%" }}
              >
                <img className="img-fluid w-100" src="img/team-4.jpg" alt="" />
                <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute">
                  <a
                    className="btn btn-outline-light text-center mr-2 px-0"
                    style={{ width: 38, height: 38 }}
                    href="#"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    className="btn btn-outline-light text-center mr-2 px-0"
                    style={{ width: 38, height: 38 }}
                    href="#"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    className="btn btn-outline-light text-center px-0"
                    style={{ width: 38, height: 38 }}
                    href="#"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
              <h4>Julia Smith</h4>
              <i>Music Teacher</i>
            </div>
            <div className="col-md-6 col-lg-3 text-center team mb-5">
              <div
                className="position-relative overflow-hidden mb-4"
                style={{ borderRadius: "100%" }}
              >
                <img className="img-fluid w-100" src="img/team-3.jpg" alt="" />
                <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute">
                  <a
                    className="btn btn-outline-light text-center mr-2 px-0"
                    style={{ width: 38, height: 38 }}
                    href="#"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    className="btn btn-outline-light text-center mr-2 px-0"
                    style={{ width: 38, height: 38 }}
                    href="#"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    className="btn btn-outline-light text-center px-0"
                    style={{ width: 38, height: 38 }}
                    href="#"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
              <h4>Jhon Doe</h4>
              <i>Language Teacher</i>
            </div>
            <div className="col-md-6 col-lg-3 text-center team mb-5">
              <div
                className="position-relative overflow-hidden mb-4"
                style={{ borderRadius: "100%" }}
              >
                <img className="img-fluid w-100" src="img/team-2.jpg" alt="" />
                <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute">
                  <a
                    className="btn btn-outline-light text-center mr-2 px-0"
                    style={{ width: 38, height: 38 }}
                    href="#"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    className="btn btn-outline-light text-center mr-2 px-0"
                    style={{ width: 38, height: 38 }}
                    href="#"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    className="btn btn-outline-light text-center px-0"
                    style={{ width: 38, height: 38 }}
                    href="#"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
              <h4>Mollie Ross</h4>
              <i>Dance Teacher</i>
            </div>
            <div className="col-md-6 col-lg-3 text-center team mb-5">
              <div
                className="position-relative overflow-hidden mb-4"
                style={{ borderRadius: "100%" }}
              >
                <img className="img-fluid w-100" src="img/team-1.jpg" alt="" />
                <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute">
                  <a
                    className="btn btn-outline-light text-center mr-2 px-0"
                    style={{ width: 38, height: 38 }}
                    href="#"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    className="btn btn-outline-light text-center mr-2 px-0"
                    style={{ width: 38, height: 38 }}
                    href="#"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    className="btn btn-outline-light text-center px-0"
                    style={{ width: 38, height: 38 }}
                    href="#"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
              <h4>Donald John</h4>
              <i>Art Teacher</i>
            </div> */}
            </div>
          ) : (
            <div className="row justify-center">
              <div className="col-md-6 col-lg-3 text-center team mb-5">
                <div
                  className="position-relative overflow-hidden mb-4"
                  style={{ borderRadius: "100%" }}
                >
                  <img
                    className="img-fluid w-100"
                    src="img/team-1.jpg"
                    alt=""
                  />
                </div>
                <h4>Sarika Ozarkar</h4>
                <i>Founder & Creative Director</i>
              </div>
              <div className="col-md-6 col-lg-3 text-center team mb-5">
                <div
                  className="position-relative overflow-hidden mb-4"
                  style={{ borderRadius: "100%" }}
                >
                  <img
                    className="img-fluid w-100"
                    src="img/team-2.jpg"
                    alt=""
                  />
                </div>
                <h4>Shashidhar Birajdar</h4>
                <i>Founder</i>
              </div>
              {/* <div className="col-md-6 col-lg-3 text-center team mb-5">
            <div
              className="position-relative overflow-hidden mb-4"
              style={{ borderRadius: "100%" }}
            >
              <img className="img-fluid w-100" src="img/team-3.jpg" alt="" />
              <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute">
                <a
                  className="btn btn-outline-light text-center mr-2 px-0"
                  style={{ width: 38, height: 38 }}
                  href="#"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  className="btn btn-outline-light text-center mr-2 px-0"
                  style={{ width: 38, height: 38 }}
                  href="#"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  className="btn btn-outline-light text-center px-0"
                  style={{ width: 38, height: 38 }}
                  href="#"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
            <h4>Mollie Ross</h4>
            <i>Dance Teacher</i>
          </div>
          <div className="col-md-6 col-lg-3 text-center team mb-5">
            <div
              className="position-relative overflow-hidden mb-4"
              style={{ borderRadius: "100%" }}
            >
              <img className="img-fluid w-100" src="img/team-4.jpg" alt="" />
              <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute">
                <a
                  className="btn btn-outline-light text-center mr-2 px-0"
                  style={{ width: 38, height: 38 }}
                  href="#"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  className="btn btn-outline-light text-center mr-2 px-0"
                  style={{ width: 38, height: 38 }}
                  href="#"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  className="btn btn-outline-light text-center px-0"
                  style={{ width: 38, height: 38 }}
                  href="#"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
            <h4>Donald John</h4>
            <i>Art Teacher</i>
          </div>
          <div className="col-md-6 col-lg-3 text-center team mb-5">
            <div
              className="position-relative overflow-hidden mb-4"
              style={{ borderRadius: "100%" }}
            >
              <img className="img-fluid w-100" src="img/team-4.jpg" alt="" />
              <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute">
                <a
                  className="btn btn-outline-light text-center mr-2 px-0"
                  style={{ width: 38, height: 38 }}
                  href="#"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  className="btn btn-outline-light text-center mr-2 px-0"
                  style={{ width: 38, height: 38 }}
                  href="#"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  className="btn btn-outline-light text-center px-0"
                  style={{ width: 38, height: 38 }}
                  href="#"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
            <h4>Julia Smith</h4>
            <i>Music Teacher</i>
          </div>
          <div className="col-md-6 col-lg-3 text-center team mb-5">
            <div
              className="position-relative overflow-hidden mb-4"
              style={{ borderRadius: "100%" }}
            >
              <img className="img-fluid w-100" src="img/team-3.jpg" alt="" />
              <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute">
                <a
                  className="btn btn-outline-light text-center mr-2 px-0"
                  style={{ width: 38, height: 38 }}
                  href="#"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  className="btn btn-outline-light text-center mr-2 px-0"
                  style={{ width: 38, height: 38 }}
                  href="#"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  className="btn btn-outline-light text-center px-0"
                  style={{ width: 38, height: 38 }}
                  href="#"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
            <h4>Jhon Doe</h4>
            <i>Language Teacher</i>
          </div>
          <div className="col-md-6 col-lg-3 text-center team mb-5">
            <div
              className="position-relative overflow-hidden mb-4"
              style={{ borderRadius: "100%" }}
            >
              <img className="img-fluid w-100" src="img/team-2.jpg" alt="" />
              <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute">
                <a
                  className="btn btn-outline-light text-center mr-2 px-0"
                  style={{ width: 38, height: 38 }}
                  href="#"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  className="btn btn-outline-light text-center mr-2 px-0"
                  style={{ width: 38, height: 38 }}
                  href="#"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  className="btn btn-outline-light text-center px-0"
                  style={{ width: 38, height: 38 }}
                  href="#"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
            <h4>Mollie Ross</h4>
            <i>Dance Teacher</i>
          </div>
          <div className="col-md-6 col-lg-3 text-center team mb-5">
            <div
              className="position-relative overflow-hidden mb-4"
              style={{ borderRadius: "100%" }}
            >
              <img className="img-fluid w-100" src="img/team-1.jpg" alt="" />
              <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute">
                <a
                  className="btn btn-outline-light text-center mr-2 px-0"
                  style={{ width: 38, height: 38 }}
                  href="#"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  className="btn btn-outline-light text-center mr-2 px-0"
                  style={{ width: 38, height: 38 }}
                  href="#"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  className="btn btn-outline-light text-center px-0"
                  style={{ width: 38, height: 38 }}
                  href="#"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
            <h4>Donald John</h4>
            <i>Art Teacher</i>
          </div> */}
            </div>
          )}
        </div>
        <div className="container">
          <div className="text-center pb-2">
            <p className="section-title px-5">
              <span className="px-2">Our Nursary & Jr.Kg Teachers</span>
            </p>
            <h1 className="mb-4">Meet Our Teachers</h1>
          </div>
          <div className="row justify-center">
            <div className="col-md-6 col-lg-3 text-center team mb-5">
              <div
                className="position-relative overflow-hidden mb-4"
                style={{ borderRadius: "100%" }}
              >
                <img
                  className="img-fluid w-100"
                  src="img/asha_lenekar-nursery.png"
                  alt=""
                />
                <Popover open={openPopover2} handler={setOpenPopover2}>
                  <PopoverHandler {...triggers2}>
                    <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute"></div>
                  </PopoverHandler>
                  <SGTeamInfopopup
                    name={"Asha Lenekar"}
                    src={"img/asha_lenekar-nursery.png"}
                    desc={`Asha Lenekar`}
                  />
                </Popover>
              </div>
              <h4>Asha Lenekar</h4>
              <i>Nursary Teacher</i>
            </div>

            <div className="col-md-6 col-lg-3 text-center team mb-5">
              <div
                className="position-relative overflow-hidden mb-4"
                style={{ borderRadius: "100%" }}
              >
                <img
                  className="img-fluid w-100"
                  src="img/sayali_bhosale_nursary.png"
                  alt=""
                />
                {/* <Popover open={openPopover2} handler={setOpenPopover2}>
                  <PopoverHandler {...triggers2}>
                    <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute"></div>
                  </PopoverHandler>
                  <SGTeamInfopopup
                    name={"Asha Lenekar"}
                    src={"img/asha_lenekar-nursery.png"}
                    desc={`Asha Lenekar`}
                  />
                </Popover> */}
              </div>
              <h4>Sayali Bhosale</h4>
              <i>Nursary Teacher</i>
            </div>

            <div className="col-md-6 col-lg-3 text-center team mb-5">
              <div
                className="position-relative overflow-hidden mb-4"
                style={{ borderRadius: "100%" }}
              >
                <img
                  className="img-fluid w-100"
                  src="img/anjali_nikam_jrkg.png"
                  alt=""
                />
                {/* <Popover open={openPopover1} handler={setOpenPopover1}>
                  <PopoverHandler {...triggers}>
                    <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute"></div>
                  </PopoverHandler>
                  <SGTeamInfopopup
                    name={"Anjali Nikam"}
                    src={"img/anjali_nikam_jrkg.png"}
                    desc={`Jr.kg Teacher`}
                  />
                </Popover> */}
              </div>
              <h4>Anjali Nikam</h4>
              <i>Jr.kg Teacher</i>
            </div>
            <div className="col-md-6 col-lg-3 text-center team mb-5">
              <div
                className="position-relative overflow-hidden mb-4"
                style={{ borderRadius: "100%" }}
              >
                <img
                  className="img-fluid w-100"
                  src="img/pallavi_sulkekar_jrkg.png"
                  alt=""
                />
                {/* <Popover open={openPopover1} handler={setOpenPopover1}>
                  <PopoverHandler {...triggers}>
                    <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute"></div>
                  </PopoverHandler>
                  <SGTeamInfopopup
                    name={"Pallavi Sulkekar"}
                    src={"img/pallavi_sulkekar_jrkg.png"}
                    desc={`Jr.kg Teacher`}
                  />
                </Popover> */}
              </div>
              <h4>Pallavi Sulkekar</h4>
              <i>Jr.kg Teacher</i>
            </div>
            {/* <div className="col-md-6 col-lg-3 text-center team mb-5">
              <div
                className="position-relative overflow-hidden mb-4"
                style={{ borderRadius: "100%" }}
              >
                <img className="img-fluid w-100" src="img/team-3.jpg" alt="" />
                <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute">
                  <a
                    className="btn btn-outline-light text-center mr-2 px-0"
                    style={{ width: 38, height: 38 }}
                    href="#"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    className="btn btn-outline-light text-center mr-2 px-0"
                    style={{ width: 38, height: 38 }}
                    href="#"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    className="btn btn-outline-light text-center px-0"
                    style={{ width: 38, height: 38 }}
                    href="#"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
              <h4>Mollie Ross</h4>
              <i>Dance Teacher</i>
            </div>
            <div className="col-md-6 col-lg-3 text-center team mb-5">
              <div
                className="position-relative overflow-hidden mb-4"
                style={{ borderRadius: "100%" }}
              >
                <img className="img-fluid w-100" src="img/team-4.jpg" alt="" />
                <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute">
                  <a
                    className="btn btn-outline-light text-center mr-2 px-0"
                    style={{ width: 38, height: 38 }}
                    href="#"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    className="btn btn-outline-light text-center mr-2 px-0"
                    style={{ width: 38, height: 38 }}
                    href="#"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    className="btn btn-outline-light text-center px-0"
                    style={{ width: 38, height: 38 }}
                    href="#"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
              <h4>Donald John</h4>
              <i>Art Teacher</i>
            </div>
            <div className="col-md-6 col-lg-3 text-center team mb-5">
              <div
                className="position-relative overflow-hidden mb-4"
                style={{ borderRadius: "100%" }}
              >
                <img className="img-fluid w-100" src="img/team-4.jpg" alt="" />
                <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute">
                  <a
                    className="btn btn-outline-light text-center mr-2 px-0"
                    style={{ width: 38, height: 38 }}
                    href="#"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    className="btn btn-outline-light text-center mr-2 px-0"
                    style={{ width: 38, height: 38 }}
                    href="#"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    className="btn btn-outline-light text-center px-0"
                    style={{ width: 38, height: 38 }}
                    href="#"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
              <h4>Julia Smith</h4>
              <i>Music Teacher</i>
            </div>
            <div className="col-md-6 col-lg-3 text-center team mb-5">
              <div
                className="position-relative overflow-hidden mb-4"
                style={{ borderRadius: "100%" }}
              >
                <img className="img-fluid w-100" src="img/team-3.jpg" alt="" />
                <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute">
                  <a
                    className="btn btn-outline-light text-center mr-2 px-0"
                    style={{ width: 38, height: 38 }}
                    href="#"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    className="btn btn-outline-light text-center mr-2 px-0"
                    style={{ width: 38, height: 38 }}
                    href="#"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    className="btn btn-outline-light text-center px-0"
                    style={{ width: 38, height: 38 }}
                    href="#"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
              <h4>Jhon Doe</h4>
              <i>Language Teacher</i>
            </div>
            <div className="col-md-6 col-lg-3 text-center team mb-5">
              <div
                className="position-relative overflow-hidden mb-4"
                style={{ borderRadius: "100%" }}
              >
                <img className="img-fluid w-100" src="img/team-2.jpg" alt="" />
                <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute">
                  <a
                    className="btn btn-outline-light text-center mr-2 px-0"
                    style={{ width: 38, height: 38 }}
                    href="#"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    className="btn btn-outline-light text-center mr-2 px-0"
                    style={{ width: 38, height: 38 }}
                    href="#"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    className="btn btn-outline-light text-center px-0"
                    style={{ width: 38, height: 38 }}
                    href="#"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
              <h4>Mollie Ross</h4>
              <i>Dance Teacher</i>
            </div>
            <div className="col-md-6 col-lg-3 text-center team mb-5">
              <div
                className="position-relative overflow-hidden mb-4"
                style={{ borderRadius: "100%" }}
              >
                <img className="img-fluid w-100" src="img/team-1.jpg" alt="" />
                <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute">
                  <a
                    className="btn btn-outline-light text-center mr-2 px-0"
                    style={{ width: 38, height: 38 }}
                    href="#"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    className="btn btn-outline-light text-center mr-2 px-0"
                    style={{ width: 38, height: 38 }}
                    href="#"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    className="btn btn-outline-light text-center px-0"
                    style={{ width: 38, height: 38 }}
                    href="#"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
              <h4>Donald John</h4>
              <i>Art Teacher</i>
            </div> */}
          </div>
        </div>

        <div className="container">
          <div className="text-center pb-2">
            <p className="section-title px-5">
              <span className="px-2">Our Sr.Kg Teachers</span>
            </p>
            <h1 className="mb-4">Meet Our Teachers</h1>
          </div>
          <div className="row justify-center">
            <div className="col-md-6 col-lg-3 text-center team mb-5">
              <div
                className="position-relative overflow-hidden mb-4"
                style={{ borderRadius: "100%" }}
              >
                <img
                  className="img-fluid w-100"
                  src="img/shubhangi_bhosale_srkg .png"
                  alt=""
                />
              </div>
              <h4>Shubhangi Bhosale</h4>
              <i>Sr.Kg Teacher</i>
            </div>
            <div className="col-md-6 col-lg-3 text-center team mb-5">
              <div
                className="position-relative overflow-hidden mb-4"
                style={{ borderRadius: "100%" }}
              >
                <img
                  className="img-fluid w-100"
                  src="img/sanskruti_mohite_srkg.png"
                  alt=""
                />
                {/* <Popover open={openPopover1} handler={setOpenPopover1}>
                  <PopoverHandler {...triggers}>
                    <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute"></div>
                  </PopoverHandler>
                  <SGTeamInfopopup
                    name={"Anjali Nikam"}
                    src={"img/anjali_nikam_jrkg.png"}
                    desc={`Jr.kg Teacher`}
                  />
                </Popover> */}
              </div>
              <h4>Sanskruti Mohite</h4>
              <i>Sr.kg Teacher</i>
            </div>
            <div className="col-md-6 col-lg-3 text-center team mb-5">
              <div
                className="position-relative overflow-hidden mb-4"
                style={{ borderRadius: "100%" }}
              >
                <img
                  className="img-fluid w-100"
                  src="img/samruddhi_jagtap_srkg.png"
                  alt=""
                />
                {/* <Popover open={openPopover1} handler={setOpenPopover1}>
                  <PopoverHandler {...triggers}>
                    <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute"></div>
                  </PopoverHandler>
                  <SGTeamInfopopup
                    name={"Pallavi Sulkekar"}
                    src={"img/pallavi_sulkekar_jrkg.png"}
                    desc={`Jr.kg Teacher`}
                  />
                </Popover> */}
              </div>
              <h4>Samruddhi Jagtap</h4>
              <i>Sr.kg Teacher</i>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="text-center pb-2">
            <p className="section-title px-5">
              <span className="px-2">Our 1St Standard Teachers</span>
            </p>
            <h1 className="mb-4">Meet Our Teachers</h1>
          </div>
          <div className="row justify-center">
            <div className="col-md-6 col-lg-3 text-center team mb-5">
              <div
                className="position-relative overflow-hidden mb-4"
                style={{ borderRadius: "100%" }}
              >
                <img
                  className="img-fluid w-100"
                  src="img/utkarsha_Suryawanshi_1st.png"
                  alt=""
                />
              </div>
              <h4>Utkarsha Suryawanshi</h4>
              <i> 1ST Standard Teacher</i>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Team End --> */}
    </>
  );
};

export default Teachers;
