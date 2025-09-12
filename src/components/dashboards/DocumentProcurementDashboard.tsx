import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { 
  ShoppingCart, 
  FileText, 
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Package,
  Calendar,
  Building2,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  RefreshCw,
  Filter,
  Eye,
  MessageSquare,
  Phone
} from 'lucide-react';

interface DocumentProcurementDashboardProps {
  language: 'en' | 'ml';
}

const translations = {
  en: {
    title: 'Procurement Officer Dashboard',
    subtitle: 'Vendor Management & Contract Intelligence',
    
    // Main sections
    vendorInvoices: 'Vendor Invoices',
    purchaseOrders: 'Purchase Orders Tracker',
    contractUpdates: 'Contract Updates & Alerts',
    spendAnalysis: 'Spend Analysis',
    
    // Table headers
    invoiceId: 'Invoice ID',
    vendor: 'Vendor',
    amount: 'Amount',
    status: 'Status',
    dueDate: 'Due Date',
    
    // Purchase order headers
    poNumber: 'PO Number',
    description: 'Description',
    totalValue: 'Total Value',
    progress: 'Progress',
    expectedDelivery: 'Expected Delivery',
    
    // Status
    paid: 'Paid',
    pending: 'Pending', 
    overdue: 'Overdue',
    approved: 'Approved',
    inTransit: 'In Transit',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
    
    // Priority
    high: 'High',
    medium: 'Medium',
    low: 'Low',
    
    // Actions
    queryVendor: 'Query Vendor',
    viewDetails: 'View Details',
    processPayment: 'Process Payment',
    updateStatus: 'Update Status',
    downloadInvoice: 'Download Invoice',
    contactVendor: 'Contact Vendor',
    
    // Spend categories
    totalSpend: 'Total Spend',
    equipment: 'Equipment',
    maintenance: 'Maintenance',
    services: 'Services',
    utilities: 'Utilities',
    
    // Contract alerts
    expiringContracts: 'Expiring Contracts',
    renewalDue: 'Renewal Due',
    complianceIssues: 'Compliance Issues',
    
    // Time periods
    thisMonth: 'This Month',
    lastMonth: 'Last Month',
    thisQuarter: 'This Quarter',
    thisYear: 'This Year',
    
    // Actions
    refresh: 'Refresh',
    filter: 'Filter',
    export: 'Export Data',
    
    // Currency
    currency: '₹',
    
    // Vendors
    vendors: {
      techCorp: 'TechCorp Solutions',
      maintenanceInc: 'Maintenance Inc',
      safetyFirst: 'Safety First Ltd',
      powerSystems: 'Power Systems Co',
      cleaningServices: 'Metro Cleaning Services'
    }
  },
  ml: {
    title: 'പ്രൊക്യൂർമെന്റ് ഓഫീസർ ഡാഷ്ബോർഡ്',
    subtitle: 'വെണ്ടർ മാനേജ്മെന്റും കരാർ ഇന്റലിജൻസും',
    
    // Main sections
    vendorInvoices: 'വെണ്ടർ ഇൻവോയ്സുകൾ',
    purchaseOrders: 'പർച്ചേസ് ഓർഡർ ട്രാക്കർ',
    contractUpdates: 'കരാർ അപ്ഡേറ്റുകളും അലേർട്ടുകളും',
    spendAnalysis: 'ചെലവ് വിശകലനം',
    
    // Table headers
    invoiceId: 'ഇൻവോയ്സ് ഐഡി',
    vendor: 'വെണ്ടർ',
    amount: 'തുക',
    status: 'സ്ഥിതി',
    dueDate: 'അവസാന തീയതി',
    
    // Purchase order headers
    poNumber: 'പിഒ നമ്പർ',
    description: 'വിവരണം',
    totalValue: 'മൊത്തം മൂല്യം',
    progress: 'പുരോഗതി',
    expectedDelivery: 'പ്രതീക്ഷിക്കുന്ന ഡെലിവറി',
    
    // Status
    paid: 'അടച്ചു',
    pending: 'പെൻഡിംഗ്',
    overdue: 'കാലാവധി കഴിഞ്ഞത്',
    approved: 'അനുമതി ലഭിച്ചു',
    inTransit: 'ട്രാൻസിറ്റിൽ',
    delivered: 'ഡെലിവർ ചെയ്തു',
    cancelled: 'റദ്ദാക്കി',
    
    // Priority
    high: 'ഉയർന്നത്',
    medium: 'ഇടത്തരം',
    low: 'കുറവ്',
    
    // Actions
    queryVendor: 'വെണ്ടറോട് അന്വേഷിക്കുക',
    viewDetails: 'വിശദാംശങ്ങൾ കാണുക',
    processPayment: 'പേയ്മെന്റ് പ്രോസസ്സ് ചെയ്യുക',
    updateStatus: 'സ്ഥിതി അപ്ഡേറ്റ് ചെയ്യുക',
    downloadInvoice: 'ഇൻവോയ്സ് ഡൗൺലോഡ് ചെയ്യുക',
    contactVendor: 'വെണ്ടറുമായി ബന്ധപ്പെടുക',
    
    // Spend categories
    totalSpend: 'മൊത്തം ചെലവ്',
    equipment: 'ഉപകരണങ്ങൾ',
    maintenance: 'പരിപാലനം',
    services: 'സേവനങ്ങൾ',
    utilities: 'യൂട്ടിലിറ്റികൾ',
    
    // Contract alerts
    expiringContracts: 'കാലാവധി അവസാനിക്കുന്ന കരാറുകൾ',
    renewalDue: 'പുതുക്കൽ അവസാന തീയതി',
    complianceIssues: 'കംപ്ലയൻസ് പ്രശ്നങ്ങൾ',
    
    // Time periods
    thisMonth: 'ഈ മാസം',
    lastMonth: 'കഴിഞ്ഞ മാസം',
    thisQuarter: 'ഈ ക്വാർട്ടർ',
    thisYear: 'ഈ വർഷം',
    
    // Actions
    refresh: 'പുതുക്കുക',
    filter: 'ഫിൽട്ടർ',
    export: 'ഡാറ്റ എക്സ്പോർട്ട് ചെയ്യുക',
    
    // Currency
    currency: '₹',
    
    // Vendors
    vendors: {
      techCorp: 'ടെക്ക്കോർപ്പ് സൊല്യൂഷൻസ്',
      maintenanceInc: 'മെയിന്റനൻസ് ഇൻക്',
      safetyFirst: 'സേഫ്റ്റി ഫസ്റ്റ് ലിമിറ്റഡ്',
      powerSystems: 'പവർ സിസ്റ്റംസ് കമ്പനി',
      cleaningServices: 'മെട്രോ ക്ലീനിംഗ് സർവീസ്'
    }
  }
};

