import React from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import CloseIcon from "@mui/icons-material/Close";

const Ticker = (props) => {
  const {
    mainContain,
    width,
    height,
    direction,
    behavior,
    scrollDelay,
    scrollAmount,
    loop,
    backgroundColor,
    hspace,
    vspace,
    style,
    classInfo,
    editOnClick,
    closeOnClick,
  } = props;

  return (
    <div className="marquee-main">
      <ModeEditOutlineIcon
        onClick={editOnClick}
        className="marquee-edit-icon"
      />
      <marquee
        width={width}
        height={height}
        direction={direction}
        behavior={behavior}
        scrolldelay={scrollDelay}
        scrollamount={scrollAmount}
        loop={loop}
        bgcolor={backgroundColor}
        hspace={hspace}
        vspace={vspace}
        style={style}
        className={classInfo}
      >
        {mainContain}
      </marquee>
      <CloseIcon onClick={closeOnClick} className="marquee-close-icon" />
    </div>
  );
};

export default Ticker;
