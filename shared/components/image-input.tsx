import { FC } from "react"
import { Picture } from "../../lib/store"

export interface ImageInputProps {
  onAdded?(picture: Picture): void
}

export const ImageInput: FC<ImageInputProps> = (props) => {
  function open() {
    const cloudinary: any = window["cloudinary"]
    const config = {
      cloudName: "dic03uy4n",
      uploadPreset: "wev39m4e",
      sources: ["local"],
    }
    const widget: any = cloudinary.createUploadWidget(
      config,
      (err: Error, result: any) => {
        if (result && result.event == "success" && props.onAdded) {
          console.log(result)
          props.onAdded({ reference: result.info.public_id })
        }
      }
    )

    widget.open()
  }

  return (
    <div>
      <button type="button" onClick={open}>
        Upload
      </button>
    </div>
  )
}

export default ImageInput
