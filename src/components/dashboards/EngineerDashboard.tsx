import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { RoleCard } from '../cards/RoleCard';
import { MetricCard } from '../cards/MetricCard';
import { 
  Wrench, 
  Server, 
  Thermometer, 
  Zap, 
  Eye,
  Download,
  Settings,
  AlertCircle,
  CheckCircle,
  Activity,
  Gauge,
  Wifi
} from 'lucide-react';

interface EngineerDashboardProps {
  language: 'en' | 'ml';
}

const translations = {
  en: {
    title: 'Engineering Dashboard',
    subtitle: 'System monitoring and IoT data management',
    systemSnapshot: 'System Snapshot',
    operationalLogs: 'Operational Logs',
    iotSensors: 'IoT Sensor Data',
    maintenanceAlerts: 'Maintenance Alerts',
    viewLogs: 'View Logs',
    downloadReport: 'Download Report',
    configure: 'Configure',
    systems: {
      power: 'Power Systems',
      signaling: 'Signaling',
      doors: 'Door Systems',
      hvac: 'HVAC Systems',
      emergency: 'Emergency Systems'
    },
    sensors: {
      temperature: 'Temperature',
      humidity: 'Humidity',
      vibration: 'Vibration',
      power: 'Power Consumption'
    },
    logs: {
      recent: 'Recent System Events',
      door: 'Door cycle completed - Car 3, Train KMR-105',
      signal: 'Signal change detected - Junction A2',
      maintenance: 'Routine check completed - Platform 1 escalator'
    },
    alerts: {
      power: 'Power fluctuation detected in Sector 3',
      temperature: 'HVAC temperature above optimal range - Car 7',
      maintenance: 'Scheduled brake inspection due for Train KMR-102'
    }
  },
  ml: {
    title: 'എഞ്ചിനീയറിംഗ് ഡാഷ്ബോർഡ്',
    subtitle: 'സിസ്റ്റം നിരീക്ഷണവും IoT ഡാറ്റ മാനേജ്മെന്റും',
    systemSnapshot: 'സിസ്റ്റം സ്നാപ്പ്ഷോട്ട്',
    operationalLogs: 'പ്രവർത്തന ലോഗുകൾ',
    iotSensors: 'IoT സെൻസർ ഡാറ്റ',
    maintenanceAlerts: 'പരിപാലന മുന്നറിയിപ്പുകൾ',
    viewLogs: 'ലോഗുകൾ കാണുക',
    downloadReport: 'റിപ്പോർട്ട് ഡൗൺലോഡ് ചെയ്യുക',
    configure: 'കോൺഫിഗർ ചെയ്യുക',
    systems: {
      power: 'പവർ സിസ്റ്റങ്ങൾ',
      signaling: 'സിഗ്നലിംഗ്',
      doors: 'ഡോർ സിസ്റ്റങ്ങൾ',
      hvac: 'HVAC സിസ്റ്റങ്ങൾ',
      emergency: 'എമർജൻസി സിസ്റ്റങ്ങൾ'
    },
    sensors: {
      temperature: 'താപനില',
      humidity: 'ആർദ്രത',
      vibration: 'വൈബ്രേഷൻ',
      power: 'വൈദ്യുതി ഉപഭോഗം'
    },
    logs: {
      recent: 'പുതിയ സിസ്റ്റം ഇവന്റുകൾ',
      door: 'ഡോർ സൈക്കിൾ പൂർത്തിയായി - കാർ 3, ട്രെയിൻ KMR-105',
      signal: 'സിഗ്നൽ മാറ്റം കണ്ടെത്തി - ജംഗ്ഷൻ A2',
      maintenance: 'റൂട്ടിൻ പരിശോധന പൂർത്തിയായി - പ്ലാറ്റ്ഫോം 1 എസ്കലേറ്റർ'
    },
    alerts: {
      power: 'സെക്ടർ 3-ൽ പവർ ഫ്ലക്ച്വേഷൻ കണ്ടെത്തി',
      temperature: 'HVAC താപനില ഒപ്റ്റിമൽ റേഞ്ചിന് മുകളിൽ - കാർ 7',
      maintenance: 'ട്രെയിൻ KMR-102-ന് ഷെഡ്യൂൾ ചെയ്ത ബ്രേക്ക് പരിശോധന'
    }
  }
};

