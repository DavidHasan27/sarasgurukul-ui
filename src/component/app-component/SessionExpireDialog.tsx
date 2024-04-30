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
    <Dialog open={open} size={"xs"} handler={onClose} placeholder={""}>
      <DialogHeader placeholder={""}>{title}</DialogHeader>
      <DialogBody placeholder={""}>{message}</DialogBody>
      <DialogFooter placeholder={"Fotter"}>
        <Button
          variant="text"
          color="red"
          onClick={() => {
            onClose(null);
            navigate("/login");
          }}
          className="mr-1"
          placeholder={""}
        >
          <span>Login Again</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default SessionExpiredDialog;
