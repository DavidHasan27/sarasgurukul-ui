import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";

const WarningDialog = ({
  open,
  onCloseDialog,
  onOkClick,
  onCancelClick,
  header,
  message,
  subMessage,
  img,
  type,
  onOkAll,
}: any) => {
  // const [open, setOpen] = useState(false);

  //   const handleOpen = () => setOpen(!open);

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
          {img ? (
            <img src={img} className="max-h-[200px]" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-16 w-16 text-red-500"
            >
              <path
                fillRule="evenodd"
                d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
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
          {type ? (
            <>
              <Button
                variant="gradient"
                onClick={onOkClick}
                placeholder={""}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                color="red"
              >
                {type === "sent" ? "Delete For Me" : "Delete"}
              </Button>

              {type === "sent" && (
                <Button
                  variant="gradient"
                  onClick={onOkAll}
                  placeholder={""}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  color="red"
                >
                  Delete For All
                </Button>
              )}
            </>
          ) : (
            <Button
              variant="gradient"
              onClick={onOkClick}
              placeholder={""}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Ok, Got it
            </Button>
          )}
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default WarningDialog;
