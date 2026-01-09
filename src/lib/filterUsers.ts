import type { User } from "@/types/user";

export function filterUsers(users: User[], searchTerm: string): User[] {
  if (!searchTerm.trim()) {
    return users;
  }

  const term = searchTerm.toLowerCase().trim();

  return users.filter((user) => {
    const name = user.name.toLowerCase();
    const email = user.email.toLowerCase();
    const username = user.username.toLowerCase();
    const company = user.company.name.toLowerCase();
    const city = user.address.city.toLowerCase();

    return (
      name.includes(term) ||
      email.includes(term) ||
      username.includes(term) ||
      company.includes(term) ||
      city.includes(term)
    );
  });
}
