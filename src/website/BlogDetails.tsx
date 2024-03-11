import { useLocation, useSearchParams } from "react-router-dom";

const BlogDetails = () => {
  const [searchParams] = useSearchParams();
  console.log("Location :::", searchParams.get("id"));
  const list = [
    {
      id: 1,
      header: "FOUNDER MESSAGE",
      subheader: "Founders feelins and emotions for kids",
      p1: `We extend a very hearty welcome to you as a parent who has shown interest in Sara's Gurukul. The major driving force behind taking up of this school project has been the mixed experiences of a variety of parents with regard to schools in the country and this gave me an opportunity to closely examine various features of our existing school system.`,
      p2: `What We observed is that the most of the schools, unfortunately are still following a western pattern of instruction in learning, extra curricular activities and living. We strongly feel the need for a customization in our school system, reorienting it to Indian culture and traditions. Keeping this in view, we have experimented in a small way and initiated a few changes, which will definitely start bearing fruits.`,
      p3: `At Sara's Gurukul, we help children to tap into their hidden potential by exposing them to diverse opportunities.
      The broad based, liberal education also helps them to rise above parochial mindsets and acquire a truly international outlook. In addition to this, children are trained to learn more by doing things themselves and trying out new ideas, taking failure and success in their stride, with all their energies focused on honest and purposeful effort. We have every hope and belief that Sara's Gurukul is going to become a premier institution of its kind in this part of the world, amply fulfilling the educational aspirations of the parents who bring their children to its portals.`,
      p4: "",
    },

    {
      id: 2,
      header: "KIDS JOURNEY",
      subheader: "kids preschool learning journey",
      p1: `At Journey Kids your child will be welcomed into a safe, caring environment where they can learn, explore, create and have fun! Through simple Vedas lessons they will learn about God’s love in a way that is easy for them to understand. They will do crafts, play games and have fun interacting with other kids in their age group. We would love for you and your family to visit us soon!`,
      p2: `“Children are a gift from the God; they are a reward from him.” Child Dedication is a time for us to celebrate and thank God for the gift of your children. It’s also a time for you, as parents, to commit to model what following God looks like and to raise your children to understand that they are saved by grace through faith in God, to believe that the Vedas is absolute Truth, and to know the importance of committing to a community of faith through the local temple.`,
      p3: `During the dedication service, parents promise before God, their family, and the Temple to raise their child in a God-honoring way. In some ways, it’s more of a dedication for you as a parent to make a commitment before God and others in your parenting.  But it’s also a dedication for us as a temple to commit to partner with you.  We are so honored to partner with you in your journey as parents. We want to be a consistent source of encouragement  “Train up a child in the way that God commands, and when he is older, they will not forget”.`,
      p4: `The formative years of a child’s life are crucial as this phase is the peak of their brain development. Preschool education has an informal structure of play and learning that stimulates a young one to interact with his classmates and to express his thoughts through colors, singing and other learning activities.
      Moreover, the structured environment in a preschool setting engages a child to a routine and gives him a sense of independence. A child learns the basics of science, language and other topics that are vital for his growth and development. The wisdom and skills that he gained will be of great use when he steps in the elementary education. There are a lot of activities that a preschool student will learn inside the school. From playing matching games to dressing up on their favorite cartoon characters, they will be exposed to simple challenges that will engage them to be at their best.
      More so, they will learn the importance of teamwork and creativity as they freely express themselves through drawing, group singing, and reading. Here’s an example of a traditional learning activity that proves to be an essential tool in the learning phase of preschool children.`,
    },
  ];

  const selectedData = list.find(
    (obj: any) => obj.id == searchParams.get("id")
  );

  console.log("selectedData", selectedData);

  return (
    <>
      {selectedData ? (
        <div>
          {/* <!-- Header Start --> */}
          <div className="container-fluid bg-sub-head-image mb-5">
            <div
              className="d-flex flex-column align-items-center justify-content-center"
              style={{ minHeight: 400 }}
            >
              <h3 className="display-3 font-weight-bold text-white">
                Blog Details
              </h3>
              <div className="d-inline-flex text-white">
                <p className="m-0">
                  <a className="text-white" href="">
                    Home
                  </a>
                </p>
                <p className="m-0 px-2">/</p>
                <p className="m-0">Blog Details</p>
              </div>
            </div>
          </div>
          {/* <!-- Header End --> */}

          {/* <!-- Detail Start --> */}
          <div className="container py-5 text-left">
            <div className="row pt-5">
              <div className="col-lg-8">
                <div className="d-flex flex-column text-left mb-3">
                  <p className="section-title pr-5">
                    <span className="pr-2">{selectedData.header}</span>
                  </p>
                  <h1 className="mb-3">{selectedData.subheader}</h1>
                  <div className="d-flex">
                    <p className="mr-3">
                      <i className="fa fa-user text-primary"></i> Admin
                    </p>
                    <p className="mr-3">
                      <i className="fa fa-folder text-primary"></i> Sara's
                      Gurukul
                    </p>
                    <p className="mr-3">
                      <i className="fa fa-comments text-primary"></i> 15
                    </p>
                  </div>
                </div>
                <div className="mb-5">
                  <img
                    className="img-fluid rounded w-100 mb-4"
                    src="img/detail.jpg"
                    alt="Image"
                  />
                  <p>{selectedData.p1}</p>
                  <p className="mt-2">{selectedData.p2}</p>
                  <img
                    className="img-fluid rounded w-50 float-left mr-4 mb-3 mt-3"
                    src="img/blog-1.jpg"
                    alt="Image"
                  />
                  <p className="mt-2">{selectedData.p3}</p>
                  {selectedData.p4 && (
                    <img
                      className="img-fluid rounded w-50 float-right ml-4 mb-3 mt-3"
                      src="img/blog-2.jpg"
                      alt="Image"
                    />
                  )}
                  <p className="mt-3">{selectedData.p4}</p>
                </div>

                {/* <!-- Related Post --> */}
                {/* <div className="mb-5 mx-n3">
              <h2 className="mb-4 ml-3">Related Post</h2>
              <div className="owl-carousel post-carousel position-relative">
                <div className="d-flex align-items-center bg-light shadow-sm rounded overflow-hidden mx-3">
                  <img
                    className="img-fluid"
                    src="img/post-1.jpg"
                    style={{ width: 80, height: 80 }}
                    alt=""
                  />
                  <div className="pl-3">
                    <h5 className="">Diam amet eos at no eos</h5>
                    <div className="d-flex">
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
                  </div>
                </div>
                <div className="d-flex align-items-center bg-light shadow-sm rounded overflow-hidden mx-3">
                  <img
                    className="img-fluid"
                    src="img/post-2.jpg"
                    style={{ width: 80, height: 80 }}
                    alt=""
                  />
                  <div className="pl-3">
                    <h5 className="">Diam amet eos at no eos</h5>
                    <div className="d-flex">
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
                  </div>
                </div>
                <div className="d-flex align-items-center bg-light shadow-sm rounded overflow-hidden mx-3">
                  <img
                    className="img-fluid"
                    src="img/post-3.jpg"
                    style={{ width: 80, height: 80 }}
                  />
                  <div className="pl-3">
                    <h5 className="">Diam amet eos at no eos</h5>
                    <div className="d-flex">
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
                  </div>
                </div>
              </div>
            </div> */}

                {/* <!-- Comment List --> */}
                {/* <div className="mb-5">
              <h2 className="mb-4">3 Comments</h2>
              <div className="media mb-4">
                <img
                  src="img/user.jpg"
                  alt="Image"
                  className="img-fluid rounded-circle mr-3 mt-1"
                  style={{ width: 45 }}
                />
                <div className="media-body">
                  <h6>
                    John Doe{" "}
                    <small>
                      <i>01 Jan 2045 at 12:00pm</i>
                    </small>
                  </h6>
                  <p>
                    Diam amet duo labore stet elitr ea clita ipsum, tempor
                    labore accusam ipsum et no at. Kasd diam tempor rebum magna
                    dolores sed sed eirmod ipsum. Gubergren clita aliquyam
                    consetetur sadipscing, at tempor amet ipsum diam tempor
                    consetetur at sit.
                  </p>
                  <button className="btn btn-sm btn-light">Reply</button>
                </div>
              </div>
              <div className="media mb-4">
                <img
                  src="img/user.jpg"
                  alt="Image"
                  className="img-fluid rounded-circle mr-3 mt-1"
                  style={{ width: 45 }}
                />
                <div className="media-body">
                  <h6>
                    John Doe{" "}
                    <small>
                      <i>01 Jan 2045 at 12:00pm</i>
                    </small>
                  </h6>
                  <p>
                    Diam amet duo labore stet elitr ea clita ipsum, tempor
                    labore accusam ipsum et no at. Kasd diam tempor rebum magna
                    dolores sed sed eirmod ipsum. Gubergren clita aliquyam
                    consetetur sadipscing, at tempor amet ipsum diam tempor
                    consetetur at sit.
                  </p>
                  <button className="btn btn-sm btn-light">Reply</button>
                  <div className="media mt-4">
                    <img
                      src="img/user.jpg"
                      alt="Image"
                      className="img-fluid rounded-circle mr-3 mt-1"
                      style={{ width: 45 }}
                    />
                    <div className="media-body">
                      <h6>
                        John Doe{" "}
                        <small>
                          <i>01 Jan 2045 at 12:00pm</i>
                        </small>
                      </h6>
                      <p>
                        Diam amet duo labore stet elitr ea clita ipsum, tempor
                        labore accusam ipsum et no at. Kasd diam tempor rebum
                        magna dolores sed sed eirmod ipsum. Gubergren clita
                        aliquyam consetetur, at tempor amet ipsum diam tempor at
                        sit.
                      </p>
                      <button className="btn btn-sm btn-light">Reply</button>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

                {/* <!-- Comment Form --> */}
                {/* <div className="bg-light p-5">
              <h2 className="mb-4">Leave a comment</h2>
              <form>
                <div className="form-group">
                  <label>Name *</label>
                  <input type="text" className="form-control" id="name" />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input type="email" className="form-control" id="email" />
                </div>
                <div className="form-group">
                  <label>Website</label>
                  <input type="url" className="form-control" id="website" />
                </div>

                <div className="form-group">
                  <label>Message *</label>
                  <textarea id="message" className="form-control"></textarea>
                </div>
                <div className="form-group mb-0">
                  <input
                    type="submit"
                    value="Leave Comment"
                    className="btn btn-primary px-3"
                  />
                </div>
              </form>
            </div> */}
              </div>

              <div className="col-lg-4 mt-5 mt-lg-0">
                {/* <!-- Author Bio --> */}
                <div className="d-flex flex-column text-center bg-primary rounded mb-5 py-5 px-4">
                  <img
                    src="img/team-1.jpg"
                    className="img-fluid rounded-circle mx-auto mb-3"
                    style={{ width: 100 }}
                    alt="Sarika Ozarkar"
                  />
                  <h3 className="text-secondary mb-3">Sarika Ozarkar</h3>
                  <p className="text-white m-0">Founder & Creative Director</p>
                </div>

                <div className="d-flex flex-column text-center bg-primary rounded mb-5 py-5 px-4">
                  <img
                    src="img/team-2.jpg"
                    className="img-fluid rounded-circle mx-auto mb-3"
                    style={{ width: 100 }}
                    alt="Shashidhar Birajdar"
                  />
                  <h3 className="text-secondary mb-3">Shashidhar Birajdar</h3>
                  <p className="text-white m-0">Founder</p>
                </div>

                {/* <!-- Search Form --> */}
                {/* <div className="mb-5">
              <form action="">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Keyword"
                  />
                  <div className="input-group-append">
                    <span className="input-group-text bg-transparent text-primary">
                      <i className="fa fa-search"></i>
                    </span>
                  </div>
                </div>
              </form>
            </div> */}

                {/* <!-- Category List --> */}
                {/* <div className="mb-5">
              <h2 className="mb-4">Categories</h2>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                  <a href="">Web Design</a>
                  <span className="badge badge-primary badge-pill">150</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                  <a href="">Web Development</a>
                  <span className="badge badge-primary badge-pill">131</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                  <a href="">Online Marketing</a>
                  <span className="badge badge-primary badge-pill">78</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                  <a href="">Keyword Research</a>
                  <span className="badge badge-primary badge-pill">56</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                  <a href="">Email Marketing</a>
                  <span className="badge badge-primary badge-pill">98</span>
                </li>
              </ul>
            </div> */}

                {/* <!-- Single Image --> */}
                {/* <div className="mb-5">
              <img src="img/blog-1.jpg" alt="" className="img-fluid rounded" />
            </div> */}
                {/* 
          <!-- Recent Post --> */}
                {/* <div className="mb-5">
              <h2 className="mb-4">Recent Post</h2>
              <div className="d-flex align-items-center bg-light shadow-sm rounded overflow-hidden mb-3">
                <img
                  className="img-fluid"
                  src="img/post-1.jpg"
                  style={{ width: 80, height: 80 }}
                />
                <div className="pl-3">
                  <h5 className="">Diam amet eos at no eos</h5>
                  <div className="d-flex">
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
                </div>
              </div>
              <div className="d-flex align-items-center bg-light shadow-sm rounded overflow-hidden mb-3">
                <img
                  className="img-fluid"
                  src="img/post-2.jpg"
                  style={{ width: 80, height: 80 }}
                />
                <div className="pl-3">
                  <h5 className="">Diam amet eos at no eos</h5>
                  <div className="d-flex">
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
                </div>
              </div>
              <div className="d-flex align-items-center bg-light shadow-sm rounded overflow-hidden mb-3">
                <img
                  className="img-fluid"
                  src="img/post-3.jpg"
                  style={{ width: 80, height: 80 }}
                />
                <div className="pl-3">
                  <h5 className="">Diam amet eos at no eos</h5>
                  <div className="d-flex">
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
                </div>
              </div>
            </div> */}

                {/* <!-- Single Image --> */}
                {/* <div className="mb-5">
              <img src="img/blog-2.jpg" alt="" className="img-fluid rounded" />
            </div> */}

                {/* <!-- Tag Cloud --> */}
                {/* <div className="mb-5">
              <h2 className="mb-4">Tag Cloud</h2>
              <div className="d-flex flex-wrap m-n1">
                <a href="" className="btn btn-outline-primary m-1">
                  Design
                </a>
                <a href="" className="btn btn-outline-primary m-1">
                  Development
                </a>
                <a href="" className="btn btn-outline-primary m-1">
                  Marketing
                </a>
                <a href="" className="btn btn-outline-primary m-1">
                  SEO
                </a>
                <a href="" className="btn btn-outline-primary m-1">
                  Writing
                </a>
                <a href="" className="btn btn-outline-primary m-1">
                  Consulting
                </a>
              </div>
            </div> */}

                {/* <!-- Single Image --> */}
                {/* <div className="mb-5">
              <img src="img/blog-3.jpg" alt="" className="img-fluid rounded" />
            </div> */}

                {/* <!-- Plain Text --> */}
                {/* <div>
              <h2 className="mb-4">Plain Text</h2>
              Aliquyam sed lorem stet diam dolor sed ut sit. Ut sanctus erat ea
              est aliquyam dolor et. Et no consetetur eos labore ea erat
              voluptua et. Et aliquyam dolore sed erat. Magna sanctus sed eos
              tempor rebum dolor, tempor takimata clita sit et elitr ut eirmod.
            </div> */}
              </div>
            </div>
          </div>
          {/* <!-- Detail End --> */}
        </div>
      ) : (
        <div />
      )}
    </>
  );
};
export default BlogDetails;
