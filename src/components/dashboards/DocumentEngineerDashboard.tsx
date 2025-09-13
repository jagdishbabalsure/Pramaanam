import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area";
import {
  Zap,
  Radio,
  DoorOpen,
  Thermometer,
  AlertTriangle,
  Activity,
  Download,
  FileText,
  TrendingUp,
  TrendingDown,
  Minus,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter,
  RefreshCw,
  Settings,
} from "lucide-react";

interface DocumentEngineerDashboardProps {
  language: "en" | "ml";
}

const translations = {
  en: {
    title: "Engineer Dashboard",
    subtitle: "System Monitoring & Technical Documentation",

    // Main sections
    systemSnapshot: "System Snapshot",
    iotSensorData: "IoT Sensor Data",
    operationalLogs: "Operational Logs",
    maintenanceAlerts: "Maintenance Alerts",

    // System components
    power: "Power Systems",
    signaling: "Signaling",
    doors: "Door Systems",
    hvac: "HVAC",
    emergency: "Emergency Systems",

    // IoT metrics
    temperature: "Temperature",
    humidity: "Humidity",
    vibration: "Vibration",
    powerLoad: "Power Load",

    // Log types
    success: "Success",
    info: "Info",
    maintenance: "Maintenance",
    error: "Error",

    // Actions
    viewLogs: "View Logs",
    downloadReport: "Download Report",
    createAlert: "Create Alert",
    acknowledge: "Acknowledge",
    escalate: "Escalate",

    // Status
    operational: "Operational",
    warning: "Warning",
    critical: "Critical",
    offline: "Offline",

    // Priority
    high: "High",
    medium: "Medium",
    low: "Low",

    // Units
    celsius: "°C",
    percent: "%",
    kw: "kW",
    hz: "Hz",

    // Time periods
    last24h: "Last 24 Hours",
    last7d: "Last 7 Days",
    last30d: "Last 30 Days",

    // Actions
    refresh: "Refresh",
    filter: "Filter",
    export: "Export Data",
  },
  ml: {
    title: "എഞ്ചിനീയർ ഡാഷ്ബോർഡ്",
    subtitle:
      "സിസ്റ്റം മോണിറ്ററിംഗും സാങ്കേതിക ഡോക്യുമെന്റേഷനും",

    // Main sections
    systemSnapshot: "സിസ്റ്റം സ്നാപ്ഷോട്ട്",
    iotSensorData: "ഐഒടി സെൻസർ ഡാറ്റ",
    operationalLogs: "പ്രവർത്തന ലോഗുകൾ",
    maintenanceAlerts: "മെയിന്റനൻസ് അലേർട്ടുകൾ",

    // System components
    power: "വൈദ്യുത സംവിധാനങ്ങൾ",
    signaling: "സിഗ്നലിംഗ്",
    doors: "വാതിൽ സംവിധാനങ്ങൾ",
    hvac: "എച്ച്വിഎസി",
    emergency: "അടിയന്തര സംവിധാനങ്ങൾ",

    // IoT metrics
    temperature: "താപനില",
    humidity: "ആർദ്രത",
    vibration: "വൈബ്രേഷൻ",
    powerLoad: "പവർ ലോഡ്",

    // Log types
    success: "വിജയം",
    info: "വിവരം",
    maintenance: "പരിപാലനം",
    error: "പിശക്",

    // Actions
    viewLogs: "ലോഗുകൾ കാണുക",
    downloadReport: "റിപ്പോർട്ട് ഡൗൺലോഡ് ചെയ്യുക",
    createAlert: "അലേർട്ട് സൃഷ്ടിക്കുക",
    acknowledge: "അംഗീകരിക്കുക",
    escalate: "വർദ്ധിപ്പിക്കുക",

    // Status
    operational: "പ്രവർത്തനക്ഷമം",
    warning: "മുന്നറിയിപ്പ്",
    critical: "നിർണായകം",
    offline: "ഓഫ്‌ലൈൻ",

    // Priority
    high: "ഉയർന്നത്",
    medium: "ഇടത്തരം",
    low: "കുറവ്",

    // Units
    celsius: "°C",
    percent: "%",
    kw: "kW",
    hz: "Hz",

    // Time periods
    last24h: "കഴിഞ്ഞ 24 മണിക്കൂർ",
    last7d: "കഴിഞ്ഞ 7 ദിവസം",
    last30d: "കഴിഞ്ഞ 30 ദിവസം",

    // Actions
    refresh: "പുതുക്കുക",
    filter: "ഫിൽട്ടർ",
    export: "ഡാറ്റ എക്സ്പോർട്ട് ചെയ്യുക",
  },
};

