import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Calendar } from '../ui/calendar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { 
  Users, 
  BookOpen, 
  Calendar as CalendarIcon,
  FileText,
  TrendingUp,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  RefreshCw,
  Filter,
  User,
  GraduationCap,
  UserCheck
} from 'lucide-react';

interface DocumentHRDashboardProps {
  language: 'en' | 'ml';
}

const translations = {
  en: {
    title: 'HR Manager Dashboard',
    subtitle: 'Staff Management & Training Intelligence',
    
    // Main sections
    trainingCompliance: 'Staff Training Compliance Tracker',
    trainingSchedule: 'Upcoming Training Schedule',
    hrPolicies: 'HR Policy Summaries',
    attendanceReports: 'Staff Attendance Reports',
    
    // Training
    overallCompliance: 'Overall Compliance',
    safetyTraining: 'Safety Training',
    technicalTraining: 'Technical Training',
    operationsTraining: 'Operations Training',
    complianceTraining: 'Compliance Training',
    
    // Status
    completed: 'Completed',
    inProgress: 'In Progress',
    overdue: 'Overdue',
    notStarted: 'Not Started',
    
    // Policy status
    new: 'New',
    updated: 'Updated',
    active: 'Active',
    
    // Actions
    generateReport: 'Generate HR Report',
    viewDetails: 'View Details',
    scheduleTraining: 'Schedule Training',
    sendReminder: 'Send Reminder',
    
    // Attendance
    presentToday: 'Present Today',
    onLeave: 'On Leave',
    absent: 'Absent',
    totalStaff: 'Total Staff',
    
    // Calendar
    todaysTraining: "Today's Training",
    upcomingEvents: 'Upcoming Events',
    
    // Actions
    refresh: 'Refresh',
    filter: 'Filter',
    export: 'Export Data',
    
    // Table headers
    employee: 'Employee',
    department: 'Department',
    completionRate: 'Completion Rate',
    lastUpdated: 'Last Updated',
    status: 'Status',
    dueDate: 'Due Date',
    trainer: 'Trainer',
    
    // Departments
    operations: 'Operations',
    maintenance: 'Maintenance',
    security: 'Security',
    administration: 'Administration',
    engineering: 'Engineering'
  },
  ml: {
    title: 'എച്ച്ആർ മാനേജർ ഡാഷ്ബോർഡ്',
    subtitle: 'സ്റ്റാഫ് മാനേജ്മെന്റും പരിശീലന ഇന്റലിജൻസും',
    
    // Main sections
    trainingCompliance: 'സ്റ്റാഫ് പരിശീലന കംപ്ലയൻസ് ട്രാക്കർ',
    trainingSchedule: 'വരാനിരിക്കുന്ന പരിശീലന ഷെഡ്യൂൾ',
    hrPolicies: 'എച്ച്ആർ പൊളിസി സംഗ്രഹങ്ങൾ',
    attendanceReports: 'സ്റ്റാഫ് ഹാജർ റിപ്പോർട്ടുകൾ',
    
    // Training
    overallCompliance: 'മൊത്തത്തിലുള്ള കംപ്ലയൻസ്',
    safetyTraining: 'സുരക്ഷാ പരിശീലനം',
    technicalTraining: 'സാങ്കേതിക പരിശീലനം',
    operationsTraining: 'പ്രവർത്തന പരിശീലനം',
    complianceTraining: 'കംപ്ലയൻസ് പരിശീലനം',
    
    // Status
    completed: 'പൂർത്തിയായി',
    inProgress: 'പുരോഗതിയിൽ',
    overdue: 'കാലാവധി കഴിഞ്ഞത്',
    notStarted: 'ആരംഭിച്ചിട്ടില്ല',
    
    // Policy status
    new: 'പുതിയത്',
    updated: 'അപ്ഡേറ്റ് ചെയ്തത്',
    active: 'സജീവം',
    
    // Actions
    generateReport: 'എച്ച്ആർ റിപ്പോർട്ട് ജനറേറ്റ് ചെയ്യുക',
    viewDetails: 'വിശദാംശങ്ങൾ കാണുക',
    scheduleTraining: 'പരിശീലനം ഷെഡ്യൂൾ ചെയ്യുക',
    sendReminder: 'റിമൈൻഡർ അയക്കുക',
    
    // Attendance
    presentToday: 'ഇന്ന് ഹാജർ',
    onLeave: 'അവധിയിൽ',
    absent: 'ഹാജരല്ലാത്തവർ',
    totalStaff: 'മൊത്തം ജീവനക്കാർ',
    
    // Calendar
    todaysTraining: 'ഇന്നത്തെ പരിശീലനം',
    upcomingEvents: 'വരാനിരിക്കുന്ന ഇവന്റുകൾ',
    
    // Actions
    refresh: 'പുതുക്കുക',
    filter: 'ഫിൽട്ടർ',
    export: 'ഡാറ്റ എക്സ്പോർട്ട് ചെയ്യുക',
    
    // Table headers
    employee: 'ജീവനക്കാരൻ',
    department: 'വകുപ്പ്',
    completionRate: 'പൂർത്തിയാക്കൽ നിരക്ക്',
    lastUpdated: 'അവസാനം അപ്ഡേറ്റ് ചെയ്തത്',
    status: 'സ്ഥിതി',
    dueDate: 'അവസാന തീയതി',
    trainer: 'പരിശീലകൻ',
    
    // Departments
    operations: 'പ്രവർത്തനങ്ങൾ',
    maintenance: 'പരിപാലനം',
    security: 'സുരക്ഷ',
    administration: 'ഭരണം',
    engineering: 'എഞ്ചിനീയറിംഗ്'
  }
};

