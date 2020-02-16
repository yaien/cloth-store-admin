import NextHead from "next/head"
import settings from "../../core/settings"
import { FunctionComponent as FC } from "react"

export interface HeadProps {
  title?: string
}

export const Head: FC<HeadProps> = props => {
  return (
    <NextHead>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
      <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossOrigin="anonymous"/>
      <link rel="icon" href="/favicon.ico" />
      <title>{props.title || settings.app.name}</title>
    </NextHead>
  )
} 

export default Head 