import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { ScrollArea } from '../ui/scroll-area';
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
  RefreshCw
} from 'lucide-react';

interface StationControllerDashboardProps {
  language: 'en' | 'ml';
}

const translations = {
  en: {
    title: 'Station Controller Dashboard',
    subtitle: 'Daily Operations & Document Intelligence',
    
    // Main sections
    dailyIncidents: 'Daily Incident Summaries',
    trainAvailability: 'Train Availability Status',
    safetyAlerts: 'Safety Alerts',
    shiftHandover: 'Shift Handover Notes',
    quickSearch: 'Quick Document Search',
    
    // Incident cards
    incidentSummary: 'Incident Summary',
    viewDetails: 'View Details',
    updateStatus: 'Update Status',
    assignTo: 'Assign To',
    
    // Train status
    availableTrains: 'Available Trains',
    unavailableTrains: 'Unavailable Trains',
    maintenanceMode: 'Maintenance Mode',
    totalFleet: 'Total Fleet',
    
    // Safety
    criticalAlerts: 'Critical',
    warningAlerts: 'Warning',
    infoAlerts: 'Information',
    acknowledge: 'Acknowledge',
    escalate: 'Escalate',
    
    // Handover
    previousShift: 'Previous Shift Notes',
    currentShift: 'Current Shift Notes',
    addNote: 'Add Note',
    submitHandover: 'Submit Handover',
    
    // Search
    searchDocuments: 'Search Documents',
    searchPlaceholder: 'Search SOPs, manuals, reports...',
    recentSearches: 'Recent Searches',
    
    // Priority levels
    high: 'High',
    medium: 'Medium',
    low: 'Low',
    
    // Status
    open: 'Open',
    inProgress: 'In Progress',
    resolved: 'Resolved',
    closed: 'Closed',
    
    // Actions
    refresh: 'Refresh',
    filter: 'Filter',
    export: 'Export',
    
    // Time
    timeAgo: {
      now: 'Now',
      minute: '1 min ago',
      minutes: 'mins ago',
      hour: '1 hour ago',
      hours: 'hours ago',
      day: '1 day ago',
      days: 'days ago'
    }
  },
  ml: {
    title: 'സ്റ്റേഷൻ കൺട്രോളർ ഡാഷ്ബോർഡ്',
    subtitle: 'ദൈനംദിന പ്രവർത്തനങ്ങളും ഡോക്യുമെന്റ് ഇന്റലിജൻസും',
    
    // Main sections
    dailyIncidents: 'ദൈനംദിന സംഭവ സംഗ്രഹങ്ങൾ',
    trainAvailability: 'ട്രെയിൻ ലഭ്യത സ്ഥിതി',
    safetyAlerts: 'സുരക്ഷാ അലേർട്ടുകൾ',
    shiftHandover: 'ഷിഫ്റ്റ് ഹാൻഡ്ഓവർ കുറിപ്പുകൾ',
    quickSearch: 'ദ്രുത ഡോക്യുമെന്റ് തിരയൽ',
    
    // Incident cards
    incidentSummary: 'സംഭവ സംഗ്രഹം',
    viewDetails: 'വിശദാംശങ്ങൾ കാണുക',
    updateStatus: 'സ്ഥിതി അപ്ഡേറ്റ് ചെയ്യുക',
    assignTo: 'നിയോഗിക്കുക',
    
    // Train status
    availableTrains: 'ലഭ്യമായ ട്രെയിനുകൾ',
    unavailableTrains: 'ലഭ്യമല്ലാത്ത ട്രെയിനുകൾ',
    maintenanceMode: 'മെയിന്റനൻസ് മോഡ്',
    totalFleet: 'മൊത്തം കപ്പൽശാല',
    
    // Safety
    criticalAlerts: 'നിർണായകം',
    warningAlerts: 'മുന്നറിയിപ്പ്',
    infoAlerts: 'വിവരങ്ങൾ',
    acknowledge: 'അംഗീകരിക്കുക',
    escalate: 'വർദ്ധിപ്പിക്കുക',
    
    // Handover
    previousShift: 'മുൻ ഷിഫ്റ്റ് കുറിപ്പുകൾ',
    currentShift: 'നിലവിലെ ഷിഫ്റ്റ് കുറിപ്പുകൾ',
    addNote: 'കുറിപ്പ് ചേർക്കുക',
    submitHandover: 'ഹാൻഡ്ഓവർ സമർപ്പിക്കുക',
    
    // Search
    searchDocuments: 'ഡോക്യുമെന്റുകൾ തിരയുക',
    searchPlaceholder: 'എസ്ഒപികൾ, മാനുവലുകൾ, റിപ്പോർട്ടുകൾ തിരയുക...',
    recentSearches: 'സമീപകാല തിരയലുകൾ',
    
    // Priority levels
    high: 'ഉയർന്നത്',
    medium: 'ഇടത്തരം',
    low: 'കുറവ്',
    
    // Status
    open: 'തുറന്നത്',
    inProgress: 'പുരോഗതിയിൽ',
    resolved: 'പരിഹരിച്ചു',
    closed: 'അടച്ചു',
    
    // Actions
    refresh: 'പുതുക്കുക',
    filter: 'ഫിൽട്ടർ',
    export: 'എക്സ്പോർട്ട്',
    
    // Time
    timeAgo: {
      now: 'ഇപ്പോൾ',
      minute: '1 മിനിറ്റ് മുമ്പ്',
      minutes: 'മിനിറ്റ് മുമ്പ്',
      hour: '1 മണിക്കൂർ മുമ്പ്',
      hours: 'മണിക്കൂർ മുമ്പ്',
      day: '1 ദിവസം മുമ്പ്',
      days: 'ദിവസം മുമ്പ്'
    }
  }
};