// Mock data
const mockTrainingCompliance = [
  {
    id: 'safety',
    name: 'Safety Training',
    completion: 87,
    status: 'inProgress',
    totalEmployees: 245,
    completed: 213,
    overdue: 12,
    icon: Award
  },
  {
    id: 'technical', 
    name: 'Technical Training',
    completion: 92,
    status: 'completed',
    totalEmployees: 180,
    completed: 165,
    overdue: 3,
    icon: GraduationCap
  },
  {
    id: 'operations',
    name: 'Operations Training',
    completion: 78,
    status: 'inProgress', 
    totalEmployees: 320,
    completed: 250,
    overdue: 25,
    icon: Users
  },
  {
    id: 'compliance',
    name: 'Compliance Training',
    completion: 95,
    status: 'completed',
    totalEmployees: 420,
    completed: 399,
    overdue: 5,
    icon: CheckCircle
  }
];

const mockUpcomingTraining = [
  {
    id: 'TR-001',
    title: 'Emergency Response Procedures',
    date: '2024-01-18',
    time: '09:00 AM',
    duration: '4 hours',
    trainer: 'Dr. Rajesh Kumar',
    attendees: 25,
    department: 'Operations',
    status: 'scheduled'
  },
  {
    id: 'TR-002',
    title: 'New Safety Protocols Update',
    date: '2024-01-20',
    time: '02:00 PM', 
    duration: '2 hours',
    trainer: 'Priya Nair',
    attendees: 40,
    department: 'All Departments',
    status: 'scheduled'
  },
  {
    id: 'TR-003',
    title: 'Technical Systems Upgrade Training',
    date: '2024-01-22',
    time: '10:00 AM',
    duration: '6 hours',
    trainer: 'Suresh Menon',
    attendees: 15,
    department: 'Engineering',
    status: 'scheduled'
  }
];

const mockHRPolicies = [
  {
    id: 'POL-001',
    title: 'Updated Leave Policy 2024',
    description: 'New guidelines for annual leave, sick leave, and emergency leave procedures',
    status: 'updated',
    effectiveDate: '2024-01-01',
    category: 'Leave Management',
    lastModified: '2024-01-10'
  },
  {
    id: 'POL-002',
    title: 'Remote Work Guidelines',
    description: 'Policies for hybrid work arrangements and remote work protocols',
    status: 'new',
    effectiveDate: '2024-01-15',
    category: 'Work Arrangements',
    lastModified: '2024-01-08'
  },
  {
    id: 'POL-003',
    title: 'Safety Compliance Standards',
    description: 'Updated safety requirements and compliance procedures for all staff',
    status: 'active',
    effectiveDate: '2023-12-01',
    category: 'Safety & Compliance',
    lastModified: '2023-11-25'
  }
];

const mockAttendanceData = {
  present: 387,
  onLeave: 23,
  absent: 10,
  total: 420
};

