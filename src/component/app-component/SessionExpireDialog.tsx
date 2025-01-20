import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const SessionExpiredDialog = ({ open, onClose, message, title }: any) => {
  const navigate = useNavigate();
  return (
    <Dialog
      open={open}
      size={"xs"}
      handler={onClose}
      placeholder={""}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <DialogHeader
        placeholder={""}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {title}
      </DialogHeader>
      <DialogBody
        placeholder={""}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {message}
      </DialogBody>
      <DialogFooter
        placeholder={"Fotter"}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Button
          variant="text"
          color="red"
          onClick={() => {
            onClose(null);
            navigate("/login");
          }}
          className="mr-1"
          placeholder={""}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <span>Login Again</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default SessionExpiredDialog;
