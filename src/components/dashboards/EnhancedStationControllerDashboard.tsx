import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { ScrollArea } from '../ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Train, 
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
  Zap,
  Thermometer,
  Wind,
  DoorOpen,
  Camera,
  Volume2,
  WifiOff,
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
  Gauge
} from 'lucide-react';

interface EnhancedStationControllerDashboardProps {
  language: 'en' | 'ml';
}

const translations = {
  en: {
    title: 'Station Controller Dashboard',
    subtitle: 'Daily Operations & Incident Management Hub',
    
    // Main sections
    dailyIncidents: 'Daily Incident Summaries',
    trainStatus: 'Train Availability Status',
    safetyAlerts: 'Safety & Security Alerts',
    shiftHandover: 'Shift Handover Management',
    documentCenter: 'Document Intelligence Center',
    systemMonitoring: 'System Monitoring',
    passengerServices: 'Passenger Services',
    communicationHub: 'Communication Hub',
    
    // Incident management
    activeIncidents: 'Active Incidents',
    resolvedToday: 'Resolved Today',
    pendingEscalation: 'Pending Escalation',
    criticalAlerts: 'Critical Alerts',
    emergencyProcedures: 'Emergency Procedures',
    incidentReporting: 'Incident Reporting',
    
    // Train operations
    activeTrains: 'Active Trains',
    maintenanceSchedule: 'Maintenance Schedule',
    trainLocations: 'Real-time Train Locations',
    platformStatus: 'Platform Status',
    serviceDisruptions: 'Service Disruptions',
    
    // Safety systems
    securityCameras: 'Security Cameras',
    fireAlarmSystem: 'Fire Alarm System',
    emergencyExits: 'Emergency Exits',
    publicAddress: 'Public Address System',
    accessControl: 'Access Control',
    
    // Station systems
    hvacSystems: 'HVAC Systems',
    lightingSystems: 'Lighting Systems',
    elevatorsEscalators: 'Elevators & Escalators',
    powerSystems: 'Power Systems',
    communicationSystems: 'Communication Systems',
    
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
    
    // Time periods
    last24h: 'Last 24 Hours',
    thisWeek: 'This Week',
    thisMonth: 'This Month',
    
    // Station locations
    platform1: 'Platform 1',
    platform2: 'Platform 2',
    concourse: 'Concourse',
    entrance: 'Main Entrance',
    exitGate: 'Exit Gate',
    ticketHall: 'Ticket Hall',
    
    // Actions
    refresh: 'Refresh All',
    filter: 'Filter View',
    export: 'Export Report',
    settings: 'Dashboard Settings'
  },
  ml: {
    title: 'സ്റ്റേഷൻ കൺട്രോളർ ഡാഷ്ബോർഡ്',
    subtitle: 'ദൈനംദിന പ്രവർത്തനങ്ങളും സംഭവ മാനേജ്മെന്റ് ഹബ്',
    
    // Main sections
    dailyIncidents: 'ദൈനംദിന സംഭവ സംഗ്രഹങ്ങൾ',
    trainStatus: 'ട്രെയിൻ ലഭ്യത സ്ഥിതി',
    safetyAlerts: 'സുരക്ഷാ അലേർട്ടുകൾ',
    shiftHandover: 'ഷിഫ്റ്റ് ഹാൻഡ്ഓവർ മാനേജ്മെന്റ്',
    documentCenter: 'ഡോക്യുമെന്റ് ഇന്റലിജൻസ് സെന്റർ',
    systemMonitoring: 'സിസ്റ്റം മോണിറ്ററിംഗ്',
    passengerServices: 'യാത്രക്കാരുടെ സേവനങ്ങൾ',
    communicationHub: 'കമ്മ്യൂണിക്കേഷൻ ഹബ്',
    
    // Incident management
    activeIncidents: 'സജീവ സംഭവങ്ങൾ',
    resolvedToday: 'ഇന്ന് പരിഹരിച്ചവ',
    pendingEscalation: 'എസ്കലേഷൻ പെൻഡിംഗ്',
    criticalAlerts: 'നിർണായക അലേർട്ടുകൾ',
    emergencyProcedures: 'അടിയന്തര നടപടിക്രമങ്ങൾ',
    incidentReporting: 'സംഭവ റിപ്പോർട്ടിംഗ്',
    
    // Train operations
    activeTrains: 'സജീവ ട്രെയിനുകൾ',
    maintenanceSchedule: 'മെയിന്റനൻസ് ഷെഡ്യൂൾ',
    trainLocations: 'തത്സമയ ട്രെയിൻ ലൊക്കേഷനുകൾ',
    platformStatus: 'പ്ലാറ്റ്ഫോം സ്ഥിതി',
    serviceDisruptions: 'സേവന തടസ്സങ്ങൾ',
    
    // Safety systems
    securityCameras: 'സെക്യൂരിറ്റി ക്യാമറകൾ',
    fireAlarmSystem: 'ഫയർ അലാറം സിസ്റ്റം',
    emergencyExits: 'അടിയന്തര എക്സിറ്റുകൾ',
    publicAddress: 'പബ്ലിക് അഡ്രസ് സിസ്റ്റം',
    accessControl: 'ആക്സസ് കൺട്രോൾ',
    
    // Station systems
    hvacSystems: 'എച്ച്വിഎസി സിസ്റ്റങ്ങൾ',
    lightingSystems: 'ലൈറ്റിംഗ് സിസ്റ്റങ്ങൾ',
    elevatorsEscalators: 'എലിവേറ്ററുകളും എസ്കലേറ്ററുകളും',
    powerSystems: 'പവർ സിസ്റ്റങ്ങൾ',
    communicationSystems: 'കമ്മ്യൂണിക്കേഷൻ സിസ്റ്റങ്ങൾ',
    
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
    
    // Time periods
    last24h: 'കഴിഞ്ഞ 24 മണിക്കൂർ',
    thisWeek: 'ഈ ആഴ്ച',
    thisMonth: 'ഈ മാസം',
    
    // Station locations
    platform1: 'പ്ലാറ്റ്ഫോം 1',
    platform2: 'പ്ലാറ്റ്ഫോം 2',
    concourse: 'കൺകോഴ്സ്',
    entrance: 'പ്രധാന കവാടം',
    exitGate: 'എക്സിറ്റ് ഗേറ്റ്',
    ticketHall: 'ടിക്കറ്റ് ഹാൾ',
    
    // Actions
    refresh: 'എല്ലാം പുതുക്കുക',
    filter: 'ഫിൽട്ടർ വ്യൂ',
    export: 'റിപ്പോർട്ട് എക്സ്പോർട്ട്',
    settings: 'ഡാഷ്ബോർഡ് സെറ്റിംഗ്സ്'
  }
};

