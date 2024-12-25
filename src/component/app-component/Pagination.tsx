import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, Typography } from "@material-tailwind/react";
import React from "react";

const Pagination = ({ count, onPageChange, pageIndex }: any) => {
  const [active, setActive] = React.useState(pageIndex);

  const next = () => {
    if (active === count) return;

    setActive(active + 1);
    onPageChange(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    onPageChange(active - 1);
    setActive(active - 1);
  };

  return (
    <div className="flex items-center gap-8">
      <IconButton
        size="sm"
        variant="outlined"
        onClick={prev}
        disabled={active === 1}
        placeholder={""}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </IconButton>
      <Typography color="gray" className="font-normal" placeholder={""}>
        Page <strong className="text-gray-900">{active}</strong> of{" "}
        <strong className="text-gray-900">{count}</strong>
      </Typography>
      <IconButton
        size="sm"
        variant="outlined"
        onClick={next}
        disabled={active === count}
        placeholder={""}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </IconButton>
    </div>
  );
};

export default Pagination;
