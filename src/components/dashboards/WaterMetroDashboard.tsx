import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { ScrollArea } from '../ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { 
  Ship,
  Anchor,
  Waves, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Users, 
  FileText, 
  Search,
  AlertCircle,
  Activity,
  Calendar,
  MessageSquare,
  Download,
  Filter,
  RefreshCw,
  Eye,
  MapPin,
  Radio,
  Shield,
  Thermometer,
  Wind,
  Camera,
  Volume2,
  Signal,
  Battery,
  Monitor,
  Settings,
  User,
  Phone,
  Mail,
  Star,
  Bookmark,
  Share2,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  ChevronRight,
  ChevronDown,
  Home,
  Building,
  Navigation,
  Gauge,
  Compass,
  LifeBuoy,
  Fuel,
  CloudRain,
  Sun,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
  Zap,
  Route,
  Timer,
  UserCheck
} from 'lucide-react';

interface WaterMetroDashboardProps {
  language: 'en' | 'ml';
}

const translations = {
  en: {
    title: 'Water Metro Operations Center',
    subtitle: 'Marine Transportation Management Hub',
    
    // Main sections
    vesselOperations: 'Vessel Operations',
    weatherConditions: 'Weather & Tidal Conditions',
    safetyAlerts: 'Marine Safety Alerts',
    passengerServices: 'Passenger Services',
    documentCenter: 'Marine Document Center',
    systemMonitoring: 'Marine Systems Monitoring',
    communicationHub: 'Marine Communication Hub',
    maintenanceSchedule: 'Vessel Maintenance',
    
    // Vessel operations
    activeVessels: 'Active Vessels',
    dockedVessels: 'Docked Vessels',
    inMaintenance: 'In Maintenance',
    weatherDelayed: 'Weather Delayed',
    vesselTracking: 'Real-time Vessel Tracking',
    routeStatus: 'Route Status',
    passengerCapacity: 'Passenger Capacity',
    
    // Weather and conditions
    currentWeather: 'Current Weather',
    tidalConditions: 'Tidal Conditions',
    seaConditions: 'Sea Conditions',
    visibility: 'Visibility',
    windSpeed: 'Wind Speed',
    waveHeight: 'Wave Height',
    weatherForecast: 'Weather Forecast',
    
    // Safety systems
    lifeSafetyEquipment: 'Life Safety Equipment',
    emergencyBeacons: 'Emergency Beacons',
    communicationSystems: 'Communication Systems',
    navigationSystems: 'Navigation Systems',
    fireSuppressionSystems: 'Fire Suppression Systems',
    
    // Marine systems
    engineSystems: 'Engine Systems',
    powerSystems: 'Power Systems',
    propulsionSystems: 'Propulsion Systems',
    hydraulicSystems: 'Hydraulic Systems',
    fuelSystems: 'Fuel Systems',
    
    // Actions
    viewDetails: 'View Details',
    updateStatus: 'Update Status',
    assignTo: 'Assign To',
    escalate: 'Escalate',
    acknowledge: 'Acknowledge',
    resolve: 'Resolve',
    addComment: 'Add Comment',
    attachFile: 'Attach File',
    notifyTeam: 'Notify Team',
    
    // Status
    operational: 'Operational',
    warning: 'Warning',
    critical: 'Critical',
    offline: 'Offline',
    high: 'High',
    medium: 'Medium',
    low: 'Low',
    open: 'Open',
    inProgress: 'In Progress',
    resolved: 'Resolved',
    closed: 'Closed',
    sailing: 'Sailing',
    docked: 'Docked',
    maintenance: 'Maintenance',
    delayed: 'Delayed',
    
    // Time periods
    last24h: 'Last 24 Hours',
    thisWeek: 'This Week',
    thisMonth: 'This Month',
    
    // Terminals
    vypinTerminal: 'Vypin Terminal',
    fortKochiTerminal: 'Fort Kochi Terminal',
    bolgattyTerminal: 'Bolgatty Terminal',
    kakkanadTerminal: 'Kakkanad Terminal',
    
    // Routes
    route1: 'Vypin - Fort Kochi',
    route2: 'Fort Kochi - Bolgatty',
    route3: 'Bolgatty - Kakkanad',
    route4: 'High Court - Vypeen',
    
    // Actions
    refresh: 'Refresh All',
    filter: 'Filter View',
    export: 'Export Report',
    settings: 'Dashboard Settings'
  },
  ml: {
    title: 'വാട്ടർ മെട്രോ ഓപ്പറേഷൻസ് സെന്റർ',
    subtitle: 'മറൈൻ ട്രാൻസ്പോർട്ടേഷൻ മാനേജ്മെന്റ് ഹബ്',
    
    // Main sections
    vesselOperations: 'കപ്പൽ പ്രവർത്തനങ്ങൾ',
    weatherConditions: 'കാലാവസ്ഥയും വേലിയേറ്റ സാഹചര്യങ്ങളും',
    safetyAlerts: 'മറൈൻ സുരക്ഷാ അലേർട്ടുകൾ',
    passengerServices: 'യാത്രക്കാരുടെ സേവനങ്ങൾ',
    documentCenter: 'മറൈൻ ഡോക്യുമെന്റ് സെന്റർ',
    systemMonitoring: 'മറൈൻ സിസ്റ്റം മോണിറ്ററിംഗ്',
    communicationHub: 'മറൈൻ കമ്മ്യൂണിക്കേഷൻ ഹബ്',
    maintenanceSchedule: 'കപ്പൽ അറ്റകുറ്റപ്പണി',
    
    // Vessel operations
    activeVessels: 'സജീവ കപ്പലുകൾ',
    dockedVessels: 'ഡോക്കിലുള്ള കപ്പലുകൾ',
    inMaintenance: 'അറ്റകുറ്റപ്പണിയിൽ',
    weatherDelayed: 'കാലാവസ്ഥ കാരണം വൈകി',
    vesselTracking: 'തത്സമയ കപ്പൽ ട്രാക്കിംഗ്',
    routeStatus: 'റൂട്ട് സ്ഥിതി',
    passengerCapacity: 'യാത്രക്കാരുടെ ശേഷി',
    
    // Weather and conditions
    currentWeather: 'നിലവിലെ കാലാവസ്ഥ',
    tidalConditions: 'വേലിയേറ്റ സാഹചര്യങ്ങൾ',
    seaConditions: 'കടൽ സാഹചര്യങ്ങൾ',
    visibility: 'ദൃശ്യപരത',
    windSpeed: 'കാറ്റിന്റെ വേഗത',
    waveHeight: 'തിര ഉയരം',
    weatherForecast: 'കാലാവസ്ഥാ പ്രവചനം',
    
    // Safety systems
    lifeSafetyEquipment: 'ജീവരക്ഷാ ഉപകരണങ്ങൾ',
    emergencyBeacons: 'എമർജൻസി ബീക്കണുകൾ',
    communicationSystems: 'ആശയവിനിമയ സംവിധാനങ്ങൾ',
    navigationSystems: 'നാവിഗേഷൻ സിസ്റ്റങ്ങൾ',
    fireSuppressionSystems: 'അഗ്നിശമന സംവിധാനങ്ങൾ',
    
    // Marine systems
    engineSystems: 'എഞ്ചിൻ സിസ്റ്റങ്ങൾ',
    powerSystems: 'പവർ സിസ്റ്റങ്ങൾ',
    propulsionSystems: 'പ്രൊപ്പൽഷൻ സിസ്റ്റങ്ങൾ',
    hydraulicSystems: 'ഹൈഡ്രോളിക് സിസ്റ്റങ്ങൾ',
    fuelSystems: 'ഇന്ധന സംവിധാനങ്ങൾ',
    
    // Actions
    viewDetails: 'വിശദാംശങ്ങൾ കാണുക',
    updateStatus: 'സ്ഥിതി അപ്ഡേറ്റ് ചെയ്യുക',
    assignTo: 'നിയോഗിക്കുക',
    escalate: 'വർദ്ധിപ്പിക്കുക',
    acknowledge: 'അംഗീകരിക്കുക',
    resolve: 'പരിഹരിക്കുക',
    addComment: 'കമന്റ് ചേർക്കുക',
    attachFile: 'ഫയൽ അറ്റാച്ച് ചെയ്യുക',
    notifyTeam: 'ടീമിനെ അറിയിക്കുക',
    
    // Status
    operational: 'പ്രവർത്തനക്ഷമം',
    warning: 'മുന്നറിയിപ്പ്',
    critical: 'നിർണായകം',
    offline: 'ഓഫ്‌ലൈൻ',
    high: 'ഉയർന്നത്',
    medium: 'ഇടത്തരം',
    low: 'കുറവ്',
    open: 'തുറന്നത്',
    inProgress: 'പുരോഗതിയിൽ',
    resolved: 'പരിഹരിച്ചു',
    closed: 'അടച്ചു',
    sailing: 'യാത്രയിൽ',
    docked: 'ഡോക്കിൽ',
    maintenance: 'അറ്റകുറ്റപ്പണി',
    delayed: 'വൈകി',
    
    // Time periods
    last24h: 'കഴിഞ്ഞ 24 മണിക്കൂർ',
    thisWeek: 'ഈ ആഴ്ച',
    thisMonth: 'ഈ മാസം',
    
    // Terminals
    vypinTerminal: 'വൈപ്പിൻ ടെർമിനൽ',
    fortKochiTerminal: 'ഫോർട്ട് കൊച്ചി ടെർമിനൽ',
    bolgattyTerminal: 'ബോൾഗാട്ടി ടെർമിനൽ',
    kakkanadTerminal: 'കാക്കനാട് ടെർമിനൽ',
    
    // Routes
    route1: 'വൈപ്പിൻ - ഫോർട്ട് കൊച്ചി',
    route2: 'ഫോർട്ട് കൊച്ചി - ബോൾഗാട്ടി',
    route3: 'ബോൾഗാട്ടി - കാക്കനാട്',
    route4: 'ഹൈക്കോടതി - വൈപ്പീൻ',
    
    // Actions
    refresh: 'എല്ലാം പുതുക്കുക',
    filter: 'ഫിൽട്ടർ വ്യൂ',
    export: 'റിപ്പോർട്ട് എക്സ്പോർട്ട്',
    settings: 'ഡാഷ്ബോർഡ് സെറ്റിംഗ്സ്'
  }
};