// Mock data
const mockVendorInvoices = [
  {
    id: 'INV-2024-001',
    vendorId: 'techCorp',
    amount: 2450000,
    status: 'pending',
    dueDate: '2024-01-20',
    description: 'Signaling equipment upgrade',
    submittedDate: '2024-01-10',
    category: 'Equipment'
  },
  {
    id: 'INV-2024-002',
    vendorId: 'maintenanceInc',
    amount: 850000,
    status: 'paid',
    dueDate: '2024-01-15',
    description: 'Monthly escalator maintenance',
    submittedDate: '2024-01-05',
    category: 'Maintenance'
  },
  {
    id: 'INV-2024-003',
    vendorId: 'safetyFirst',
    amount: 1200000,
    status: 'overdue',
    dueDate: '2024-01-12',
    description: 'Safety equipment installation',
    submittedDate: '2023-12-28',
    category: 'Equipment'
  },
  {
    id: 'INV-2024-004',
    vendorId: 'powerSystems',
    amount: 3750000,
    status: 'pending',
    dueDate: '2024-01-25',
    description: 'Power grid maintenance contract',
    submittedDate: '2024-01-08',
    category: 'Services'
  }
];

const mockPurchaseOrders = [
  {
    id: 'PO-2024-001',
    description: 'Platform Safety Barriers',
    vendor: 'safetyFirst',
    totalValue: 1850000,
    progress: 75,
    status: 'inTransit',
    expectedDelivery: '2024-01-22',
    createdDate: '2023-12-15'
  },
  {
    id: 'PO-2024-002',
    description: 'HVAC System Components',
    vendor: 'techCorp',
    totalValue: 4200000,
    progress: 45,
    status: 'approved',
    expectedDelivery: '2024-02-10',
    createdDate: '2024-01-05'
  },
  {
    id: 'PO-2024-003',
    description: 'Cleaning Equipment & Supplies',
    vendor: 'cleaningServices',
    totalValue: 650000,
    progress: 100,
    status: 'delivered',
    expectedDelivery: '2024-01-10',
    createdDate: '2023-12-20'
  }
];

