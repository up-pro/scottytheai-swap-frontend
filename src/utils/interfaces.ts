import { ElementType } from "react";

export interface ISocialLink {
  id: number;
  icon: ElementType;
  url: string;
  label: string;
}

export interface ICryptoSelectItem {
  id: number;
  label: string;
  imgSrc: string;
  value: string;
}
