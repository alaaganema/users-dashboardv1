import type { FakeAccount } from "@/types/auth";

export const FAKE_ACCOUNTS: FakeAccount[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "Administrator",
  },
  { id: "2", name: "John Doe", email: "john@example.com", role: "Manager" },
  { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "Viewer" },
];
