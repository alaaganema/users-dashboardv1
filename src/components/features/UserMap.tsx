import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { User } from "@/types/user";
import { MapPin } from "lucide-react";

interface UserMapProps {
  user: User;
}

export function UserMap({ user }: UserMapProps) {
  const { lat, lng } = user.address.geo;
  const addressString = `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`;

  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${
    parseFloat(lng) - 0.01
  },${parseFloat(lat) - 0.01},${parseFloat(lng) + 0.01},${
    parseFloat(lat) + 0.01
  }&layer=mapnik&marker=${lat},${lng}`;

  // Alternative: Google Maps embed (requires API key in production)
  // const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${lat},${lng}`;

  return (
    <Card className="shadow-none">
      <CardHeader>
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-lg">Location</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">Address</p>
            <p className="text-sm text-muted-foreground">{addressString}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Coordinates</p>
            <p className="text-sm text-muted-foreground">
              {lat}, {lng}
            </p>
          </div>
        </div>
        <div className="w-full h-64 rounded-md overflow-hidden border">
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={mapUrl}
            title={`Map for ${user.name}`}
          />
        </div>
        <div className="text-xs text-muted-foreground">
          <a
            href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}&zoom=15`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            View larger map
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