// Mock data
const mockIncidents = [
  {
    id: 'INC-2024-001',
    title: 'Platform 2 Escalator Malfunction',
    description: 'Escalator stopped working during peak hours',
    priority: 'high',
    status: 'inProgress',
    assignedTo: 'Maintenance Team',
    timestamp: '15 mins ago',
    location: 'Aluva Station - Platform 2'
  },
  {
    id: 'INC-2024-002', 
    title: 'CCTV Camera Down',
    description: 'Security camera offline at entrance gate',
    priority: 'medium',
    status: 'open',
    assignedTo: 'IT Support',
    timestamp: '1 hour ago',
    location: 'Kochi Metro - Entrance Gate 3'
  },
  {
    id: 'INC-2024-003',
    title: 'Passenger Information System Glitch',
    description: 'Display showing incorrect train timings',
    priority: 'low',
    status: 'resolved',
    assignedTo: 'Tech Support',
    timestamp: '3 hours ago',
    location: 'Ernakulam South Station'
  }
];

const mockTrainStatus = {
  available: 18,
  unavailable: 2,
  maintenance: 3,
  total: 23
};

const mockSafetyAlerts = [
  {
    id: 'SA-001',
    type: 'critical',
    title: 'Fire Safety System Check Required',
    description: 'Monthly fire safety inspection due at Aluva Station',
    timestamp: '2 hours ago'
  },
  {
    id: 'SA-002', 
    type: 'warning',
    title: 'Platform Overcrowding Alert',
    description: 'High passenger density detected at Platform 1',
    timestamp: '30 mins ago'
  },
  {
    id: 'SA-003',
    type: 'info',
    title: 'Weather Advisory',
    description: 'Heavy rain expected, monitor platform conditions',
    timestamp: '1 hour ago'
  }
];