export function EngineerDashboard({ language }: EngineerDashboardProps) {
  const t = translations[language];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">{t.title}</h1>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </div>

      {/* System Snapshot */}
      <RoleCard
        title={t.systemSnapshot}
        description="Real-time system health monitoring"
        variant="maintenance"
        priority="high"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <MetricCard
            title={t.systems.power}
            value="Operational"
            change={{
              value: "850 kW",
              trend: "stable",
              period: "current load"
            }}
            icon={<Zap className="h-4 w-4" />}
            variant="operations"
          />

          <MetricCard
            title={t.systems.signaling}
            value="Operational"
            change={{
              value: "All clear",
              trend: "stable",
              period: "no delays"
            }}
            icon={<Activity className="h-4 w-4" />}
            variant="operations"
          />

          <MetricCard
            title={t.systems.doors}
            value="Operational"
            change={{
              value: "4,523 cycles",
              trend: "stable",
              period: "today"
            }}
            icon={<Settings className="h-4 w-4" />}
            variant="operations"
          />

          <MetricCard
            title={t.systems.hvac}
            value="Warning"
            change={{
              value: "28°C",
              trend: "up",
              period: "above optimal"
            }}
            icon={<Thermometer className="h-4 w-4" />}
            variant="maintenance"
          />

          <MetricCard
            title={t.systems.emergency}
            value="Operational"
            change={{
              value: "All systems",
              trend: "stable",
              period: "ready"
            }}
            icon={<Server className="h-4 w-4" />}
            variant="safety"
          />
        </div>
      </RoleCard>

      {/* IoT Sensor Data */}
      <RoleCard
        title={t.iotSensors}
        description="Live sensor data from across the network"
        variant="performance"
        priority="medium"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t.sensors.temperature}</span>
              <span className="text-lg font-bold">24°C</span>
            </div>
            <Progress value={60} className="h-3" />
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <p className="text-xs text-muted-foreground">Platform Average - Normal</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t.sensors.humidity}</span>
              <span className="text-lg font-bold">45%</span>
            </div>
            <Progress value={45} className="h-3" />
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <p className="text-xs text-muted-foreground">Within Optimal Range</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t.sensors.vibration}</span>
              <span className="text-lg font-bold">0.2g</span>
            </div>
            <Progress value={20} className="h-3" />
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <p className="text-xs text-muted-foreground">Track Sensors - Low</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t.sensors.power}</span>
              <span className="text-lg font-bold">850 kW</span>
            </div>
            <Progress value={75} className="h-3" />
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
              <p className="text-xs text-muted-foreground">75% Load - High</p>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2 mt-6 pt-4 border-t">
          <Button size="sm" variant="outline" className="gap-2">
            <Gauge className="h-4 w-4" />
            Live Dashboard
          </Button>
          <Button size="sm" variant="outline" className="gap-2">
            <Wifi className="h-4 w-4" />
            Network Status
          </Button>
        </div>
      </RoleCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Operational Logs */}
        <RoleCard
          title={t.operationalLogs}
          description={t.logs.recent}
          variant="operations"
          priority="medium"
        >
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">{t.logs.door}</p>
                <p className="text-xs text-muted-foreground">2 minutes ago</p>
              </div>
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                Success
              </Badge>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <Activity className="h-4 w-4 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">{t.logs.signal}</p>
                <p className="text-xs text-muted-foreground">5 minutes ago</p>
              </div>
              <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
                Info
              </Badge>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
              <Wrench className="h-4 w-4 text-orange-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">{t.logs.maintenance}</p>
                <p className="text-xs text-muted-foreground">15 minutes ago</p>
              </div>
              <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300">
                Maintenance
              </Badge>
            </div>
          </div>
          
          <div className="flex gap-2 mt-4 pt-4 border-t">
            <Button size="sm" variant="outline" className="gap-2">
              <Eye className="h-4 w-4" />
              {t.viewLogs}
            </Button>
            <Button size="sm" variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              {t.downloadReport}
            </Button>
          </div>
        </RoleCard>

        {/* Maintenance Alerts */}
        <RoleCard
          title={t.maintenanceAlerts}
          description="Priority maintenance tasks and system alerts"
          variant="maintenance"
          priority="high"
        >
          <div className="space-y-4">
            <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-800">{t.alerts.power}</p>
                  <p className="text-xs text-orange-600 mt-1">Priority: Medium</p>
                </div>
                <Badge className="bg-orange-500 text-white">Medium</Badge>
              </div>
            </div>
            
            <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-red-800">{t.alerts.temperature}</p>
                  <p className="text-xs text-red-600 mt-1">Priority: High</p>
                </div>
                <Badge className="bg-red-500 text-white">High</Badge>
              </div>
            </div>
            
            <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-800">{t.alerts.maintenance}</p>
                  <p className="text-xs text-blue-600 mt-1">Priority: Low</p>
                </div>
                <Badge className="bg-blue-500 text-white">Low</Badge>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 mt-4 pt-4 border-t">
            <Button size="sm" className="gap-2">
              <Settings className="h-4 w-4" />
              {t.configure}
            </Button>
            <Button size="sm" variant="outline" className="gap-2">
              <AlertCircle className="h-4 w-4" />
              Create Alert
            </Button>
          </div>
        </RoleCard>
      </div>
    </div>
  );
}