import { getLocalData } from "./locallStorage";
import { filterByRole } from "./roleBasedFilter";

const allButtons = ["Create", "Edit", "Delete", "Export", "Settings"] as const;
type ButtonName = typeof allButtons[number];

const roleRestrictions: Record<string, ButtonName[]> = {
  hr: ["Create", "Delete", "Settings"],
  guest: ["Create", "Edit", "Delete", "Export", "Settings"],
  admin: [], // no restrictions
};

// Inside component
const currentUser = getLocalData("user");
export const visibleButtons = filterByRole<ButtonName>({
  role: currentUser,
  items: [...allButtons],
  restrictions: roleRestrictions,
});