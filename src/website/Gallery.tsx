import { useEffect, useState } from "react";

const galleryList = [
  {
    name: "gallery-1.jpg",
    type: "Playing",
  },
  {
    name: "gallery-2.jpg",
    type: "Playing",
  },
  {
    name: "gallery-3.jpg",
    type: "Playing",
  },
  {
    name: "gallery-4.jpg",
    type: "Playing",
  },
  {
    name: "gallery-5.jpg",
    type: "Playing",
  },
  {
    name: "gallery-6.jpg",
    type: "Playing",
  },
  {
    name: "gallery-7.jpg",
    type: "Drawing",
  },
  {
    name: "gallery-8.jpg",
    type: "Drawing",
  },
  {
    name: "gallery-9.jpg",
    type: "Drawing",
  },
  {
    name: "gallery-10.jpg",
    type: "Drawing",
  },
  {
    name: "gallery-11.jpg",
    type: "Drawing",
  },
  {
    name: "gallery-12.jpg",
    type: "Playing",
  },
  {
    name: "gallery-13.jpg",
    type: "Reading",
  },
  {
    name: "gallery-14.jpg",
    type: "Reading",
  },
  {
    name: "gallery-15.jpg",
    type: "Reading",
  },
  {
    name: "gallery-16.jpg",
    type: "Reading",
  },
  {
    name: "gallery-17.jpg",
    type: "Reading",
  },
  {
    name: "gallery-18.jpg",
    type: "Reading",
  },
];

const Gallery = () => {
  const [filetrType, setFilterType] = useState("All");
  const [imageList, setImageList] = useState(galleryList);

  useEffect(() => {
    if (filetrType === "All") {
      setImageList(galleryList);
    } else {
      setImageList(galleryList.filter((obj) => obj.type === filetrType));
    }
  }, [filetrType]);

  return (
    <>
      <div className="container-fluid bg-sub-head-image mb-5">
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: 400 }}
        >
          <h3 className="display-3 font-weight-bold text-white">Gallery</h3>
          <div className="d-inline-flex text-white">
            <p className="m-0">
              <a className="text-white" href="">
                Home
              </a>
            </p>
            <p className="m-0 px-2">/</p>
            <p className="m-0">Gallery</p>
          </div>
        </div>
      </div>

      {/* <!-- Gallery Start --> */}
      <div className="container-fluid pt-5 pb-3">
        <div className="container">
          <div className="text-center pb-2">
            <p className="section-title px-5">
              <span className="px-2">Our Gallery</span>
            </p>
            <h1 className="mb-4">Our Kids School Gallery</h1>
          </div>
          <div className="row">
            <div className="col-12 text-center mb-2">
              <ul className="list-inline mb-4" id="portfolio-flters">
                <li
                  className={`btn btn-outline-primary m-1 ${
                    filetrType === "All" ? "active" : ""
                  }`}
                  onClick={() => setFilterType("All")}
                >
                  All
                </li>
                <li
                  className={`btn btn-outline-primary m-1 ${
                    filetrType === "Playing" ? "active" : ""
                  }`}
                  onClick={() => setFilterType("Playing")}
                >
                  Playing
                </li>
                <li
                  className={`btn btn-outline-primary m-1 ${
                    filetrType === "Drawing" ? "active" : ""
                  }`}
                  onClick={() => setFilterType("Drawing")}
                >
                  Drawing
                </li>
                <li
                  className={`btn btn-outline-primary m-1 ${
                    filetrType === "Reading" ? "active" : ""
                  }`}
                  onClick={() => setFilterType("Reading")}
                >
                  Reading
                </li>
              </ul>
            </div>
          </div>
          <div className="row portfolio-container">
            {imageList.map((img, index) => {
              return (
                <div className="col-lg-4 col-md-6 mb-4 portfolio-item first">
                  <div className="position-relative overflow-hidden mb-2">
                    <img
                      className="img-fluid w-100"
                      src={"img/" + img.name}
                      alt=""
                    />
                    <div className="portfolio-btn bg-primary d-flex align-items-center justify-content-center">
                      <a href={"img/" + img.name} data-lightbox="portfolio">
                        <i
                          className="fa fa-plus text-white"
                          style={{ fontSize: 60 }}
                        ></i>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* <div className="col-lg-4 col-md-6 mb-4 portfolio-item first">
              <div className="position-relative overflow-hidden mb-2">
                <img
                  className="img-fluid w-100"
                  src="img/portfolio-1.jpg"
                  alt=""
                />
                <div className="portfolio-btn bg-primary d-flex align-items-center justify-content-center">
                  <a href="img/portfolio-1.jpg" data-lightbox="portfolio">
                    <i
                      className="fa fa-plus text-white"
                      style={{ fontSize: 60 }}
                    ></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4 portfolio-item second">
              <div className="position-relative overflow-hidden mb-2">
                <img
                  className="img-fluid w-100"
                  src="img/portfolio-2.jpg"
                  alt=""
                />
                <div className="portfolio-btn bg-primary d-flex align-items-center justify-content-center">
                  <a href="img/portfolio-2.jpg" data-lightbox="portfolio">
                    <i
                      className="fa fa-plus text-white"
                      style={{ fontSize: 60 }}
                    ></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4 portfolio-item third">
              <div className="position-relative overflow-hidden mb-2">
                <img
                  className="img-fluid w-100"
                  src="img/portfolio-3.jpg"
                  alt=""
                />
                <div className="portfolio-btn bg-primary d-flex align-items-center justify-content-center">
                  <a href="img/portfolio-3.jpg" data-lightbox="portfolio">
                    <i
                      className="fa fa-plus text-white"
                      style={{ fontSize: 60 }}
                    ></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4 portfolio-item first">
              <div className="position-relative overflow-hidden mb-2">
                <img
                  className="img-fluid w-100"
                  src="img/portfolio-4.jpg"
                  alt=""
                />
                <div className="portfolio-btn bg-primary d-flex align-items-center justify-content-center">
                  <a href="img/portfolio-4.jpg" data-lightbox="portfolio">
                    <i
                      className="fa fa-plus text-white"
                      style={{ fontSize: 60 }}
                    ></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4 portfolio-item second">
              <div className="position-relative overflow-hidden mb-2">
                <img
                  className="img-fluid w-100"
                  src="img/portfolio-5.jpg"
                  alt=""
                />
                <div className="portfolio-btn bg-primary d-flex align-items-center justify-content-center">
                  <a href="img/portfolio-5.jpg" data-lightbox="portfolio">
                    <i
                      className="fa fa-plus text-white"
                      style={{ fontSize: 60 }}
                    ></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4 portfolio-item third">
              <div className="position-relative overflow-hidden mb-2">
                <img
                  className="img-fluid w-100"
                  src="img/portfolio-6.jpg"
                  alt=""
                />
                <div className="portfolio-btn bg-primary d-flex align-items-center justify-content-center">
                  <a href="img/portfolio-6.jpg" data-lightbox="portfolio">
                    <i
                      className="fa fa-plus text-white"
                      style={{ fontSize: 60 }}
                    ></i>
                  </a>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      {/* <!-- Gallery End --> */}
    </>
  );
};

export default Gallery;
