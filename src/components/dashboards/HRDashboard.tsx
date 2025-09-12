import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { 
  Users, 
  GraduationCap, 
  FileText, 
  Calendar, 
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  Download,
  BookOpen
} from 'lucide-react';

interface HRDashboardProps {
  language: 'en' | 'ml';
}

const translations = {
  en: {
    title: 'HR Management Dashboard',
    subtitle: 'Employee management and training coordination',
    policyAlerts: 'Policy Alerts',
    trainingPrograms: 'Training Programs',
    employeeStats: 'Employee Statistics',
    upcomingEvents: 'Upcoming Events',
    viewDetails: 'View Details',
    downloadReport: 'Download Report',
    schedule: 'Schedule',
    policies: {
      safety: 'New safety protocol update requires acknowledgment',
      leave: 'Annual leave policy revision effective next month',
      performance: 'Performance review cycle begins next week'
    },
    training: {
      safety: 'Emergency Response Training',
      technical: 'Technical Systems Update',
      customer: 'Customer Service Excellence',
      leadership: 'Leadership Development'
    },
    stats: {
      totalEmployees: 'Total Employees',
      activeTraining: 'In Training',
      completed: 'Completed This Month',
      pending: 'Pending Reviews',
      attendance: 'Attendance Rate',
      satisfaction: 'Employee Satisfaction'
    },
    events: {
      review: 'Quarterly Performance Reviews',
      safety: 'Monthly Safety Meeting',
      orientation: 'New Employee Orientation'
    }
  },
  ml: {
    title: 'എച്ച്ആർ മാനേജ്മെന്റ് ഡാഷ്ബോർഡ്',
    subtitle: 'ജീവനക്കാരുടെ മാനേജ്മെന്റും പരിശീലന ഏകോപനവും',
    policyAlerts: 'നയ മുന്നറിയിപ്പുകൾ',
    trainingPrograms: 'പരിശീലന പരിപാടികൾ',
    employeeStats: 'ജീവനക്കാരുടെ സ്ഥിതിവിവരക്കണക്കുകൾ',
    upcomingEvents: 'വരാനുള്ള പരിപാടികൾ',
    viewDetails: 'വിശദാംശങ്ങൾ കാണുക',
    downloadReport: 'റിപ്പോർട്ട് ഡൗൺലോഡ് ചെയ്യുക',
    schedule: 'ഷെഡ്യൂൾ',
    policies: {
      safety: 'പുതിയ സുരക്ഷാ പ്രോട്ടോക്കോൾ അപ്ഡേറ്റിന് അംഗീകാരം ആവശ്യമാണ്',
      leave: 'വാർഷിക അവധി നയ പുനരവലോകനം അടുത്ത മാസം പ്രാബല്യത്തിൽ വരും',
      performance: 'പ്രകടന അവലോകന സൈക്കിൾ അടുത്ത ആഴ്ച ആരംഭിക്കുന്നു'
    },
    training: {
      safety: 'എമർജൻസി റെസ്പോൺസ് ട്രെയിനിംഗ്',
      technical: 'ടെക്നിക്കൽ സിസ്റ്റംസ് അപ്ഡേറ്റ്',
      customer: 'കസ്റ്റമർ സർവീസ് എക്സലൻസ്',
      leadership: 'ലീഡർഷിപ് ഡെവലപ്മെന്റ്'
    },
    stats: {
      totalEmployees: 'മൊത്തം ജീവനക്കാർ',
      activeTraining: 'പരിശീലനത്തിൽ',
      completed: 'ഈ മാസം പൂർത്തിയാക്കി',
      pending: 'അവലോകനം ബാക്കി',
      attendance: 'ഹാജർ നിരക്ക്',
      satisfaction: 'ജീവനക്കാരുടെ സംതൃപ്തി'
    },
    events: {
      review: 'ത്രൈമാസിക പ്രകടന അവലോകനങ്ങൾ',
      safety: 'മാസിക സുരക്ഷാ മീറ്റിംഗ്',
      orientation: 'പുതിയ ജീവനക്കാരുടെ ഓറിയന്റേഷൻ'
    }
  }
};

