import { AuthProvider } from "@/contexts/AuthContext";
import { useAuth } from "@/hooks/useAuth";
import { LoginPage } from "@/pages/LoginPage";
import { DashboardPage } from "@/pages/DashboardPage";

function AppContent() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <DashboardPage /> : <LoginPage />;
}

function App() {
  return (
    <AuthProvider>
      {/* <AppContent /> */}
      <DashboardPage></DashboardPage>
    </AuthProvider>
  );
}

export default App;
