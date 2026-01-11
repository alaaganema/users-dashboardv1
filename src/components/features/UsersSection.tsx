import { memo, useState, useCallback } from "react";
import { useUsers } from "@/hooks/useUsers";
import type { User } from "@/types/user";
import { useFilterSort } from "@/hooks/useFilterSort";
import { sortUsers } from "@/lib/sortUsers";
import { filterUsers } from "@/lib/filterUsers";
import { UserTable } from "./UserTable";
import { UserTableSkeleton } from "./UserTableSkeleton";
import { UserCards } from "./UserCards";
import { UserCardsSkeleton } from "./UserCardsSkeleton";
import { UserDetailsModal } from "./UserDetailsModal";
import { SearchBar } from "./SearchBar";
import { SortControls, type SortOption } from "./SortControls";
import type { SortField, SortConfig } from "@/types/user";
import { ViewSwitcher, type ViewMode } from "./ViewSwitcher";
import { StateSimulator, type SimulatedState } from "./StateSimulator";
import { EmptyState } from "./EmptyState";
import { ErrorState } from "./ErrorState";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const UsersSection = memo(function UsersSection() {
  const { data: users = [], isLoading, error, refetch } = useUsers();
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [simulatedState, setSimulatedState] = useState<SimulatedState>("normal");

  const {
    searchTerm,
    setSearchTerm,
    sortField,
    sortOrder,
    sortConfig,
    filteredItems: filteredUsers,
    filteredCount,
    totalCount,
    handleSortFieldChange,
    handleSortOrderToggle,
  } = useFilterSort<User, SortField>({
    items: users,
    filterFn: filterUsers,
    sortFn: sortUsers,
    initialSortField: "name",
    initialSortOrder: "asc",
  });

  const handleViewUser = useCallback((user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  }, []);

  const handleStateChange = useCallback((state: SimulatedState) => {
    setSimulatedState(state);
  }, []);

  // Determine which state to show
  const showLoading = simulatedState === "loading" || (simulatedState === "normal" && isLoading);
  const showError = simulatedState === "error" || (simulatedState === "normal" && error);
  const showEmpty = simulatedState === "empty" || (simulatedState === "normal" && users.length === 0);
  const showNoResults = simulatedState === "normal" && filteredCount === 0 && searchTerm;

  const sortOptions: SortOption<SortField>[] = [
    { value: "name", label: "Name" },
    { value: "email", label: "Email" },
    { value: "username", label: "Username" },
    { value: "company", label: "Company" },
    { value: "city", label: "City" },
  ];

  return (
    <>
      <StateSimulator onStateChange={handleStateChange} />
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            Manage and search through the user database
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <SearchBar<string>
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search users..."
            />
            <div className="flex items-center gap-3 flex-wrap">
              <SortControls<SortField>
                field={sortField}
                order={sortOrder}
                options={sortOptions}
                onFieldChange={handleSortFieldChange}
                onOrderToggle={handleSortOrderToggle}
                placeholder="Sort by"
              />
              <ViewSwitcher view={viewMode} onViewChange={setViewMode} />
            </div>
          </div>
          {showLoading ? (
            viewMode === "table" ? (
              <UserTableSkeleton />
            ) : (
              <UserCardsSkeleton />
            )
          ) : showError ? (
            <ErrorState
              onRetry={() => {
                setSimulatedState("normal");
                refetch();
              }}
            />
          ) : showEmpty ? (
            <EmptyState message="No users available." />
          ) : showNoResults ? (
            <EmptyState />
          ) : (
            <>
              <div className="text-sm text-muted-foreground">
                {searchTerm
                  ? `Showing ${filteredCount} of ${totalCount} users`
                  : `Total: ${totalCount} users`}
              </div>
              {viewMode === "table" ? (
                <UserTable
                  users={filteredUsers}
                  sortConfig={sortConfig as SortConfig}
                  onSort={handleSortFieldChange}
                  onView={handleViewUser}
                />
              ) : (
                <UserCards users={filteredUsers} onView={handleViewUser} />
              )}
            </>
          )}
        </CardContent>
      </Card>

      <UserDetailsModal
        user={selectedUser}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
});
