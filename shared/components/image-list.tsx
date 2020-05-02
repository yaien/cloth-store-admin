import { Picture } from "../../lib/store";
import { FC } from "react";
import { useAPI } from "../hooks";
import { Cloudinary } from "cloudinary-core";

export interface ImageListProps {
  pictures: Picture[];
}

export const ImageList: FC<ImageListProps> = (props) => {
  const api = useAPI();
  const settings = api.settings.cloudinary;

  if (!settings) {
    return null;
  }

  const cloudinary = new Cloudinary({ cloud_name: settings.cloud });

  return (
    <>
      {props.pictures.map((picture) => (
        <img
          key={picture.reference}
          className="img-fluid rounded border shadow-sm m-2"
          src={cloudinary.url(picture.reference, {
            crop: "scale",
            width: 318,
            height: 180,
          })}
        />
      ))}
    </>
  );
};

export default ImageList;
