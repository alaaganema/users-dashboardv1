import { memo } from "react";
import { Navbar } from "@/components/features/Navbar";
import { UsersSection } from "@/components/features/UsersSection";

export const DashboardPage = memo(function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-6 pt-24">
        <UsersSection />
      </div>
    </div>
  );
});