// Mock data for Water Metro
const mockVessels = [
  {
    id: 'WM-001',
    name: 'Kochi Princess',
    route: 'Vypin - Fort Kochi',
    status: 'sailing',
    currentLocation: 'Approaching Fort Kochi',
    capacity: 78,
    maxCapacity: 100,
    speed: 12.5,
    fuelLevel: 85,
    nextDeparture: '10 mins',
    delay: 0,
    captain: 'Capt. Rajesh Kumar',
    crew: 4,
    lastMaintenance: '2024-01-10'
  },
  {
    id: 'WM-002',
    name: 'Backwater Queen',
    route: 'Fort Kochi - Bolgatty',
    status: 'docked',
    currentLocation: 'Bolgatty Terminal',
    capacity: 45,
    maxCapacity: 85,
    speed: 0,
    fuelLevel: 92,
    nextDeparture: '5 mins',
    delay: 0,
    captain: 'Capt. Suresh Nair',
    crew: 3,
    lastMaintenance: '2024-01-12'
  },
  {
    id: 'WM-003',
    name: 'Marine Express',
    route: 'Bolgatty - Kakkanad',
    status: 'maintenance',
    currentLocation: 'Marine Workshop',
    capacity: 0,
    maxCapacity: 120,
    speed: 0,
    fuelLevel: 60,
    nextDeparture: 'In Service',
    delay: 0,
    captain: 'Capt. Anil Joseph',
    crew: 0,
    lastMaintenance: '2024-01-15'
  },
  {
    id: 'WM-004',
    name: 'Vembanad Star',
    route: 'High Court - Vypeen',
    status: 'delayed',
    currentLocation: 'High Court Jetty',
    capacity: 92,
    maxCapacity: 100,
    speed: 0,
    fuelLevel: 70,
    nextDeparture: '15 mins',
    delay: 8,
    captain: 'Capt. Mohan Das',
    crew: 4,
    lastMaintenance: '2024-01-08'
  }
];

