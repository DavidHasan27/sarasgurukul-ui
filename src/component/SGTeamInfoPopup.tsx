import {
  Avatar,
  Popover,
  PopoverContent,
  PopoverHandler,
  Typography,
} from "@material-tailwind/react";
import { Button } from "react-bootstrap";

const SGTeamInfopopup = (props: any) => {
  return (
    <PopoverContent className="z-50 max-w-[24rem]" placeholder={""}>
      <div className="mb-2 flex items-center justify-between gap-4">
        <Avatar
          size="md"
          variant="circular"
          src={props.src}
          alt="tania andrew"
          placeholder={undefined}
        />
      </div>
      <Typography
        variant="h5"
        color="blue-gray"
        className="mb-2 flex items-center gap-2 font-medium"
        placeholder={""}
      >
        <span>{props.name}</span>
      </Typography>
      <Typography
        variant="small"
        color="gray"
        className="font-normal text-blue-gray-500"
        placeholder={""}
      >
        {props.desc}
      </Typography>
    </PopoverContent>
  );
};

export default SGTeamInfopopup;