export function HRDashboard({ language }: HRDashboardProps) {
  const t = translations[language];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">{t.title}</h1>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </div>

      {/* Policy Alerts */}
      <div className="space-y-4">
        <h2 className="text-xl">{t.policyAlerts}</h2>
        
        <Alert className="border-orange-200 bg-orange-50">
          <AlertCircle className="h-4 w-4 text-orange-600" />
          <AlertTitle className="text-orange-800">Safety Protocol Update</AlertTitle>
          <AlertDescription className="text-orange-700">
            {t.policies.safety}
            <div className="flex gap-2 mt-2">
              <Button size="sm" className="h-8 bg-orange-600 hover:bg-orange-700">
                {t.viewDetails}
              </Button>
              <Button size="sm" variant="outline" className="h-8">
                <Download className="h-4 w-4 mr-1" />
                {t.downloadReport}
              </Button>
            </div>
          </AlertDescription>
        </Alert>

        <Alert className="border-blue-200 bg-blue-50">
          <FileText className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-800">Leave Policy Revision</AlertTitle>
          <AlertDescription className="text-blue-700">
            {t.policies.leave}
          </AlertDescription>
        </Alert>

        <Alert className="border-green-200 bg-green-50">
          <Calendar className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Performance Review Cycle</AlertTitle>
          <AlertDescription className="text-green-700">
            {t.policies.performance}
          </AlertDescription>
        </Alert>
      </div>

      {/* Employee Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">{t.stats.totalEmployees}</CardTitle>
            <Users className="h-4 w-4 text-[#0066cc]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">1,247</div>
            <p className="text-xs text-muted-foreground">
              +12 new hires this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">{t.stats.activeTraining}</CardTitle>
            <GraduationCap className="h-4 w-4 text-[#00a86b]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">89</div>
            <p className="text-xs text-muted-foreground">
              {t.stats.completed}: 156
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">{t.stats.pending}</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">23</div>
            <p className="text-xs text-muted-foreground">
              Quarterly reviews due
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Training Programs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-[#00a86b]" />
              {t.trainingPrograms}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">{t.training.safety}</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Active
                  </Badge>
                </div>
                <Progress value={85} className="h-2" />
                <p className="text-xs text-muted-foreground">34/40 completed</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">{t.training.technical}</span>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    Scheduled
                  </Badge>
                </div>
                <Progress value={25} className="h-2" />
                <p className="text-xs text-muted-foreground">Starts next week</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">{t.training.customer}</span>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                    Planning
                  </Badge>
                </div>
                <Progress value={0} className="h-2" />
                <p className="text-xs text-muted-foreground">Q2 2024</p>
              </div>
            </div>
            
            <Button size="sm" className="gap-2">
              <BookOpen className="h-4 w-4" />
              {t.schedule}
            </Button>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-[#0066cc]" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">{t.stats.attendance}</span>
                  <span className="text-sm">96.2%</span>
                </div>
                <Progress value={96} className="h-2" />
                <p className="text-xs text-muted-foreground">Above target (95%)</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">{t.stats.satisfaction}</span>
                  <span className="text-sm">4.3/5</span>
                </div>
                <Progress value={86} className="h-2" />
                <p className="text-xs text-muted-foreground">Latest survey results</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Training Completion</span>
                  <span className="text-sm">78%</span>
                </div>
                <Progress value={78} className="h-2" />
                <p className="text-xs text-muted-foreground">This quarter</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-[#0066cc]" />
            {t.upcomingEvents}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{t.events.review}</p>
                <p className="text-sm text-muted-foreground">March 15-30, 2024</p>
              </div>
              <Button size="sm" variant="outline">
                {t.schedule}
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{t.events.safety}</p>
                <p className="text-sm text-muted-foreground">March 20, 2024 - 10:00 AM</p>
              </div>
              <Button size="sm" variant="outline">
                {t.viewDetails}
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{t.events.orientation}</p>
                <p className="text-sm text-muted-foreground">March 25, 2024 - 9:00 AM</p>
              </div>
              <Button size="sm" variant="outline">
                {t.viewDetails}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}