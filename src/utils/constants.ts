import { ICryptoSelectItem, ISocialLink } from "./interfaces";
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

export const CRYPTO_SELECT_ITEMS: Array<ICryptoSelectItem> = [
  {
    id: 1,
    label: "Ethereum",
    imgSrc: "/assets/images/crypto-eth.png",
    value: "ethereum"
  },
  {
    id: 2,
    label: "BNB",
    imgSrc: "/assets/images/crypto-bnb.png",
    value: "bnb"
  },
  {
    id: 3,
    label: "Scotty",
    imgSrc: "/assets/images/crypto-scotty.png",
    value: "scotty"
  }
];

export const REGEX_NUMBER_VALID = /^[0-9]*\.?[0-9]*$/;