const mockEmployeeTraining = [
  {
    id: 'EMP-001',
    name: 'Amit Sharma',
    department: 'Operations',
    completionRate: 85,
    lastTraining: '2024-01-10',
    status: 'inProgress',
    overdue: 1
  },
  {
    id: 'EMP-002', 
    name: 'Meera Krishnan',
    department: 'Engineering',
    completionRate: 92,
    lastTraining: '2024-01-12',
    status: 'completed',
    overdue: 0
  },
  {
    id: 'EMP-003',
    name: 'Raju Nair',
    department: 'Maintenance',
    completionRate: 67,
    lastTraining: '2023-12-20',
    status: 'overdue',
    overdue: 3
  },
  {
    id: 'EMP-004',
    name: 'Kavya Thomas',
    department: 'Security',
    completionRate: 88,
    lastTraining: '2024-01-08',
    status: 'inProgress',
    overdue: 0
  }
];

export function DocumentHRDashboard({ language }: DocumentHRDashboardProps) {
  const [selectedTab, setSelectedTab] = useState('compliance');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const t = translations[language];

  const getComplianceColor = (completion: number) => {
    if (completion >= 90) return 'text-status-success bg-status-success-light';
    if (completion >= 70) return 'text-priority-medium bg-priority-medium-light';
    return 'text-priority-high bg-priority-high-light';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-status-success-light text-status-success border-status-success';
      case 'inProgress': return 'bg-priority-medium-light text-priority-medium border-priority-medium';
      case 'overdue': return 'bg-priority-high-light text-priority-high border-priority-high';
      case 'notStarted': return 'bg-grey-light text-grey border-grey';
      default: return 'bg-grey-light text-grey border-grey';
    }
  };

  const getPolicyStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-status-success text-white';
      case 'updated': return 'bg-priority-medium text-white'; 
      case 'active': return 'bg-teal text-white';
      default: return 'bg-grey text-white';
    }
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
            {t.generateReport}
          </Button>
        </div>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white border" style={{ borderColor: 'var(--border-color)' }}>
          <TabsTrigger value="compliance" className="data-[state=active]:text-white" style={{ backgroundColor: 'var(--primary-color)' }}>
            {t.trainingCompliance}
          </TabsTrigger>
          <TabsTrigger value="schedule" className="data-[state=active]:text-white" style={{ backgroundColor: 'var(--primary-color)' }}>
            {t.trainingSchedule}
          </TabsTrigger>
          <TabsTrigger value="policies" className="data-[state=active]:text-white" style={{ backgroundColor: 'var(--primary-color)' }}>
            {t.hrPolicies}
          </TabsTrigger>
          <TabsTrigger value="attendance" className="data-[state=active]:text-white" style={{ backgroundColor: 'var(--primary-color)' }}>
            {t.attendanceReports}
          </TabsTrigger>
        </TabsList>

        {/* Training Compliance Tab */}
        <TabsContent value="compliance" className="space-y-6">
          {/* Overall Compliance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockTrainingCompliance.map((training) => {
              const IconComponent = training.icon;
              return (
                <Card key={training.id} className="hover:shadow-md transition-all border-l-4 border-l-[var(--primary-color)]">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <IconComponent className="h-8 w-8" style={{ color: 'var(--primary-color)' }} />
                      <Badge variant="outline" className={getComplianceColor(training.completion)}>
                        {training.completion}%
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                      {t[training.id as keyof typeof t]}
                    </h3>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                        {training.completion}%
                      </span>
                      <div className="flex items-center gap-1">
                        {training.completion >= 90 ? (
                          <TrendingUp className="h-4 w-4" style={{ color: 'var(--success-color)' }} />
                        ) : training.completion >= 70 ? (
                          <TrendingUp className="h-4 w-4" style={{ color: 'var(--accent-color)' }} />
                        ) : (
                          <TrendingUp className="h-4 w-4" style={{ color: 'var(--warning-color)' }} />
                        )}
                      </div>
                    </div>
                    <Progress value={training.completion} className="h-2 mb-3" />
                    <div className="space-y-1 text-xs">
                      <p style={{ color: 'var(--text-secondary)' }}>
                        Completed: {training.completed}/{training.totalEmployees} employees
                      </p>
                      <div className="flex justify-between items-center">
                        <span style={{ color: 'var(--text-secondary)' }}>
                          Status: {training.status}
                        </span>
                        {training.overdue > 0 && (
                          <Badge className="text-xs" style={{ backgroundColor: 'var(--error-color)', color: 'white' }}>
                            {training.overdue} overdue
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Employee Training Details Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-navy">Individual Training Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t.employee}</TableHead>
                      <TableHead>{t.department}</TableHead>
                      <TableHead>{t.completionRate}</TableHead>
                      <TableHead>{t.lastUpdated}</TableHead>
                      <TableHead>{t.status}</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockEmployeeTraining.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="font-medium">{employee.name}</TableCell>
                        <TableCell>{t[employee.department.toLowerCase() as keyof typeof t]}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={employee.completionRate} className="h-2 w-16" />
                            <span className="text-sm">{employee.completionRate}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{employee.lastTraining}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(employee.status)}>
                            {t[employee.status as keyof typeof t]}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              {t.viewDetails}
                            </Button>
                            {employee.overdue > 0 && (
                              <Button size="sm" className="bg-priority-medium hover:bg-priority-medium/90">
                                {t.sendReminder}
                              </Button>
                            )}
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

        {/* Training Schedule Tab */}
        <TabsContent value="schedule" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar Widget */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-navy">
                  <CalendarIcon className="h-5 w-5" />
                  {t.upcomingEvents}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            {/* Training Schedule */}
            <div className="lg:col-span-2 space-y-4">
              {mockUpcomingTraining.map((training) => (
                <Card key={training.id} className="hover:shadow-md transition-all border-l-4 border-l-teal">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-navy mb-2">{training.title}</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm text-grey">
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4" />
                            <span>{training.date} at {training.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{training.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>{training.trainer}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <span>{training.attendees} attendees</span>
                          </div>
                        </div>
                        <Badge variant="outline" className="mt-2">
                          {training.department}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          {t.viewDetails}
                        </Button>
                        <Button size="sm" className="bg-teal hover:bg-teal/90">
                          {t.scheduleTraining}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* HR Policies Tab */}
        <TabsContent value="policies" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockHRPolicies.map((policy) => (
              <Card key={policy.id} className="hover:shadow-md transition-all border-l-4 border-l-teal">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Badge className={getPolicyStatusColor(policy.status)}>
                        {t[policy.status as keyof typeof t]}
                      </Badge>
                      <CardTitle className="text-lg text-navy mt-2">{policy.title}</CardTitle>
                      <CardDescription className="text-grey">
                        {policy.category}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-grey">{policy.description}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-grey">Effective Date:</span>
                      <span className="text-navy font-medium">{policy.effectiveDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-grey">Last Modified:</span>
                      <span className="text-navy">{policy.lastModified}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2 border-t">
                    <Button size="sm" variant="outline" className="flex-1">
                      {t.viewDetails}
                    </Button>
                    <Button size="sm" className="flex-1 bg-teal hover:bg-teal/90">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Attendance Reports Tab */}
        <TabsContent value="attendance" className="space-y-4">
          {/* Attendance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-status-success-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="h-8 w-8 text-status-success" />
                </div>
                <div className="text-3xl font-bold text-status-success">{mockAttendanceData.present}</div>
                <p className="text-grey">{t.presentToday}</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-priority-medium-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <CalendarIcon className="h-8 w-8 text-priority-medium" />
                </div>
                <div className="text-3xl font-bold text-priority-medium">{mockAttendanceData.onLeave}</div>
                <p className="text-grey">{t.onLeave}</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-priority-high-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="h-8 w-8 text-priority-high" />
                </div>
                <div className="text-3xl font-bold text-priority-high">{mockAttendanceData.absent}</div>
                <p className="text-grey">{t.absent}</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-teal-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-teal" />
                </div>
                <div className="text-3xl font-bold text-teal">{mockAttendanceData.total}</div>
                <p className="text-grey">{t.totalStaff}</p>
              </CardContent>
            </Card>
          </div>

          {/* Attendance Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="text-navy">Daily Attendance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Present Staff</span>
                    <span>{Math.round((mockAttendanceData.present / mockAttendanceData.total) * 100)}%</span>
                  </div>
                  <Progress value={(mockAttendanceData.present / mockAttendanceData.total) * 100} className="h-3" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}