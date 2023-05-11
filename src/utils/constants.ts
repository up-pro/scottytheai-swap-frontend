import { ISocialLink } from "./interfaces";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import InsertChartIcon from "@mui/icons-material/InsertChart";

export const SOCIAL_LINKS: Array<ISocialLink> = [
  {
    id: 1,
    label: "Telegram",
    icon: TelegramIcon,
    url: "#"
  },
  {
    id: 2,
    label: "Twitter",
    icon: TwitterIcon,
    url: "#"
  },
  {
    id: 3,
    label: "Scotty Chart",
    icon: InsertChartIcon,
    url: "#"
  }
];