const mockWeatherData = {
  temperature: 28,
  humidity: 85,
  windSpeed: 15,
  windDirection: 'SW',
  visibility: 8.5,
  waveHeight: 0.8,
  seaCondition: 'Moderate',
  tidalPhase: 'High Tide',
  tidalHeight: 1.2,
  nextTide: 'Low Tide in 3h 25m',
  weatherCondition: 'Partly Cloudy',
  uvIndex: 7,
  sunrise: '06:15',
  sunset: '18:45'
};

const mockMarineAlerts = [
  {
    id: 'MA-001',
    type: 'warning',
    title: 'Strong Wind Advisory',
    description: 'Wind speeds expected to reach 25-30 knots in the next 2 hours',
    location: 'Vembanad Lake - Northern Sector',
    timestamp: '15 mins ago',
    status: 'active',
    assignedTo: 'Marine Operations',
    system: 'Weather Monitoring',
    severity: 'medium'
  },
  {
    id: 'MA-002',
    type: 'critical',
    title: 'Navigation Beacon Malfunction',
    description: 'Channel marker beacon offline at Fort Kochi approach',
    location: 'Fort Kochi Channel Marker 3',
    timestamp: '30 mins ago',
    status: 'active',
    assignedTo: 'Marine Engineering',
    system: 'Navigation Aids',
    severity: 'high'
  },
  {
    id: 'MA-003',
    type: 'info',
    title: 'Scheduled Dredging Operation',
    description: 'Channel maintenance dredging scheduled for tomorrow',
    location: 'Kakkanad Channel',
    timestamp: '1 hour ago',
    status: 'monitoring',
    assignedTo: 'Channel Maintenance',
    system: 'Infrastructure',
    severity: 'low'
  }
];

