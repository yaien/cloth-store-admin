import { FC } from "react";
import { Picture } from "../../lib/store";
import { useAPI } from "../hooks";

export interface ImageInputProps {
  onAdded?(picture: Picture): void;
}

export const ImageInput: FC<ImageInputProps> = (props) => {
  const api = useAPI();

  async function open() {
    const cloudinary: any = window["cloudinary"];
    const settings = api.settings.cloudinary;
    if (!settings) return null;
    const widget: any = cloudinary.createUploadWidget(
      {
        cloudName: settings.cloud,
        uploadPreset: settings.preset,
        sources: ["local"],
      },
      (err: Error, result: any) => {
        if (result && result.event == "success" && props.onAdded) {
          console.log(result);
          props.onAdded({ reference: result.info.public_id });
        }
      }
    );

    widget.open();
  }

  return (
    <div>
      <button type="button" onClick={open}>
        Upload
      </button>
    </div>
  );
};

export default ImageInput;
