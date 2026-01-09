import { memo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { User } from "@/types/user";
import { Eye, Mail, Phone, Building2, MapPin } from "lucide-react";

interface UserCardsProps {
  users: User[];
  onView: (user: User) => void;
}

export const UserCards = memo(function UserCards({
  users,
  onView,
}: UserCardsProps) {
  if (users.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-12">
        No users found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((user) => (
        <Card
          key={user.id}
          className="hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onView(user)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-lg leading-tight">
                  {user.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  @{user.username}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="truncate">{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="truncate">{user.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Building2 className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="truncate">{user.company.name}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="truncate">{user.address.city}</span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-4"
              onClick={(e) => {
                e.stopPropagation();
                onView(user);
              }}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
});
