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

export interface IToken {
  id: `0x${string}`;
  symbol: string;
  name: string;
  decimals: string;
  logo: string;
}

export interface IToToken extends IToken {
  token1Price: string;
}
