import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserMap } from "./UserMap";
import type { User } from "@/types/user";
import {
  Mail,
  Phone,
  Globe,
  Building2,
  MapPin,
  User as UserIcon,
} from "lucide-react";

interface UserDetailsModalProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UserDetailsModal({
  user,
  open,
  onOpenChange,
}: UserDetailsModalProps) {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{user.name}</DialogTitle>
          <DialogDescription>
            Complete user profile information
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-lg">Basic Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Username
                  </p>
                  <p className="text-sm">{user.username}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Email
                  </p>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={`mailto:${user.email}`}
                      className="text-sm text-primary hover:underline"
                    >
                      {user.email}
                    </a>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Phone
                  </p>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={`tel:${user.phone}`}
                      className="text-sm text-primary hover:underline"
                    >
                      {user.phone}
                    </a>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Website
                  </p>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={`https://${user.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      {user.website}
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Company Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-lg">Company</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Name
                </p>
                <p className="text-sm font-semibold">{user.company.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Catch Phrase
                </p>
                <p className="text-sm italic text-muted-foreground">
                  {user.company.catchPhrase}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Business
                </p>
                <p className="text-sm">{user.company.bs}</p>
              </div>
            </CardContent>
          </Card>
          {/* Address Section */}
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-lg">Address</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Street
                  </p>
                  <p className="text-sm">{user.address.street}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Suite
                  </p>
                  <p className="text-sm">{user.address.suite}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    City
                  </p>
                  <p className="text-sm">{user.address.city}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Zipcode
                  </p>
                  <p className="text-sm">{user.address.zipcode}</p>
                </div>
              </div>
              {/* Map View */}
              <UserMap user={user} />
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