const mockMarineSystemStatus = [
  {
    id: 'navigation',
    name: 'Navigation Systems',
    status: 'operational',
    value: 98.5,
    icon: Compass,
    details: 'GPS, radar, and chart plotters operational',
    lastCheck: '2 mins ago',
    location: 'All Vessels',
    alerts: 0
  },
  {
    id: 'communication',
    name: 'Marine Radio',
    status: 'operational',
    value: 99.1,
    icon: Radio,
    details: 'VHF channels clear, emergency frequencies monitored',
    lastCheck: '1 min ago',
    location: 'All Channels',
    alerts: 0
  },
  {
    id: 'safety',
    name: 'Safety Equipment',
    status: 'operational',
    value: 97.8,
    icon: LifeBuoy,
    details: 'Life jackets, rafts, and emergency beacons ready',
    lastCheck: '5 mins ago',
    location: 'Fleet Wide',
    alerts: 0
  },
  {
    id: 'fuel',
    name: 'Fuel Systems',
    status: 'warning',
    value: 94.2,
    icon: Fuel,
    details: 'WM-003 requires refueling after maintenance',
    lastCheck: '10 mins ago',
    location: 'Marine Workshop',
    alerts: 1
  },
  {
    id: 'engines',
    name: 'Engine Performance',
    status: 'operational',
    value: 96.5,
    icon: Zap,
    details: 'All active engines within normal parameters',
    lastCheck: '3 mins ago',
    location: 'Active Vessels',
    alerts: 0
  },
  {
    id: 'terminals',
    name: 'Terminal Systems',
    status: 'operational',
    value: 98.9,
    icon: Anchor,
    details: 'All jetties and loading systems operational',
    lastCheck: '5 mins ago',
    location: 'All Terminals',
    alerts: 0
  }
];

const mockMaintenanceSchedule = [
  {
    id: 'MS-001',
    vessel: 'Kochi Princess',
    type: 'Engine Service',
    priority: 'high',
    scheduledDate: '2024-01-20',
    estimatedDuration: '8 hours',
    description: 'Quarterly engine maintenance and oil change',
    technician: 'Marine Engineer Team A',
    status: 'scheduled',
    location: 'Marine Workshop'
  },
  {
    id: 'MS-002',
    vessel: 'Backwater Queen',
    type: 'Hull Inspection',
    priority: 'medium',
    scheduledDate: '2024-01-22',
    estimatedDuration: '4 hours',
    description: 'Underwater hull inspection and cleaning',
    technician: 'Diving Team',
    status: 'scheduled',
    location: 'Dry Dock'
  },
  {
    id: 'MS-003',
    vessel: 'Marine Express',
    type: 'Propulsion System',
    priority: 'high',
    scheduledDate: '2024-01-16',
    estimatedDuration: '12 hours',
    description: 'Propeller shaft bearing replacement',
    technician: 'Marine Engineer Team B',
    status: 'inProgress',
    location: 'Marine Workshop'
  }
];