const mockContractAlerts = [
  {
    id: 'CA-001',
    title: 'Maintenance Contract Renewal',
    vendor: 'maintenanceInc',
    type: 'renewal',
    priority: 'high',
    dueDate: '2024-01-30',
    description: 'Annual maintenance contract for escalators expires in 15 days',
    contractValue: 12000000
  },
  {
    id: 'CA-002',
    title: 'Safety Compliance Update Required',
    vendor: 'safetyFirst',
    type: 'compliance',
    priority: 'medium',
    dueDate: '2024-02-05',
    description: 'Updated safety standards require contract amendment',
    contractValue: 8500000
  },
  {
    id: 'CA-003',
    title: 'Cleaning Services Contract Expiring',
    vendor: 'cleaningServices',
    type: 'expiring',
    priority: 'medium',
    dueDate: '2024-02-15',
    description: 'Contract expires in 30 days, renewal negotiation needed',
    contractValue: 2400000
  }
];

const mockSpendData = {
  total: 28500000,
  categories: [
    { name: 'Equipment', amount: 12500000, percentage: 44 },
    { name: 'Maintenance', amount: 8200000, percentage: 29 },
    { name: 'Services', amount: 5100000, percentage: 18 },
    { name: 'Utilities', amount: 2700000, percentage: 9 }
  ]
};