// Extensive mock data
const mockIncidents = [
  {
    id: 'INC-2024-001',
    title: 'Platform 2 Escalator Malfunction',
    description: 'Escalator stopped working during peak hours, passengers using stairs',
    priority: 'high',
    status: 'inProgress',
    assignedTo: 'Maintenance Team Alpha',
    reporter: 'Security Officer Raj',
    timestamp: '15 mins ago',
    location: 'Aluva Station - Platform 2',
    category: 'Mechanical',
    estimatedResolution: '2 hours',
    affectedServices: ['Escalator E-02'],
    comments: 3
  },
  {
    id: 'INC-2024-002', 
    title: 'CCTV Camera Down at Gate 3',
    description: 'Security camera offline at entrance gate, affecting security monitoring',
    priority: 'medium',
    status: 'open',
    assignedTo: 'IT Support Team',
    reporter: 'Control Room',
    timestamp: '1 hour ago',
    location: 'Ernakulam South - Entrance Gate 3',
    category: 'IT/Security',
    estimatedResolution: '4 hours',
    affectedServices: ['CCTV-ENT-03'],
    comments: 1
  },
  {
    id: 'INC-2024-003',
    title: 'Passenger Information Display Glitch',
    description: 'Display showing incorrect train timings on Platform 1',
    priority: 'low',
    status: 'resolved',
    assignedTo: 'Tech Support',
    reporter: 'Platform Controller',
    timestamp: '3 hours ago',
    location: 'Kochi Metro Central',
    category: 'Information Systems',
    estimatedResolution: 'Completed',
    affectedServices: ['PID-P1-001'],
    comments: 5
  },
  {
    id: 'INC-2024-004',
    title: 'Fire Alarm System False Trigger',
    description: 'False fire alarm in ticket hall area, emergency teams responded',
    priority: 'high',
    status: 'resolved',
    assignedTo: 'Safety Team',
    reporter: 'Station Manager',
    timestamp: '4 hours ago',
    location: 'Kalamaserry Station',
    category: 'Safety Systems',
    estimatedResolution: 'Completed',
    affectedServices: ['FA-TH-001'],
    comments: 8
  },
  {
    id: 'INC-2024-005',
    title: 'Turnstile Gate Malfunction',
    description: 'Entry turnstile not reading smart cards properly',
    priority: 'medium',
    status: 'inProgress',
    assignedTo: 'Technical Support',
    reporter: 'Ticketing Staff',
    timestamp: '45 mins ago',
    location: 'Edapally Station',
    category: 'Access Control',
    estimatedResolution: '1.5 hours',
    affectedServices: ['TS-ENT-02'],
    comments: 2
  },
  {
    id: 'INC-2024-006',
    title: 'Elevator Out of Service',
    description: 'Main passenger elevator stopped between floors',
    priority: 'high',
    status: 'open',
    assignedTo: 'Elevator Maintenance',
    reporter: 'Station Supervisor',
    timestamp: '20 mins ago',
    location: 'JLN Stadium Station',
    category: 'Vertical Transport',
    estimatedResolution: '3 hours',
    affectedServices: ['EL-MAIN-001'],
    comments: 0
  }
];

