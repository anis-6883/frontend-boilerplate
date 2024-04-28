import logo from "@public/images/asia-sport-logo.svg";
import { Metadata } from "next";

enum MODE {
  DARK = "dark",
  LIGHT = "light"
}

export const siteConfig = {
  title: "Bible Admin",
  description: `Bible Admin panel to manage the app datas`,
  logo: logo,
  icon: logo,
  mode: MODE.LIGHT
  // TODO: favicon
};

export const metaObject = (title?: string, description: string = siteConfig.description): Metadata => {
  return {
    title: title ? `${title} - Bible` : siteConfig.title,
    description
  };
};
