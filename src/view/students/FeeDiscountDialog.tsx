import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Card,
  Dialog,
  CardBody,
  Typography,
  CardFooter,
  Input,
  Checkbox,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { useState } from "react";

const FeeDiscountDialog = ({
  open,
  handleOpen,
  onSubmit,
  discountValue,
}: any) => {
  const [discount, setDiscount] = useState(discountValue);
  return (
    <Dialog
      size="xs"
      open={open}
      handler={handleOpen}
      className="shadow-none"
      placeholder={undefined}
    >
      <Card className="mx-auto w-full max-w-[24rem]" placeholder={undefined}>
        <CardBody className="flex flex-col gap-4" placeholder={undefined}>
          <div className="flex flex-row justify-between items-center ">
            <Typography
              variant="h4"
              color="blue-gray"
              placeholder={undefined}
              className="text-center p-0 mt-2"
            >
              Add Discount
            </Typography>
            <IconButton placeholder={undefined} className="p-0 bg-transparent">
              <FontAwesomeIcon
                icon={faXmark}
                // className="mr-2"
                size="2x"
                color="#193474"
                onClick={handleOpen}
              />
            </IconButton>
          </div>
          <Typography
            className="mb-3 font-normal"
            variant="paragraph"
            color="gray"
            placeholder={undefined}
          >
            Added discount will be available only for one student
          </Typography>
          <Typography className="-mb-5" variant="h6" placeholder={undefined}>
            Discount In Percentage
          </Typography>
          <input
            className={`w-full px-2 py-2 text-gray-700 bg-[#e5e7eb] rounded-md font-semibold`}
            id="feesName"
            name="feesName"
            required
            placeholder="Discount In Percentage"
            aria-label="feesName"
            value={discount}
            onChange={(event: any) => {
              if (
                !isNaN(event.target.value) &&
                event.target.value <= 100 &&
                event.target.value.length < 4
              ) {
                setDiscount(event.target.value);
              }
            }}
          />
        </CardBody>
        <CardFooter className="pt-0" placeholder={undefined}>
          <Button
            variant="gradient"
            onClick={() => onSubmit(discount ? discount : 0)}
            fullWidth
            placeholder={undefined}
          >
            Add
          </Button>
        </CardFooter>
      </Card>
    </Dialog>
  );
};

export default FeeDiscountDialog;
