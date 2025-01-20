/* eslint-disable jsx-a11y/img-redundant-alt */
import ParentLayout from "../../component/app-component/Parent";
import { useDropzone } from "react-dropzone";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button, Checkbox } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceGrinHearts,
  faPhotoFilm,
  faSchool,
  faUserPlus,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Gallery as GalleryImage } from "react-grid-gallery";
import { faSquare, faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { isEmailValid, isMobileValid } from "../../utils";
import { images as imgdata, CustomImage } from "./Images";

import Select from "react-select";

import { getSchoolsForSelection } from "../../redux/schools/schoolSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { BLOODGROUP, IMAGE_TAG, RELATIONSHIP } from "../../utils/constants";
import DatePicker from "../../component/app-component/DatePicker";
import { getClassList } from "../../redux/class/classSlice";
import OutsideClickHandler from "react-outside-click-handler";
import {
  createNewStudent,
  resetNewStudent,
} from "../../redux/students/studentSlice";
import {
  createNewHoliday,
  createNewImages,
  getSchoolYear,
  resetNewHoliday,
} from "../../redux/admin/adminSlice";
import { clone, find } from "lodash";
import moment from "moment";

const AddImages = () => {
  const imgRef = useRef<any>();
  const [school, setSchool] = useState<any>([]);
  const [schoolError, setSchoolError] = useState<any>("");

  const [imagesCaptions, setImagesCaption] = useState<any>();
  const [imageCaptionError, setImageCaptionError] = useState<any>("");

  const [tag, setTag] = useState<any>({ option: "All", value: "All" });
  const [images, setImages] = useState<any>([]);
  const [imagesError, setImageserror] = useState("");

  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const [schoolMenu, setSchoolMenu] = useState<any>();

  const [selectedYear, setSelectedYear] = useState<any>();

  const [checked, setChecked] = useState<any>(false);

  const dispatch = useAppDispatch();

  const [indexObj, setIndex] = useState(-1);

  const { optionSchoolList } = useAppSelector((state: any) => state.school);
  const { yearList, newImages, loading, error } = useAppSelector(
    (state: any) => state.admin
  );

  const handleSelect = (index: number, item: any, event: any) => {
    // const nextImages = images.map((image: any, i: number) =>
    //   i === index ? { ...image, isSelected: !image.isSelected } : image
    // );
    // setImages(nextImages);
  };

  const handleClick = (index: number, item: any) => setIndex(index);

  useEffect(() => {
    if (yearList && yearList.length > 0) {
      const year = find(yearList, (item: any) => item.active);
      setSelectedYear(year);
    }
  }, [yearList]);

  useEffect(() => {
    dispatch(getSchoolsForSelection());
    dispatch(getSchoolYear());
  }, []);

  const formatBytes = (bytes: any, decimals: any = 2) => {
    if (!+bytes) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = [
      "Bytes",
      "KiB",
      "MiB",
      "GiB",
      "TiB",
      "PiB",
      "EiB",
      "ZiB",
      "YiB",
    ];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };

  //   const onDrop = useCallback((acceptedFiles: any) => {
  //     // Do something with the files
  //     var totalSizeMB = acceptedFiles[0].size / Math.pow(1024, 2);
  //     if (totalSizeMB > 1) {
  //       alert("Maximum size for file is 1MB");
  //     } else {
  //       setFile(acceptedFiles[0]);
  //     //   9923874872
  //     }
  //   }, []);

  const onDrop = (acceptedFiles: any) => {
    console.log("File Length ::", acceptedFiles);
    const tempFileList: any = clone(images);

    for (let i = 0; i < acceptedFiles.length; i++) {
      var totalSizeMB = acceptedFiles[i].size / Math.pow(1024, 2);
      if (totalSizeMB > 3) {
        alert(acceptedFiles[i].name + " file size is more than 1MB");
        break;
      } else {
        const fileObj = tempFileList.find(
          (obj: any) =>
            obj.name === acceptedFiles[i].name &&
            obj.size === acceptedFiles[i].size
        );
        if (!fileObj) {
          const obj: any = {
            file: acceptedFiles[i],
            caption: "",
            url: URL.createObjectURL(acceptedFiles[i]),
          };
          tempFileList.push(obj);
        }
      }
    }
    setImages(tempFileList);
    setImageserror("");
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
      "image/heic": [],
      "image/jfif": [],
    },
    multiple: true,
  });

  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    height: 60,
    transition: "border .24s ease-in-out",
  };

  const focusedStyle = {
    borderColor: "#2196f3",
  };

  const acceptStyle = {
    borderColor: "#00e676",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
  };

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  useEffect(() => {
    if (newImages) {
      // navigate("/app/dash", { replace: true });
      resetAllData();
    }
  }, [newImages]);

  const resetAllData = () => {
    setSchoolError("");
    setSchool([]);
    setImagesCaption("");
    setChecked(false);
    setDescription("");
    setImagesCaption("");
    setImages([]);
  };

  const onSubmitSchool = () => {
    let isError = false;

    if (checked) {
      if (!description || !description.trim()) {
        setDescriptionError("Please add your custom tags");
        isError = true;
      }
    }

    if (!images || images.length == 0) {
      setImageserror("Please select your images");
      isError = true;
    }

    if (isError) {
      return;
    }

    const schoolsList = [];

    for (let i = 0; i < school.length; i++) {
      const schoolObj = {
        id: school[i].id,
      };
      schoolsList.push(school[i].id);
    }

    const bodyList = [];

    for (let i = 0; i < images.length; i++) {
      const imageBody: any = {
        imageDetails: "",
        imageTag: !checked
          ? tag.value.toLowerCase()
          : description.toLowerCase(),
        image_caption: imagesCaptions,
        schoolId: schoolsList,
        active: true,
        fileObj: {
          bucket: "saras-gallery",
          type: "gallery",
          subtype: "image",
          file: images[i].file,
        },
      };
      bodyList.push(imageBody);
    }

    dispatch(createNewImages(bodyList));
  };

  const formatOptionLabel = ({ value, label }: any) => {
    return (
      <div
        className="flex flex-col text-left px-3 border-b-[1px] border-gray-400 "
        onClick={() => {
          console.log("event :::2", value);

          const tempSchools = clone(school);
          const obj = find(tempSchools, (obj: any) => obj.id === value.id);
          if (!obj) {
            tempSchools.push(value);
            setSchool(tempSchools);
            setSchoolError("");
          }
          setSchoolMenu(false);
        }}
      >
        <div className="text-blue-gray-900 text-[16px]"> {label}</div>
        <div className="text-gray-500 text-[12px] -mt-[12px]">
          Branch: {value.branch}
        </div>
      </div>
    );
  };

  const getOptionLabel = (option: any) => {
    return (
      option.startMonth +
      " " +
      option.startYear +
      " - " +
      option.endMonth +
      " " +
      option.endYear
    );
  };

  return (
    <ParentLayout
      loading={loading}
      error={error}
      success={newImages ? "New images added successfully" : ""}
      onCloseSuccessAlert={() => dispatch(resetNewHoliday())}
      onCloseAlert={() => dispatch(resetNewHoliday())}
    >
      <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
        <main className="w-full flex-grow p-6">
          <span>
            <FontAwesomeIcon icon={faPhotoFilm} className="mr-2 fa-4x p-0" />
            <h1 className="w-full text-3xl text-black ">Add New Images</h1>
          </span>

          <div className="flex justify-center items-center ">
            <div className="w-full lg:w-1/2 my-1 pr-0 lg:pr-2 mt-2 ">
              <p className="text-xl flex items-center">
                <i className="fas fa-list mr-3"></i> Images
              </p>
              <div className="leading-loose">
                <form className="p-10 bg-white rounded shadow-xl min-h-[470px]">
                  <div className="">
                    <div className="inline-block  w-full pr-1 ">
                      <label className="block text-sm text-gray-600 text-left mb-0">
                        Schools
                      </label>
                      <OutsideClickHandler
                        onOutsideClick={() => {
                          setSchoolMenu(false);
                        }}
                      >
                        <Select
                          name="schools"
                          placeholder="Select Schools"
                          options={optionSchoolList}
                          getOptionLabel={(option: any) => option.schoolName}
                          getOptionValue={(option) => option}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              backgroundColor: "#e5e7eb",
                              borderColor: state.isFocused
                                ? "#0f58bf"
                                : "#e1e4e8",
                              textAlign: "left",
                            }),
                            option: (baseStyles, state) => ({
                              ...baseStyles,
                              textAlign: "left",
                            }),
                            multiValue: (styles, { data }) => {
                              return {
                                ...styles,
                                backgroundColor: "white",
                                borderWidth: "1px",
                                borderColor: "black",
                                borderStyle: "#c4cad2",
                              };
                            },
                          }}
                          classNamePrefix="Select Schools"
                          onChange={(event: any) => {
                            console.log("event :::1", event);
                            setSchool(event);
                            if (event.length !== 0) {
                              setSchoolError("");
                            }
                          }}
                          value={school}
                          components={{ Option: formatOptionLabel }}
                          menuIsOpen={schoolMenu}
                          onMenuOpen={() => setSchoolMenu(true)}
                          closeMenuOnScroll={true}
                          isMulti
                        />
                      </OutsideClickHandler>
                      <label className="block text-sm text-left text-red-600 h-4">
                        {schoolError ? schoolError : ""}
                      </label>
                    </div>
                    <div className="flex flex-row">
                      <div className="inline-block  w-1/2 pr-1 ">
                        <label className="block text-sm text-gray-600 text-left mb-0">
                          Select Tag
                        </label>
                        <Select
                          name="tag"
                          placeholder="Select image tag from available list"
                          options={IMAGE_TAG}
                          getOptionLabel={(option: any) => option.option}
                          getOptionValue={(option) => option.value}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              backgroundColor: "#e5e7eb",
                              borderColor: state.isFocused
                                ? "#0f58bf"
                                : "#e1e4e8",
                              textAlign: "left",
                            }),
                            option: (baseStyles, state) => ({
                              ...baseStyles,
                              textAlign: "left",
                            }),
                            multiValue: (styles, { data }) => {
                              return {
                                ...styles,
                                backgroundColor: "white",
                                borderWidth: "1px",
                                borderColor: "black",
                                borderStyle: "#c4cad2",
                              };
                            },
                          }}
                          classNamePrefix="Select Schools"
                          onChange={(event: any) => {
                            setTag(event);
                          }}
                          value={tag}
                          // components={{ Option: formatOptionLabelForYear }}
                          // menuIsOpen={YearMenu}
                          // onMenuOpen={() => setYearMenu(true)}
                          closeMenuOnScroll={true}
                          isDisabled={checked}
                        />
                        <label className="block text-sm text-left text-red-600 h-4">
                          {schoolError ? schoolError : ""}
                        </label>
                      </div>

                      <div className="flex flex-row  w-1/2 h-20 items-center mt-1 bg">
                        <label className="block text-sm text-gray-600 text-left"></label>
                        <div
                          className="flex flex-row items-center ml-5"
                          onClick={() => {
                            setChecked(!checked);
                            if (!checked) {
                            } else {
                              setTag({ option: "All", value: "All" });
                            }
                          }}
                        >
                          <FontAwesomeIcon
                            icon={!checked ? faSquare : faSquareCheck}
                            size="3x"
                          />
                          <label className="block text-xl text-gray-600 text-left ml-3">
                            Add Custom Tags
                          </label>
                        </div>
                      </div>
                    </div>

                    {checked && (
                      <div className="mt-1">
                        <label className="block text-sm text-gray-600 text-left">
                          Image Tags (Add multiple tags with commo separated,
                          Festival, School Trip, School Gatherings )
                        </label>
                        <textarea
                          className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded"
                          id="description"
                          name="description"
                          rows={2}
                          required
                          placeholder="Festival, School Trip, School Gatherings"
                          aria-label="description"
                          value={description}
                          onChange={(event) => {
                            setDescription(event.target.value);
                          }}
                          disabled={!school || !selectedYear}
                        ></textarea>
                      </div>
                    )}
                    <div className="flex flex-row">
                      <div className="inline-block w-1/2 pr-1">
                        <label className="block text-sm text-gray-600 text-left">
                          Image Caption(Optional)
                        </label>
                        <div className="flex flex-col">
                          <input
                            className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded"
                            id="title"
                            name="title"
                            required
                            placeholder="Caption"
                            aria-label="title"
                            value={imagesCaptions}
                            onChange={(event) => {
                              setImagesCaption(event.target.value);
                              setImageCaptionError("");
                            }}
                            disabled={!school || !selectedYear}
                          />
                          <div className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4">
                            {imageCaptionError && imageCaptionError}
                          </div>
                        </div>
                      </div>
                      <div
                        className="inline-block w-1/2 pr-1 bor border-2 border-indigo-600 h-12 mt-[20px] rounded flex flex-row items-center justify-center bg-blue-500"
                        {...getRootProps(style)}
                      >
                        <input {...getInputProps()} />
                        <FontAwesomeIcon
                          icon={faPhotoFilm}
                          className="mr-2 fa-2x p-0"
                          color="white"
                        />
                        <label className="block text-lg text-white text-left">
                          Select Image
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 md:grid-cols-4">
                    {images.map((obj: any, index: any) => {
                      console.log("Image Index ", imgRef.current);
                      return (
                        <div key={index} className="relative">
                          <FontAwesomeIcon
                            icon={faXmarkCircle}
                            className=" h-[22px] absolute right-1 top-2"
                            color="white"
                            onClick={() => {
                              const tempImage = clone(images);
                              tempImage.splice(index, 1);
                              setImages(tempImage);
                            }}
                          />
                          <img
                            className="h-40 w-full max-w-full rounded-lg object-cover object-center"
                            src={obj.url}
                            alt="gallery-photo"
                          />
                        </div>
                      );
                    })}
                  </div>

                  {imagesError && (
                    <label className="block text-xl text-red-500 text-center">
                      {imagesError}
                    </label>
                  )}

                  <div
                    className="inline-block w-1/4 mt-4"
                    style={{ display: "none" }}
                  >
                    <div
                      {...getRootProps(style)}
                      className={`bg-[#e5e7eb] flex flex-col items-center border-2 rounded-sm border-[#9c9c9c] border-dashed text-[#B5B5B5] hover:border-[#8f8f8f]`}
                    >
                      <input {...getInputProps()} />
                      <>
                        {isDragActive ? (
                          <p>Drop the files here ...</p>
                        ) : (
                          <p>Click to select files</p>
                        )}
                      </>
                    </div>
                  </div>

                  <div className="flex flex-row-reverse items-end w-full mt-[10px]">
                    <Button
                      variant="gradient"
                      color="blue"
                      placeholder={"Submit"}
                      onClick={() => onSubmitSchool()}
                      disabled={!images || images.length == 0}
                    >
                      <FontAwesomeIcon
                        icon={faPhotoFilm}
                        className="mr-2 fa-1x p-0"
                      />
                      Add New Images
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Parent Info */}
        </main>
      </div>
    </ParentLayout>
  );
};

export default AddImages;
