import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users, 
  Train, 
  DollarSign,
  ShieldCheck,
  Clock,
  AlertTriangle,
  CheckCircle,
  FileText,
  Download,
  Eye
} from 'lucide-react';
import { Progress } from '../ui/progress';

interface ExecutiveDashboardProps {
  language: 'en' | 'ml';
}

const translations = {
  en: {
    title: 'Executive Dashboard',
    subtitle: 'Strategic overview and performance monitoring',
    kpiOverview: 'Key Performance Indicators',
    complianceStatus: 'Compliance Status',
    performanceMetrics: 'Performance Metrics',
    financialSummary: 'Financial Summary',
    viewReport: 'View Report',
    downloadReport: 'Download Report',
    drillDown: 'Drill Down',
    kpis: {
      ridership: 'Daily Ridership',
      revenue: 'Monthly Revenue',
      onTime: 'On-Time Performance',
      satisfaction: 'Customer Satisfaction',
      efficiency: 'Operational Efficiency',
      safety: 'Safety Record'
    },
    compliance: {
      safety: 'Safety Compliance',
      environmental: 'Environmental Standards',
      operational: 'Operational Guidelines',
      financial: 'Financial Regulations'
    },
    metrics: {
      passengerGrowth: 'Passenger Growth',
      revenueGrowth: 'Revenue Growth',
      costEfficiency: 'Cost Efficiency',
      assetUtilization: 'Asset Utilization'
    },
    trends: {
      up: 'Up from last month',
      down: 'Down from last month',
      stable: 'Stable from last month'
    },
    financials: {
      totalRevenue: 'Total Revenue',
      operatingCost: 'Operating Cost',
      netIncome: 'Net Income',
      budgetVariance: 'Budget Variance'
    }
  },
  ml: {
    title: 'എക്സിക്യൂട്ടീവ് ഡാഷ്ബോർഡ്',
    subtitle: 'തന്ത്രപരമായ അവലോകനവും പ്രകടന നിരീക്ഷണവും',
    kpiOverview: 'പ്രധാന പ്രകടന സൂചകങ്ങൾ',
    complianceStatus: 'കംപ്ലയൻസ് സ്ഥിതി',
    performanceMetrics: 'പ്രകടന മെട്രിക്സ്',
    financialSummary: 'സാമ്പത്തിക സംഗ്രഹം',
    viewReport: 'റിപ്പോർട്ട് കാണുക',
    downloadReport: 'റിപ്പോർട്ട് ഡൗൺലോഡ്',
    drillDown: 'വിശദമായി കാണുക',
    kpis: {
      ridership: 'ദൈനംദിന യാത്രക്കാർ',
      revenue: 'മാസിക വരുമാനം',
      onTime: 'സമയപാലന പ്രകടനം',
      satisfaction: 'ഉപഭോക്തൃ സംതൃപ്തി',
      efficiency: 'പ്രവർത്തന കാര്യക്ഷമത',
      safety: 'സുരക്ഷാ റെക്കോർഡ്'
    },
    compliance: {
      safety: 'സുരക്ഷാ കംപ്ലയൻസ്',
      environmental: 'പാരിസ്ഥിതിക മാനദണ്ഡങ്ങൾ',
      operational: 'പ്രവർത്തന മാർഗ്ഗനിർദ്ദേശങ്ങൾ',
      financial: 'സാമ്പത്തിക നിയന്ത്രണങ്ങൾ'
    },
    metrics: {
      passengerGrowth: 'യാത്രക്കാരുടെ വളർച്ച',
      revenueGrowth: 'വരുമാന വളർച്ച',
      costEfficiency: 'ചെലവ് കാര്യക്ഷമത',
      assetUtilization: 'സ്വത്ത് ഉപയോഗം'
    },
    trends: {
      up: 'കഴിഞ്ഞ മാസത്തെ അപേക്ഷിച്ച് വർദ്ധന',
      down: 'കഴിഞ്ഞ മാസത്തെ അപേക്ഷിച്ച് കുറവ്',
      stable: 'കഴിഞ്ഞ മാസത്തിന് സമാനം'
    },
    financials: {
      totalRevenue: 'മൊത്തം വരുമാനം',
      operatingCost: 'പ്രവർത്തന ചെലവ്',
      netIncome: 'അറ്റാദായം',
      budgetVariance: 'ബജറ്റ് വ്യത്യാസം'
    }
  }
};

