import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users,
  ShieldCheck,
  DollarSign,
  Train,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Download,
  RefreshCw,
  Filter,
  Eye,
  Calendar,
  Building2,
  Activity,
  Zap
} from 'lucide-react';

interface DocumentExecutiveDashboardProps {
  language: 'en' | 'ml';
}

const translations = {
  en: {
    title: 'Executive Dashboard',
    subtitle: 'Strategic Overview & Performance Intelligence',
    
    // Main sections
    executiveBriefs: 'One-Minute Executive Briefs',
    complianceTracker: 'Compliance Tracker',
    operationalOverview: 'Daily Operational Overview',
    crossDepartmentInsights: 'Cross-Department Insights',
    
    // Brief categories
    operations: 'Operations',
    safety: 'Safety & Security',
    finance: 'Finance',
    hr: 'Human Resources',
    maintenance: 'Maintenance',
    
    // Compliance indicators
    compliant: 'Compliant',
    warning: 'Warning', 
    nonCompliant: 'Non-Compliant',
    
    // Operational metrics
    trainAvailability: 'Train Availability',
    passengerCount: 'Daily Passengers',
    incidentCount: 'Incidents Reported',
    revenueToday: 'Revenue Today',
    onTimePerformance: 'On-Time Performance',
    
    // Financial metrics
    totalRevenue: 'Total Revenue',
    operatingCosts: 'Operating Costs',
    netIncome: 'Net Income',
    budgetUtilization: 'Budget Utilization',
    
    // Cross-department insights
    hrSafetyOverlap: 'HR & Safety Overlap',
    maintenanceOperations: 'Maintenance & Operations',
    financeCompliance: 'Finance & Compliance',
    
    // Status indicators
    excellent: 'Excellent',
    good: 'Good',
    needs_attention: 'Needs Attention',
    critical: 'Critical',
    
    // Actions
    downloadDailyReport: 'Download Daily Report',
    viewDetails: 'View Details',
    drillDown: 'Drill Down',
    generateReport: 'Generate Report',
    
    // Time periods
    today: 'Today',
    thisWeek: 'This Week',
    thisMonth: 'This Month',
    thisQuarter: 'This Quarter',
    
    // Actions
    refresh: 'Refresh',
    filter: 'Filter',
    export: 'Export Data',
    
    // Currency and units
    currency: '₹',
    passengers: 'passengers',
    trains: 'trains',
    percent: '%'
  },
  ml: {
    title: 'എക്സിക്യൂട്ടീവ് ഡാഷ്ബോർഡ്',
    subtitle: 'തന്ത്രപരമായ അവലോകനവും പ്രകടന ഇന്റലിജൻസും',
    
    // Main sections
    executiveBriefs: 'ഒരു മിനിറ്റ് എക്സിക്യൂട്ടീവ് ബ്രീഫുകൾ',
    complianceTracker: 'കംപ്ലയൻസ് ട്രാക്കർ',
    operationalOverview: 'ദൈനംദിന പ്രവർത്തന അവലോകനം',
    crossDepartmentInsights: 'ക്രോസ്-ഡിപ്പാർട്ട്മെന്റ് ഇൻസൈറ്റുകൾ',
    
    // Brief categories
    operations: 'പ്രവർത്തനങ്ങൾ',
    safety: 'സുരക്ഷയും സെക്യൂരിറ്റിയും',
    finance: 'ധനകാര്യം',
    hr: 'ഹ്യൂമൻ റിസോഴ്സ്',
    maintenance: 'പരിപാലനം',
    
    // Compliance indicators
    compliant: 'അനുസരണയുള്ള',
    warning: 'മുന്നറിയിപ്പ്',
    nonCompliant: 'അനുസരണയില്ലാത്ത',
    
    // Operational metrics
    trainAvailability: 'ട്രെയിൻ ലഭ്യത', 
    passengerCount: 'ദൈനംദിന യാത്രക്കാർ',
    incidentCount: 'റിപ്പോർട്ട് ചെയ്ത സംഭവങ്ങൾ',
    revenueToday: 'ഇന്നത്തെ വരുമാനം',
    onTimePerformance: 'സമയനിഷ്ഠ പ്രകടനം',
    
    // Financial metrics
    totalRevenue: 'മൊത്തം വരുമാനം',
    operatingCosts: 'പ്രവർത്തന ചെലവുകൾ',
    netIncome: 'അറ്റവരുമാനം',
    budgetUtilization: 'ബജറ്റ് ഉപയോഗം',
    
    // Cross-department insights
    hrSafetyOverlap: 'എച്ച്ആർ & സേഫ്റ്റി ഓവർലാപ്പ്',
    maintenanceOperations: 'മെയിന്റനൻസ് & ഓപ്പറേഷൻസ്',
    financeCompliance: 'ഫിനാൻസ് & കംപ്ലയൻസ്',
    
    // Status indicators
    excellent: 'മികച്ചത്',
    good: 'നല്ലത്',
    needs_attention: 'ശ്രദ്ധ ആവശ്യം',
    critical: 'നിർണായകം',
    
    // Actions
    downloadDailyReport: 'ദൈനംദിന റിപ്പോർട്ട് ഡൗൺലോഡ് ചെയ്യുക',
    viewDetails: 'വിശദാംശങ്ങൾ കാണുക',
    drillDown: 'ഡ്രിൽ ഡൗൺ',
    generateReport: 'റിപ്പോർട്ട് ജനറേറ്റ് ചെയ്യുക',
    
    // Time periods
    today: 'ഇന്ന്',
    thisWeek: 'ഈ ആഴ്ച',
    thisMonth: 'ഈ മാസം', 
    thisQuarter: 'ഈ ക്വാർട്ടർ',
    
    // Actions
    refresh: 'പുതുക്കുക',
    filter: 'ഫിൽട്ടർ',
    export: 'ഡാറ്റ എക്സ്പോർട്ട് ചെയ്യുക',
    
    // Currency and units
    currency: '₹',
    passengers: 'യാത്രക്കാർ',
    trains: 'ട്രെയിനുകൾ',
    percent: '%'
  }
};

