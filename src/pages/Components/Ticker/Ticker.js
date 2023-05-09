import React from "react";

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
  } = props;

  return (
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
    >
      {mainContain}
    </marquee>
  );
};

export default Ticker;
