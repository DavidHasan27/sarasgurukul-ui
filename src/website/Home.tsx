import badge from "../view/assets/badge.png";
import classroom from "../view/assets/classroom.png";
import group from "../view/assets/group.png";
import degree from "../view/assets/bachelor.png";
import handshake from "../view/assets/hand-shake.png";
import intrgrity from "../view/assets/integration.png";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
// import { Carousel } from "@material-tailwind/react";
// import Carousel from "react-bootstrap/Carousel";

const Home = () => {
  console.log("ABC2");
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
            <h4 className="text-white mb-4 mt-5 mt-lg-0 font-semibold">
              Sara's Gurukul Center
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
            <a href="" className="btn btn-secondary mt-1 py-3 px-5">
              Learn More
            </a>
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
                  alt=""
                />
              </div>

              <div className="w-full flex items-center justify-center ">
                <img
                  className="img-fluid mt-4  w-auto "
                  src="img/header-33.png"
                  alt=""
                />
              </div>

              <div className="w-full  flex items-center justify-center">
                <img
                  className="img-fluid mt-4  w-auto"
                  src="img/header-44.png"
                  alt=""
                />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
      {/* <!-- Header End --> */}

      {/* <!-- Facilities Start --> */}
      <div className="container-fluid pt-5">
        <div className="container pb-3">
          <div className="row">
            <div className="col-lg-4 col-md-6 pb-1 ">
              <div
                className="d-flex shadow-sm  rounded mb-4  h-[200px] bg-[#ffe7d5] border-[#e9390d]"
                style={{ padding: 30, borderBottomWidth: 7 }}
              >
                <div className="pl-4">
                  <h4 className="font-extrabold text-[#430c07] text-left text-xl">
                    QUALITY
                  </h4>
                  <p className="m-0 text-[#7c1e12] text-left mt-1">
                    We Believe every child deserves excellence in early programs
                    and service to make a difference in their lives and our
                    community.
                  </p>
                </div>
                {/* <i className="flaticon-050-fence h1 font-weight-normal text-primary mb-3"></i> */}

                <img src={badge} className="h-[60px]" alt="" />
              </div>
            </div>
            <div className="col-lg-4 col-md-6 pb-1">
              <div
                className="d-flex shadow-sm rounded mb-4 h-[200px]  bg-[#ffe7d5] border-[#e9390d]"
                style={{ padding: 30, borderBottomWidth: 7 }}
              >
                {/* <i className="flaticon-022-drum h1 font-weight-normal text-primary mb-3"></i> */}
                <div className="pl-4">
                  <h4 className="font-extrabold text-[#430c07] text-left text-xl">
                    INTEGRITY
                  </h4>
                  <p className="m-0 text-[#7c1e12] text-left mt-1">
                    We believe integrity is the bedrock of a trustworthy
                    orgnization which promotes effective relationship & assures
                    mindful stewadship of state resource.
                  </p>
                </div>

                <img
                  src={intrgrity}
                  height={64}
                  width={64}
                  className="h-[60px] text-[#fff]"
                  alt=""
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-6 pb-1">
              <div
                className="d-flex shadow-sm rounded mb-4 h-[200px]  bg-[#ffe7d5] border-[#e9390d]"
                style={{ padding: 30, borderBottomWidth: 7 }}
              >
                <div className="pl-4">
                  <h4 className="font-extrabold text-[#430c07] text-left text-xl">
                    SERVICE
                  </h4>
                  <p className="m-0 text-[#7c1e12] text-left mt-1">
                    We believe families and providers are unique and we strive
                    to understand, appreciate & serve their needs
                  </p>
                </div>
                <img src={classroom} className="h-[60px] text-[#fff]" alt="" />
              </div>
            </div>
            <div className="col-lg-4 col-md-6 pb-1">
              <div
                className="d-flex  shadow-sm  rounded mb-4 h-[200px]  bg-[#ffe7d5] border-[#e9390d]"
                style={{ padding: 30, borderBottomWidth: 7 }}
              >
                {/* <i className="flaticon-017-toy-car h1 font-weight-normal text-primary mb-3"></i> */}
                <div className="pl-4">
                  <h4 className="font-extrabold text-[#430c07] text-left text-xl">
                    TEAMWORK
                  </h4>
                  <p className="m-0 text-[#7c1e12] text-left mt-1">
                    We believe working together results in a stronger
                    organization and community.
                  </p>
                </div>
                <img
                  src={group}
                  height={64}
                  width={64}
                  className="h-[60px] text-[#fff]"
                  alt=""
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-6 pb-1">
              <div
                className="d-flex shadow-sm rounded mb-4 h-[200px]  bg-[#ffe7d5] border-[#e9390d]"
                style={{ padding: 30, borderBottomWidth: 7 }}
              >
                {/* <i className="flaticon-025-sandwich h1 font-weight-normal text-primary mb-3"></i> */}
                <div className="pl-4">
                  <h4 className="font-extrabold text-[#430c07] text-left text-xl">
                    RESPECT
                  </h4>
                  <p className="m-0 text-[#7c1e12] text-left mt-1">
                    We Believe respect is essential to building the
                    relationships that are critical to success and optimizing
                    the talents & diversity of our families
                  </p>
                </div>
                <img
                  src={handshake}
                  height={64}
                  width={64}
                  className="h-[60px] text-[#fff]"
                  alt=""
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-6 pb-1">
              <div
                className="d-flex shadow-sm rounded mb-4 h-[200px]  bg-[#ffe7d5] border-[#e9390d]"
                style={{ padding: 30, borderBottomWidth: 7 }}
              >
                {/* <i className="flaticon-047-backpack h1 font-weight-normal text-primary mb-3"></i> */}
                <div className="pl-4">
                  <h4 className="font-extrabold text-[#430c07] text-left text-xl">
                    EDUCATION
                  </h4>
                  <p className="m-0 text-[#7c1e12] text-left mt-1">
                    We believe ongoing education & advocacy promotes positive
                    early learning experiences, providing all children the
                    opportunity to succeed.
                  </p>
                </div>
                <img
                  src={degree}
                  height={64}
                  width={64}
                  className="h-[60px] text-[#fff]"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Facilities Start --> */}

      {/* <!-- About Start --> */}
      <div className="container-fluid py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <img
                className="img-fluid rounded mb-5 mb-lg-0"
                src="img/about-1.jpg"
                alt=""
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
                    alt=""
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

      {/* <!-- Class Start --> */}
      <div className="container-fluid pt-5">
        <div className="container">
          <div className="text-center pb-2">
            <p className="section-title px-5">
              <span className="px-2">Popular Classes</span>
            </p>
            <h1 className="mb-4">Classes for Your Kids</h1>
          </div>
          <div className="row">
            <div className="col-lg-4 mb-5">
              <div className="card border-0 bg-light shadow-sm pb-2">
                <img
                  className="card-img-top mb-2"
                  src="img/class-1.jpg"
                  alt=""
                />
                <div className="card-body text-center">
                  <h4 className="card-title">Drawing Class</h4>
                  <p className="card-text">
                    Justo ea diam stet diam ipsum no sit, ipsum vero et et diam
                    ipsum duo et no et, ipsum ipsum erat duo amet clita duo
                  </p>
                </div>
                <div className="card-footer bg-transparent py-4 px-5">
                  <div className="row border-bottom">
                    <div className="col-6 py-1 text-right border-right">
                      <strong>Age of Kids</strong>
                    </div>
                    <div className="col-6 py-1">3 - 6 Years</div>
                  </div>
                  <div className="row border-bottom">
                    <div className="col-6 py-1 text-right border-right">
                      <strong>Total Seats</strong>
                    </div>
                    <div className="col-6 py-1">40 Seats</div>
                  </div>
                  <div className="row border-bottom">
                    <div className="col-6 py-1 text-right border-right">
                      <strong>Class Time</strong>
                    </div>
                    <div className="col-6 py-1">08:00 - 10:00</div>
                  </div>
                  <div className="row">
                    <div className="col-6 py-1 text-right border-right">
                      <strong>Tution Fee</strong>
                    </div>
                    <div className="col-6 py-1">$290 / Month</div>
                  </div>
                </div>
                <a href="" className="btn btn-primary px-4 mx-auto mb-4">
                  Join Now
                </a>
              </div>
            </div>
            <div className="col-lg-4 mb-5">
              <div className="card border-0 bg-light shadow-sm pb-2">
                <img
                  className="card-img-top mb-2"
                  src="img/class-2.jpg"
                  alt=""
                />
                <div className="card-body text-center">
                  <h4 className="card-title">Language Learning</h4>
                  <p className="card-text">
                    Justo ea diam stet diam ipsum no sit, ipsum vero et et diam
                    ipsum duo et no et, ipsum ipsum erat duo amet clita duo
                  </p>
                </div>
                <div className="card-footer bg-transparent py-4 px-5">
                  <div className="row border-bottom">
                    <div className="col-6 py-1 text-right border-right">
                      <strong>Age of Kids</strong>
                    </div>
                    <div className="col-6 py-1">3 - 6 Years</div>
                  </div>
                  <div className="row border-bottom">
                    <div className="col-6 py-1 text-right border-right">
                      <strong>Total Seats</strong>
                    </div>
                    <div className="col-6 py-1">40 Seats</div>
                  </div>
                  <div className="row border-bottom">
                    <div className="col-6 py-1 text-right border-right">
                      <strong>Class Time</strong>
                    </div>
                    <div className="col-6 py-1">08:00 - 10:00</div>
                  </div>
                  <div className="row">
                    <div className="col-6 py-1 text-right border-right">
                      <strong>Tution Fee</strong>
                    </div>
                    <div className="col-6 py-1">$290 / Month</div>
                  </div>
                </div>
                <a href="" className="btn btn-primary px-4 mx-auto mb-4">
                  Join Now
                </a>
              </div>
            </div>
            <div className="col-lg-4 mb-5">
              <div className="card border-0 bg-light shadow-sm pb-2">
                <img
                  className="card-img-top mb-2"
                  src="img/class-3.jpg"
                  alt=""
                />
                <div className="card-body text-center">
                  <h4 className="card-title">Basic Science</h4>
                  <p className="card-text">
                    Justo ea diam stet diam ipsum no sit, ipsum vero et et diam
                    ipsum duo et no et, ipsum ipsum erat duo amet clita duo
                  </p>
                </div>
                <div className="card-footer bg-transparent py-4 px-5">
                  <div className="row border-bottom">
                    <div className="col-6 py-1 text-right border-right">
                      <strong>Age of Kids</strong>
                    </div>
                    <div className="col-6 py-1">3 - 6 Years</div>
                  </div>
                  <div className="row border-bottom">
                    <div className="col-6 py-1 text-right border-right">
                      <strong>Total Seats</strong>
                    </div>
                    <div className="col-6 py-1">40 Seats</div>
                  </div>
                  <div className="row border-bottom">
                    <div className="col-6 py-1 text-right border-right">
                      <strong>Class Time</strong>
                    </div>
                    <div className="col-6 py-1">08:00 - 10:00</div>
                  </div>
                  <div className="row">
                    <div className="col-6 py-1 text-right border-right">
                      <strong>Tution Fee</strong>
                    </div>
                    <div className="col-6 py-1">$290 / Month</div>
                  </div>
                </div>
                <a href="" className="btn btn-primary px-4 mx-auto mb-4">
                  Join Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Class End --> */}

      {/* <!-- Registration Start --> */}
      <div className="container-fluid py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 mb-5 mb-lg-0 text-left">
              <p className="section-title pr-5">
                <span className="pr-2">Book A Seat</span>
              </p>
              <h1 className="mb-4">Book A Seat For Your Kid</h1>
              <p>
                Invidunt lorem justo sanctus clita. Erat lorem labore ea, justo
                dolor lorem ipsum ut sed eos, ipsum et dolor kasd sit ea justo.
                Erat justo sed sed diam. Ea et erat ut sed diam sea ipsum est
                dolor
              </p>
              <ul className="list-inline m-0">
                <li className="py-2">
                  <i className="fa fa-check text-success mr-3"></i>Labore eos
                  amet dolor amet diam
                </li>
                <li className="py-2">
                  <i className="fa fa-check text-success mr-3"></i>Etsea et sit
                  dolor amet ipsum
                </li>
                <li className="py-2">
                  <i className="fa fa-check text-success mr-3"></i>Diam dolor
                  diam elitripsum vero.
                </li>
              </ul>
              <a href="" className="btn btn-primary mt-4 py-2 px-4">
                Book Now
              </a>
            </div>
            <div className="col-lg-5">
              <div className="card border-0">
                <div className="card-header bg-secondary text-center p-4">
                  <h1 className="text-white m-0">Book A Seat</h1>
                </div>
                <div className="card-body rounded-bottom bg-primary p-5">
                  <form>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control border-0 p-4"
                        placeholder="Your Name"
                        required={true}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control border-0 p-4"
                        placeholder="Your Email"
                        required={true}
                      />
                    </div>
                    <div className="form-group">
                      <select
                        className="custom-select border-0 px-4"
                        style={{ height: 47 }}
                      >
                        <option selected>Select A Class</option>
                        <option value="1">Class 1</option>
                        <option value="2">Class 1</option>
                        <option value="3">Class 1</option>
                      </select>
                    </div>
                    <div>
                      <button
                        className="btn btn-secondary btn-block border-0 py-3"
                        type="submit"
                      >
                        Book Now
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Registration End --> */}

      {/* <!-- Team Start --> */}
      <div className="container-fluid pt-5">
        <div className="container">
          <div className="text-center pb-2">
            <p className="section-title px-5">
              <span className="px-2">Our Team</span>
            </p>
            <h1 className="mb-4 text-4xl">Meet Our Teams</h1>
          </div>
          <div className="row justify-center">
            <div className="col-md-6 col-lg-3 text-center team mb-5">
              <div
                className="position-relative overflow-hidden mb-4"
                style={{ borderRadius: "100%" }}
              >
                <img className="img-fluid w-100" src="img/team-1.jpg" alt="" />
                <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute">
                  {/* <a
                    className="btn btn-outline-light text-center mr-2 px-0"
                    style={{ width: 38, height: 38 }}
                    href="#"
                  >
                    <i className="fab fa-twitter"></i>
                  </a> */}
                  <a
                    className="btn btn-outline-light text-center mr-2 px-0"
                    style={{ width: 38, height: 38 }}
                    href="https://www.facebook.com/profile.php?id=100006003555225"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  {/* <a
                    className="btn btn-outline-light text-center px-0"
                    style={{ width: 38, height: 38 }}
                    href="#"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a> */}
                </div>
              </div>
              <h4>Sarika Ozarkar</h4>
              <i>Founder & Creative Director</i>
            </div>
            <div className="col-md-6 col-lg-3 text-center team mb-5">
              <div
                className="position-relative overflow-hidden mb-4"
                style={{ borderRadius: "100%" }}
              >
                <img className="img-fluid w-100" src="img/team-2.jpg" alt="" />
                <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute">
                  {/* <a
                    className="btn btn-outline-light text-center mr-2 px-0"
                    style={{ width: 38, height: 38 }}
                    href="#"
                  >
                    <i className="fab fa-twitter"></i>
                  </a> */}
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
                </div>
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
            <h1 className="mb-4">Latest Articles From Blog</h1>
          </div>
          <div className="row pb-3">
            <div className="col-lg-4 mb-4">
              <div className="card border-0 shadow-sm mb-2">
                <img
                  className="card-img-top mb-2"
                  src="img/blog-1.jpg"
                  alt=""
                />
                <div className="card-body bg-light text-center p-4">
                  <h4 className="">Diam amet eos at no eos</h4>
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
                    Sed kasd sea sed at elitr sed ipsum justo, sit nonumy diam
                    eirmod, duo et sed sit eirmod kasd clita tempor dolor stet
                    lorem. Tempor ipsum justo amet stet...
                  </p>
                  <a href="" className="btn btn-primary px-4 mx-auto my-2">
                    Read More
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="card border-0 shadow-sm mb-2">
                <img
                  className="card-img-top mb-2"
                  src="img/blog-2.jpg"
                  alt=""
                />
                <div className="card-body bg-light text-center p-4">
                  <h4 className="">Diam amet eos at no eos</h4>
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
                    Sed kasd sea sed at elitr sed ipsum justo, sit nonumy diam
                    eirmod, duo et sed sit eirmod kasd clita tempor dolor stet
                    lorem. Tempor ipsum justo amet stet...
                  </p>
                  <a href="" className="btn btn-primary px-4 mx-auto my-2">
                    Read More
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="card border-0 shadow-sm mb-2">
                <img
                  className="card-img-top mb-2"
                  src="img/blog-3.jpg"
                  alt=""
                />
                <div className="card-body bg-light text-center p-4">
                  <h4 className="">Diam amet eos at no eos</h4>
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
                    Sed kasd sea sed at elitr sed ipsum justo, sit nonumy diam
                    eirmod, duo et sed sit eirmod kasd clita tempor dolor stet
                    lorem. Tempor ipsum justo amet stet...
                  </p>
                  <a href="" className="btn btn-primary px-4 mx-auto my-2">
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
