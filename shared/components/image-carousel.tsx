import {
  CarouselControl,
  CarouselIndicators,
  Carousel,
  CarouselItem,
} from "reactstrap";
import { Cloudinary } from "cloudinary-core";
import { useState, FC } from "react";
import { useAPI } from "../hooks";
import { Picture } from "../../lib/store";

export const ImageCarousel: FC<{ pictures: Picture[] }> = ({ pictures }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const api = useAPI();

  if (!api.settings.cloudinary) {
    return null;
  }

  const cloudinary = new Cloudinary({
    cloud_name: api.settings.cloudinary.cloud,
  });

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === pictures.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? pictures.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = pictures.map((picture) => {
    const url = cloudinary.url(picture.reference, {
      width: 318,
      height: 180,
      responsive: true,
      crop: "scale",
    });
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={picture.reference}
      >
        <img
          className="img-fluid"
          height="180"
          width="318"
          src={url}
          alt={picture.reference}
        />
      </CarouselItem>
    );
  });

  return (
    <Carousel activeIndex={activeIndex} next={next} previous={previous}>
      <CarouselIndicators
        items={pictures}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );
};

export default ImageCarousel;
