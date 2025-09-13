import { useState } from "react";
import { LoginPage } from "./components/LoginPage";
import { DashboardLayout } from "./components/DashboardLayout";
import { EnhancedStationControllerDashboard } from "./components/dashboards/EnhancedStationControllerDashboard";
import { DocumentEngineerDashboard } from "./components/dashboards/DocumentEngineerDashboard";
import { DocumentHRDashboard } from "./components/dashboards/DocumentHRDashboard";
import { DocumentProcurementDashboard } from "./components/dashboards/DocumentProcurementDashboard";
import { DocumentExecutiveDashboard } from "./components/dashboards/DocumentExecutiveDashboard";
import { WaterMetroDashboard } from "./components/dashboards/WaterMetroDashboard";
import { EnhancedOperationsDashboard } from "./components/dashboards/EnhancedOperationsDashboard";

export default function App() {
  const [currentUser, setCurrentUser] = useState<string | null>(
    null,
  );
  const [language, setLanguage] = useState<"en" | "ml">("en");

  const handleLogin = (role: string) => {
    setCurrentUser(role);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const renderDashboard = () => {
    switch (currentUser) {
      case "station-controller":
        return (
          <EnhancedStationControllerDashboard
            language={language}
          />
        );
      case "engineer":
        return (
          <DocumentEngineerDashboard language={language} />
        );
      case "hr":
        return <DocumentHRDashboard language={language} />;
      case "procurement":
        return (
          <DocumentProcurementDashboard language={language} />
        );
      case "executive":
        return (
          <DocumentExecutiveDashboard language={language} />
        );
      case "water-metro":
        return <WaterMetroDashboard language={language} />;
      case "operations":
        return <EnhancedOperationsDashboard language={language} />;
      default:
        return <div>Unknown role</div>;
    }
  };

  if (!currentUser) {
    return (
      <LoginPage
        onLogin={handleLogin}
        language={language}
        onLanguageChange={setLanguage}
      />
    );
  }

  return (
    <DashboardLayout
      role={currentUser}
      language={language}
      onLanguageChange={setLanguage}
      onLogout={handleLogout}
    >
      {renderDashboard()}
    </DashboardLayout>
  );
}