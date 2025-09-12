import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { RoleCard } from '../cards/RoleCard';
import { MetricCard } from '../cards/MetricCard';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Train, 
  Users, 
  Activity,
  Eye,
  ExternalLink,
  Shield,
  RadioIcon
} from 'lucide-react';

interface StationControllerDashboardProps {
  language: 'en' | 'ml';
}

const translations = {
  en: {
    title: 'Station Control Dashboard',
    subtitle: 'Daily operations and incident management',
    dailyBriefing: 'Daily Briefing',
    incidentAlerts: 'Active Incidents',
    trainStatus: 'Train Status',
    passengerFlow: 'Passenger Flow',
    systemStatus: 'System Status',
    viewDetails: 'View Details',
    acknowledge: 'Acknowledge',
    resolve: 'Resolve',
    todayBriefing: "Today's Operations Brief",
    briefingDesc: 'Morning shift handover completed. All systems operational.',
    briefingTime: '6:00 AM - Shift Start',
    incidents: {
      platform: 'Platform 2 - Minor delay due to technical check',
      escalator: 'Escalator maintenance in progress - Platform 1',
      announcement: 'PA system test scheduled at 2:00 PM'
    },
    stats: {
      trainsRunning: 'Trains Running',
      onTime: 'On Time',
      avgDelay: 'Avg Delay',
      totalPassengers: 'Total Passengers Today',
      peakHour: 'Peak Hour Flow',
      currentOccupancy: 'Current Occupancy'
    }
  },
  ml: {
    title: 'സ്റ്റേഷൻ കൺട്രോൾ ഡാഷ്ബോർഡ്',
    subtitle: 'ദൈനംദിന പ്രവർത്തനങ്ങളും സംഭവ നിയന്ത്രണവും',
    dailyBriefing: 'ദൈനംദിന വിവരണം',
    incidentAlerts: 'സജീവ സംഭവങ്ങൾ',
    trainStatus: 'ട്രെയിൻ നില',
    passengerFlow: 'യാത്രക്കാരുടെ ഒഴുക്ക്',
    systemStatus: 'സിസ്റ്റം നില',
    viewDetails: 'വിശദാംശങ്ങൾ കാണുക',
    acknowledge: 'അംഗീകരിക്കുക',
    resolve: 'പരിഹരിക്കുക',
    todayBriefing: 'ഇന്നത്തെ പ്രവർത്തന വിവരണം',
    briefingDesc: 'പ്രഭാത ഷിഫ്റ്റ് കൈമാറ്റം പൂർത്തിയായി. എല്ലാ സിസ്റ്റങ്ങളും പ്രവർത്തനക്ഷമം.',
    briefingTime: '6:00 AM - ഷിഫ്റ്റ് ആരംഭം',
    incidents: {
      platform: 'പ്ലാറ്റ്ഫോം 2 - സാങ്കേതിക പരിശോധന കാരണം ചെറിയ കാലതാമസം',
      escalator: 'എസ്കലേറ്റർ പരിപാലനം നടന്നുകൊണ്ടിരിക്കുന്നു - പ്ലാറ്റ്ഫോം 1',
      announcement: 'PA സിസ്റ്റം ടെസ്റ്റ് 2:00 PM-ന് ഷെഡ്യൂൾ ചെയ്തിട്ടുണ്ട്'
    },
    stats: {
      trainsRunning: 'പ്രവർത്തിക്കുന്ന ട്രെയിനുകൾ',
      onTime: 'സമയത്ത്',
      avgDelay: 'ശരാശരി കാലതാമസം',
      totalPassengers: 'ഇന്ന് മൊത്തം യാത്രക്കാർ',
      peakHour: 'പീക്ക് അവർ ഫ്ലോ',
      currentOccupancy: 'നിലവിലെ ഉൾക്കൊള്ളൽ'
    }
  }
};

export function StationControllerDashboard({ language }: StationControllerDashboardProps) {
  const t = translations[language];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">{t.title}</h1>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </div>

      {/* Daily Briefing */}
      <RoleCard
        title={t.dailyBriefing}
        description={t.briefingTime}
        variant="operations"
        priority="high"
      >
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">{t.todayBriefing}</h3>
            <p className="text-muted-foreground text-sm">{t.briefingDesc}</p>
          </div>
          
          <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-800">All systems operational - No critical issues</span>
          </div>
          
          <div className="flex gap-2">
            <Button size="sm" className="gap-2">
              <Eye className="h-4 w-4" />
              {t.viewDetails}
            </Button>
            <Button size="sm" variant="outline" className="gap-2">
              <RadioIcon className="h-4 w-4" />
              Communications
            </Button>
          </div>
        </div>
      </RoleCard>

      {/* Incident Alerts */}
      <RoleCard
        title={t.incidentAlerts}
        description="Real-time incident monitoring and response"
        variant="safety"
        priority="high"
      >
        <div className="space-y-4">
          <Alert className="border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertTitle className="text-orange-800">Platform Issue</AlertTitle>
            <AlertDescription className="text-orange-700">
              {t.incidents.platform}
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="outline" className="h-8">
                  {t.acknowledge}
                </Button>
                <Button size="sm" className="h-8 bg-orange-600 hover:bg-orange-700">
                  {t.resolve}
                </Button>
              </div>
            </AlertDescription>
          </Alert>

          <Alert className="border-blue-200 bg-blue-50">
            <Activity className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-blue-800">Maintenance</AlertTitle>
            <AlertDescription className="text-blue-700">
              {t.incidents.escalator}
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="outline" className="h-8">
                  {t.viewDetails}
                </Button>
              </div>
            </AlertDescription>
          </Alert>

          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Scheduled Activity</AlertTitle>
            <AlertDescription className="text-green-700">
              {t.incidents.announcement}
            </AlertDescription>
          </Alert>
        </div>
      </RoleCard>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          title={t.stats.trainsRunning}
          value="12/14"
          change={{
            value: "92% on-time",
            trend: "up",
            period: t.stats.onTime
          }}
          icon={<Train className="h-4 w-4" />}
          variant="operations"
        />

        <MetricCard
          title={t.stats.avgDelay}
          value="2.5 min"
          change={{
            value: "-0.7 min",
            trend: "down",
            period: "vs yesterday"
          }}
          icon={<Clock className="h-4 w-4" />}
          variant="performance"
        />

        <MetricCard
          title={t.stats.totalPassengers}
          value="28,431"
          change={{
            value: "+8.2%",
            trend: "up",
            period: "vs last week"
          }}
          icon={<Users className="h-4 w-4" />}
          variant="operations"
        />

        <MetricCard
          title="Safety Score"
          value="98.5%"
          change={{
            value: "Excellent",
            trend: "stable",
            period: "47 days incident-free"
          }}
          icon={<Shield className="h-4 w-4" />}
          variant="safety"
        />

        <MetricCard
          title="System Health"
          value="All Good"
          change={{
            value: "14/14 systems",
            trend: "up",
            period: "operational"
          }}
          icon={<Activity className="h-4 w-4" />}
          variant="maintenance"
        />

        <MetricCard
          title="Communications"
          value="Active"
          change={{
            value: "3 channels",
            trend: "stable",
            period: "monitoring"
          }}
          icon={<RadioIcon className="h-4 w-4" />}
          variant="operations"
        />
      </div>
    </div>
  );
}