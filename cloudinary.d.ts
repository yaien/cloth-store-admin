import { FC } from "react"

declare module "cloudinary-react" {
  export const Image: FC<{
    publicId: string
    cloudName?: string
    width?: string
    secure?: "true" | "false"
    crop?: "scale" | "thumb" | "fill"
    gravity?: "faces"
    quality?: "auto"
    fetchFormat?: "auto"
    responsive?: boolean
    responsiveDebounce?: boolean
  }>
}
