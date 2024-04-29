import { Metadata } from "next";

enum MODE {
  DARK = "dark",
  LIGHT = "light"
}

export const siteConfig = {
  title: "Bible Admin",
  description: `Bible Admin panel to manage the app datas`,
  mode: MODE.LIGHT
};

export const metaObject = (title?: string, description: string = siteConfig.description): Metadata => {
  return {
    title: title ? `${title} - Bible` : siteConfig.title,
    description
  };
};
