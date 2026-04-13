import React from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "./colors";

export const Icons = {
  // Navigation / tab bar
  home: { name: "home", library: "Ionicons" },
  explore: { name: "compass", library: "Ionicons" },
  post: { name: "add-circle", library: "Ionicons" },
  jobs: { name: "briefcase", library: "Ionicons" },
  profile: { name: "person", library: "Ionicons" },
  notifications: { name: "notifications", library: "Ionicons" },
  back: { name: "chevron-back", library: "Ionicons" },
  close: { name: "close", library: "Ionicons" },
  menu: { name: "menu", library: "Ionicons" },
  settings: { name: "settings", library: "Ionicons" },

  // Actions
  search: { name: "search", library: "Ionicons" },
  filter: { name: "filter", library: "Ionicons" },
  sort: { name: "swap-vertical", library: "Ionicons" },
  edit: { name: "pencil", library: "MaterialCommunityIcons" },
  delete: { name: "trash", library: "Ionicons" },
  share: { name: "share-outline", library: "Ionicons" },
  send: { name: "send", library: "Ionicons" },
  attach: { name: "attach", library: "Ionicons" },
  camera: { name: "camera", library: "Ionicons" },
  mic: { name: "mic", library: "Ionicons" },
  location: { name: "location", library: "Ionicons" },
  calendar: { name: "calendar", library: "Ionicons" },
  clock: { name: "time", library: "Ionicons" },
  check: { name: "checkmark", library: "Ionicons" },
  checkCircle: { name: "checkmark-circle", library: "Ionicons" },
  add: { name: "add", library: "Ionicons" },
  minus: { name: "remove", library: "Ionicons" },
  refresh: { name: "refresh", library: "Ionicons" },

  // Job / marketplace
  job: { name: "briefcase-outline", library: "Ionicons" },
  bid: { name: "gavel", library: "MaterialCommunityIcons" },
  skill: { name: "star", library: "Ionicons" },
  category: { name: "grid", library: "Ionicons" },
  budget: { name: "cash", library: "Ionicons" },
  urgency: { name: "flash", library: "Ionicons" },
  match: { name: "heart", library: "Ionicons" },
  star: { name: "star", library: "Ionicons" },
  starOutline: { name: "star-outline", library: "Ionicons" },
  verified: { name: "shield-checkmark", library: "Ionicons" },
  trustScore: { name: "shield-half", library: "Ionicons" },
  escrow: { name: "lock-closed", library: "Ionicons" },
  dispute: { name: "alert-circle", library: "Ionicons" },
  payment: { name: "card", library: "Ionicons" },

  // User
  avatar: { name: "person-circle", library: "Ionicons" },
  online: { name: "ellipse", library: "Ionicons" },
  rating: { name: "star-half", library: "Ionicons" },
  review: { name: "document-text", library: "Ionicons" },
  provider: { name: "hammer", library: "Ionicons" },
  customer: { name: "person", library: "Ionicons" },

  // Status
  success: { name: "checkmark-circle", library: "Ionicons" },
  error: { name: "close-circle", library: "Ionicons" },
  warning: { name: "warning", library: "Ionicons" },
  info: { name: "information-circle", library: "Ionicons" },
  loading: { name: "sync", library: "Ionicons" },

  // AI / special
  aiSpark: { name: "sparkles", library: "Ionicons" },
  giglyLogo: { name: "hexagon", library: "Ionicons" },
} as const;

type IconName = keyof typeof Icons;

export interface GiglyIconProps {
  name: IconName;
  size?: number;
  color?: string;
}

export const GiglyIcon: React.FC<GiglyIconProps> = ({
  name,
  size = 24,
  color = Colors.textPrimary,
}) => {
  const iconDef = Icons[name];

  if (!iconDef) {
    console.warn(`Icon ${name} not found`);
    return null;
  }

  if (iconDef.library === "Ionicons") {
    return <Ionicons name={iconDef.name as any} size={size} color={color} />;
  }

  if (iconDef.library === "MaterialCommunityIcons") {
    return (
      <MaterialCommunityIcons
        name={iconDef.name as any}
        size={size}
        color={color}
      />
    );
  }

  return null;
};
