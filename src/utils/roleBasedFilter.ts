export type Role = string;
export type RestrictionConfig<T extends string> = Record<Role, T[]>;

/**
 * Filters a list of items based on the current user's role and a restriction config.
 *
 * @param params.role - Current user's role (e.g., 'admin', 'hr')
 * @param params.items - All items (strings like button names or component keys)
 * @param params.restrictions - Object mapping roles to restricted items
 */
export const filterByRole = <T extends string>({
  role,
  items,
  restrictions,
}: {
  role: Role;
  items: T[];
  restrictions: RestrictionConfig<T>;
}): T[] => {
  const normalizedRole = role?.toLowerCase() || "";
  const restricted = restrictions[normalizedRole] || [];

  return items.filter(item => !restricted.includes(item));
};
