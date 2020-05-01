import { Picture, Cloudinary } from "../../lib/store"
import { FC, useState, useEffect } from "react"
import { useAPI } from "../hooks"
import { Image, CloudinaryContext } from "cloudinary-react"

export interface ImageListProps {
  pictures: Picture[]
}

export const ImageList: FC<ImageListProps> = (props) => {
  const api = useAPI()
  const settings = api.settings.cloudinary

  if (!settings) {
    return null
  }

  return (
    <CloudinaryContext cloudName={settings.cloud}>
      {props.pictures.map((picture) => (
        <Image
          key={picture.reference}
          publicId={picture.reference}
          width="200"
          responsive
        />
      ))}
    </CloudinaryContext>
  )
}

export default ImageList