const mockTrainStatus = {
  active: 18,
  maintenance: 3,
  outOfService: 2,
  total: 23,
  onTimePerformance: 94.2,
  averageDelay: 2.3,
  serviceAvailability: 97.8
};

const mockSafetyAlerts = [
  {
    id: 'SA-001',
    type: 'critical',
    title: 'Unauthorized Access Detected',
    description: 'Motion sensor triggered in restricted maintenance area',
    location: 'Aluva Station - Maintenance Zone B',
    timestamp: '5 mins ago',
    status: 'active',
    assignedTo: 'Security Team',
    system: 'Access Control'
  },
  {
    id: 'SA-002', 
    type: 'warning',
    title: 'High Passenger Density Alert',
    description: 'Platform overcrowding detected during evening rush',
    location: 'Ernakulam South - Platform 1',
    timestamp: '30 mins ago',
    status: 'monitoring',
    assignedTo: 'Platform Control',
    system: 'Crowd Management'
  },
  {
    id: 'SA-003',
    type: 'info',
    title: 'Weather Advisory Update',
    description: 'Heavy rain forecast, monitor platform conditions',
    location: 'All Stations',
    timestamp: '1 hour ago',
    status: 'active',
    assignedTo: 'Station Managers',
    system: 'Weather Monitoring'
  },
  {
    id: 'SA-004',
    type: 'warning',
    title: 'Emergency Exit Obstruction',
    description: 'Emergency exit partially blocked by maintenance equipment',
    location: 'Kalamassery - Exit E2',
    timestamp: '2 hours ago',
    status: 'inProgress',
    assignedTo: 'Maintenance Team',
    system: 'Safety Infrastructure'
  }
];

