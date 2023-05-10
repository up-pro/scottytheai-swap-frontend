import Image from "next/image";
import { InsertChart, Telegram, Twitter } from "@mui/icons-material";
import { ISocialLink } from "./interfaces";

export const SOCIAL_LINKS: Array<ISocialLink> = [
  {
    id: 1,
    label: "Telegram",
    icon: Telegram,
    url: "#"
  },
  {
    id: 2,
    label: "Twitter",
    icon: Twitter,
    url: "#"
  },
  {
    id: 3,
    label: "Scotty Chart",
    icon: InsertChart,
    url: "#"
  }
];
