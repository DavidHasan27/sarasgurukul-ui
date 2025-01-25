import { useEffect, useState } from "react";
import { getImages, getImageTags } from "../redux/admin/adminSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { IMAGE_TAG } from "../utils/constants";
import { clone } from "lodash";

import noImage from "../view/assets/no_image.png";

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
  const [imageTagList, setImageTagList] = useState<any>(IMAGE_TAG);
  const dispatch = useAppDispatch();
  const { imageTags, success, loading, error, imagesData, updateImageMessage } =
    useAppSelector((state: any) => state.admin);

  console.log("imageData", imagesData, imageTags);

  useEffect(() => {
    if (filetrType === "All") {
      setImageList(galleryList);
    } else {
      setImageList(galleryList.filter((obj) => obj.type === filetrType));
    }
  }, [filetrType]);

  useEffect(() => {
    dispatch(getImageTags());
    getImageList();
  }, []);

  useEffect(() => {
    if (imageTags && imageTags.length > 0) {
      const tagList = clone(imageTagList);
      const mergedArray = tagList.concat(
        imageTags.filter(
          (item2: any) =>
            !tagList.some(
              (item1: any) =>
                item1.value.toLowerCase() === item2.value.toLowerCase()
            )
        )
      );
      setImageTagList(mergedArray);
    }
  }, [imageTags]);

  const getImageList = (
    page: number = 0,
    school: any = undefined,
    tag: any = undefined
  ) => {
    const body: any = {
      page: page,
      size: 1000,
      active: true,
    };

    if (tag) {
      body["tag"] = tag;
    }

    if (school) {
      body["schoolId"] = school.id;
    }

    dispatch(getImages(body));
  };

  const getImageURL = (urlString: any) => {
    if (urlString) {
      const imageData = urlString.split("|");
      const url =
        "https://" +
        imageData[0] +
        ".s3.ap-south-1.amazonaws.com/" +
        imageData[1];
      return { url, name: imageData[2] };
    }
    return { url: noImage, name: "noImage" };
  };

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
                {imageTagList &&
                  imageTagList.map((item: any) => {
                    return (
                      <li
                        className={`btn btn-outline-primary m-1 ${
                          filetrType === item.value ? "active" : ""
                        }`}
                        onClick={() => {
                          setFilterType(item.value);
                          getImageList(0, undefined, item.value.toLowerCase());
                        }}
                        key={item.value}
                      >
                        {item.option}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 md:grid-cols-4 overflow-y-auto max-h-[70vh]">
            {imagesData &&
              imagesData.content.map((obj: any, index: any) => {
                const image = getImageURL(obj.imageDetails);
                return (
                  <div
                    key={index}
                    className="relative portfolio-item"
                    onClick={() => {
                      // setCurrentImage(index);
                      // setIsViewerOpen(true);
                    }}
                  >
                    <img
                      className="h-64 w-full max-w-full rounded-lg object-cover object-center"
                      src={image.url}
                      alt="gallery-photo "
                    />

                    <div className="portfolio-btn bg-primary d-flex align-items-center justify-content-center">
                      <a href={image.url} data-lightbox="portfolio">
                        <i
                          className="fa fa-plus text-white"
                          style={{ fontSize: 60 }}
                        ></i>
                      </a>
                    </div>
                  </div>
                );
              })}
          </div>

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
      {/* </div> */}
      {/* <!-- Gallery End --> */}
    </>
  );
};

export default Gallery;
