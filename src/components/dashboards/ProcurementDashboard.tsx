import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { 
  ShoppingCart, 
  FileText, 
  Calendar, 
  TrendingUp,
  Eye,
  Download,
  Building,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface ProcurementDashboardProps {
  language: 'en' | 'ml';
}

const translations = {
  en: {
    title: 'Procurement Dashboard',
    subtitle: 'Contract management and vendor coordination',
    contractTimelines: 'Contract Timelines',
    vendorDocuments: 'Vendor Documents',
    budgetOverview: 'Budget Overview',
    activePurchases: 'Active Purchase Orders',
    viewDetails: 'View Details',
    downloadDoc: 'Download',
    review: 'Review',
    approve: 'Approve',
    contracts: {
      maintenance: 'Rolling Stock Maintenance Contract',
      security: 'Security Services Contract',
      cleaning: 'Station Cleaning Services',
      signaling: 'Signaling System Upgrade'
    },
    vendors: {
      techCorp: 'TechCorp Solutions',
      securityPro: 'Security Pro Ltd',
      cleanCo: 'CleanCo Services',
      railTech: 'RailTech Systems'
    },
    status: {
      active: 'Active',
      pending: 'Pending Review',
      expiring: 'Expiring Soon',
      renewal: 'Renewal Required'
    },
    budget: {
      allocated: 'Allocated Budget',
      spent: 'Spent',
      remaining: 'Remaining',
      committed: 'Committed',
      utilization: 'Budget Utilization'
    }
  },
  ml: {
    title: 'പ്രൊക്യൂർമെന്റ് ഡാഷ്ബോർഡ്',
    subtitle: 'കരാർ മാനേജ്മെന്റും വെണ്ടർ ഏകോപനവും',
    contractTimelines: 'കരാർ സമയരേഖകൾ',
    vendorDocuments: 'വെണ്ടർ ഡോക്യുമെന്റുകൾ',
    budgetOverview: 'ബജറ്റ് ഓവർവ്യൂ',
    activePurchases: 'സജീവ പർച്ചേസ് ഓർഡറുകൾ',
    viewDetails: 'വിശദാംശങ്ങൾ കാണുക',
    downloadDoc: 'ഡൗൺലോഡ്',
    review: 'അവലോകനം',
    approve: 'അംഗീകരിക്കുക',
    contracts: {
      maintenance: 'റോളിംഗ് സ്റ്റോക്ക് മെയിന്റനൻസ് കരാർ',
      security: 'സെക്യൂരിറ്റി സർവീസസ് കരാർ',
      cleaning: 'സ്റ്റേഷൻ ക്ലീനിംഗ് സർവീസസ്',
      signaling: 'സിഗ്നലിംഗ് സിസ്റ്റം അപ്ഗ്രേഡ്'
    },
    vendors: {
      techCorp: 'ടെക്ക്കോർപ്പ് സൊല്യൂഷൻസ്',
      securityPro: 'സെക്യൂരിറ്റി പ്രോ ലിമിറ്റഡ്',
      cleanCo: 'ക്ലീൻകോ സർവീസസ്',
      railTech: 'റെയിൽടെക്ക് സിസ്റ്റംസ്'
    },
    status: {
      active: 'സജീവം',
      pending: 'അവലോകനം ബാക്കി',
      expiring: 'ഉടൻ കാലാവധി അവസാനിക്കുന്നു',
      renewal: 'പുതുക്കൽ ആവശ്യം'
    },
    budget: {
      allocated: 'അനുവദിച്ച ബജറ്റ്',
      spent: 'ചെലവഴിച്ചത്',
      remaining: 'ബാക്കി',
      committed: 'പ്രതിബദ്ധത',
      utilization: 'ബജറ്റ് ഉപയോഗം'
    }
  }
};

export function ProcurementDashboard({ language }: ProcurementDashboardProps) {
  const t = translations[language];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">{t.title}</h1>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">{t.budget.allocated}</CardTitle>
            <TrendingUp className="h-4 w-4 text-[#0066cc]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">₹45.2 Cr</div>
            <p className="text-xs text-muted-foreground">
              FY 2023-24
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">{t.budget.spent}</CardTitle>
            <ShoppingCart className="h-4 w-4 text-[#00a86b]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">₹32.8 Cr</div>
            <p className="text-xs text-muted-foreground">
              72.6% of allocation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">{t.budget.committed}</CardTitle>
            <FileText className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">₹8.1 Cr</div>
            <p className="text-xs text-muted-foreground">
              Pending orders
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">{t.budget.remaining}</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">₹4.3 Cr</div>
            <p className="text-xs text-muted-foreground">
              Available for new orders
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Contract Timelines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-[#0066cc]" />
            {t.contractTimelines}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <h4 className="font-medium">{t.contracts.maintenance}</h4>
                <p className="text-sm text-muted-foreground">{t.vendors.techCorp}</p>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">Expires: June 30, 2024</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                  {t.status.expiring}
                </Badge>
                <Button size="sm" variant="outline">
                  {t.review}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <h4 className="font-medium">{t.contracts.security}</h4>
                <p className="text-sm text-muted-foreground">{t.vendors.securityPro}</p>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Valid until: Dec 31, 2024</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  {t.status.active}
                </Badge>
                <Button size="sm" variant="outline">
                  {t.viewDetails}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <h4 className="font-medium">{t.contracts.signaling}</h4>
                <p className="text-sm text-muted-foreground">{t.vendors.railTech}</p>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Under review</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  {t.status.pending}
                </Badge>
                <Button size="sm" className="bg-[#0066cc] hover:bg-[#0052a3]">
                  {t.approve}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vendor Documents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#00a86b]" />
              {t.vendorDocuments}
            </CardTitle>
            <CardDescription>Recent submissions and updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Insurance Certificate</p>
                  <p className="text-sm text-muted-foreground">{t.vendors.techCorp}</p>
                  <p className="text-xs text-muted-foreground">Updated 2 hours ago</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="h-8">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="h-8">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Compliance Report</p>
                  <p className="text-sm text-muted-foreground">{t.vendors.securityPro}</p>
                  <p className="text-xs text-muted-foreground">Updated 1 day ago</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="h-8">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="h-8">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Performance Review</p>
                  <p className="text-sm text-muted-foreground">{t.vendors.cleanCo}</p>
                  <p className="text-xs text-muted-foreground">Updated 3 days ago</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="h-8">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="h-8">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Purchase Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-[#0066cc]" />
              {t.activePurchases}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Spare Parts Order #PO-2024-156</span>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    In Transit
                  </Badge>
                </div>
                <Progress value={75} className="h-2" />
                <p className="text-xs text-muted-foreground">Expected delivery: March 25</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Cleaning Supplies #PO-2024-189</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Delivered
                  </Badge>
                </div>
                <Progress value={100} className="h-2" />
                <p className="text-xs text-muted-foreground">Delivered today</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Safety Equipment #PO-2024-203</span>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                    Pending
                  </Badge>
                </div>
                <Progress value={25} className="h-2" />
                <p className="text-xs text-muted-foreground">Awaiting vendor confirmation</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Utilization Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-[#0066cc]" />
            {t.budget.utilization}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Operations & Maintenance</span>
                <span className="text-sm">₹18.5 Cr (85%)</span>
              </div>
              <Progress value={85} className="h-3" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Infrastructure Upgrades</span>
                <span className="text-sm">₹8.2 Cr (65%)</span>
              </div>
              <Progress value={65} className="h-3" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Safety & Security</span>
                <span className="text-sm">₹6.1 Cr (75%)</span>
              </div>
              <Progress value={75} className="h-3" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}