// Mock data
const mockSystemStatus = [
  {
    id: "power",
    name: "Power Systems",
    status: "operational",
    value: 98.5,
    icon: Zap,
    trend: "up",
    lastUpdated: "2 mins ago",
    details:
      "Grid load: 850 kW | Backup: Ready | Voltage: Normal",
    alerts: 0,
    location: "All Substations",
  },
  {
    id: "signaling",
    name: "Signaling",
    status: "operational",
    value: 99.2,
    icon: Radio,
    trend: "stable",
    lastUpdated: "1 min ago",
    details: "All clear - no delays | Track sensors: Normal",
    alerts: 0,
    location: "All Junctions",
  },
  {
    id: "doors",
    name: "Door Systems",
    status: "warning",
    value: 94.1,
    icon: DoorOpen,
    trend: "down",
    lastUpdated: "5 mins ago",
    details:
      "4523 cycles today | 1 door sensor maintenance due",
    alerts: 1,
    location: "Car 3, Train KMR-105",
  },
  {
    id: "hvac",
    name: "HVAC Systems",
    status: "operational",
    value: 96.8,
    icon: Thermometer,
    trend: "up",
    lastUpdated: "3 mins ago",
    details: "Temperature: 24°C | Filter status: Good",
    alerts: 0,
    location: "All Stations",
  },
  {
    id: "emergency",
    name: "Emergency Systems",
    status: "operational",
    value: 100,
    icon: AlertTriangle,
    trend: "stable",
    lastUpdated: "1 min ago",
    details: "All systems ready | Last test: Passed",
    alerts: 0,
    location: "Network Wide",
  },
  {
    id: "communication",
    name: "Communication",
    status: "operational",
    value: 97.8,
    icon: Radio,
    trend: "up",
    lastUpdated: "1 min ago",
    details: "Radio clear | PA systems operational",
    alerts: 0,
    location: "All Stations",
  },
  {
    id: "traction",
    name: "Traction Power",
    status: "operational",
    value: 98.9,
    icon: Zap,
    trend: "stable",
    lastUpdated: "2 mins ago",
    details: "750V DC | Current load: 425A",
    alerts: 0,
    location: "Main Feeder",
  },
  {
    id: "security",
    name: "Security Systems",
    status: "warning",
    value: 92.3,
    icon: AlertTriangle,
    trend: "down",
    lastUpdated: "1 min ago",
    details: "3 cameras offline | Access control: Normal",
    alerts: 3,
    location: "Multiple Locations",
  },
];

const mockIoTData = [
  {
    id: "temp",
    name: "Temperature",
    value: 24.5,
    unit: "°C",
    status: "normal",
    range: { min: 20, max: 28, current: 24.5 },
    location: "Platform Average",
    trend: "stable",
    lastReading: "30 sec ago",
  },
  {
    id: "humidity",
    name: "Humidity",
    value: 65,
    unit: "%",
    status: "normal",
    range: { min: 40, max: 70, current: 65 },
    location: "Within Optimal Range",
    trend: "up",
    lastReading: "30 sec ago",
  },
  {
    id: "vibration",
    name: "Vibration",
    value: 2.1,
    unit: "Hz",
    status: "warning",
    range: { min: 0, max: 5, current: 2.1 },
    location: "Track Sensors",
    trend: "up",
    lastReading: "15 sec ago",
  },
  {
    id: "power",
    name: "Power Load",
    value: 847,
    unit: "kW",
    status: "normal",
    range: { min: 0, max: 1200, current: 847 },
    location: "75% Load",
    trend: "stable",
    lastReading: "10 sec ago",
  },
  {
    id: "noise",
    name: "Noise Level",
    value: 68,
    unit: "dB",
    status: "normal",
    range: { min: 0, max: 85, current: 68 },
    location: "Platform Areas",
    trend: "stable",
    lastReading: "1 min ago",
  },
  {
    id: "airquality",
    name: "Air Quality",
    value: 42,
    unit: "AQI",
    status: "good",
    range: { min: 0, max: 100, current: 42 },
    location: "Station Concourse",
    trend: "down",
    lastReading: "5 min ago",
  },
  {
    id: "voltage",
    name: "Traction Voltage",
    value: 752,
    unit: "V",
    status: "normal",
    range: { min: 700, max: 800, current: 752 },
    location: "Main Feeder",
    trend: "stable",
    lastReading: "5 sec ago",
  },
  {
    id: "current",
    name: "Traction Current",
    value: 425,
    unit: "A",
    status: "normal",
    range: { min: 0, max: 800, current: 425 },
    location: "Active Trains",
    trend: "up",
    lastReading: "5 sec ago",
  },
];

