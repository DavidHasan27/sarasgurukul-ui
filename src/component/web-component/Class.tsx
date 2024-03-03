const ClassView = () => {
  return (
    <>
      {/* <!-- Class Start --> */}
      <div className="container-fluid pt-5">
        <div className="container">
          <div className="text-center pb-2">
            <p className="section-title px-5">
              <span className="px-2">Popular Classes</span>
            </p>
            <h1 className="mb-4 text-4xl text-[#430c07]">
              Classes for Your Kids
            </h1>
          </div>
          <div className="row">
            <div className="col-lg-4 mb-5">
              <div className="card border-0 bg-[#ffe7d5] shadow-sm pb-2 h-[590px]">
                <img className="card-img-top" src="img/class-1.jpg" alt="" />
                <div className="flex flex-row w-full h-[40px] bg-[#e9390d] shadow-sm justify-center items-center">
                  <p className=" font-extrabold text-[#fff]">
                    ARTS AND CULTURE
                  </p>
                </div>
                <div className="card-body text-center">
                  <p className="card-text text-[#7c1e12]">
                    Arts & culture have a magnetic appeal that transcends
                    borders and language barriers. The beauty of a mesmerizing
                    the emotions conveyed painting. through a heart-touching
                    piece of music, or the enthralling performances on the
                    theater stage; these experiences have the ability to move
                    people on a profound level. By infusing your platform with
                    such captivating content, you tap into a universal language
                    that resonates with diverse audiences.
                  </p>
                </div>
                {/* <div className="card-footer bg-transparent py-4 px-5">
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
                  </div> */}
              </div>
            </div>
            <div className="col-lg-4 mb-5">
              <div className="card border-0 bg-[#ffe7d5] shadow-sm pb-2 h-[590px]">
                <img className="card-img-top" src="img/class-2.jpg" alt="" />
                <div className="flex flex-row w-full h-[40px] bg-[#e9390d] shadow-sm justify-center items-center">
                  <p className=" font-extrabold text-[#fff]">MUSIC</p>
                </div>
                <div className="card-body text-center">
                  <p className="card-text text-[#7c1e12]">
                    One of the most influential tools for conveying feelings in
                    music.
                  </p>

                  <p className="card-text text-[#7c1e12]">
                    • As listeners enjoy, any form of music that we enjoy can
                    improve the quality of life.
                  </p>
                  <p className="card-text text-[#7c1e12]">
                    • Several genres of music have developed over a period
                    starting from classic to modern hip-hop.
                  </p>
                  <p className="card-text text-[#7c1e12]">
                    • Music exists in all forms of life in nature, starting from
                    the sound of water-streams to birds chirping at the break of
                    dawn.
                  </p>
                </div>
                {/* <div className="card-footer bg-transparent py-4 px-5">
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
                  </div> */}
                {/* <a href="" className="btn btn-primary px-4 mx-auto mb-4">
                    Join Now
                  </a> */}
              </div>
            </div>
            <div className="col-lg-4 mb-5">
              <div className="card border-0  shadow-sm pb-2 bg-[#ffe7d5] h-[590px]">
                <img className="card-img-top" src="img/class-3.jpg" alt="" />
                <div className="flex flex-row w-full h-[40px] bg-[#e9390d] shadow-sm justify-center items-center">
                  <p className=" font-extrabold text-[#fff]">VEDAS</p>
                </div>
                <div className="card-body text-center">
                  <p className="card-text text-[#7c1e12]">
                    Vedic mantras are sacred verses or chants derived from the
                    ancient texts of the Vedas, which are considered to be the
                    oldest scriptures of Hinduism. These mantras are believed to
                    possess profound spiritual and psychological benefits when
                    practiced regularly. A few benefits of mantras for children
                    include better focus, de-stressing, memory enhancement,
                    moral development etc.
                  </p>
                </div>
                {/* <div className="card-footer bg-transparent py-4 px-5">
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
                  </a> */}
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
              <h1 className="mb-4 text-4xl text-[#430c07]">
                Book A Seat For Your Kid
              </h1>
              <p className="text-[#7c1e12]">
                Parents sometimes have more questions than a toddler who just
                learned the word "Why". At <strong>Sara's Gurukul,</strong> we
                may not have every answer - be we certainly have a lot of them.
                Just enter you information, we will connect back to for your all
                questions
              </p>
              <ul className="list-inline m-0">
                <li className="py-2 text-[#7c1e12]">
                  <i className="fa fa-check  mr-3 text-[#e9390d]"></i>
                  ARTS & CULTUR
                </li>
                <li className="py-2 text-[#7c1e12]">
                  <i className="fa fa-check mr-3 text-[#e9390d]"></i>MUSIC
                </li>
                <li className="py-2 text-[#7c1e12]">
                  <i className="fa fa-check mr-3 text-[#e9390d]"></i>VEDAS
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
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control border-0 p-4"
                        placeholder="Your Email"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <select
                        className="custom-select border-0 px-4"
                        style={{ height: 47 }}
                      >
                        <option selected>Select A Class</option>
                        <option value="1">ARTS & CULTUR</option>
                        <option value="2">MUSIC</option>
                        <option value="3">VEDAS</option>
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
    </>
  );
};

export default ClassView;
