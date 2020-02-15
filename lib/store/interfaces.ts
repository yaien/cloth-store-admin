import { AxiosInstance } from "axios";
import session from "./session"

export interface Root {
  config: Config
  http: AxiosInstance
}


export interface Config {
  baseUrl: string
  key: string
}

export interface Auth {
  access_token: string
  token_type?: string
  expires_in?: number
}

export interface Credentials {
  email: string
  password: string
}

export interface User {
  id: string
  name: string
  email: string
  role: "admin"
}

export interface Item {
  name: string
  price: number
  slug: string
  active: boolean,
  sizes: Size[]
  tags?: string[]
  pictures?: string[]
  description: string
  createdAt: number
}

export interface Size {
  label: string
  existence: number
}

export type Session = ReturnType<typeof session>