import Facilities from "../component/web-component/Facilities";
const About = () => {
  return (
    <>
      {/* <!-- Header Start --> */}
      <div className="container-fluid bg-sub-head-image mb-5">
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: 400 }}
        >
          <h3 className="display-3 font-weight-bold text-white">About Us</h3>
          <div className="d-inline-flex text-white">
            <p className="m-0">
              <a className="text-white" href="/">
                Home
              </a>
            </p>
            <p className="m-0 px-2">/</p>
            <p className="m-0">About Us</p>
          </div>
        </div>
      </div>
      {/* <!-- Header End --> */}
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
                <span className="pr-2">Learn About Us</span>
              </p>
              <h1 className="mb-4 mt-1 text-4xl text-[#430c07]">
                Best School For Your Kids
              </h1>
              <p className="text-[#7c1e12]">
                We at <strong>SARA’s Gurukul</strong> Are Preschool, the
                Foundation of Your little One's Life. Your little one will bloom
                in an environment of love and affection. At SARA’s Gurukul, we
                encourage every child to keep trying and learning, enabling them
                to believe what they do. Our goal is to create and maintain an
                effective learning environment, enabling a range of
                opportunities to promote excellence, confidence, and self-esteem
                in every child. Encouraging creativity, basic etiquettes and
                positivity towards life.
              </p>
              <p className="text-[#7c1e12]">
                At SARA’s Gurukul, we believe that every child should be given
                the opportunity to keep trying and learning, instilling in them
                the belief that they can accomplish anything they set their
                minds to. We are committed to creating and maintaining an
                effective learning environment that promotes excellence,
                confidence, and self-esteem in every child.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- About End --> */}
      {/* <!-- Activity Start --> */}
      <div className="container-fluid pt-5">
        <div className="container">
          <div className="text-center pb-2">
            <p className="section-title px-5">
              <span className="px-2">About US</span>
            </p>
            <h1 className="mb-4 text-4xl mt-1 text-[#430c07]">
              Facilities for Your Kids
            </h1>
          </div>
          <div className="row">
            <div className="col-lg-4 mb-5">
              <div className="card border-0 bg-[#fff4ed] shadow-sm pb-2">
                {/* <img
                  className="card-img-top mb-2"
                  src="img/class-1.jpg"
                  alt=""
                /> */}
                <div className="flex h-[40px] bg-[#e9390d] rounded-t-md items-center justify-center">
                  <span className="text-[#fff4ed] font-bold">
                    Why Sara's Gurukul ?
                  </span>
                </div>
                <div className="card-body text-center">
                  {/* <h4 className="card-title">Why Sara's Gurukul ?</h4> */}

                  <div className="text-left inline-flex items-center w-full">
                    <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                    <p className="ml-[16px]">
                      <strong>Prime Location.</strong>
                    </p>
                  </div>
                  <div className="text-left inline-flex items-center w-full mt-2">
                    <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                    <p className="ml-[16px]">
                      <strong>Most affordable School in nearby area.</strong>
                    </p>
                  </div>

                  <div className="text-left inline-flex items-center w-full  mt-2">
                    <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                    <p className="ml-[16px]">
                      <strong>CBSE Pattern (NCRT Syllabus).</strong>
                    </p>
                  </div>
                  <div className="text-left inline-flex items-center w-full  mt-2">
                    <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                    <p className="ml-[16px]">
                      <strong>Expert and experienced faculty.</strong>
                    </p>
                  </div>
                </div>
              </div>

              <div className="card border-0 bg-[#fff4ed] shadow-sm pb-2 mt-3">
                {/* <img
                  className="card-img-top mb-2"
                  src="img/class-1.jpg"
                  alt=""
                /> */}
                <div className="flex h-[40px] bg-[#e9390d] rounded-t-md items-center justify-center">
                  <span className="text-[#fff4ed] font-bold">
                    Extra Activities
                  </span>
                </div>
                <div className="card-body text-center">
                  {/* <h4 className="card-title">Why Sara's Gurukul ?</h4> */}

                  <div className="text-left inline-flex items-center w-full">
                    <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                    <p className="ml-[16px]">
                      <strong>
                        Exposer to computer technology through activity and
                        games.
                      </strong>
                    </p>
                  </div>
                  <div className="text-left inline-flex items-center w-full mt-2">
                    <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                    <p className="ml-[16px]">
                      <strong>Virtual history sessions.</strong>
                    </p>
                  </div>

                  <div className="text-left inline-flex items-center w-full  mt-2">
                    <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                    <p className="ml-[16px]">
                      <strong>Daily physical activities.</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 mb-5">
              <div className="card border-0 bg-[#fff4ed] shadow-sm pb-2 h-[430px]">
                <div className="flex h-[40px] bg-[#e9390d] rounded-t-md items-center justify-center">
                  <span className="text-[#fff4ed] font-bold">Our Campus</span>
                </div>
                <div className="card-body text-center">
                  {/* <h4 className="card-title">Why Sara's Gurukul ?</h4> */}

                  <div className="text-left inline-flex items-center w-full">
                    <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                    <p className="ml-[16px]">
                      <strong>CCTV coverage throughout campus</strong>
                    </p>
                  </div>
                  <div className="text-left inline-flex items-center w-full mt-2">
                    <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                    <p className="ml-[16px]">
                      <strong>Kids friendly furniture.</strong>
                    </p>
                  </div>

                  <div className="text-left inline-flex items-center w-full  mt-2">
                    <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                    <p className="ml-[16px]">
                      <strong>Complete floor foam cushioning.</strong>
                    </p>
                  </div>
                  <div className="text-left inline-flex items-center w-full  mt-2">
                    <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                    <p className="ml-[16px]">
                      <strong>Dedicated area for kids pick and drop.</strong>
                    </p>
                  </div>

                  <div className="text-left inline-flex items-center w-full  mt-2">
                    <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                    <p className="ml-[16px]">
                      <strong>
                        Continuous ventilation throughout the classrooms.
                      </strong>
                    </p>
                  </div>

                  <div className="text-left inline-flex items-center w-full  mt-2">
                    <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                    <p className="ml-[16px]">
                      <strong>Inverter and Power backup.</strong>
                    </p>
                  </div>

                  <div className="text-left inline-flex items-center w-full  mt-2">
                    <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                    <p className="ml-[16px]">
                      <strong>Safe and secured atmosphere.</strong>
                    </p>
                  </div>

                  <div className="text-left inline-flex items-center w-full  mt-2">
                    <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                    <p className="ml-[16px]">
                      <strong>
                        Dedicated specious floor for kid's indoor play area.
                      </strong>
                    </p>
                  </div>

                  <div className="text-left inline-flex items-center w-full  mt-2">
                    <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                    <p className="ml-[16px]">
                      <strong>Age-appropriate toys.</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 mb-5">
              <div className="card border-0 bg-[#fff4ed] shadow-sm pb-2 h-[430px]">
                <div className="flex h-[40px] bg-[#e9390d] rounded-t-md items-center justify-center">
                  <span className="text-[#fff4ed] font-bold">Child Care</span>
                </div>
                <div className="card-body text-center">
                  {/* <h4 className="card-title">Why Sara's Gurukul ?</h4> */}

                  <div className="text-left inline-flex items-center w-full">
                    <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                    <p className="ml-[16px]">
                      <strong>
                        Doctor on call available throughout the school timing.
                      </strong>
                    </p>
                  </div>
                  <div className="text-left inline-flex items-center w-full mt-2">
                    <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                    <p className="ml-[16px]">
                      <strong>Fully hygienic classrooms.</strong>
                    </p>
                  </div>

                  <div className="text-left inline-flex items-center w-full  mt-2">
                    <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                    <p className="ml-[16px]">
                      <strong>RO/UV/UF/TDS Water filter.</strong>
                    </p>
                  </div>
                  <div className="text-left inline-flex items-center w-full  mt-2">
                    <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                    <p className="ml-[16px]">
                      <strong>
                        Every 6 months free dental check-ups camp in school
                        campus.
                      </strong>
                    </p>
                  </div>

                  <div className="text-left inline-flex items-center w-full  mt-2">
                    <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                    <p className="ml-[16px]">
                      <strong>Periodic health checkup in school campus.</strong>
                    </p>
                  </div>

                  <div className="text-left inline-flex items-center w-full  mt-2">
                    <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                    <p className="ml-[16px]">
                      <strong>
                        Free govt. vaccination drive in the school campus.
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Activity End --> */}
      {/* <!-- Celibration Start --> */}
      <div className="container-fluid pt-5">
        <div className="container">
          <div className="text-center pb-2">
            <p className="section-title px-5">
              <span className="px-2">Our Celebrations</span>
            </p>
            <h1 className="mb-4 text-4xl mt-1 text-[#430c07]">
              Celibration In Acadmic Year
            </h1>
          </div>
          <div className="container">
            <div className="flex h-[40px] w-full bg-[#e9390d] rounded-t-md items-center justify-center">
              <span className="text-[#e3ac8a] font-bold">Celibrations</span>
            </div>
            <div className="row bg-[#fff4ed] w-full  pt-[10px] ml-[1px] shadow-md rounded-b-md">
              <div className="col-lg-3 mb-5 mt-3">
                <div className="text-left inline-flex items-center w-full">
                  <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                  <p className="ml-[16px]">
                    <strong>Foot Print Day</strong>
                  </p>
                </div>
                <div className="text-left inline-flex items-center w-full mt-2">
                  <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                  <p className="ml-[16px]">
                    <strong> Balloon Day</strong>
                  </p>
                </div>

                <div className="text-left inline-flex items-center w-full mt-2">
                  <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                  <p className="ml-[16px]">
                    <strong>Chocolate Day</strong>
                  </p>
                </div>
                <div className="text-left inline-flex items-center w-full mt-2">
                  <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                  <p className="ml-[16px]">
                    <strong>Plantation Day</strong>
                  </p>
                </div>
                <div className="text-left inline-flex items-center w-full mt-2">
                  <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                  <p className="ml-[16px]">
                    <strong>Visit to Vegetable Market</strong>
                  </p>
                </div>
                <div className="text-left inline-flex items-center w-full mt-2">
                  <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                  <p className="ml-[16px]">
                    <strong>Ramzan EID</strong>
                  </p>
                </div>

                <div className="text-left inline-flex items-center w-full mt-2">
                  <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                  <p className="ml-[16px]">
                    <strong>Lokmanya Tilak Punyatithi</strong>
                  </p>
                </div>
              </div>

              <div className="col-lg-3 mb-5 mt-3">
                <div className="text-left inline-flex items-center w-full">
                  <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                  <p className="ml-[16px]">
                    <strong>Friendship Day</strong>
                  </p>
                </div>
                <div className="text-left inline-flex items-center w-full mt-2">
                  <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                  <p className="ml-[16px]">
                    <strong> Independence Day</strong>
                  </p>
                </div>

                <div className="text-left inline-flex items-center w-full mt-2">
                  <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                  <p className="ml-[16px]">
                    <strong>Nagpanchami</strong>
                  </p>
                </div>
                <div className="text-left inline-flex items-center w-full mt-2">
                  <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                  <p className="ml-[16px]">
                    <strong>Janmashtami</strong>
                  </p>
                </div>
                <div className="text-left inline-flex items-center w-full mt-2">
                  <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                  <p className="ml-[16px]">
                    <strong>Bail Pola</strong>
                  </p>
                </div>
                <div className="text-left inline-flex items-center w-full mt-2">
                  <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                  <p className="ml-[16px]">
                    <strong>Ganpati Festival</strong>
                  </p>
                </div>

                <div className="text-left inline-flex items-center w-full mt-2">
                  <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                  <p className="ml-[16px]">
                    <strong>Visit to Park</strong>
                  </p>
                </div>
              </div>

              <div className="col-lg-3 mb-5 mt-3">
                <div className="text-left inline-flex items-center w-full">
                  <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                  <p className="ml-[16px]">
                    <strong>Gandhi Jayanti</strong>
                  </p>
                </div>
                <div className="text-left inline-flex items-center w-full mt-2">
                  <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                  <p className="ml-[16px]">
                    <strong>Lal Bahadur Jayanti</strong>
                  </p>
                </div>

                <div className="text-left inline-flex items-center w-full mt-2">
                  <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                  <p className="ml-[16px]">
                    <strong>Navratri Festival</strong>
                  </p>
                </div>
                <div className="text-left inline-flex items-center w-full mt-2">
                  <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                  <p className="ml-[16px]">
                    <strong>Diwali</strong>
                  </p>
                </div>
                <div className="text-left inline-flex items-center w-full mt-2">
                  <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                  <p className="ml-[16px]">
                    <strong>Christmas</strong>
                  </p>
                </div>
                <div className="text-left inline-flex items-center w-full mt-2">
                  <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                  <p className="ml-[16px]">
                    <strong>Makar Sankranti</strong>
                  </p>
                </div>

                <div className="text-left inline-flex items-center w-full mt-2">
                  <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                  <p className="ml-[16px]">
                    <strong>Traditional Day</strong>
                  </p>
                </div>
              </div>

              <div className="col-lg-3 mb-5 mt-3">
                <div className="text-left inline-flex items-center w-full">
                  <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                  <p className="ml-[16px]">
                    <strong>Republic Day</strong>
                  </p>
                </div>
                <div className="text-left inline-flex items-center w-full mt-2">
                  <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                  <p className="ml-[16px]">
                    <strong>Shivaji Maharaj Jayanti</strong>
                  </p>
                </div>
                <div className="text-left inline-flex items-center w-full mt-2">
                  <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                  <p className="ml-[16px]">
                    <strong>Marathi Day</strong>
                  </p>
                </div>

                <div className="text-left inline-flex items-center w-full mt-2">
                  <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                  <p className="ml-[16px]">
                    <strong>Science Day</strong>
                  </p>
                </div>
                <div className="text-left inline-flex items-center w-full mt-2">
                  <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                  <p className="ml-[16px]">
                    <strong>Women's Day</strong>
                  </p>
                </div>
                <div className="text-left inline-flex items-center w-full mt-2">
                  <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                  <p className="ml-[16px]">
                    <strong>Sports Day</strong>
                  </p>
                </div>
                <div className="text-left inline-flex items-center w-full mt-2">
                  <div className="h-[16px] w-[16px] bg-[#e9390d] rounded-full" />
                  <p className="ml-[16px]">
                    <strong>Holi</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Celibration End --> */}

      {/* <!-- Facilities Start --> */}
      <Facilities />
      {/* <!-- Facilities Start --> */}
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
    </>
  );
};

export default About;
