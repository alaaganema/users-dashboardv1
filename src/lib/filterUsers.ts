import type { User } from "@/types/user";

export const filterUsers = (user: User, searchTerm: string): boolean => {
  if (!searchTerm.trim()) {
    return true;
  }
  const term = searchTerm.toLowerCase();
  return (
    user.name.toLowerCase().includes(term) ||
    user.email.toLowerCase().includes(term) ||
    user.username.toLowerCase().includes(term) ||
    user.company.name.toLowerCase().includes(term) ||
    user.address.city.toLowerCase().includes(term)
  );
};