// Mock data
const mockExecutiveBriefs = [
  {
    id: 'operations',
    title: 'Operations',
    status: 'good',
    summary: 'All train services operating normally. 98.5% on-time performance achieved today.',
    keyMetrics: {
      trainsRunning: 22,
      onTimePerformance: 98.5,
      passengersSatisfaction: 94
    },
    trend: 'up',
    lastUpdated: '5 mins ago'
  },
  {
    id: 'safety',
    title: 'Safety & Security',
    status: 'excellent',
    summary: 'Zero safety incidents reported. All security systems operational.',
    keyMetrics: {
      incidentsToday: 0,
      securityAlerts: 2,
      complianceScore: 100
    },
    trend: 'stable',
    lastUpdated: '10 mins ago'
  },
  {
    id: 'finance',
    title: 'Finance',
    status: 'good',
    summary: 'Revenue tracking 5% above target. Operating costs within budget.',
    keyMetrics: {
      revenueToday: 2850000,
      budgetUtilization: 87,
      costEfficiency: 92
    },
    trend: 'up',
    lastUpdated: '15 mins ago'
  },
  {
    id: 'hr',
    title: 'Human Resources',
    status: 'needs_attention',
    summary: 'Staff attendance 92%. 3 training sessions overdue.',
    keyMetrics: {
      staffAttendance: 92,
      trainingCompliance: 78,
      vacancyRate: 8
    },
    trend: 'down',
    lastUpdated: '20 mins ago'
  },
  {
    id: 'maintenance',
    title: 'Maintenance',
    status: 'good',
    summary: 'Scheduled maintenance on track. Equipment availability 96%.',
    keyMetrics: {
      equipmentAvailability: 96,
      plannedMaintenance: 85,
      breakdownIncidents: 1
    },
    trend: 'up',
    lastUpdated: '12 mins ago'
  }
];

