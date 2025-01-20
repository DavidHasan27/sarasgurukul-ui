/* eslint-disable jsx-a11y/alt-text */
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";

const ImageUpdateDialog = ({
  open,
  onCloseDialog,
  onOkClick,
  onCancelClick,
  header,
  message,
  subMessage,
  img,
  item,
}: any) => {
  // const [open, setOpen] = useState(false);
  console.log("item ::", item);
  const [tags, setTags] = useState(item.imageTag);
  const [tagsError, setTagError] = useState("");
  //   const handleOpen = () => setOpen(!open);

  const onOk = () => {
    if (!tags || !tags.trim()) {
      setTagError("Please enter your tags");
      return;
    }
    onOkClick(tags);
  };

  return (
    <>
      <Dialog
        open={open}
        handler={onCloseDialog}
        placeholder={""}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <DialogHeader
          placeholder={""}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Typography
            variant="h5"
            color="blue-gray"
            placeholder={""}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {header}
          </Typography>
        </DialogHeader>
        <DialogBody
          divider
          className="grid place-items-center gap-4"
          placeholder={""}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <img src={img} className="max-h-[200px]" />

          <Typography
            color="red"
            variant="h4"
            placeholder={""}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {message}
          </Typography>

          <Typography
            className="text-center font-normal"
            placeholder={""}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {subMessage}
          </Typography>
          <div className="inline-block mt-2 w-full pr-1">
            <label className="block text-sm text-gray-600 text-left font-semibold">
              Image Tags
            </label>
            <div className="flex flex-col">
              <input
                className="w-full px-2 py-2 text-gray-700 bg-[#e5e7eb]  rounded font-normal"
                id="feesName"
                name="feesName"
                required
                placeholder="Fees Name"
                aria-label="feesName"
                value={tags}
                onChange={(event) => {
                  setTags(event.target.value);
                  setTagError("");
                }}
              />
              <div className="block text-[12px] mt-[-5px] mb-2 text-left text-red-600 h-4">
                {tagsError && tagsError}
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter
          className="space-x-2"
          placeholder={""}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Button
            variant="text"
            color="blue-gray"
            onClick={onCloseDialog}
            placeholder={""}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Cancel
          </Button>
          <Button
            variant="gradient"
            onClick={onOk}
            placeholder={""}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Ok, Got it
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ImageUpdateDialog;
