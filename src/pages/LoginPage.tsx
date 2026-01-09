import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { FAKE_ACCOUNTS } from "@/constants/auth";
import { Loader2, LogIn } from "lucide-react";

export function LoginPage() {
  const [selectedAccountId, setSelectedAccountId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = () => {
    if (!selectedAccountId) return;

    setIsLoading(true);
    const account = FAKE_ACCOUNTS.find((acc) => acc.id === selectedAccountId);

    if (account) {
      setTimeout(() => {
        login(account);
        setIsLoading(false);
      }, 500);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="rounded-full bg-primary/10 p-3">
              <LogIn className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Welcome</CardTitle>
          <CardDescription className="text-center">
            Select an account to access the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select
            value={selectedAccountId}
            onValueChange={setSelectedAccountId}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an account" />
            </SelectTrigger>
            <SelectContent>
              {FAKE_ACCOUNTS.map((account) => (
                <SelectItem key={account.id} value={account.id}>
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{account.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {account.email}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            className="w-full"
            onClick={handleLogin}
            disabled={!selectedAccountId || isLoading}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Login"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
