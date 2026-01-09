import { memo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { User } from "@/types/user";
import type { SortConfig } from "@/types/user";
import { ArrowUp, Eye } from "lucide-react";

interface UserTableProps {
  users: User[];
  sortConfig: SortConfig;
  onSort: (field: SortConfig["field"]) => void;
  onView: (user: User) => void;
}

export const UserTable = memo(function UserTable({
  users,
  sortConfig,
  onSort,
  onView,
}: UserTableProps) {
  const getSortIcon = (field: SortConfig["field"]) => {
    if (sortConfig.field !== field) {
      return null;
    }
    const isAscending = sortConfig.order === "asc";
    return (
      <ArrowUp
        className={`ml-1 h-3 w-3 inline ${!isAscending ? "rotate-180" : ""}`}
      />
    );
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              className="cursor-pointer hover:bg-muted/50 select-none"
              onClick={() => onSort("name")}
            >
              Name {getSortIcon("name")}
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-muted/50 select-none"
              onClick={() => onSort("email")}
            >
              Email {getSortIcon("email")}
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-muted/50 select-none"
              onClick={() => onSort("username")}
            >
              Username {getSortIcon("username")}
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-muted/50 select-none"
              onClick={() => onSort("company")}
            >
              Company {getSortIcon("company")}
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-muted/50 select-none"
              onClick={() => onSort("city")}
            >
              City {getSortIcon("city")}
            </TableHead>
            <TableHead>Phone</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center text-muted-foreground py-8"
              >
                No users found
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow
                key={user.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => onView(user)}
              >
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.company.name}</TableCell>
                <TableCell>{user.address.city}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onView(user)}
                    className="h-8 w-8 p-0"
                    aria-label={`View details for ${user.name}`}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
});
