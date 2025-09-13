import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { RoleCard } from '../cards/RoleCard';
import { MetricCard } from '../cards/MetricCard';
import { FileUploadSummary } from '../FileUploadSummary';
import {
  Train,
  Users,
  DollarSign,
  Shield,
  Wrench,
  TrendingUp,
  TrendingDown,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Download,
  Settings
} from 'lucide-react';

interface EnhancedOperationsDashboardProps {
  language: 'en' | 'ml';
}

const translations = {
  en: {
    title: 'Enhanced Operations Dashboard',
    subtitle: 'Real-time operational insights with status-based visual indicators',
    complianceTracker: 'Compliance Tracker',
    dailyOverview: 'Daily Operational Overview',
    crossDepartment: 'Cross-Department Insights',
    documentAnalysis: 'Document Analysis',
    operations: 'Operations',
    safety: 'Safety & Security',
    finance: 'Finance',
    hr: 'Human Resources',
    maintenance: 'Maintenance',
    viewDetails: 'View Details',
    downloadReport: 'Download Report',
    configure: 'Configure'
  },
  ml: {
    title: 'വിപുലീകൃത പ്രവർത്തന ഡാഷ്ബോർഡ്',
    subtitle: 'സ്റ്റാറ്റസ് അധിഷ്ഠിത വിഷ്വൽ സൂചകങ്ങളുള്ള റിയൽ-ടൈം പ്രവർത്തന ഇൻസൈറ്റുകൾ',
    complianceTracker: 'കംപ്ലയൻസ് ട്രാക്കർ',
    dailyOverview: 'ദൈനംദിന പ്രവർത്തന അവലോകനം',
    crossDepartment: 'ക്രോസ്-ഡിപ്പാർട്ട്മെന്റ് ഇൻസൈറ്റുകൾ',
    documentAnalysis: 'ഡോക്യുമെന്റ് വിശകലനം',
    operations: 'പ്രവർത്തനങ്ങൾ',
    safety: 'സുരക്ഷ & സുരക്ഷാ',
    finance: 'ധനകാര്യം',
    hr: 'മാനവ വിഭവങ്ങൾ',
    maintenance: 'പരിപാലനം',
    viewDetails: 'വിശദാംശങ്ങൾ കാണുക',
    downloadReport: 'റിപ്പോർട്ട് ഡൗൺലോഡ് ചെയ്യുക',
    configure: 'കോൺഫിഗർ ചെയ്യുക'
  }
};

export function EnhancedOperationsDashboard({ language }: EnhancedOperationsDashboardProps) {
  const t = translations[language];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{t.title}</h1>
        <p className="text-muted-foreground" style={{ color: 'var(--text-secondary)' }}>{t.subtitle}</p>
      </div>

      {/* Compliance Tracker Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>{t.complianceTracker}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Operations Card */}
          <RoleCard
            title={t.operations}
            description="All train services operating normally. 98.5% on-time performance achieved today."
            variant="operations"
            status="good"
            priority="low"
            lastUpdated="5 mins ago"
            trend="stable"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">22</div>
                  <div className="text-xs text-muted-foreground">Trains Running</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">98.5%</div>
                  <div className="text-xs text-muted-foreground">On-Time Performance</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">94</div>
                  <div className="text-xs text-muted-foreground">Passenger Satisfaction</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="gap-2">
                  <Eye className="h-4 w-4" />
                  {t.viewDetails}
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  {t.downloadReport}
                </Button>
              </div>
            </div>
          </RoleCard>

          {/* Safety & Security Card */}
          <RoleCard
            title={t.safety}
            description="Zero safety incidents reported. All security systems operational."
            variant="safety"
            status="excellent"
            priority="low"
            lastUpdated="10 mins ago"
            trend="stable"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">0</div>
                  <div className="text-xs text-muted-foreground">Incidents Today</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">2</div>
                  <div className="text-xs text-muted-foreground">Security Alerts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">100</div>
                  <div className="text-xs text-muted-foreground">Compliance Score</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="gap-2">
                  <Eye className="h-4 w-4" />
                  {t.viewDetails}
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                  <Settings className="h-4 w-4" />
                  {t.configure}
                </Button>
              </div>
            </div>
          </RoleCard>
        </div>
      </div>

      {/* Daily Operational Overview Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>{t.dailyOverview}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Finance Card */}
          <RoleCard
            title={t.finance}
            description="Revenue tracking 5% above target. Operating costs within budget."
            variant="finance"
            status="good"
            priority="medium"
            lastUpdated="15 mins ago"
            trend="up"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">₹28.5L</div>
                  <div className="text-xs text-muted-foreground">Revenue Today</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">87%</div>
                  <div className="text-xs text-muted-foreground">Budget Utilization</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">92</div>
                  <div className="text-xs text-muted-foreground">Cost Efficiency</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Budget Performance</span>
                  <span className="text-green-600">+5%</span>
                </div>
                <Progress value={87} className="h-2" />
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="gap-2">
                  <TrendingUp className="h-4 w-4" />
                  View Analytics
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  {t.downloadReport}
                </Button>
              </div>
            </div>
          </RoleCard>

          {/* Human Resources Card */}
          <RoleCard
            title={t.hr}
            description="Staff attendance 92%. 3 training sessions overdue."
            variant="hr"
            status="needs_attention"
            priority="high"
            lastUpdated="20 mins ago"
            trend="down"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-600">92%</div>
                  <div className="text-xs text-muted-foreground">Staff Attendance</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">78%</div>
                  <div className="text-xs text-muted-foreground">Training Compliance</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">8%</div>
                  <div className="text-xs text-muted-foreground">Vacancy Rate</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Training Completion</span>
                  <span className="text-orange-600">3 Overdue</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="gap-2 bg-amber-600 hover:bg-amber-700">
                  <AlertTriangle className="h-4 w-4" />
                  Address Issues
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                  <Users className="h-4 w-4" />
                  View Staff
                </Button>
              </div>
            </div>
          </RoleCard>
        </div>
      </div>

      {/* Document Analysis Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>{t.documentAnalysis}</h2>
        <FileUploadSummary language={language} />
      </div>

      {/* Cross-Department Insights Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>{t.crossDepartment}</h2>
        <div className="grid grid-cols-1 gap-6">
          {/* Maintenance Card */}
          <RoleCard
            title={t.maintenance}
            description="Scheduled maintenance on track. Equipment availability 96%."
            variant="maintenance"
            status="good"
            priority="medium"
            lastUpdated="12 mins ago"
            trend="stable"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">96%</div>
                  <div className="text-xs text-muted-foreground">Equipment Availability</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">85%</div>
                  <div className="text-xs text-muted-foreground">Planned Maintenance</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">1</div>
                  <div className="text-xs text-muted-foreground">Breakdown Incidents</div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Equipment Health</span>
                    <span className="text-green-600">96%</span>
                  </div>
                  <Progress value={96} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Maintenance Schedule</span>
                    <span className="text-blue-600">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="gap-2">
                  <Wrench className="h-4 w-4" />
                  View Schedule
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                  <Activity className="h-4 w-4" />
                  Equipment Status
                </Button>
              </div>
            </div>
          </RoleCard>
        </div>
      </div>
    </div>
  );
}