const mockComplianceData = [
  {
    category: 'Safety Regulations',
    score: 95,
    status: 'compliant',
    lastAudit: '2024-01-10',
    nextReview: '2024-04-10'
  },
  {
    category: 'Environmental Standards',
    score: 88,
    status: 'warning',
    lastAudit: '2023-12-15',
    nextReview: '2024-03-15'
  },
  {
    category: 'Financial Compliance',
    score: 98,
    status: 'compliant',
    lastAudit: '2024-01-05',
    nextReview: '2024-07-05'
  },
  {
    category: 'HR Policies',
    score: 85,
    status: 'warning',
    lastAudit: '2023-11-20',
    nextReview: '2024-02-20'
  }
];

const mockOperationalMetrics = {
  trainAvailability: 95.7,
  passengerCount: 45230,
  incidentCount: 2,
  revenueToday: 2850000,
  onTimePerformance: 98.5
};

const mockCrossDepartmentInsights = [
  {
    id: 'hr-safety',
    title: 'HR & Safety Training Correlation',
    insight: 'Departments with higher training completion rates show 40% fewer safety incidents.',
    impact: 'high',
    recommendation: 'Prioritize safety training in underperforming departments.',
    departments: ['HR', 'Safety']
  },
  {
    id: 'maintenance-operations',
    title: 'Predictive Maintenance Impact',
    insight: 'Proactive maintenance reduced unplanned downtime by 35% this quarter.',
    impact: 'high',
    recommendation: 'Expand predictive maintenance to additional equipment.',
    departments: ['Maintenance', 'Operations']
  },
  {
    id: 'finance-compliance',
    title: 'Compliance Cost Efficiency',
    insight: 'Automated compliance tracking reduced audit costs by 25%.',
    impact: 'medium',
    recommendation: 'Implement automated tracking for additional compliance areas.',
    departments: ['Finance', 'Compliance']
  }
];