const mockOperationalLogs = [
  {
    id: "LOG-001",
    timestamp: "2024-01-15 14:30:15",
    type: "success",
    message: "Train KMR-105 departed Platform 2 on schedule",
    system: "Operations Control",
    timeAgo: "2 mins ago",
    details: "Passenger load: 85% | No delays reported",
    severity: "info",
  },
  {
    id: "LOG-002",
    timestamp: "2024-01-15 14:28:32",
    type: "info",
    message:
      "Platform door cycle completed - all systems nominal",
    system: "Door Control System",
    timeAgo: "4 mins ago",
    details: "Cycle time: 4.2s | Safety checks: Passed",
    severity: "info",
  },
  {
    id: "LOG-003",
    timestamp: "2024-01-15 14:25:45",
    type: "maintenance",
    message:
      "Automatic train protection system self-test completed",
    system: "ATP System",
    timeAgo: "7 mins ago",
    details: "All safety systems responding within parameters",
    severity: "info",
  },
  {
    id: "LOG-004",
    timestamp: "2024-01-15 14:23:18",
    type: "warning",
    message:
      "Voltage fluctuation detected in Traction Power Section 3",
    system: "Power Management",
    timeAgo: "9 mins ago",
    details:
      "Voltage dropped to 745V for 2.3 seconds | Auto-recovered",
    severity: "warning",
  },
  {
    id: "LOG-005",
    timestamp: "2024-01-15 14:20:55",
    type: "success",
    message:
      "Signal system handover completed - Junction A2 to A3",
    system: "Signaling Control",
    timeAgo: "12 mins ago",
    details: "Train KMR-108 cleared junction safely",
    severity: "info",
  },
  {
    id: "LOG-006",
    timestamp: "2024-01-15 14:18:22",
    type: "maintenance",
    message: "Escalator E-02 monthly inspection completed",
    system: "Mechanical Systems",
    timeAgo: "15 mins ago",
    details:
      "All safety systems checked | Next service: 2024-02-15",
    severity: "info",
  },
  {
    id: "LOG-007",
    timestamp: "2024-01-15 14:15:10",
    type: "error",
    message: "CCTV Camera offline - Station Entrance Gate 3",
    system: "Security Systems",
    timeAgo: "18 mins ago",
    details:
      "Camera CAM-ENT-03 not responding | Backup coverage active",
    severity: "error",
  },
  {
    id: "LOG-008",
    timestamp: "2024-01-15 14:12:45",
    type: "info",
    message:
      "Passenger information display updated with new schedule",
    system: "Information Systems",
    timeAgo: "20 mins ago",
    details: "Updated arrival times for next 6 trains",
    severity: "info",
  },
  {
    id: "LOG-009",
    timestamp: "2024-01-15 14:10:33",
    type: "success",
    message:
      "Fire alarm system weekly test completed successfully",
    system: "Safety Systems",
    timeAgo: "22 mins ago",
    details: "All zones responded | Emergency exits verified",
    severity: "info",
  },
  {
    id: "LOG-010",
    timestamp: "2024-01-15 14:08:12",
    type: "warning",
    message: "HVAC temperature above optimal range in Car 3",
    system: "HVAC Control",
    timeAgo: "25 mins ago",
    details: "Temperature: 28°C | Cooling system increased",
    severity: "warning",
  },
  {
    id: "LOG-011",
    timestamp: "2024-01-15 14:05:55",
    type: "maintenance",
    message:
      "Track circuit routine maintenance started - Section B4",
    system: "Track Systems",
    timeAgo: "27 mins ago",
    details:
      "Estimated completion: 16:00 | Alternative routing active",
    severity: "info",
  },
  {
    id: "LOG-012",
    timestamp: "2024-01-15 14:03:40",
    type: "success",
    message: "Emergency communication test completed",
    system: "Communication Systems",
    timeAgo: "29 mins ago",
    details: "All emergency phones operational | Radio clear",
    severity: "info",
  },
];