const mockHandoverNotes = [
  {
    id: 'HN-001',
    shift: 'Morning (6 AM - 2 PM)',
    author: 'Rajesh Kumar',
    timestamp: '8 hours ago',
    content: 'All systems operational. Minor delay on Line 1 due to technical check. Maintenance scheduled for tonight on escalator at Platform 2.'
  },
  {
    id: 'HN-002',
    shift: 'Afternoon (2 PM - 10 PM)', 
    author: 'Priya Nair',
    timestamp: '16 hours ago',
    content: 'Peak hour operations smooth. Reported passenger complaint about AC in Coach 3 of Train ALV-001. Forwarded to maintenance team.'
  }
];

export function DocumentStationControllerDashboard({ language }: StationControllerDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [newNote, setNewNote] = useState('');
  const [selectedTab, setSelectedTab] = useState('incidents');
  const t = translations[language];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-priority-high text-white';
      case 'medium': return 'bg-priority-medium text-white';
      case 'low': return 'bg-priority-low text-white';
      default: return 'bg-grey text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-priority-high-light text-priority-high border-priority-high';
      case 'inProgress': return 'bg-priority-medium-light text-priority-medium border-priority-medium';
      case 'resolved': return 'bg-status-success-light text-status-success border-status-success';
      case 'closed': return 'bg-grey-light text-grey border-grey';
      default: return 'bg-grey-light text-grey border-grey';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="h-4 w-4 text-priority-high" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-priority-medium" />;
      case 'info': return <Activity className="h-4 w-4 text-status-info" />;
      default: return <Activity className="h-4 w-4 text-grey" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-navy">{t.title}</h1>
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
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-white border border-grey/20">
          <TabsTrigger value="incidents" className="data-[state=active]:bg-teal data-[state=active]:text-white">
            {t.dailyIncidents}
          </TabsTrigger>
          <TabsTrigger value="trains" className="data-[state=active]:bg-teal data-[state=active]:text-white">
            {t.trainAvailability}
          </TabsTrigger>
          <TabsTrigger value="safety" className="data-[state=active]:bg-teal data-[state=active]:text-white">
            {t.safetyAlerts}
          </TabsTrigger>
          <TabsTrigger value="handover" className="data-[state=active]:bg-teal data-[state=active]:text-white">
            {t.shiftHandover}
          </TabsTrigger>
          <TabsTrigger value="search" className="data-[state=active]:bg-teal data-[state=active]:text-white">
            {t.quickSearch}
          </TabsTrigger>
        </TabsList>

        {/* Daily Incidents Tab */}
        <TabsContent value="incidents" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockIncidents.map((incident) => (
              <Card key={incident.id} className="hover:shadow-md transition-all border-l-4 border-l-teal">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getPriorityColor(incident.priority)}>
                          {incident.priority}
                        </Badge>
                        <Badge variant="outline" className={getStatusColor(incident.status)}>
                          {incident.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg text-navy">{incident.title}</CardTitle>
                      <CardDescription className="text-grey">
                        {incident.id} • {incident.location}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-grey">{incident.description}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-grey">Assigned to:</span>
                      <span className="text-navy font-medium">{incident.assignedTo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-grey">Time:</span>
                      <span className="text-navy">{incident.timestamp}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2 border-t">
                    <Button size="sm" variant="outline" className="flex-1">
                      {t.viewDetails}
                    </Button>
                    <Button size="sm" className="flex-1 bg-teal hover:bg-teal/90">
                      {t.updateStatus}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Train Availability Tab */}
        <TabsContent value="trains" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-status-success-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-status-success" />
                </div>
                <div className="text-3xl font-bold text-status-success">{mockTrainStatus.available}</div>
                <p className="text-grey">{t.availableTrains}</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-priority-high-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <XCircle className="h-8 w-8 text-priority-high" />
                </div>
                <div className="text-3xl font-bold text-priority-high">{mockTrainStatus.unavailable}</div>
                <p className="text-grey">{t.unavailableTrains}</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-priority-medium-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-priority-medium" />
                </div>
                <div className="text-3xl font-bold text-priority-medium">{mockTrainStatus.maintenance}</div>
                <p className="text-grey">{t.maintenanceMode}</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-teal-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <Train className="h-8 w-8 text-teal" />
                </div>
                <div className="text-3xl font-bold text-teal">{mockTrainStatus.total}</div>
                <p className="text-grey">{t.totalFleet}</p>
              </CardContent>
            </Card>
          </div>

          {/* Train Availability Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="text-navy">Fleet Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Available Trains</span>
                    <span>{Math.round((mockTrainStatus.available / mockTrainStatus.total) * 100)}%</span>
                  </div>
                  <Progress value={(mockTrainStatus.available / mockTrainStatus.total) * 100} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Safety Alerts Tab */}
        <TabsContent value="safety" className="space-y-4">
          <div className="space-y-3">
            {mockSafetyAlerts.map((alert) => (
              <Card key={alert.id} className={`
                hover:shadow-md transition-all border-l-4
                ${alert.type === 'critical' ? 'border-l-priority-high bg-priority-high-light/30' : 
                  alert.type === 'warning' ? 'border-l-priority-medium bg-priority-medium-light/30' : 
                  'border-l-status-info bg-status-info-light/30'}
              `}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <h4 className="font-medium text-navy">{alert.title}</h4>
                        <p className="text-sm text-grey mt-1">{alert.description}</p>
                        <p className="text-xs text-grey mt-2">{alert.timestamp}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        {t.acknowledge}
                      </Button>
                      {alert.type === 'critical' && (
                        <Button size="sm" className="bg-priority-high hover:bg-priority-high/90">
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

        {/* Shift Handover Tab */}
        <TabsContent value="handover" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Previous Shift Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-navy">
                  <Users className="h-5 w-5" />
                  {t.previousShift}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-4">
                    {mockHandoverNotes.map((note) => (
                      <div key={note.id} className="p-3 bg-grey-light rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium text-navy">{note.shift}</span>
                          <span className="text-xs text-grey">{note.timestamp}</span>
                        </div>
                        <p className="text-sm text-grey mb-2">{note.content}</p>
                        <p className="text-xs text-grey">- {note.author}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Current Shift Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-navy">
                  <MessageSquare className="h-5 w-5" />
                  {t.currentShift}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add shift notes, observations, and handover information..."
                  className="min-h-32"
                />
                <div className="flex gap-2">
                  <Button className="flex-1 bg-teal hover:bg-teal/90">
                    {t.addNote}
                  </Button>
                  <Button variant="outline" className="flex-1">
                    {t.submitHandover}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Quick Search Tab */}
        <TabsContent value="search" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-navy">
                <Search className="h-5 w-5" />
                {t.searchDocuments}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-grey" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="pl-10 h-12 text-lg"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="hover:shadow-md transition-all cursor-pointer">
                  <CardContent className="p-4">
                    <FileText className="h-8 w-8 text-teal mb-2" />
                    <h4 className="font-medium text-navy">Emergency SOPs</h4>
                    <p className="text-sm text-grey">Safety procedures and protocols</p>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-md transition-all cursor-pointer">
                  <CardContent className="p-4">
                    <Train className="h-8 w-8 text-teal mb-2" />
                    <h4 className="font-medium text-navy">Operations Manual</h4>
                    <p className="text-sm text-grey">Daily operations guidelines</p>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-md transition-all cursor-pointer">
                  <CardContent className="p-4">
                    <Activity className="h-8 w-8 text-teal mb-2" />
                    <h4 className="font-medium text-navy">Incident Reports</h4>
                    <p className="text-sm text-grey">Historical incident data</p>  
                  </CardContent>
                </Card>
              </div>

              <div>
                <h4 className="font-medium mb-3 text-navy">{t.recentSearches}</h4>
                <div className="flex flex-wrap gap-2">
                  {['Emergency evacuation', 'Platform safety', 'Train maintenance', 'Communication protocols'].map((search) => (
                    <Badge key={search} variant="outline" className="cursor-pointer hover:bg-teal hover:text-white">
                      {search}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}