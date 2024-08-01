import {
  Shapes,
  FolderOpenDot,
  CircleUserRound,
  Settings,
  Briefcase,
  GithubIcon,
} from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
export const smSidebarLists = [
  {
    label: "about",
    icon: CircleUserRound,
    isActive: true,
  },
  {
    label: "projects",
    icon: FolderOpenDot,
    isActive: false,
  },
  {
    label: "experience",
    icon: Briefcase,
    isActive: false,
  },
  {
    label: "blogs",
    icon: Shapes,
    isActive: false,
  },
  {
    label: "github",
    icon: GitHubLogoIcon,
    isActive: false,
  },
  // {
  //   label: "settings",
  //   icon: Settings,
  //   isActive: false,
  // },
];
