import React from "react";
import { HashLink } from "react-router-hash-link";

function ScrollToTop() {
    const scrollWidthOffset = (el) => {
        const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
        const yOffset = -80; 
        window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
    }

  return (
    <div className="fixed-bottom scroll-top d-flex justify-content-end mb-1">
      <div className="scroll-bg d-flex align-items-center mr-2">
      <HashLink scroll={el => scrollWidthOffset(el)} smooth to="#top">
        <img src="../../scroll.png" width="30" height="30" alt="" />
      </HashLink>
      </div>
    </div>
  );
}

export default ScrollToTop;