export function DocumentExecutiveDashboard({ language }: DocumentExecutiveDashboardProps) {
  const [selectedTab, setSelectedTab] = useState('briefs');
  const t = translations[language];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-status-success bg-status-success-light border-status-success';
      case 'good': return 'text-status-success bg-status-success-light border-status-success';
      case 'needs_attention': return 'text-priority-medium bg-priority-medium-light border-priority-medium';
      case 'critical': return 'text-priority-high bg-priority-high-light border-priority-high';
      default: return 'text-grey bg-grey-light border-grey';
    }
  };

  const getComplianceColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'text-status-success bg-status-success-light border-status-success';
      case 'warning': return 'text-priority-medium bg-priority-medium-light border-priority-medium';
      case 'nonCompliant': return 'text-priority-high bg-priority-high-light border-priority-high';
      default: return 'text-grey bg-grey-light border-grey';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-status-success" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-priority-high" />;
      case 'stable': return <Activity className="h-4 w-4 text-grey" />;
      default: return <Activity className="h-4 w-4 text-grey" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-priority-high text-white';
      case 'medium': return 'bg-priority-medium text-white';
      case 'low': return 'bg-priority-low text-white';
      default: return 'bg-grey text-white';
    }
  };

  const formatCurrency = (amount: number) => {
    return `${t.currency}${(amount / 100000).toFixed(1)}L`;
  };

  const formatNumber = (num: number) => {
    if (num >= 100000) return `${(num / 100000).toFixed(1)}L`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>{t.title}</h1>
          <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>{t.subtitle}</p>
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
          <Button className="gap-2" style={{ backgroundColor: 'var(--primary-color)' }}>
            <Download className="h-4 w-4" />
            {t.downloadDailyReport}
          </Button>
        </div>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white border" style={{ borderColor: 'var(--border-color)' }}>
          <TabsTrigger value="briefs" className="data-[state=active]:text-white" style={{ backgroundColor: 'var(--primary-color)' }}>
            {t.executiveBriefs}
          </TabsTrigger>
          <TabsTrigger value="compliance" className="data-[state=active]:text-white" style={{ backgroundColor: 'var(--primary-color)' }}>
            {t.complianceTracker}
          </TabsTrigger>
          <TabsTrigger value="operations" className="data-[state=active]:text-white" style={{ backgroundColor: 'var(--primary-color)' }}>
            {t.operationalOverview}
          </TabsTrigger>
          <TabsTrigger value="insights" className="data-[state=active]:text-white" style={{ backgroundColor: 'var(--primary-color)' }}>
            {t.crossDepartmentInsights}
          </TabsTrigger>
        </TabsList>

        {/* Executive Briefs Tab */}
        <TabsContent value="briefs" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {mockExecutiveBriefs.map((brief) => {
              // Get appropriate icon for each brief category
              const getBriefIcon = (briefId: string) => {
                switch (briefId) {
                  case 'operations': return Train;
                  case 'safety': return ShieldCheck;
                  case 'finance': return DollarSign;
                  case 'hr': return Users;
                  case 'maintenance': return Zap;
                  default: return BarChart3;
                }
              };
              const BriefIcon = getBriefIcon(brief.id);
              
              return (
                <Card key={brief.id} className="hover:shadow-md transition-all border-l-4" style={{ borderLeftColor: 'var(--primary-color)' }}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <BriefIcon className="h-8 w-8" style={{ color: 'var(--primary-color)' }} />
                      <Badge variant="outline" className={getStatusColor(brief.status)}>
                        {t[brief.status as keyof typeof t]}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                      {t[brief.id as keyof typeof t]}
                    </h3>
                    <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                      {brief.summary}
                    </p>
                    
                    <div className="space-y-2 text-xs">
                      {Object.entries(brief.keyMetrics).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span style={{ color: 'var(--text-secondary)' }} className="capitalize">{key}:</span>
                          <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                            {typeof value === 'number' && value > 1000000 ? formatCurrency(value) :
                             typeof value === 'number' && value > 1000 ? formatNumber(value) :
                             typeof value === 'number' && key.includes('Performance') ? `${value}%` :
                             value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center text-xs pt-2 border-t mt-3">
                      <span style={{ color: 'var(--text-secondary)' }}>Updated {brief.lastUpdated}</span>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(brief.trend)}
                        <Button size="sm" variant="outline" className="h-6 px-2 text-xs">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Compliance Tracker Tab */}
        <TabsContent value="compliance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Compliance Overview */}
            <Card className="border-l-4" style={{ borderLeftColor: 'var(--primary-color)' }}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <ShieldCheck className="h-8 w-8" style={{ color: 'var(--primary-color)' }} />
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                    Overview
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
                  Compliance Overview
                </h3>
                <div className="space-y-4">
                  {mockComplianceData.map((item) => (
                    <div key={item.category}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{item.category}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{item.score}%</span>
                          <Badge variant="outline" className={getComplianceColor(item.status)}>
                            {t[item.status as keyof typeof t]}
                          </Badge>
                        </div>
                      </div>
                      <Progress value={item.score} className="h-2 mb-2" />
                      <div className="flex justify-between text-xs" style={{ color: 'var(--text-secondary)' }}>
                        <span>Last Audit: {item.lastAudit}</span>
                        <span>Next Review: {item.nextReview}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Compliance Status Cards */}
            <div className="space-y-4">
              <Card className="border-l-4" style={{ borderLeftColor: 'var(--success-color)' }}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CheckCircle className="h-8 w-8" style={{ color: 'var(--success-color)' }} />
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                      Compliant
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                    Compliant Areas
                  </h3>
                  <div className="text-3xl font-bold mb-2" style={{ color: 'var(--success-color)' }}>2</div>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    All safety and operational standards met
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4" style={{ borderLeftColor: 'var(--warning-color)' }}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <AlertTriangle className="h-8 w-8" style={{ color: 'var(--warning-color)' }} />
                    <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300">
                      Warning
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                    Warning Areas
                  </h3>
                  <div className="text-3xl font-bold mb-2" style={{ color: 'var(--warning-color)' }}>2</div>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    Requires attention within 30 days
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Operational Overview Tab */}
        <TabsContent value="operations" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card className="border-l-4" style={{ borderLeftColor: 'var(--primary-color)' }}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Train className="h-8 w-8" style={{ color: 'var(--primary-color)' }} />
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
                    Operational
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                  {t.trainAvailability}
                </h3>
                <div className="text-3xl font-bold mb-2" style={{ color: 'var(--primary-color)' }}>{mockOperationalMetrics.trainAvailability}%</div>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  All trains running on schedule
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4" style={{ borderLeftColor: 'var(--accent-color)' }}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Users className="h-8 w-8" style={{ color: 'var(--accent-color)' }} />
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
                    Passengers
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                  {t.passengerCount}
                </h3>
                <div className="text-3xl font-bold mb-2" style={{ color: 'var(--accent-color)' }}>{formatNumber(mockOperationalMetrics.passengerCount)}</div>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Daily passenger count
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4" style={{ borderLeftColor: 'var(--warning-color)' }}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <AlertTriangle className="h-8 w-8" style={{ color: 'var(--warning-color)' }} />
                  <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300">
                    Incidents
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                  {t.incidentCount}
                </h3>
                <div className="text-3xl font-bold mb-2" style={{ color: 'var(--warning-color)' }}>{mockOperationalMetrics.incidentCount}</div>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Minor incidents reported
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4" style={{ borderLeftColor: 'var(--success-color)' }}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <DollarSign className="h-8 w-8" style={{ color: 'var(--success-color)' }} />
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                    Revenue
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                  {t.revenueToday}
                </h3>
                <div className="text-3xl font-bold mb-2" style={{ color: 'var(--success-color)' }}>{formatCurrency(mockOperationalMetrics.revenueToday)}</div>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Today's revenue target met
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4" style={{ borderLeftColor: 'var(--primary-color)' }}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Clock className="h-8 w-8" style={{ color: 'var(--primary-color)' }} />
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
                    Performance
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                  {t.onTimePerformance}
                </h3>
                <div className="text-3xl font-bold mb-2" style={{ color: 'var(--primary-color)' }}>{mockOperationalMetrics.onTimePerformance}%</div>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Excellent on-time performance
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Performance Progress Bars */}
          <Card>
            <CardHeader>
              <CardTitle className="text-navy">Today's Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Train Availability</span>
                    <span>{mockOperationalMetrics.trainAvailability}%</span>
                  </div>
                  <Progress value={mockOperationalMetrics.trainAvailability} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>On-Time Performance</span>
                    <span>{mockOperationalMetrics.onTimePerformance}%</span>
                  </div>
                  <Progress value={mockOperationalMetrics.onTimePerformance} className="h-3" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cross-Department Insights Tab */}
        <TabsContent value="insights" className="space-y-4">
          <div className="space-y-4">
            {mockCrossDepartmentInsights.map((insight) => (
              <Card key={insight.id} className="hover:shadow-md transition-all border-l-4 border-l-teal">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getImpactColor(insight.impact)}>
                          {insight.impact.toUpperCase()} IMPACT
                        </Badge>
                        <div className="flex gap-1">
                          {insight.departments.map((dept) => (
                            <Badge key={dept} variant="outline">{dept}</Badge>
                          ))}
                        </div>
                      </div>
                      <CardTitle className="text-lg text-navy">{insight.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-navy font-medium">{insight.insight}</p>
                  <div className="bg-teal-light p-3 rounded-lg">
                    <p className="text-sm text-navy">
                      <strong>Recommendation:</strong> {insight.recommendation}
                    </p>
                  </div>

                  <div className="flex gap-2 pt-2 border-t">
                    <Button size="sm" variant="outline" className="flex-1">
                      {t.viewDetails}
                    </Button>
                    <Button size="sm" className="flex-1 bg-teal hover:bg-teal/90">
                      {t.drillDown}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}