const mockSystemStatus = [
  {
    id: 'power',
    name: 'Power Systems',
    status: 'operational',
    value: 98.5,
    icon: Zap,
    details: 'All substations operational, backup power ready',
    lastCheck: '5 mins ago'
  },
  {
    id: 'hvac',
    name: 'HVAC Systems',
    status: 'operational', 
    value: 96.8,
    icon: Wind,
    details: 'Temperature and ventilation within normal ranges',
    lastCheck: '10 mins ago'
  },
  {
    id: 'security',
    name: 'Security Systems',
    status: 'warning',
    value: 94.1,
    icon: Shield,
    details: '3 cameras offline, access control functioning',
    lastCheck: '2 mins ago'
  },
  {
    id: 'communication',
    name: 'Communication',
    status: 'operational',
    value: 99.2,
    icon: Radio,
    details: 'All radio systems and PA operational',
    lastCheck: '1 min ago'
  },
  {
    id: 'doors',
    name: 'Platform Doors',
    status: 'operational',
    value: 97.5,
    icon: DoorOpen,
    details: 'All platform screen doors functioning normally',
    lastCheck: '3 mins ago'
  },
  {
    id: 'monitoring',
    name: 'CCTV Systems',
    status: 'warning',
    value: 92.3,
    icon: Camera,
    details: '12 cameras operational, 3 require maintenance',
    lastCheck: '1 min ago'
  }
];

const mockActiveTrains = [
  {
    id: 'TRN-001',
    number: 'KMR-105',
    route: 'Aluva → Kochi Airport',
    currentLocation: 'Edapally Station',
    status: 'On Time',
    capacity: 85,
    nextStation: 'JLN Stadium',
    eta: '3 mins',
    delay: 0
  },
  {
    id: 'TRN-002',
    number: 'KMR-108',
    route: 'Kochi Airport → Aluva',
    currentLocation: 'Between JLN Stadium & Kaloor',
    status: 'Delayed',
    capacity: 92,
    nextStation: 'Kaloor',
    eta: '5 mins',
    delay: 2
  },
  {
    id: 'TRN-003',
    number: 'KMR-112',
    route: 'Aluva → Kochi Airport',
    currentLocation: 'Aluva Station',
    status: 'Boarding',
    capacity: 45,
    nextStation: 'Departure in 2 mins',
    eta: '2 mins',
    delay: 0
  },
  {
    id: 'TRN-004',
    number: 'KMR-115',
    route: 'Kochi Airport → Aluva',
    currentLocation: 'Kochi Airport',
    status: 'Maintenance Check',
    capacity: 0,
    nextStation: 'Service Mode',
    eta: 'N/A',
    delay: 0
  }
];

