import type { User } from "@/types/user";
import type { SortConfig } from "@/types/user";

export function sortUsers(users: User[], config: SortConfig): User[] {
  const { field, order } = config;

  return [...users].sort((a, b) => {
    let aValue: string;
    let bValue: string;

    switch (field) {
      case "name":
        aValue = a.name;
        bValue = b.name;
        break;
      case "email":
        aValue = a.email;
        bValue = b.email;
        break;
      case "username":
        aValue = a.username;
        bValue = b.username;
        break;
      case "company":
        aValue = a.company.name;
        bValue = b.company.name;
        break;
      case "city":
        aValue = a.address.city;
        bValue = b.address.city;
        break;
      default:
        return 0;
    }

    const comparison = aValue.localeCompare(bValue, undefined, {
      sensitivity: "base",
    });

    return order === "asc" ? comparison : -comparison;
  });
}