export function WaterMetroDashboard({ language }: WaterMetroDashboardProps) {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [filterStatus, setFilterStatus] = useState('all');
  const t = translations[language];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-[var(--safety-red)] text-white';
      case 'medium': return 'bg-[var(--maintenance-orange)] text-white';
      case 'low': return 'bg-[var(--operations-green)] text-white';
      default: return 'bg-[var(--metro-grey)] text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'text-[var(--operations-green)] bg-[var(--operations-green-light)] border-[var(--operations-green)]';
      case 'warning': return 'text-[var(--maintenance-orange)] bg-[var(--maintenance-orange-light)] border-[var(--maintenance-orange)]';
      case 'critical': return 'text-[var(--safety-red)] bg-[var(--safety-red-light)] border-[var(--safety-red)]';
      case 'sailing': return 'text-[var(--metro-blue)] bg-[var(--metro-light-blue)] border-[var(--metro-blue)]';
      case 'docked': return 'text-[var(--operations-green)] bg-[var(--operations-green-light)] border-[var(--operations-green)]';
      case 'maintenance': return 'text-[var(--maintenance-orange)] bg-[var(--maintenance-orange-light)] border-[var(--maintenance-orange)]';
      case 'delayed': return 'text-[var(--safety-red)] bg-[var(--safety-red-light)] border-[var(--safety-red)]';
      default: return 'text-[var(--metro-grey)] bg-gray-100 border-gray-300';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="h-4 w-4 text-[var(--safety-red)]" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-[var(--maintenance-orange)]" />;
      case 'info': return <Activity className="h-4 w-4 text-[var(--metro-blue)]" />;
      default: return <Activity className="h-4 w-4 text-[var(--metro-grey)]" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header with Marine Statistics */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>{t.title}</h1>
          <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>{t.subtitle}</p>
        </div>
        
        {/* Quick Marine Stats */}
        <div className="flex gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-[var(--metro-blue)]">{mockVessels.filter(v => v.status === 'sailing').length}</div>
            <div className="text-xs text-[var(--metro-grey)]">Sailing</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[var(--operations-green)]">{mockVessels.filter(v => v.status === 'docked').length}</div>
            <div className="text-xs text-[var(--metro-grey)]">Docked</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[var(--maintenance-orange)]">{mockVessels.filter(v => v.status === 'maintenance').length}</div>
            <div className="text-xs text-[var(--metro-grey)]">Maintenance</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[var(--metro-green)]">{mockWeatherData.temperature}°C</div>
            <div className="text-xs text-[var(--metro-grey)]">Weather</div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            {t.refresh}
          </Button>
          <Button variant="outline" className="gap-2">
            <Settings className="h-4 w-4" />
            {t.settings}
          </Button>
          <Button className="gap-2 bg-[var(--metro-blue)] hover:bg-[var(--metro-blue)]/90">
            <Download className="h-4 w-4" />
            {t.export}
          </Button>
        </div>
      </div>

      {/* Comprehensive Water Metro Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 bg-white border h-auto p-1" style={{ borderColor: 'var(--border-color)' }}>
          <TabsTrigger value="overview" className="data-[state=active]:text-white flex items-center gap-2 p-3" style={{ backgroundColor: 'var(--primary-color)' }}>
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="vessels" className="data-[state=active]:text-white flex items-center gap-2 p-3" style={{ backgroundColor: 'var(--primary-color)' }}>
            <Ship className="h-4 w-4" />
            <span className="hidden sm:inline">Vessels</span>
          </TabsTrigger>
          <TabsTrigger value="weather" className="data-[state=active]:text-white flex items-center gap-2 p-3" style={{ backgroundColor: 'var(--primary-color)' }}>
            <Waves className="h-4 w-4" />
            <span className="hidden sm:inline">Weather</span>
          </TabsTrigger>
          <TabsTrigger value="safety" className="data-[state=active]:text-white flex items-center gap-2 p-3" style={{ backgroundColor: 'var(--primary-color)' }}>
            <LifeBuoy className="h-4 w-4" />
            <span className="hidden sm:inline">Safety</span>
          </TabsTrigger>
          <TabsTrigger value="systems" className="data-[state=active]:text-white flex items-center gap-2 p-3" style={{ backgroundColor: 'var(--primary-color)' }}>
            <Monitor className="h-4 w-4" />
            <span className="hidden sm:inline">Systems</span>
          </TabsTrigger>
          <TabsTrigger value="communications" className="data-[state=active]:text-white flex items-center gap-2 p-3" style={{ backgroundColor: 'var(--primary-color)' }}>
            <Radio className="h-4 w-4" />
            <span className="hidden sm:inline">Comms</span>
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="data-[state=active]:text-white flex items-center gap-2 p-3" style={{ backgroundColor: 'var(--primary-color)' }}>
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Maintenance</span>
          </TabsTrigger>
          <TabsTrigger value="terminals" className="data-[state=active]:text-white flex items-center gap-2 p-3" style={{ backgroundColor: 'var(--primary-color)' }}>
            <Anchor className="h-4 w-4" />
            <span className="hidden sm:inline">Terminals</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab - Marine Dashboard Summary */}
        <TabsContent value="overview" className="space-y-6">
          {/* Marine Alerts Banner */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-l-4 border-l-[var(--metro-blue)] bg-[var(--metro-light-blue)]">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Ship className="h-8 w-8 text-[var(--metro-blue)]" />
                  <div>
                    <div className="text-2xl font-bold text-[var(--metro-blue)]">{mockVessels.length}</div>
                    <div className="text-sm text-[var(--metro-blue)]">Total Fleet</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-[var(--maintenance-orange)] bg-[var(--maintenance-orange-light)]">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-8 w-8 text-[var(--maintenance-orange)]" />
                  <div>
                    <div className="text-2xl font-bold text-[var(--maintenance-orange)]">{mockMarineAlerts.length}</div>
                    <div className="text-sm text-[var(--maintenance-orange)]">Active Alerts</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-[var(--operations-green)] bg-[var(--operations-green-light)]">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-8 w-8 text-[var(--operations-green)]" />
                  <div>
                    <div className="text-2xl font-bold text-[var(--operations-green)]">97.8%</div>
                    <div className="text-sm text-[var(--operations-green)]">System Health</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-[var(--metro-green)] bg-[var(--metro-light-green)]">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Thermometer className="h-8 w-8 text-[var(--metro-green)]" />
                  <div>
                    <div className="text-2xl font-bold text-[var(--metro-green)]">{mockWeatherData.temperature}°C</div>
                    <div className="text-sm text-[var(--metro-green)]">Water Temp</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Real-time Marine System Status Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockMarineSystemStatus.map((system) => {
              const IconComponent = system.icon;
              return (
                <Card key={system.id} className="hover:shadow-md transition-all">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <IconComponent className="h-6 w-6 text-[var(--metro-blue)]" />
                      <Badge variant="outline" className={getStatusColor(system.status)}>
                        {t[system.status as keyof typeof t]}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-medium text-[var(--metro-navy)] mb-2">{system.name}</h3>
                    <div className="text-2xl font-bold text-[var(--metro-navy)] mb-2">{system.value}%</div>
                    <Progress value={system.value} className="h-2 mb-2" />
                    <p className="text-xs text-[var(--metro-grey)] mb-1">{system.details}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-[var(--metro-grey)]">Last check: {system.lastCheck}</p>
                      {system.alerts > 0 && (
                        <Badge className="bg-[var(--safety-red)] text-white text-xs">
                          {system.alerts} alerts
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Recent Marine Alerts and Active Vessels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[var(--metro-navy)]">
                  <AlertCircle className="h-5 w-5" />
                  Marine Safety Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-3">
                    {mockMarineAlerts.map((alert) => (
                      <div key={alert.id} className="p-3 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              {getAlertIcon(alert.type)}
                              <Badge className={getPriorityColor(alert.severity)}>
                                {alert.type.toUpperCase()}
                              </Badge>
                              <span className="text-xs text-[var(--metro-grey)]">{alert.timestamp}</span>
                            </div>
                            <h4 className="font-medium text-[var(--metro-navy)] text-sm">{alert.title}</h4>
                            <p className="text-xs text-[var(--metro-grey)] mt-1">{alert.location}</p>
                          </div>
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[var(--metro-navy)]">
                  <Ship className="h-5 w-5" />
                  Active Vessels
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-3">
                    {mockVessels.filter(v => v.status === 'sailing' || v.status === 'docked').map((vessel) => (
                      <div key={vessel.id} className="p-3 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-[var(--metro-navy)]">{vessel.name}</span>
                          <Badge variant="outline" className={getStatusColor(vessel.status)}>
                            {t[vessel.status as keyof typeof t]}
                          </Badge>
                        </div>
                        <div className="text-xs text-[var(--metro-grey)] space-y-1">
                          <div className="flex items-center gap-1">
                            <Route className="h-3 w-3" />
                            {vessel.route}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {vessel.currentLocation}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            Capacity: {vessel.capacity}/{vessel.maxCapacity}
                          </div>
                          <div className="flex items-center gap-1">
                            <Fuel className="h-3 w-3" />
                            Fuel: {vessel.fuelLevel}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Vessels Tab - Comprehensive Vessel Management */}
        <TabsContent value="vessels" className="space-y-4">
          {/* Vessel Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-[var(--metro-light-blue)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Ship className="h-8 w-8 text-[var(--metro-blue)]" />
                </div>
                <div className="text-3xl font-bold text-[var(--metro-blue)]">{mockVessels.filter(v => v.status === 'sailing').length}</div>
                <p className="text-[var(--metro-grey)]">Sailing</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-[var(--operations-green-light)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Anchor className="h-8 w-8 text-[var(--operations-green)]" />
                </div>
                <div className="text-3xl font-bold text-[var(--operations-green)]">{mockVessels.filter(v => v.status === 'docked').length}</div>
                <p className="text-[var(--metro-grey)]">Docked</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-[var(--maintenance-orange-light)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="h-8 w-8 text-[var(--maintenance-orange)]" />
                </div>
                <div className="text-3xl font-bold text-[var(--maintenance-orange)]">{mockVessels.filter(v => v.status === 'maintenance').length}</div>
                <p className="text-[var(--metro-grey)]">Maintenance</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-[var(--safety-red-light)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-[var(--safety-red)]" />
                </div>
                <div className="text-3xl font-bold text-[var(--safety-red)]">{mockVessels.filter(v => v.status === 'delayed').length}</div>
                <p className="text-[var(--metro-grey)]">Delayed</p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Vessel Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ship className="h-5 w-5" />
                Live Vessel Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vessel</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Current Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Capacity</TableHead>
                      <TableHead>Fuel</TableHead>
                      <TableHead>Captain</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockVessels.map((vessel) => (
                      <TableRow key={vessel.id}>
                        <TableCell className="font-medium">
                          <div>
                            <div>{vessel.name}</div>
                            <div className="text-xs text-[var(--metro-grey)]">{vessel.id}</div>
                          </div>
                        </TableCell>
                        <TableCell>{vessel.route}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-[var(--metro-blue)]" />
                            {vessel.currentLocation}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(vessel.status)}>
                            {t[vessel.status as keyof typeof t]}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={(vessel.capacity / vessel.maxCapacity) * 100} className="h-2 w-16" />
                            <span className="text-sm">{vessel.capacity}/{vessel.maxCapacity}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={vessel.fuelLevel} className="h-2 w-16" />
                            <span className="text-sm">{vessel.fuelLevel}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="text-sm">{vessel.captain}</div>
                            <div className="text-xs text-[var(--metro-grey)]">Crew: {vessel.crew}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Radio className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Navigation className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Weather Tab - Comprehensive Weather & Sea Conditions */}
        <TabsContent value="weather" className="space-y-4">
          {/* Current Weather Conditions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sun className="h-5 w-5 text-[var(--metro-green)]" />
                  Temperature
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[var(--metro-navy)]">{mockWeatherData.temperature}°C</div>
                <p className="text-sm text-[var(--metro-grey)]">{mockWeatherData.weatherCondition}</p>
                <div className="mt-2 text-xs text-[var(--metro-grey)]">
                  <p>Humidity: {mockWeatherData.humidity}%</p>
                  <p>UV Index: {mockWeatherData.uvIndex}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Wind className="h-5 w-5 text-[var(--metro-blue)]" />
                  Wind Conditions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[var(--metro-navy)]">{mockWeatherData.windSpeed} kts</div>
                <p className="text-sm text-[var(--metro-grey)]">Direction: {mockWeatherData.windDirection}</p>
                <div className="mt-2 text-xs text-[var(--metro-grey)]">
                  <p>Visibility: {mockWeatherData.visibility} km</p>
                  <p>Sea Condition: {mockWeatherData.seaCondition}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Waves className="h-5 w-5 text-[var(--metro-blue)]" />
                  Sea Conditions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[var(--metro-navy)]">{mockWeatherData.waveHeight}m</div>
                <p className="text-sm text-[var(--metro-grey)]">Wave Height</p>
                <div className="mt-2 text-xs text-[var(--metro-grey)]">
                  <p>{mockWeatherData.tidalPhase}</p>
                  <p>Height: {mockWeatherData.tidalHeight}m</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Timer className="h-5 w-5 text-[var(--maintenance-orange)]" />
                  Tidal Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-[var(--metro-navy)]">{mockWeatherData.tidalPhase}</div>
                <p className="text-sm text-[var(--metro-grey)]">Current: {mockWeatherData.tidalHeight}m</p>
                <div className="mt-2 text-xs text-[var(--metro-grey)]">
                  <p>{mockWeatherData.nextTide}</p>
                  <p>Sunrise: {mockWeatherData.sunrise}</p>
                  <p>Sunset: {mockWeatherData.sunset}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Weather Forecast and Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CloudRain className="h-5 w-5" />
                  24-Hour Forecast
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-[var(--metro-light-blue)] rounded">
                    <div className="flex items-center gap-2">
                      <Sun className="h-4 w-4 text-[var(--metro-green)]" />
                      <span>Morning (06:00-12:00)</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">28°C</div>
                      <div className="text-sm text-[var(--metro-grey)]">Partly Cloudy</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-[var(--metro-light-blue)] rounded">
                    <div className="flex items-center gap-2">
                      <Sun className="h-4 w-4 text-[var(--maintenance-orange)]" />
                      <span>Afternoon (12:00-18:00)</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">31°C</div>
                      <div className="text-sm text-[var(--metro-grey)]">Sunny</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-[var(--metro-light-blue)] rounded">
                    <div className="flex items-center gap-2">
                      <CloudRain className="h-4 w-4 text-[var(--metro-blue)]" />
                      <span>Evening (18:00-00:00)</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">26°C</div>
                      <div className="text-sm text-[var(--metro-grey)]">Light Rain</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Weather Advisories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-3">
                    {mockMarineAlerts.filter(alert => alert.system === 'Weather Monitoring').map((alert) => (
                      <div key={alert.id} className={`
                        p-3 border rounded-lg
                        ${alert.type === 'warning' ? 'border-[var(--maintenance-orange)] bg-[var(--maintenance-orange-light)]' : 
                          'border-[var(--metro-blue)] bg-[var(--metro-light-blue)]'}
                      `}>
                        <div className="flex items-start gap-2">
                          {getAlertIcon(alert.type)}
                          <div className="flex-1">
                            <h4 className="font-medium text-[var(--metro-navy)]">{alert.title}</h4>
                            <p className="text-sm text-[var(--metro-grey)] mt-1">{alert.description}</p>
                            <div className="flex justify-between items-center mt-2 text-xs text-[var(--metro-grey)]">
                              <span>{alert.location}</span>
                              <span>{alert.timestamp}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Other tabs would continue with similar comprehensive content... */}
        
      </Tabs>
    </div>
  );
}