const mockMaintenanceAlerts = [
  {
    id: "MA-001",
    title: "Platform Screen Door Actuator Replacement",
    description:
      "Door actuator showing signs of wear, replacement recommended",
    priority: "high",
    system: "Door Systems",
    dueDate: "2024-01-18",
    estimatedDuration: "6 hours",
    location: "Platform 1, Door Set 3",
    assignedTo: "Mechanical Team Alpha",
    components: ["Actuator Motor", "Safety Sensors"],
    impact: "Platform partially closed during maintenance",
  },
  {
    id: "MA-002",
    title: "Traction Power Cable Inspection",
    description:
      "Routine inspection of high-voltage cables and connections",
    priority: "high",
    system: "Power Systems",
    dueDate: "2024-01-19",
    estimatedDuration: "8 hours",
    location: "Substation B, Cable Vault",
    assignedTo: "Electrical Team",
    components: ["HV Cables", "Terminations", "Insulators"],
    impact: "Service disruption possible 23:00-07:00",
  },
  {
    id: "MA-003",
    title: "HVAC Filter Replacement",
    description:
      "Monthly air filter replacement for optimal air quality",
    priority: "medium",
    system: "HVAC",
    dueDate: "2024-01-22",
    estimatedDuration: "4 hours",
    location: "All Station AHUs",
    assignedTo: "HVAC Technicians",
    components: ["Primary Filters", "Secondary Filters"],
    impact: "Reduced air circulation during replacement",
  },
  {
    id: "MA-004",
    title: "Signal Cable Testing",
    description:
      "Annual integrity testing of signal transmission cables",
    priority: "high",
    system: "Signaling",
    dueDate: "2024-01-20",
    estimatedDuration: "12 hours",
    location: "Track Sections A1-A5",
    assignedTo: "Signal & Telecom Team",
    components: [
      "Signal Cables",
      "Track Circuits",
      "Axle Counters",
    ],
    impact: "Reduced train frequency during testing",
  },
  {
    id: "MA-005",
    title: "Emergency Lighting System Test",
    description:
      "Quarterly emergency lighting and evacuation system test",
    priority: "medium",
    system: "Safety Systems",
    dueDate: "2024-01-25",
    estimatedDuration: "3 hours",
    location: "All Stations",
    assignedTo: "Safety Systems Team",
    components: [
      "Emergency Lights",
      "Exit Signs",
      "Voice Evacuation",
    ],
    impact: "Brief light disruptions during testing",
  },
  {
    id: "MA-006",
    title: "Escalator Chain Lubrication",
    description:
      "Routine lubrication of escalator drive chains",
    priority: "low",
    system: "Mechanical",
    dueDate: "2024-01-28",
    estimatedDuration: "2 hours",
    location: "Escalators E-01, E-02, E-03",
    assignedTo: "Mechanical Maintenance",
    components: ["Drive Chains", "Bearings", "Motors"],
    impact: "Escalators offline during service",
  },
  {
    id: "MA-007",
    title: "UPS Battery Capacity Test",
    description:
      "Annual capacity testing of uninterruptible power supply batteries",
    priority: "high",
    system: "Power Systems",
    dueDate: "2024-01-21",
    estimatedDuration: "6 hours",
    location: "UPS Room - Main Control",
    assignedTo: "Electrical Team",
    components: [
      "UPS Batteries",
      "Charging Systems",
      "Monitoring",
    ],
    impact: "Backup power testing may cause brief outages",
  },
  {
    id: "MA-008",
    title: "Fire Suppression System Inspection",
    description:
      "Semi-annual inspection of fire detection and suppression systems",
    priority: "medium",
    system: "Fire Safety",
    dueDate: "2024-01-26",
    estimatedDuration: "5 hours",
    location: "Technical Rooms & Tunnels",
    assignedTo: "Fire Safety Specialists",
    components: [
      "Smoke Detectors",
      "Sprinkler Heads",
      "Control Panels",
    ],
    impact: "Fire system temporarily offline during testing",
  },
];