export function DocumentProcurementDashboard({ language }: DocumentProcurementDashboardProps) {
  const [selectedTab, setSelectedTab] = useState('invoices');
  const t = translations[language];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': case 'delivered': return 'bg-status-success-light text-status-success border-status-success';
      case 'pending': case 'approved': case 'inTransit': return 'bg-priority-medium-light text-priority-medium border-priority-medium';
      case 'overdue': case 'cancelled': return 'bg-priority-high-light text-priority-high border-priority-high';
      default: return 'bg-grey-light text-grey border-grey';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-priority-high text-white';
      case 'medium': return 'bg-priority-medium text-white';
      case 'low': return 'bg-priority-low text-white';
      default: return 'bg-grey text-white';
    }
  };

  const getAlertTypeIcon = (type: string) => {
    switch (type) {
      case 'renewal': return <Clock className="h-4 w-4 text-priority-medium" />;
      case 'compliance': return <AlertTriangle className="h-4 w-4 text-priority-high" />;
      case 'expiring': return <Calendar className="h-4 w-4 text-priority-medium" />;
      default: return <AlertCircle className="h-4 w-4 text-grey" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return `${t.currency}${(amount / 100000).toFixed(1)}L`;
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
            {t.export}
          </Button>
        </div>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white border" style={{ borderColor: 'var(--border-color)' }}>
          <TabsTrigger value="invoices" className="data-[state=active]:text-white" style={{ backgroundColor: 'var(--primary-color)' }}>
            {t.vendorInvoices}
          </TabsTrigger>
          <TabsTrigger value="orders" className="data-[state=active]:text-white" style={{ backgroundColor: 'var(--primary-color)' }}>
            {t.purchaseOrders}
          </TabsTrigger>
          <TabsTrigger value="contracts" className="data-[state=active]:text-white" style={{ backgroundColor: 'var(--primary-color)' }}>
            {t.contractUpdates}
          </TabsTrigger>
          <TabsTrigger value="analysis" className="data-[state=active]:text-white" style={{ backgroundColor: 'var(--primary-color)' }}>
            {t.spendAnalysis}
          </TabsTrigger>
        </TabsList>

        {/* Vendor Invoices Tab */}
        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-navy">Vendor Invoice Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t.invoiceId}</TableHead>
                      <TableHead>{t.vendor}</TableHead>
                      <TableHead>{t.amount}</TableHead>
                      <TableHead>{t.status}</TableHead>
                      <TableHead>{t.dueDate}</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockVendorInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{t.vendors[invoice.vendorId as keyof typeof t.vendors]}</div>
                            <div className="text-sm text-grey">{invoice.description}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{formatCurrency(invoice.amount)}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(invoice.status)}>
                            {invoice.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{invoice.dueDate}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {invoice.status === 'pending' && (
                              <Button size="sm" className="bg-teal hover:bg-teal/90">
                                {t.processPayment}
                              </Button>
                            )}
                            <Button size="sm" variant="outline">
                              <Phone className="h-4 w-4" />
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

          {/* Quick Action Button */}
          <div className="flex gap-3">
            <Button className="gap-2" style={{ backgroundColor: 'var(--primary-color)' }}>
              <MessageSquare className="h-4 w-4" />
              {t.queryVendor}
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              {t.downloadInvoice}
            </Button>
          </div>
        </TabsContent>

        {/* Purchase Orders Tab */}
        <TabsContent value="orders" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockPurchaseOrders.map((order) => (
              <Card key={order.id} className="hover:shadow-md transition-all border-l-4" style={{ borderLeftColor: 'var(--primary-color)' }}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Package className="h-8 w-8" style={{ color: 'var(--primary-color)' }} />
                    <Badge variant="outline" className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                    {order.id}
                  </h3>
                  <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                    {order.description}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--text-secondary)' }}>Vendor:</span>
                      <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{t.vendors[order.vendor as keyof typeof t.vendors]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--text-secondary)' }}>Value:</span>
                      <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{formatCurrency(order.totalValue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--text-secondary)' }}>Expected Delivery:</span>
                      <span style={{ color: 'var(--text-primary)' }}>{order.expectedDelivery}</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Progress</span>
                      <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{order.progress}%</span>
                    </div>
                    <Progress value={order.progress} className="h-2" />
                  </div>

                  <div className="flex gap-2 pt-2 border-t">
                    <Button size="sm" variant="outline" className="flex-1">
                      {t.viewDetails}
                    </Button>
                    <Button size="sm" className="flex-1" style={{ backgroundColor: 'var(--primary-color)' }}>
                      {t.updateStatus}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Contract Updates Tab */}
        <TabsContent value="contracts" className="space-y-4">
          <div className="space-y-3">
            {mockContractAlerts.map((alert) => (
              <Card key={alert.id} className="hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      {getAlertTypeIcon(alert.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-navy">{alert.title}</h4>
                          <Badge className={getPriorityColor(alert.priority)}>
                            {alert.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-grey mb-2">{alert.description}</p>
                        <div className="flex items-center gap-4 text-sm text-grey">
                          <span>Vendor: {t.vendors[alert.vendor as keyof typeof t.vendors]}</span>
                          <span>•</span>
                          <span>Value: {formatCurrency(alert.contractValue)}</span>
                          <span>•</span>
                          <span>Due: {alert.dueDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        {t.viewDetails}
                      </Button>
                      <Button size="sm" className="bg-teal hover:bg-teal/90">
                        {t.contactVendor}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Spend Analysis Tab */}
        <TabsContent value="analysis" className="space-y-4">
          {/* Total Spend Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-navy">
                <DollarSign className="h-6 w-6 text-teal" />
                {t.totalSpend} - {t.thisMonth}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-navy">{formatCurrency(mockSpendData.total)}</div>
                <p className="text-grey mt-1">Total procurement spend this month</p>
              </div>
              
              <div className="space-y-4">
                {mockSpendData.categories.map((category, index) => (
                  <div key={category.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-navy font-medium">{category.name}</span>
                      <span className="text-navy">{formatCurrency(category.amount)} ({category.percentage}%)</span>
                    </div>
                    <Progress value={category.percentage} className="h-3" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Spend by Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockSpendData.categories.map((category, index) => (
              <Card key={category.name} className="text-center hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-teal-light rounded-full flex items-center justify-center mx-auto mb-4">
                    {index === 0 && <Package className="h-8 w-8 text-teal" />}
                    {index === 1 && <ShoppingCart className="h-8 w-8 text-teal" />}
                    {index === 2 && <Building2 className="h-8 w-8 text-teal" />}
                    {index === 3 && <TrendingUp className="h-8 w-8 text-teal" />}
                  </div>
                  <div className="text-2xl font-bold text-navy">{formatCurrency(category.amount)}</div>
                  <p className="text-grey">{category.name}</p>
                  <p className="text-sm text-teal font-medium">{category.percentage}% of total</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}