import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { fetchUsers } from "@/api/users";
import type { User } from "@/types/user";

export const useUsers = (): UseQueryResult<User[], Error> => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};