export function EnhancedStationControllerDashboard({ language }: EnhancedStationControllerDashboardProps) {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
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
      case 'open': return 'text-[var(--safety-red)] bg-[var(--safety-red-light)] border-[var(--safety-red)]';
      case 'inProgress': return 'text-[var(--maintenance-orange)] bg-[var(--maintenance-orange-light)] border-[var(--maintenance-orange)]';
      case 'resolved': return 'text-[var(--operations-green)] bg-[var(--operations-green-light)] border-[var(--operations-green)]';
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
      {/* Enhanced Header with Statistics */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--metro-navy)]">{t.title}</h1>
          <p className="text-[var(--metro-grey)] mt-1">{t.subtitle}</p>
        </div>
        
        {/* Quick Stats */}
        <div className="flex gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-[var(--safety-red)]">{mockIncidents.filter(i => i.status !== 'resolved').length}</div>
            <div className="text-xs text-[var(--metro-grey)]">Active</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[var(--operations-green)]">{mockIncidents.filter(i => i.status === 'resolved').length}</div>
            <div className="text-xs text-[var(--metro-grey)]">Resolved</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[var(--metro-blue)]">{mockTrainStatus.active}</div>
            <div className="text-xs text-[var(--metro-grey)]">Trains</div>
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

      {/* Comprehensive Dashboard Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 bg-white border border-gray-200 h-auto p-1">
          <TabsTrigger value="overview" className="data-[state=active]:bg-[var(--metro-blue)] data-[state=active]:text-white flex items-center gap-2 p-3">
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="incidents" className="data-[state=active]:bg-[var(--metro-blue)] data-[state=active]:text-white flex items-center gap-2 p-3">
            <AlertTriangle className="h-4 w-4" />
            <span className="hidden sm:inline">Incidents</span>
          </TabsTrigger>
          <TabsTrigger value="trains" className="data-[state=active]:bg-[var(--metro-blue)] data-[state=active]:text-white flex items-center gap-2 p-3">
            <Train className="h-4 w-4" />
            <span className="hidden sm:inline">Trains</span>
          </TabsTrigger>
          <TabsTrigger value="safety" className="data-[state=active]:bg-[var(--metro-blue)] data-[state=active]:text-white flex items-center gap-2 p-3">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Safety</span>
          </TabsTrigger>
          <TabsTrigger value="systems" className="data-[state=active]:bg-[var(--metro-blue)] data-[state=active]:text-white flex items-center gap-2 p-3">
            <Monitor className="h-4 w-4" />
            <span className="hidden sm:inline">Systems</span>
          </TabsTrigger>
          <TabsTrigger value="communications" className="data-[state=active]:bg-[var(--metro-blue)] data-[state=active]:text-white flex items-center gap-2 p-3">
            <Radio className="h-4 w-4" />
            <span className="hidden sm:inline">Comms</span>
          </TabsTrigger>
          <TabsTrigger value="documents" className="data-[state=active]:bg-[var(--metro-blue)] data-[state=active]:text-white flex items-center gap-2 p-3">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Docs</span>
          </TabsTrigger>
          <TabsTrigger value="handover" className="data-[state=active]:bg-[var(--metro-blue)] data-[state=active]:text-white flex items-center gap-2 p-3">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Handover</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab - Dashboard Summary */}
        <TabsContent value="overview" className="space-y-6">
          {/* Critical Alerts Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-l-4 border-l-[var(--safety-red)] bg-[var(--safety-red-light)]">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-8 w-8 text-[var(--safety-red)]" />
                  <div>
                    <div className="text-2xl font-bold text-[var(--safety-red)]">2</div>
                    <div className="text-sm text-[var(--safety-red)]">Critical Alerts</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-[var(--maintenance-orange)] bg-[var(--maintenance-orange-light)]">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-8 w-8 text-[var(--maintenance-orange)]" />
                  <div>
                    <div className="text-2xl font-bold text-[var(--maintenance-orange)]">4</div>
                    <div className="text-sm text-[var(--maintenance-orange)]">Pending Actions</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-[var(--operations-green)] bg-[var(--operations-green-light)]">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-8 w-8 text-[var(--operations-green)]" />
                  <div>
                    <div className="text-2xl font-bold text-[var(--operations-green)]">94.2%</div>
                    <div className="text-sm text-[var(--operations-green)]">System Health</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Real-time System Status Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockSystemStatus.map((system) => {
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
                    <p className="text-xs text-[var(--metro-grey)]">Last check: {system.lastCheck}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Recent Incidents and Active Trains */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[var(--metro-navy)]">
                  <AlertCircle className="h-5 w-5" />
                  Recent Incidents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-3">
                    {mockIncidents.slice(0, 4).map((incident) => (
                      <div key={incident.id} className="p-3 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge className={getPriorityColor(incident.priority)}>
                                {t[incident.priority as keyof typeof t]}
                              </Badge>
                              <span className="text-xs text-[var(--metro-grey)]">{incident.timestamp}</span>
                            </div>
                            <h4 className="font-medium text-[var(--metro-navy)] text-sm">{incident.title}</h4>
                            <p className="text-xs text-[var(--metro-grey)] mt-1">{incident.location}</p>
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
                  <Train className="h-5 w-5" />
                  Active Trains
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-3">
                    {mockActiveTrains.map((train) => (
                      <div key={train.id} className="p-3 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-[var(--metro-navy)]">{train.number}</span>
                          <Badge variant="outline" className={
                            train.status === 'On Time' ? getStatusColor('operational') :
                            train.status === 'Delayed' ? getStatusColor('warning') :
                            getStatusColor('critical')
                          }>
                            {train.status}
                          </Badge>
                        </div>
                        <div className="text-xs text-[var(--metro-grey)] space-y-1">
                          <div className="flex items-center gap-1">
                            <Navigation className="h-3 w-3" />
                            {train.currentLocation}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            Capacity: {train.capacity}%
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Next: {train.nextStation} ({train.eta})
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

        {/* Incidents Tab - Comprehensive Incident Management */}
        <TabsContent value="incidents" className="space-y-4">
          {/* Incident Filters and Actions */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('all')}
                className={filterStatus === 'all' ? 'bg-[var(--metro-blue)]' : ''}
              >
                All ({mockIncidents.length})
              </Button>
              <Button
                variant={filterStatus === 'open' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('open')}
                className={filterStatus === 'open' ? 'bg-[var(--safety-red)]' : ''}
              >
                Open ({mockIncidents.filter(i => i.status === 'open').length})
              </Button>
              <Button
                variant={filterStatus === 'inProgress' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('inProgress')}
                className={filterStatus === 'inProgress' ? 'bg-[var(--maintenance-orange)]' : ''}
              >
                In Progress ({mockIncidents.filter(i => i.status === 'inProgress').length})
              </Button>
              <Button
                variant={filterStatus === 'resolved' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('resolved')}
                className={filterStatus === 'resolved' ? 'bg-[var(--operations-green)]' : ''}
              >
                Resolved ({mockIncidents.filter(i => i.status === 'resolved').length})
              </Button>
            </div>
            <div className="flex gap-2">
              <Button className="gap-2 bg-[var(--metro-blue)] hover:bg-[var(--metro-blue)]/90">
                <Plus className="h-4 w-4" />
                New Incident
              </Button>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Advanced Filter
              </Button>
            </div>
          </div>

          {/* Detailed Incident Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {mockIncidents
              .filter(incident => filterStatus === 'all' || incident.status === filterStatus)
              .map((incident) => (
              <Card key={incident.id} className="hover:shadow-md transition-all border-l-4 border-l-[var(--metro-blue)]">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getPriorityColor(incident.priority)}>
                          {t[incident.priority as keyof typeof t]}
                        </Badge>
                        <Badge variant="outline" className={getStatusColor(incident.status)}>
                          {t[incident.status as keyof typeof t]}
                        </Badge>
                        <span className="text-xs text-[var(--metro-grey)]">{incident.category}</span>
                      </div>
                      <CardTitle className="text-lg text-[var(--metro-navy)]">{incident.title}</CardTitle>
                      <CardDescription className="text-[var(--metro-grey)]">
                        {incident.id} • {incident.location}
                      </CardDescription>
                    </div>
                    <Button size="sm" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-[var(--metro-grey)]">{incident.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-[var(--metro-grey)]">
                        <User className="h-3 w-3" />
                        <span>Assigned to:</span>
                      </div>
                      <span className="text-[var(--metro-navy)] font-medium">{incident.assignedTo}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-[var(--metro-grey)]">
                        <Clock className="h-3 w-3" />
                        <span>ETA:</span>
                      </div>
                      <span className="text-[var(--metro-navy)]">{incident.estimatedResolution}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-[var(--metro-grey)]">
                        <MapPin className="h-3 w-3" />
                        <span>Reporter:</span>
                      </div>
                      <span className="text-[var(--metro-navy)]">{incident.reporter}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-[var(--metro-grey)]">
                        <MessageSquare className="h-3 w-3" />
                        <span>Comments:</span>
                      </div>
                      <span className="text-[var(--metro-navy)]">{incident.comments}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2 border-t">
                    <Button size="sm" variant="outline" className="flex-1 gap-1">
                      <Eye className="h-3 w-3" />
                      {t.viewDetails}
                    </Button>
                    <Button size="sm" className="flex-1 gap-1 bg-[var(--metro-blue)] hover:bg-[var(--metro-blue)]/90">
                      <Edit className="h-3 w-3" />
                      {t.updateStatus}
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1">
                      <Share2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Additional tabs would continue here with similar detailed content... */}
        {/* For brevity, I'll include the key structure for other tabs */}
        
        <TabsContent value="trains" className="space-y-4">
          {/* Train Status and Management */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-[var(--operations-green-light)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Train className="h-8 w-8 text-[var(--operations-green)]" />
                </div>
                <div className="text-3xl font-bold text-[var(--operations-green)]">{mockTrainStatus.active}</div>
                <p className="text-[var(--metro-grey)]">Active Trains</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-[var(--maintenance-orange-light)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="h-8 w-8 text-[var(--maintenance-orange)]" />
                </div>
                <div className="text-3xl font-bold text-[var(--maintenance-orange)]">{mockTrainStatus.maintenance}</div>
                <p className="text-[var(--metro-grey)]">In Maintenance</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-[var(--safety-red-light)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <XCircle className="h-8 w-8 text-[var(--safety-red)]" />
                </div>
                <div className="text-3xl font-bold text-[var(--safety-red)]">{mockTrainStatus.outOfService}</div>
                <p className="text-[var(--metro-grey)]">Out of Service</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-[var(--metro-light-blue)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gauge className="h-8 w-8 text-[var(--metro-blue)]" />
                </div>
                <div className="text-3xl font-bold text-[var(--metro-blue)]">{mockTrainStatus.onTimePerformance}%</div>
                <p className="text-[var(--metro-grey)]">On-Time Performance</p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Train Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Train className="h-5 w-5" />
                Live Train Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Train</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Current Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Capacity</TableHead>
                      <TableHead>Next Station</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockActiveTrains.map((train) => (
                      <TableRow key={train.id}>
                        <TableCell className="font-medium">{train.number}</TableCell>
                        <TableCell>{train.route}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-[var(--metro-blue)]" />
                            {train.currentLocation}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={
                            train.status === 'On Time' ? getStatusColor('operational') :
                            train.status === 'Delayed' ? getStatusColor('warning') :
                            getStatusColor('critical')
                          }>
                            {train.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={train.capacity} className="h-2 w-16" />
                            <span className="text-sm">{train.capacity}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{train.nextStation}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Radio className="h-3 w-3" />
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

        {/* Safety Tab */}
        <TabsContent value="safety" className="space-y-4">
          <div className="space-y-3">
            {mockSafetyAlerts.map((alert) => (
              <Card key={alert.id} className={`
                hover:shadow-md transition-all border-l-4
                ${alert.type === 'critical' ? 'border-l-[var(--safety-red)] bg-[var(--safety-red-light)]/30' : 
                  alert.type === 'warning' ? 'border-l-[var(--maintenance-orange)] bg-[var(--maintenance-orange-light)]/30' : 
                  'border-l-[var(--metro-blue)] bg-[var(--metro-light-blue)]/30'}
              `}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-[var(--metro-navy)]">{alert.title}</h4>
                          <Badge className={getPriorityColor(alert.type === 'critical' ? 'high' : alert.type === 'warning' ? 'medium' : 'low')}>
                            {alert.type.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-[var(--metro-grey)] mb-2">{alert.description}</p>
                        <div className="flex items-center gap-4 text-xs text-[var(--metro-grey)]">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {alert.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {alert.timestamp}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {alert.assignedTo}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        {t.acknowledge}
                      </Button>
                      {alert.type === 'critical' && (
                        <Button size="sm" className="bg-[var(--safety-red)] hover:bg-[var(--safety-red)]/90">
                          {t.escalate}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Other tabs would follow similar patterns with extensive content */}
        
      </Tabs>
    </div>
  );
}