export function ExecutiveDashboard({ language }: ExecutiveDashboardProps) {
  const t = translations[language];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">{t.title}</h1>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">{t.kpis.ridership}</CardTitle>
            <Users className="h-4 w-4 text-[#0066cc]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">42,847</div>
            <div className="flex items-center gap-1 text-xs">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-600">+8.2%</span>
              <span className="text-muted-foreground">{t.trends.up}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">{t.kpis.revenue}</CardTitle>
            <DollarSign className="h-4 w-4 text-[#00a86b]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">₹2.34 Cr</div>
            <div className="flex items-center gap-1 text-xs">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-600">+12.5%</span>
              <span className="text-muted-foreground">{t.trends.up}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">{t.kpis.onTime}</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">94.2%</div>
            <div className="flex items-center gap-1 text-xs">
              <TrendingDown className="h-3 w-3 text-red-500" />
              <span className="text-red-600">-1.3%</span>
              <span className="text-muted-foreground">{t.trends.down}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">{t.kpis.satisfaction}</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">4.6/5</div>
            <div className="flex items-center gap-1 text-xs">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-600">+0.2</span>
              <span className="text-muted-foreground">{t.trends.up}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">{t.kpis.efficiency}</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">87.3%</div>
            <div className="flex items-center gap-1 text-xs">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-600">+2.1%</span>
              <span className="text-muted-foreground">{t.trends.up}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">{t.kpis.safety}</CardTitle>
            <ShieldCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">0 incidents</div>
            <div className="flex items-center gap-1 text-xs">
              <CheckCircle className="h-3 w-3 text-green-500" />
              <span className="text-green-600">47 days</span>
              <span className="text-muted-foreground">incident-free</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compliance Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#0066cc]" />
              {t.complianceStatus}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">{t.compliance.safety}</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    100%
                  </Badge>
                </div>
                <Progress value={100} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">{t.compliance.environmental}</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    98%
                  </Badge>
                </div>
                <Progress value={98} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">{t.compliance.operational}</span>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                    92%
                  </Badge>
                </div>
                <Progress value={92} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">{t.compliance.financial}</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    95%
                  </Badge>
                </div>
                <Progress value={95} className="h-2" />
              </div>
            </div>
            
            <Button size="sm" className="gap-2">
              <FileText className="h-4 w-4" />
              {t.viewReport}
            </Button>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-[#00a86b]" />
              {t.performanceMetrics}
            </CardTitle>
            <CardDescription>Year-over-year comparison</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium">{t.metrics.passengerGrowth}</p>
                  <p className="text-sm text-muted-foreground">YoY Growth</p>
                </div>
                <div className="text-right">
                  <p className="text-xl text-green-600">+15.3%</p>
                  <p className="text-xs text-muted-foreground">vs 2023</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium">{t.metrics.revenueGrowth}</p>
                  <p className="text-sm text-muted-foreground">YoY Growth</p>
                </div>
                <div className="text-right">
                  <p className="text-xl text-blue-600">+18.7%</p>
                  <p className="text-xs text-muted-foreground">vs 2023</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div>
                  <p className="font-medium">{t.metrics.costEfficiency}</p>
                  <p className="text-sm text-muted-foreground">Cost per km</p>
                </div>
                <div className="text-right">
                  <p className="text-xl text-orange-600">-5.2%</p>
                  <p className="text-xs text-muted-foreground">vs 2023</p>
                </div>
              </div>
            </div>
            
            <Button size="sm" variant="outline" className="gap-2">
              <Eye className="h-4 w-4" />
              {t.drillDown}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Financial Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-[#0066cc]" />
            {t.financialSummary}
          </CardTitle>
          <CardDescription>Current fiscal year performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{t.financials.totalRevenue}</p>
              <p className="text-2xl">₹28.4 Cr</p>
              <div className="flex items-center gap-1 text-xs">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-green-600">+12.5%</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{t.financials.operatingCost}</p>
              <p className="text-2xl">₹21.7 Cr</p>
              <div className="flex items-center gap-1 text-xs">
                <TrendingUp className="h-3 w-3 text-red-500" />
                <span className="text-red-600">+8.3%</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{t.financials.netIncome}</p>
              <p className="text-2xl">₹6.7 Cr</p>
              <div className="flex items-center gap-1 text-xs">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-green-600">+23.6%</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{t.financials.budgetVariance}</p>
              <p className="text-2xl">-₹2.3 Cr</p>
              <div className="flex items-center gap-1 text-xs">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span className="text-green-600">Under budget</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              {t.downloadReport}
            </Button>
            <Button variant="outline" className="gap-2">
              <Eye className="h-4 w-4" />
              {t.viewReport}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}