export function DocumentEngineerDashboard({
  language,
}: DocumentEngineerDashboardProps) {
  const [selectedTab, setSelectedTab] = useState("systems");
  const [timePeriod, setTimePeriod] = useState("24h");
  const t = translations[language];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "text-[var(--operations-green)] bg-[var(--operations-green-light)] border-[var(--operations-green)]";
      case "warning":
        return "text-[var(--maintenance-orange)] bg-[var(--maintenance-orange-light)] border-[var(--maintenance-orange)]";
      case "critical":
        return "text-[var(--safety-red)] bg-[var(--safety-red-light)] border-[var(--safety-red)]";
      case "offline":
        return "text-[var(--metro-grey)] bg-gray-100 border-gray-300";
      default:
        return "text-[var(--metro-grey)] bg-gray-100 border-gray-300";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-[var(--safety-red)] text-white";
      case "medium":
        return "bg-[var(--maintenance-orange)] text-white";
      case "low":
        return "bg-[var(--operations-green)] text-white";
      default:
        return "bg-[var(--metro-grey)] text-white";
    }
  };

  const getLogTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-[var(--operations-green-light)] text-[var(--operations-green)] border-[var(--operations-green)]";
      case "info":
        return "bg-[var(--metro-light-blue)] text-[var(--metro-blue)] border-[var(--metro-blue)]";
      case "maintenance":
        return "bg-[var(--maintenance-orange-light)] text-[var(--maintenance-orange)] border-[var(--maintenance-orange)]";
      case "warning":
        return "bg-[var(--maintenance-orange-light)] text-[var(--maintenance-orange)] border-[var(--maintenance-orange)]";
      case "error":
        return "bg-[var(--safety-red-light)] text-[var(--safety-red)] border-[var(--safety-red)]";
      default:
        return "bg-gray-100 text-[var(--metro-grey)] border-gray-300";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return (
          <TrendingUp className="h-4 w-4 text-[var(--operations-green)]" />
        );
      case "down":
        return (
          <TrendingDown className="h-4 w-4 text-[var(--safety-red)]" />
        );
      case "stable":
        return (
          <Minus className="h-4 w-4 text-[var(--metro-grey)]" />
        );
      default:
        return (
          <Minus className="h-4 w-4 text-[var(--metro-grey)]" />
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-navy">
            {t.title}
          </h1>
          <p className="text-grey mt-1">{t.subtitle}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            {t.refresh}
          </Button>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            {t.filter}
          </Button>
          <Button className="gap-2 bg-teal hover:bg-teal/90">
            <Download className="h-4 w-4" />
            {t.export}
          </Button>
        </div>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-4 bg-white border border-grey/20">
          <TabsTrigger
            value="systems"
            className="data-[state=active]:bg-teal data-[state=active]:text-white"
          >
            {t.systemSnapshot}
          </TabsTrigger>
          <TabsTrigger
            value="iot"
            className="data-[state=active]:bg-teal data-[state=active]:text-white"
          >
            {t.iotSensorData}
          </TabsTrigger>
          <TabsTrigger
            value="logs"
            className="data-[state=active]:bg-teal data-[state=active]:text-white"
          >
            {t.operationalLogs}
          </TabsTrigger>
          <TabsTrigger
            value="maintenance"
            className="data-[state=active]:bg-teal data-[state=active]:text-white"
          >
            {t.maintenanceAlerts}
          </TabsTrigger>
        </TabsList>

        {/* System Snapshot Tab */}
        <TabsContent value="systems" className="space-y-4">
          {/* System Health Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockSystemStatus.map((system) => {
              const IconComponent = system.icon;
              return (
                <Card
                  key={system.id}
                  className="hover:shadow-md transition-all border-l-4 border-l-[var(--metro-blue)]"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <IconComponent className="h-8 w-8 text-[var(--metro-blue)]" />
                      <Badge
                        variant="outline"
                        className={getStatusColor(
                          system.status,
                        )}
                      >
                        {t[system.status as keyof typeof t]}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-medium text-[var(--metro-navy)] mb-2">
                      {system.name}
                    </h3>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-bold text-[var(--metro-navy)]">
                        {system.value}%
                      </span>
                      {getTrendIcon(system.trend)}
                    </div>
                    <Progress
                      value={system.value}
                      className="h-2 mb-3"
                    />
                    <div className="space-y-1 text-xs">
                      <p className="text-[var(--metro-grey)]">
                        {system.details}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-[var(--metro-grey)]">
                          Location: {system.location}
                        </span>
                        {system.alerts > 0 && (
                          <Badge className="bg-[var(--safety-red)] text-white text-xs">
                            {system.alerts} alerts
                          </Badge>
                        )}
                      </div>
                      <p className="text-[var(--metro-grey)]">
                        Updated {system.lastUpdated}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button className="gap-2 bg-[var(--metro-blue)] hover:bg-[var(--metro-blue)]/90">
              <FileText className="h-4 w-4" />
              {t.viewLogs}
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              {t.downloadReport}
            </Button>
            <Button variant="outline" className="gap-2">
              <AlertTriangle className="h-4 w-4" />
              {t.createAlert}
            </Button>
          </div>
        </TabsContent>

        {/* IoT Sensor Data Tab */}
        <TabsContent value="iot" className="space-y-4">
          {/* Live Sensor Data Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockIoTData.map((sensor) => (
              <Card
                key={sensor.id}
                className="hover:shadow-md transition-all border-l-4 border-l-[var(--metro-green)]"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-[var(--metro-green)]" />
                      {sensor.name}
                    </div>
                    <Badge
                      variant="outline"
                      className={getStatusColor(sensor.status)}
                    >
                      {sensor.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-[var(--metro-navy)]">
                      {sensor.value}
                      <span className="text-lg text-[var(--metro-grey)] ml-1">
                        {sensor.unit}
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      {getTrendIcon(sensor.trend)}
                      <span className="text-xs text-[var(--metro-grey)]">
                        {sensor.location}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--metro-grey)]">
                        Range:
                      </span>
                      <span className="text-[var(--metro-navy)]">
                        {sensor.range.min} - {sensor.range.max}{" "}
                        {sensor.unit}
                      </span>
                    </div>
                    <Progress
                      value={
                        (sensor.range.current /
                          sensor.range.max) *
                        100
                      }
                      className="h-3"
                    />
                    <div className="flex justify-between text-xs text-[var(--metro-grey)]">
                      <span>Last reading:</span>
                      <span>{sensor.lastReading}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Real-time Data Stream */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Live Data Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3 text-[var(--metro-navy)]">
                    Network Status
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-[var(--metro-light-blue)] rounded">
                      <span className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-[var(--metro-blue)]" />
                        Live Dashboard
                      </span>
                      <Badge className="bg-[var(--operations-green)] text-white">
                        Active
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-[var(--metro-light-blue)] rounded">
                      <span className="flex items-center gap-2">
                        <Radio className="h-4 w-4 text-[var(--metro-blue)]" />
                        Network Status
                      </span>
                      <Badge className="bg-[var(--operations-green)] text-white">
                        Connected
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3 text-[var(--metro-navy)]">
                    Sensor Network
                  </h4>
                  <div className="text-sm text-[var(--metro-grey)] space-y-1">
                    <p>Total Sensors: 47 Active</p>
                    <p>Data Points/min: 1,240</p>
                    <p>Network Latency: 23ms</p>
                    <p>Coverage: 98.3%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Operational Logs Tab */}
        <TabsContent value="logs" className="space-y-4">
          {/* Log Filters */}
          <div className="flex gap-2 mb-4">
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
            >
              <CheckCircle className="h-3 w-3" />
              Success (
              {
                mockOperationalLogs.filter(
                  (l) => l.type === "success",
                ).length
              }
              )
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
            >
              <AlertCircle className="h-3 w-3" />
              Info (
              {
                mockOperationalLogs.filter(
                  (l) => l.type === "info",
                ).length
              }
              )
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
            >
              <AlertTriangle className="h-3 w-3" />
              Warning (
              {
                mockOperationalLogs.filter(
                  (l) => l.type === "warning",
                ).length
              }
              )
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
            >
              <XCircle className="h-3 w-3" />
              Error (
              {
                mockOperationalLogs.filter(
                  (l) => l.type === "error",
                ).length
              }
              )
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
            >
              <Settings className="h-3 w-3" />
              Maintenance (
              {
                mockOperationalLogs.filter(
                  (l) => l.type === "maintenance",
                ).length
              }
              )
            </Button>
          </div>

          {/* Scrollable Log Entries */}
          <ScrollArea className="h-96">
            <div className="space-y-3 pr-4">
              {mockOperationalLogs.map((log) => (
                <Card
                  key={log.id}
                  className="hover:shadow-md transition-all"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <Badge
                          variant="outline"
                          className={getLogTypeColor(log.type)}
                        >
                          {t[log.type as keyof typeof t]}
                        </Badge>
                        <div className="flex-1">
                          <h4 className="font-medium text-[var(--metro-navy)] mb-1">
                            {log.message}
                          </h4>
                          <p className="text-sm text-[var(--metro-grey)] mb-2">
                            {log.details}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-[var(--metro-grey)]">
                            <span>System: {log.system}</span>
                            <span>Time: {log.timeAgo}</span>
                            <span>ID: {log.id}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-[var(--metro-grey)] text-right">
                        <p>{log.timestamp}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Maintenance Alerts Tab */}
        <TabsContent value="maintenance" className="space-y-4">
          {/* Maintenance Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-[var(--safety-red-light)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-8 w-8 text-[var(--safety-red)]" />
                </div>
                <div className="text-3xl font-bold text-[var(--safety-red)]">
                  {
                    mockMaintenanceAlerts.filter(
                      (a) => a.priority === "high",
                    ).length
                  }
                </div>
                <p className="text-[var(--metro-grey)]">
                  High Priority
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-[var(--maintenance-orange-light)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-[var(--maintenance-orange)]" />
                </div>
                <div className="text-3xl font-bold text-[var(--maintenance-orange)]">
                  {
                    mockMaintenanceAlerts.filter(
                      (a) => a.priority === "medium",
                    ).length
                  }
                </div>
                <p className="text-[var(--metro-grey)]">
                  Medium Priority
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-[var(--operations-green-light)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-[var(--operations-green)]" />
                </div>
                <div className="text-3xl font-bold text-[var(--operations-green)]">
                  {
                    mockMaintenanceAlerts.filter(
                      (a) => a.priority === "low",
                    ).length
                  }
                </div>
                <p className="text-[var(--metro-grey)]">
                  Low Priority
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-[var(--metro-light-blue)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="h-8 w-8 text-[var(--metro-blue)]" />
                </div>
                <div className="text-3xl font-bold text-[var(--metro-blue)]">
                  {mockMaintenanceAlerts.length}
                </div>
                <p className="text-[var(--metro-grey)]">
                  Total Alerts
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Maintenance Alerts */}
          <ScrollArea className="h-96">
            <div className="space-y-4 pr-4">
              {mockMaintenanceAlerts.map((alert) => (
                <Card
                  key={alert.id}
                  className="hover:shadow-md transition-all"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-[var(--metro-navy)]">
                            {alert.title}
                          </h4>
                          <Badge
                            className={getPriorityColor(
                              alert.priority,
                            )}
                          >
                            {
                              t[
                                alert.priority as keyof typeof t
                              ]
                            }
                          </Badge>
                        </div>
                        <p className="text-sm text-[var(--metro-grey)] mb-2">
                          {alert.description}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p>
                              <strong>System:</strong>{" "}
                              {alert.system}
                            </p>
                            <p>
                              <strong>Location:</strong>{" "}
                              {alert.location}
                            </p>
                            <p>
                              <strong>Due Date:</strong>{" "}
                              {alert.dueDate}
                            </p>
                          </div>
                          <div>
                            <p>
                              <strong>Duration:</strong>{" "}
                              {alert.estimatedDuration}
                            </p>
                            <p>
                              <strong>Assigned To:</strong>{" "}
                              {alert.assignedTo}
                            </p>
                            <p>
                              <strong>Impact:</strong>{" "}
                              {alert.impact}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm">
                            <strong>Components:</strong>{" "}
                            {alert.components.join(", ")}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1"
                      >
                        <CheckCircle className="h-3 w-3" />
                        {t.acknowledge}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1"
                      >
                        <AlertTriangle className="h-3 w-3" />
                        {t.escalate}
                      </Button>
                      <Button
                        size="sm"
                        className="gap-1 bg-[var(--metro-blue)] hover:bg-[var(--metro-blue)]/90"
                      >
                        <FileText className="h-3 w-3" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}