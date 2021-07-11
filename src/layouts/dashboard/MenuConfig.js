import { Icon } from "@iconify/react";
import homeFill from "@iconify/icons-eva/home-fill";
import fileFill from "@iconify/icons-eva/file-fill";
import roundGrain from "@iconify/icons-ic/round-grain";
import bookOpenFill from "@iconify/icons-eva/book-open-fill";
// routes
import {
  PATH_AUTH,
  PATH_DOCS,
  PATH_PAGE,
  PATH_DASHBOARD,
} from "../../routes/paths";

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22,
};

const menuConfig = [
  {
    title: "Dashboard",
    icon: <Icon icon={homeFill} {...ICON_SIZE} />,
    path: PATH_DASHBOARD.general.app,
  },
  {
    title: "Reports",
    icon: <Icon icon={roundGrain} {...ICON_SIZE} />,
    children: [
      {
        items: [
          { title: "Trade History", path: "Trade History" },
          { title: "Reports", path: "Reports" },
          { title: "Calendar", path: PATH_DASHBOARD.calendar },
          { title: "Analyze", path: PATH_DASHBOARD.general.analytics },
        ],
      },
    ],
  },
  {
    title: "Memeries",
    icon: <Icon icon={fileFill} {...ICON_SIZE} />,
    path: PATH_DASHBOARD.blog.posts,
  },
  {
    title: "Import",
    icon: <Icon icon={fileFill} {...ICON_SIZE} />,
    path: "Import",
  },
];

export default menuConfig;
