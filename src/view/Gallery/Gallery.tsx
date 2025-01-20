/* eslint-disable jsx-a11y/img-redundant-alt */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ParentLayout from "../../component/app-component/Parent";
import {
  faEllipsisVertical,
  faPhotoFilm,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect, useState } from "react";
import ImageViewer from "react-simple-image-viewer";

import { getSchoolsForSelection } from "../../redux/schools/schoolSlice";

import {
  getImageTags,
  getImages,
  updateImageActions,
  resetNewHoliday,
} from "../../redux/admin/adminSlice";

import Pagination from "../../component/app-component/Pagination";
import WarningDialog from "../../component/app-component/WarningDialog";
import OutsideClickHandler from "react-outside-click-handler";
import Select1 from "react-select";

import ImageActionMenu from "./ImageActionMenu";
import ImageUpdateDialog from "./ImageUpdateDialog";

const Gallery = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [pageIndex, setPageIndex] = useState(1);
  const [warningDialog, setWarningDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedAction, setSelectedAction] = useState<any>(null);

  const [currentImage, setCurrentImage] = useState<number>(-1);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const [school, setSchools] = useState<any>();
  const [schoolMenu, setSchoolMenu] = useState<any>();

  const { optionSchoolList } = useAppSelector((state: any) => state.school);
  const { imageTags, success, loading, error, imagesData, updateImageMessage } =
    useAppSelector((state: any) => state.admin);

  console.log("imageData", imagesData);

  const [imagesUrl, setImagesUrl] = useState<any>([]);
  const [tag, setTag] = useState<any>();

  useEffect(() => {
    dispatch(getSchoolsForSelection());
    dispatch(getImageTags());
    getImageList();
  }, []);

  useEffect(() => {
    if (
      updateImageMessage &&
      updateImageMessage == "Image tags updated successfully"
    ) {
      dispatch(getImageTags());
      getImageList(pageIndex - 1, school, tag);
    }
  }, [updateImageMessage]);

  useEffect(() => {
    if (imagesData && imagesData.content && imagesData.content.length > 0) {
      const imageURLS = [];
      for (let i = 0; i < imagesData.content.length; i++) {
        imageURLS.push(getImageURL(imagesData.content[i].imageDetails));
      }
      setImagesUrl(imageURLS);
    } else {
      setImagesUrl([]);
    }
  }, [imagesData]);

  const deleteOrArchiveImage = () => {
    setWarningDialog(false);

    const body = {
      id: selectedItem.id,
      action: selectedAction,
    };
    dispatch(updateImageActions(body));
    setSelectedItem("");
    setSelectedAction("");
  };

  const onUpdateTags = (tags: String) => {
    setWarningDialog(false);

    const body = {
      id: selectedItem.id,
      action: selectedAction,
      tags,
    };
    dispatch(updateImageActions(body));
    setSelectedItem("");
    setSelectedAction("");
  };

  const formatOptionLabel = ({ value, label }: any) => {
    return (
      <div
        className="flex flex-col text-left px-3 py-2 border-b-[1px] border-gray-400 "
        onClick={() => {
          console.log("event :::2", value);
          setSchools(value);
          setSchoolMenu(false);
          getImageList(0, value, tag);
          setPageIndex(1);
        }}
      >
        <div className="text-blue-gray-900 text-[16px] leading-none">
          {" "}
          {label}
        </div>
        <div className="text-gray-500 text-[12px] -mt-[1px]">
          Branch: {value.branch}
        </div>
      </div>
    );
  };

  const getImageURL = (item: any) => {
    if (item) {
      const imageData = item.split("|");
      return (
        "https://" +
        imageData[0] +
        ".s3.ap-south-1.amazonaws.com/" +
        imageData[1]
      );
    }
    return "";
  };

  const getImageList = (
    page: number = 0,
    school: any = undefined,
    tag: any = undefined
  ) => {
    const body: any = {
      page: page,
      size: 40,
      active: true,
    };

    if (tag) {
      body["tag"] = tag.value;
    }

    if (school) {
      body["schoolId"] = school.id;
    }

    dispatch(getImages(body));
  };

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const onDelete = (index: number) => {
    console.log("onDelete Index", index);
    setSelectedItem(imagesData.content[index]);
    setSelectedAction("delete");
    setWarningDialog(true);
  };

  const onArcive = (index: number) => {
    console.log("onArcive Index", index);
    setSelectedItem(imagesData.content[index]);
    setSelectedAction("archive");
    setWarningDialog(true);
  };

  const onAddTag = (index: number) => {
    console.log("onAddTag Index", index);
    setSelectedItem(imagesData.content[index]);
    setSelectedAction("tags");
    setWarningDialog(true);
  };

  return (
    <ParentLayout
      loading={loading}
      error={error}
      success={success && updateImageMessage ? updateImageMessage : ""}
      onCloseSuccessAlert={() => dispatch(resetNewHoliday())}
      onCloseAlert={() => dispatch(resetNewHoliday())}
    >
      <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
        <main className="w-full flex-grow p-6 h-screen">
          <h1 className="text-3xl text-black pb-6">Image Gallery</h1>

          <div className="w-full mt-6">
            <div className="w-full flex flex-row justify-between items-center">
              <p className="text-xl pb-3 flex items-center">
                <i className="fas fa-list mr-3"></i> Images
              </p>
              <div className="flex flex-row  mb-2 ">
                <div className="relative flex w-full ">
                  <div className=" h-10 w-full  flex flex-row ">
                    <OutsideClickHandler
                      onOutsideClick={() => {
                        setSchoolMenu(false);
                      }}
                    >
                      <Select1
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
                            width: 500,
                            marginRight: 16,
                            paddingTop: 1,
                            paddingBottom: 1,
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
                          if (!event) {
                            setSchools(event);
                            getImageList(0, event, tag);
                            setPageIndex(1);
                          }
                        }}
                        value={school}
                        components={{ Option: formatOptionLabel }}
                        menuIsOpen={schoolMenu}
                        onMenuOpen={() => setSchoolMenu(true)}
                        closeMenuOnScroll={true}
                        // isMulti
                        isClearable
                      />
                    </OutsideClickHandler>

                    <Select1
                      name="tag"
                      placeholder="Select Tag"
                      options={imageTags}
                      getOptionLabel={(option: any) => option.option}
                      getOptionValue={(option) => option.value}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          backgroundColor: "#e5e7eb",
                          borderColor: state.isFocused ? "#0f58bf" : "#e1e4e8",
                          textAlign: "left",
                          marginRight: 3,
                          paddingTop: 1,
                          paddingBottom: 1,
                          width: 200,
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
                        getImageList(0, school, event);
                        setPageIndex(1);
                      }}
                      value={tag}
                      closeMenuOnScroll={true}
                      isClearable
                    />
                  </div>
                </div>

                <Button
                  className="flex items-center justify-center min-w-[200px] p-0 ml-2"
                  placeholder={"Add New Worksheets"}
                  color="blue"
                  size="sm"
                  onClick={() => navigate("/app/addImages")}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <FontAwesomeIcon icon={faPhotoFilm} className="mr-2" />
                  Add New Images
                </Button>
              </div>
            </div>

            {(!imagesData ||
              !imagesData.content ||
              imagesData.content.length === 0) &&
            !loading ? (
              <div>
                <FontAwesomeIcon
                  icon={faPhotoFilm}
                  size="6x"
                  className="text-gray-400 mt-[10%]"
                />

                <Typography
                  variant="h5"
                  className="text-gray-400 mt-10"
                  placeholder={""}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  No Images Found
                </Typography>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 md:grid-cols-4 overflow-y-auto max-h-[70vh]">
                {imagesData &&
                  imagesData.content.map((obj: any, index: any) => {
                    const imageURL = getImageURL(obj.imageDetails);
                    return (
                      <div
                        key={index}
                        className="relative"
                        onClick={() => {
                          setCurrentImage(index);
                          setIsViewerOpen(true);
                        }}
                      >
                        <ImageActionMenu
                          index={index}
                          onDelete={onDelete}
                          onArchive={onArcive}
                          onAddTag={onAddTag}
                        >
                          <FontAwesomeIcon
                            icon={faEllipsisVertical}
                            className=" h-[22px] absolute right-1 top-2 p-2"
                            color="white"
                          />
                        </ImageActionMenu>
                        <img
                          className="h-64 w-full max-w-full rounded-lg object-cover object-center"
                          src={imageURL}
                          alt="gallery-photo"
                        />
                      </div>
                    );
                  })}
              </div>
            )}

            {/* <div className="bg-white overflow-auto">
              <GalleryImage
                images={images}
                onSelect={handleSelect}
                onClick={handleClick}
              />
            </div> */}

            {!imagesData ||
            !imagesData.content ||
            imagesData.content.length == 0 ? (
              <></>
            ) : (
              <div className="mt-2 flex flex-row justify-end">
                <Pagination
                  count={imagesData.totalPages}
                  onPageChange={(pageIndex: number) => {
                    setPageIndex(pageIndex);
                    getImageList(pageIndex - 1, school, tag);
                  }}
                  pageIndex={pageIndex}
                />
              </div>
            )}
          </div>
        </main>
      </div>
      {selectedItem &&
      (selectedAction == "delete" || selectedAction == "archive") ? (
        <WarningDialog
          open={warningDialog}
          onOkClick={() => deleteOrArchiveImage()}
          onCloseDialog={() => {
            setWarningDialog(false);
            setSelectedItem("");
            setSelectedAction("");
          }}
          header={"Warning !"}
          message={
            selectedAction === "delete"
              ? "Are you sure? you want to delete image."
              : "Are you sure? you want to archive image."
          }
          img={getImageURL(selectedItem.imageDetails)}
          subMessage={
            selectedAction === "delete"
              ? "Once you delete your image, it would be hard dard delete and you wont get back. "
              : "Once you archive your image, it would be soft delete  and you will get back from admin only "
          }
        />
      ) : null}

      {selectedItem && selectedAction == "tags" ? (
        <ImageUpdateDialog
          open={warningDialog}
          onOkClick={(tags: String) => onUpdateTags(tags)}
          onCloseDialog={() => {
            setWarningDialog(false);
            setSelectedItem("");
            setSelectedAction("");
          }}
          header={"Update Image Tag"}
          message={"do you want to update image tags?"}
          img={getImageURL(selectedItem.imageDetails)}
          subMessage={
            "Please enter your tags with comma separated, try to reuse the tags, which will help you to manage your images easily "
          }
          item={selectedItem}
        />
      ) : null}

      {isViewerOpen && (
        <ImageViewer
          src={imagesUrl}
          currentIndex={currentImage}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={closeImageViewer}
        />
      )}
    </ParentLayout>
  );
};
export default Gallery;
