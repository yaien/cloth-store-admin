import { AxiosInstance } from "axios";
import session from "./session";

export interface Root {
  config: Config;
  http: AxiosInstance;
}

export interface Config {
  baseUrl: string;
  key: string;
}

export interface Auth {
  access_token: string;
  token_type?: string;
  expires_in?: number;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin";
}

export interface Picture {
  reference: string;
}

export interface Item {
  id: string;
  name: string;
  price: number;
  slug: string;
  active: boolean;
  sizes: Size[];
  tags?: string[];
  pictures?: Picture[];
  description: string;
  createdAt: number;
}

export interface Size {
  label: string;
  existence: number;
}

export interface CloudinarySettings {
  cloud: string;
  preset: string;
}

export type Session = ReturnType<typeof session>;
