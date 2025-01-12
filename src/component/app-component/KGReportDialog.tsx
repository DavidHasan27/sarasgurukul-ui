import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import { Button } from "react-bootstrap";
import KGReportTablePreview from "./KGReportTablePreview";
import "react-responsive-modal/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import PLayGroupReportTablePreview from "./PLayGroupReportTablePreview";
import FirstReportTablePreview from "./FirstReportTablePreview";

const KGReportDialog = ({
  handleOpen,
  open,
  data,
  report,
  student,
  edit,
}: any) => {
  const classIdentity = report.studentYears.classId.classIdentity;
  // console.log("Report Dialog>>>>", data);

  const getPreiviewTable = () => {
    if (
      classIdentity === "JR_KG" ||
      classIdentity === "SR_KG" ||
      classIdentity === "NURSERY"
    ) {
      return (
        <KGReportTablePreview
          data={data}
          student={student}
          closeModel={() => handleOpen(false)}
          report={report}
          edit={edit}
        />
      );
    } else if (classIdentity === "PLAY_GROUP") {
      return (
        <PLayGroupReportTablePreview
          data={data}
          student={student}
          closeModel={() => handleOpen(false)}
          report={report}
          edit={edit}
        />
      );
    } else {
      return (
        <FirstReportTablePreview
          data={data}
          student={student}
          closeModel={() => handleOpen(false)}
          report={report}
          edit={edit}
        />
      );
    }
  };

  return (
    <Modal
      show={open}
      onHide={() => handleOpen(false)}
      aria-labelledby="example-custom-modal-styling-title"
      centered
      size="xl"
      fullscreen
    >
      <Modal.Body className="p-0">{getPreiviewTable()}</Modal.Body>
    </Modal>
  );
};

export default KGReportDialog;
