import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function Img({ image, classes }) {
  return <LazyLoadImage alt="" src={image} className={classes} effect="blur" />;
}

export default Img;
