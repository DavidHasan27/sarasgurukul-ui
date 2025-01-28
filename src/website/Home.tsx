import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Facilities from "../component/web-component/Facilities";
import ClassView from "../component/web-component/Class";
import ReactGA from "react-ga";
import { Typography } from "@material-tailwind/react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { RAHATANI_BRANCH } from "../utils/constants";
import { useNavigate } from "react-router-dom";
// import { Carousel } from "@material-tailwind/react";
// import Carousel from "react-bootstrap/Carousel";

const Home = () => {
  console.log("ABC2");
  const branch = useAppSelector((state: any) => state.website.branch);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <>
      {/* Navbar Start  */}
      {/* <div className="container-fluid bg-light position-relative shadow">
        <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0 px-lg-5">
          <a href="" className="navbar-brand font-weight-bold text-secondary">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                textAlign: "left",
              }}
            >
              <img src="img/Saras-300.png" style={{ height: 80 }}></img>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: 16,
                }}
              >
                <span
                  style={{
                    color: "#FA6D2E",
                    fontFamily: "GFS Didot",
                    fontWeight: 700,
                    fontSize: 40,
                    lineHeight: 1,
                  }}
                >
                  SARA's Gurukul
                </span>
                <span
                  style={{
                    color: "#FA6D2E",
                    fontFamily: "GFS Didot",
                    fontSize: 16,
                  }}
                >
                  Pre-Primary School
                </span>
              </div>
            </div>
          </a>
          <button
            type="button"
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarCollapse"
          >
            <div className="navbar-nav font-weight-bold mx-auto py-0">
              <a href="index.html" className="nav-item nav-link active">
                Home
              </a>
              <a href="about.html" className="nav-item nav-link">
                About
              </a>
              <a href="className.html" className="nav-item nav-link">
                Class
              </a>
              <a href="team.html" className="nav-item nav-link">
                Teachers
              </a>
              <a href="gallery.html" className="nav-item nav-link">
                Gallery
              </a>
              <div className="nav-item dropdown">
                <a
                  href="#"
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                >
                  Pages
                </a>
                <div className="dropdown-menu rounded-0 m-0">
                  <a href="blog.html" className="dropdown-item">
                    Blog Grid
                  </a>
                  <a href="single.html" className="dropdown-item">
                    Blog Detail
                  </a>
                </div>
              </div>
              <a href="contact.html" className="nav-item nav-link">
                Contact
              </a>

              <div className="nav-item dropdown">
                <a
                  href="#"
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                >
                  Branch
                </a>
                <div className="dropdown-menu rounded-0 m-0">
                  <a href="blog.html" className="dropdown-item">
                    Kalewadi
                  </a>
                  <a href="single.html" className="dropdown-item">
                    Hinjewadi
                  </a>
                </div>
              </div>
            </div>


            <a href="" className="btn btn-primary px-4">
              Login
            </a>
          </div>
        </nav>
      </div> */}
      {/* <!-- Navbar End --> */}

      {/* <!-- Header Start --> */}
      <div
        className="container-fluid bg-org-image px-0 px-md-5 mb-5"
        style={{ overflowY: "hidden" }}
        // style={{ backgroundColor: "#0169B5" }}
      >
        <div className="row align-items-center px-3">
          <div className="col-lg-6 text-center text-lg-left">
            <h3 className="text-white mb-4 mt-5 mt-lg-0 font-semibold"></h3>
            <h4 className="text-white mb-4 mt-5 mt-lg-0 font-semibold">
              Sara's Gurukul Center Operated by{" "}
              <strong className="font-bold text-xl text-[#FFF9F0]">
                DINKAR DHAM TRUST'S
              </strong>
            </h4>
            <h1
              className="display-3 font-weight-bold"
              style={{ color: "#FFF9F0" }}
            >
              New Approach to Kids Education
            </h1>
            <h4 className="text-white mb-4 font-semibold tracking-wide">
              SARA's Gurukul is a high quality preschool program designed to
              provide a strong foundation for children's learning & development.
            </h4>
            {/* <a href="" className="btn btn-secondary mt-1 py-3 px-5">
              Learn More
            </a> */}
          </div>
          <div className="col-lg-6 text-center text-lg-right  flex justify-center">
            <Carousel
              className="rounded-xl w-full"
              infiniteLoop={false}
              interval={5000}
              centerMode={false}
              showThumbs={false}
              transitionTime={1000}
              showArrows={false}
              swipeable={true}
              showStatus={false}
              autoPlay={true}
            >
              <div className="w-full  flex items-center justify-center ">
                <img
                  className="img-fluid mt-4  w-auto"
                  src="img/header.png"
                  alt="Saras Gurukul"
                />
              </div>

              <div className="w-full flex items-center justify-center ">
                <img
                  className="img-fluid mt-4  w-auto "
                  src="img/header-33.png"
                  alt="Saras Gurukul Vision"
                />
              </div>

              <div className="w-full  flex items-center justify-center">
                <img
                  className="img-fluid mt-4  w-auto"
                  src="img/header-44.png"
                  alt="Saras Gurukul Mission"
                />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
      {/* <!-- Header End --> */}

      {/* <!-- Facilities Start --> */}
      <Facilities />
      {/* <!-- Facilities Start --> */}

      {/* <!-- About Start --> */}
      <div className="container-fluid py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <img
                className="img-fluid rounded mb-5 mb-lg-0"
                src="img/about-1.jpg"
                alt="About Us"
              />
            </div>
            <div className="col-lg-7 text-left">
              <p className="section-title pr-5">
                <span className="pr-2 text-left">Learn About Us</span>
              </p>
              <h1 className="mb-4 mt-2 text-4xl text-[#430c07]">
                Best School For Your Kids
              </h1>
              <p className="text-[#7c1e12]">
                We at SARA’s Gurukul Are Preschool, the Foundation of Your
                little One's Life. Your little one will bloom in an environment
                of love and affection.
              </p>
              <div className="row pt-2 pb-4">
                <div className="col-6 col-md-4">
                  <img
                    className="img-fluid rounded"
                    src="img/about-2.jpg"
                    alt="About us"
                  />
                </div>
                <div className="col-6 col-md-8">
                  <ul className="list-inline m-0 text-[#7c1e12]">
                    <li className="py-2 border-top border-bottom">
                      <i className="fa fa-check text-[#e9390d] mr-3"></i>
                      Why Sara's Gurukul ?
                    </li>
                    <li className="py-2 border-bottom">
                      <i className="fa fa-check text-[#e9390d] mr-3"></i>
                      Child Care
                    </li>
                    <li className="py-2 border-bottom">
                      <i className="fa fa-check text-[#e9390d] mr-3"></i>
                      Extra Activities
                    </li>
                  </ul>
                </div>
              </div>
              <a href="/about" className="btn btn-primary mt-2 py-2 px-4">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- About End --> */}

      <ClassView />

      {/* <!-- Team Start --> */}
      <div className="container-fluid pt-5">
        <div className="container">
          <div className="text-center pb-2">
            <p className="section-title px-5">
              <span className="px-2">Our Team</span>
            </p>
            <h1 className="mb-4 text-4xl text-[#430c07]">Meet Our Teams</h1>
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
                  {/* <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute">
                  <a
                    className="btn btn-outline-light text-center mr-2 px-0"
                    style={{ width: 38, height: 38 }}
                    href="https://www.facebook.com/shashidhar.birajdar"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    className="btn btn-outline-light text-center px-0"
                    style={{ width: 38, height: 38 }}
                    href="https://www.linkedin.com/in/shashidhar-birajdar-a836b8189/"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div> */}
                </div>
                <h4>Shashidhar Birajdar</h4>
                <i>Founder</i>
              </div>
              {/* <div className="col-md-6 col-lg-3 text-center team mb-5">
              <div
                className="position-relative overflow-hidden mb-4"
                // style="border-radius: 100%"
                style={{ borderRadius: "100%" }}
              >
                <img className="img-fluid w-100" src="img/team-3.jpg" alt="" />
                <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute">
                  <a
                    className="btn btn-outline-light text-center mr-2 px-0"
                    style={{ width: 38, height: 38 }}
                    href="https://www.facebook.com/shashidhar.birajdar"
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
                    href="https://www.facebook.com/shashidhar.birajdar"
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
                // style="border-radius: 100%"
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
                    src="img/team-2.jpg"
                    alt=""
                  />
                  {/* <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute">
                  <a
                    className="btn btn-outline-light text-center mr-2 px-0"
                    style={{ width: 38, height: 38 }}
                    href="https://www.facebook.com/shashidhar.birajdar"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    className="btn btn-outline-light text-center px-0"
                    style={{ width: 38, height: 38 }}
                    href="https://www.linkedin.com/in/shashidhar-birajdar-a836b8189/"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div> */}
                </div>
                <h4>Shashidhar Birajdar</h4>
                <i>Founder & Creative Director</i>
              </div>
              <div className="col-md-6 col-lg-3 text-center team mb-5">
                <div
                  className="position-relative overflow-hidden mb-4"
                  style={{ borderRadius: "100%" }}
                >
                  <img
                    className="img-fluid w-100"
                    src="img/team-5.jpg"
                    alt=""
                  />
                </div>
                <h4>Vanita Raghawant</h4>
                <i>Partner</i>
              </div>

              {/* <div className="col-md-6 col-lg-3 text-center team mb-5">
              <div
                className="position-relative overflow-hidden mb-4"
                // style="border-radius: 100%"
                style={{ borderRadius: "100%" }}
              >
                <img className="img-fluid w-100" src="img/team-3.jpg" alt="" />
                <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute">
                  <a
                    className="btn btn-outline-light text-center mr-2 px-0"
                    style={{ width: 38, height: 38 }}
                    href="https://www.facebook.com/shashidhar.birajdar"
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
                    href="https://www.facebook.com/shashidhar.birajdar"
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
                // style="border-radius: 100%"
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
            </div> */}
            </div>
          )}
        </div>
      </div>
      {/* <!-- Team End --> */}

      {/* <!-- Testimonial Start --> */}
      {/* <div className="container-fluid py-5">
        <div className="container p-0">
          <div className="text-center pb-2">
            <p className="section-title px-5">
              <span className="px-2">Testimonial</span>
            </p>
            <h1 className="mb-4">What Parents Say!</h1>
          </div>
          <div className="owl-carousel testimonial-carousel">
            <div className="testimonial-item px-3">
              <div className="bg-light shadow-sm rounded mb-4 p-4">
                <h3 className="fas fa-quote-left text-primary mr-3"></h3>
                Sed ea amet kasd elitr stet, stet rebum et ipsum est duo elitr
                eirmod clita lorem. Dolor tempor ipsum clita
              </div>
              <div className="d-flex align-items-center">
                <img
                  className="rounded-circle"
                  src="img/testimonial-1.jpg"
                  style={{ width: 70, height: 70 }}
                  alt="Image"
                />
                <div className="pl-3">
                  <h5>Parent Name</h5>
                  <i>Profession</i>
                </div>
              </div>
            </div>
            <div className="testimonial-item px-3">
              <div className="bg-light shadow-sm rounded mb-4 p-4">
                <h3 className="fas fa-quote-left text-primary mr-3"></h3>
                Sed ea amet kasd elitr stet, stet rebum et ipsum est duo elitr
                eirmod clita lorem. Dolor tempor ipsum clita
              </div>
              <div className="d-flex align-items-center">
                <img
                  className="rounded-circle"
                  src="img/testimonial-2.jpg"
                  style={{ width: 70, height: 70 }}
                  alt="Image"
                />
                <div className="pl-3">
                  <h5>Parent Name</h5>
                  <i>Profession</i>
                </div>
              </div>
            </div>
            <div className="testimonial-item px-3">
              <div className="bg-light shadow-sm rounded mb-4 p-4">
                <h3 className="fas fa-quote-left text-primary mr-3"></h3>
                Sed ea amet kasd elitr stet, stet rebum et ipsum est duo elitr
                eirmod clita lorem. Dolor tempor ipsum clita
              </div>
              <div className="d-flex align-items-center">
                <img
                  className="rounded-circle"
                  src="img/testimonial-3.jpg"
                  style={{ width: 70, height: 70 }}
                  alt="Image"
                />
                <div className="pl-3">
                  <h5>Parent Name</h5>
                  <i>Profession</i>
                </div>
              </div>
            </div>
            <div className="testimonial-item px-3">
              <div className="bg-light shadow-sm rounded mb-4 p-4">
                <h3 className="fas fa-quote-left text-primary mr-3"></h3>
                Sed ea amet kasd elitr stet, stet rebum et ipsum est duo elitr
                eirmod clita lorem. Dolor tempor ipsum clita
              </div>
              <div className="d-flex align-items-center">
                <img
                  className="rounded-circle"
                  src="img/testimonial-4.jpg"
                  style={{ width: 70, height: 70 }}
                  alt="Image"
                />
                <div className="pl-3">
                  <h5>Parent Name</h5>
                  <i>Profession</i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* <!-- Testimonial End --> */}

      {/* <!-- Blog Start --> */}
      <div className="container-fluid pt-5">
        <div className="container">
          <div className="text-center pb-2">
            <p className="section-title px-5">
              <span className="px-2">Latest Blog</span>
            </p>
            <h1 className="mb-4 text-4xl text-[#430c07]">
              Latest Articles From Blog
            </h1>
          </div>
          <div className="row pb-3 items-center justify-center ">
            <div className="col-lg-4 mb-4">
              <div className="card border-0 shadow-sm mb-2">
                <img
                  className="card-img-top mb-2"
                  src="img/blog-1.jpg"
                  alt="Saras Gurukul Blog"
                />

                <div className="card-body bg-[#ffe7d5] text-center p-4 h-[230px]">
                  <h4
                    className="text-[#7c1e12] font-extrabold"
                    aria-label="Saras gurukul Founder Messsage"
                  >
                    FOUNDER'S MESSAGE
                  </h4>
                  <div className="d-flex justify-content-center mb-3">
                    <small className="mr-3">
                      <i className="fa fa-user text-primary"></i> Admin
                    </small>
                    <small className="mr-3">
                      <i className="fa fa-folder text-primary"></i> Saras
                      gurukul
                    </small>
                    <small className="mr-3">
                      <i className="fa fa-comments text-primary"></i> 15
                    </small>
                  </div>
                  <p>
                    I extend a very hearty welcome to you as a parent who has
                    shown interest in Sara's Gurukul.
                  </p>
                  <a
                    href="/blog-details?id=1"
                    className="btn btn-primary px-4 mx-auto my-2"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="card border-0 shadow-sm mb-2 ">
                <img
                  className="card-img-top mb-2"
                  src="img/blog-2.jpg"
                  alt="Saras Gurukul Blog"
                />
                <div className="card-body bg-[#ffe7d5]  text-center p-4 h-[230px]">
                  <h4
                    className="text-[#7c1e12] font-extrabold"
                    aria-label="KIDS JOURNEY"
                  >
                    KIDS JOURNEY
                  </h4>
                  <div className="d-flex justify-content-center mb-3">
                    <small className="mr-3">
                      <i className="fa fa-user text-primary"></i> Admin
                    </small>
                    <small className="mr-3">
                      <i className="fa fa-folder text-primary"></i> Web Design
                    </small>
                    <small className="mr-3">
                      <i className="fa fa-comments text-primary"></i> 15
                    </small>
                  </div>
                  <p>
                    At Journey Kids your child will be welcomed into a safe,
                    caring environment where they can learn, explore, create and
                    have fun!
                  </p>
                  <a
                    href="/blog-details?id=2"
                    className="btn btn-primary px-4 mx-auto my-2"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Blog End --> */}

      {/* <!-- Back to Top --> */}
      <a href="#" className="btn btn-primary p-3 back-to-top">
        <i className="fa fa-angle-double-up"></i>
      </a>
    </>
  );
};

export default Home;
