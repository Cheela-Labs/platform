/**
 * A permission definition.
 */
export interface Permission {
  /**
   * Permission identifier.
   */
  readonly name: string;

  /**
   * Human-readable description.
   */
  readonly description?: string;
}

/**
 * Creates a permission definition.
 */
export function createPermission(
  permission: Permission,
): Permission {
  return permission;
}