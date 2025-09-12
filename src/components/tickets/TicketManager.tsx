import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { toast } from "sonner";
import { 
  Plus,
  Camera,
  Upload,
  Clock,
  MapPin,
  User,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  MessageSquare,
  Wrench,
  Building2,
  Calendar,
  FileText,
  Phone,
  Mail,
  ArrowRight,
  Filter,
  Search,
  Edit3,
  X
} from 'lucide-react';

interface Ticket {
  id: string;
  title: string;
  description: string;
  urgency: 'high' | 'medium' | 'low';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  department: string;
  location: string;
  stationId: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  assignedTo?: string;
  photoUrl?: string;
  comments: TicketComment[];
  estimatedResolution?: string;
}

interface TicketComment {
  id: string;
  author: string;
  message: string;
  timestamp: string;
  type: 'comment' | 'status_update' | 'assignment';
}

interface TicketManagerProps {
  language: 'en' | 'ml';
  currentUser: string;
  currentLocation?: string;
}

const translations = {
  en: {
    title: 'Ticket Management',
    subtitle: 'Operations incident tracking and resolution',
    raiseTicket: 'Raise Ticket',
    newTicket: 'New Ticket',
    
    // Ticket Form
    ticketTitle: 'Issue Title',
    titlePlaceholder: 'Brief description of the issue',
    ticketDescription: 'Detailed Description', 
    descriptionPlaceholder: 'Provide detailed information about the issue...',
    urgency: 'Urgency Level',
    urgencyHigh: 'High - Critical safety or service impact',
    urgencyMedium: 'Medium - Moderate impact',
    urgencyLow: 'Low - Minor issue or maintenance',
    location: 'Location',
    department: 'Department',
    uploadPhoto: 'Upload Photo',
    photoOptional: '(Optional - helps with diagnosis)',
    
    // Departments
    departments: {
      maintenance: 'Maintenance',
      operations: 'Operations Control',
      security: 'Security',
      cleaning: 'Cleaning Services',
      electrical: 'Electrical Systems',
      signaling: 'Signaling & Communications',
      rolling_stock: 'Rolling Stock',
      platform: 'Platform Services'
    },
    
    // Status
    statusOpen: 'Open',
    statusInProgress: 'In Progress', 
    statusResolved: 'Resolved',
    statusClosed: 'Closed',
    
    // Actions
    submit: 'Submit Ticket',
    cancel: 'Cancel',
    update: 'Update',
    close: 'Close Ticket',
    reopen: 'Reopen',
    assign: 'Assign',
    addComment: 'Add Comment',
    viewDetails: 'View Details',
    
    // Filters
    filterAll: 'All Tickets',
    filterOpen: 'Open',
    filterInProgress: 'In Progress',
    filterResolved: 'Resolved',
    filterMine: 'My Tickets',
    
    // Ticket Details
    ticketId: 'Ticket ID',
    createdBy: 'Created By',
    createdAt: 'Created At',
    lastUpdated: 'Last Updated',
    assignedTo: 'Assigned To',
    estimatedResolution: 'Est. Resolution',
    comments: 'Comments & Updates',
    
    // Messages
    ticketCreated: 'Ticket created successfully',
    ticketUpdated: 'Ticket updated successfully',
    ticketClosed: 'Ticket closed successfully',
    photoUploaded: 'Photo uploaded successfully',
    
    // Time
    now: 'Now',
    minutes: 'minutes ago',
    hours: 'hours ago',
    days: 'days ago',
    
    // Search
    searchPlaceholder: 'Search tickets...'
  },
  ml: {
    title: 'ടിക്കറ്റ് മാനേജ്മെന്റ്',
    subtitle: 'പ്രവർത്തന സംഭവ ട്രാക്കിംഗും പരിഹാരവും',
    raiseTicket: 'ടിക്കറ്റ് ഉയർത്തുക',
    newTicket: 'പുതിയ ടിക്കറ്റ്',
    
    // Ticket Form
    ticketTitle: 'പ്രശ്ന തലക്കെട്ട്',
    titlePlaceholder: 'പ്രശ്നത്തിന്റെ ഹ്രസ്വ വിവരണം',
    ticketDescription: 'വിശദമായ വിവരണം',
    descriptionPlaceholder: 'പ്രശ്നത്തെക്കുറിച്ച് വിശദമായ വിവരങ്ങൾ നൽകുക...',
    urgency: 'അടിയന്തര നിലവാരം',
    urgencyHigh: 'ഉയർന്നത് - നിർണായക സുരക്ഷ അല്ലെങ്കിൽ സേവന ആഘാതം',
    urgencyMedium: 'ഇടത്തരം - മിതമായ ആഘാതം',
    urgencyLow: 'കുറവ് - ചെറിയ പ്രശ്നം അല്ലെങ്കിൽ പരിപാലനം',
    location: 'സ്ഥാനം',
    department: 'വകുപ്പ്',
    uploadPhoto: 'ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുക',
    photoOptional: '(ഓപ്ഷണൽ - രോഗനിർണ്ണയത്തിന് സഹായിക്കുന്നു)',
    
    // Departments
    departments: {
      maintenance: 'പരിപാലനം',
      operations: 'പ്രവർത്തന നിയന്ത്രണം',
      security: 'സുരക്ഷ',
      cleaning: 'ശുചീകരണ സേവനങ്ങൾ',
      electrical: 'വൈദ്യുത സംവിധാനങ്ങൾ',
      signaling: 'സിഗ്നലിംഗ് & കമ്മ്യൂണിക്കേഷൻസ്',
      rolling_stock: 'റോളിംഗ് സ്റ്റോക്ക്',
      platform: 'പ്ലാറ്റ്ഫോം സേവനങ്ങൾ'
    },
    
    // Status
    statusOpen: 'തുറന്നത്',
    statusInProgress: 'പുരോഗതിയിൽ',
    statusResolved: 'പരിഹരിച്ചു',
    statusClosed: 'അടച്ചു',
    
    // Actions
    submit: 'ടിക്കറ്റ് സമർപ്പിക്കുക',
    cancel: 'റദ്ദാക്കുക',
    update: 'അപ്ഡേറ്റ് ചെയ്യുക',
    close: 'ടിക്കറ്റ് അടയ്ക്കുക',
    reopen: 'വീണ്ടും തുറക്കുക',
    assign: 'നിയോഗിക്കുക',
    addComment: 'കമന്റ് ചേർക്കുക',
    viewDetails: 'വിശദാംശങ്ങൾ കാണുക',
    
    // Filters
    filterAll: 'എല്ലാ ടിക്കറ്റുകളും',
    filterOpen: 'തുറന്നത്',
    filterInProgress: 'പുരോഗതിയിൽ',
    filterResolved: 'പരിഹരിച്ചു',
    filterMine: 'എന്റെ ടിക്കറ്റുകൾ',
    
    // Ticket Details
    ticketId: 'ടിക്കറ്റ് ഐഡി',
    createdBy: 'സൃഷ്ടിച്ചത്',
    createdAt: 'സൃഷ്ടിച്ച സമയം',
    lastUpdated: 'അവസാനം അപ്ഡേറ്റ് ചെയ്തത്',
    assignedTo: 'നിയോഗിച്ചത്',
    estimatedResolution: 'പ്രതീക്ഷിക്കുന്ന പരിഹാരം',
    comments: 'കമന്റുകളും അപ്ഡേറ്റുകളും',
    
    // Messages
    ticketCreated: 'ടിക്കറ്റ് വിജയകരമായി സൃഷ്ടിച്ചു',
    ticketUpdated: 'ടിക്കറ്റ് വിജയകരമായി അപ്ഡേറ്റ് ചെയ്തു',
    ticketClosed: 'ടിക്കറ്റ് വിജയകരമായി അടച്ചു',
    photoUploaded: 'ഫോട്ടോ വിജയകരമായി അപ്‌ലോഡ് ചെയ്തു',
    
    // Time
    now: 'ഇപ്പോൾ',
    minutes: 'മിനിറ്റ് മുമ്പ്',
    hours: 'മണിക്കൂർ മുമ്പ്',
    days: 'ദിവസം മുമ്പ്',
    
    // Search
    searchPlaceholder: 'ടിക്കറ്റുകൾ തിരയുക...'
  }
};

// Mock data for demonstration
const mockTickets: Ticket[] = [
  {
    id: 'TKT-2024-001',
    title: 'Platform 2 Escalator Malfunction',
    description: 'Escalator stopped working during peak hours. Making grinding noise and emergency stop activated.',
    urgency: 'high',
    status: 'in-progress',
    department: 'maintenance',
    location: 'Platform 2, Aluva Station',
    stationId: 'ALV-P2',
    createdAt: '2024-01-15T08:30:00Z',
    updatedAt: '2024-01-15T09:15:00Z',
    createdBy: 'Station Controller - Aluva',
    assignedTo: 'Maintenance Team Lead',
    photoUrl: 'https://images.unsplash.com/photo-1599095190106-48ad26027383?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc2NhbGF0b3IlMjBtYWludGVuYW5jZSUyMGluZHVzdHJpYWx8ZW58MXx8fHwxNzU3NDg0NTE1fDA&ixlib=rb-4.1.0&q=80&w=400',
    estimatedResolution: '2 hours',
    comments: [
      {
        id: 'c1',
        author: 'Maintenance Team Lead',
        message: 'Dispatching technician to location. ETA 15 minutes.',
        timestamp: '2024-01-15T08:45:00Z',
        type: 'comment'
      },
      {
        id: 'c2',
        author: 'System',
        message: 'Status changed to In Progress',
        timestamp: '2024-01-15T09:00:00Z',
        type: 'status_update'
      }
    ]
  },
  {
    id: 'TKT-2024-002',
    title: 'Broken Tile on Platform 1',
    description: 'Cracked tile near entrance gate creating trip hazard for passengers.',
    urgency: 'medium',
    status: 'open',
    department: 'maintenance',
    location: 'Platform 1, Kochi Airport Station',
    stationId: 'CAN-P1',
    createdAt: '2024-01-15T10:20:00Z',
    updatedAt: '2024-01-15T10:20:00Z',
    createdBy: 'Security Officer',
    photoUrl: 'https://images.unsplash.com/photo-1667923869411-f998f790ce98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm9rZW4lMjBmbG9vciUyMHRpbGUlMjByZXBhaXJ8ZW58MXx8fHwxNzU3NDg0NTE5fDA&ixlib=rb-4.1.0&q=80&w=400',
    comments: []
  },
  {
    id: 'TKT-2024-003',
    title: 'PA System Volume Too Low',
    description: 'Platform announcements barely audible during peak hours. Multiple passenger complaints.',
    urgency: 'low',
    status: 'resolved',
    department: 'signaling',
    location: 'Platform 1, Ernakulam South',
    stationId: 'ERS-P1',
    createdAt: '2024-01-14T16:30:00Z',
    updatedAt: '2024-01-15T08:00:00Z',
    createdBy: 'Station Manager',
    assignedTo: 'Audio Systems Tech',
    comments: [
      {
        id: 'c3',
        author: 'Audio Systems Tech',
        message: 'Volume levels adjusted and tested. Issue resolved.',
        timestamp: '2024-01-15T07:45:00Z',
        type: 'comment'
      }
    ]
  }
];

export function TicketManager({ language, currentUser, currentLocation = 'Platform 1, Kochi Metro' }: TicketManagerProps) {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [isRaiseDialogOpen, setIsRaiseDialogOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [newComment, setNewComment] = useState('');
  
  // Ticket form state
  const [ticketForm, setTicketForm] = useState({
    title: '',
    description: '',
    urgency: 'medium' as 'high' | 'medium' | 'low',
    department: '',
    photo: null as File | null
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = translations[language];

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setTicketForm(prev => ({ ...prev, photo: file }));
      toast.success(t.photoUploaded);
    }
  };

  const handleSubmitTicket = () => {
    if (!ticketForm.title || !ticketForm.description) {
      toast.error(language === 'en' ? 'Please fill all required fields' : 'എല്ലാ ആവശ്യമായ ഫീൽഡുകളും പൂരിപ്പിക്കുക');
      return;
    }

    const newTicket: Ticket = {
      id: `TKT-2024-${String(tickets.length + 1).padStart(3, '0')}`,
      title: ticketForm.title,
      description: ticketForm.description,
      urgency: ticketForm.urgency,
      status: 'open',
      department: ticketForm.department || 'maintenance',
      location: currentLocation,
      stationId: 'AUTO-DETECTED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: currentUser,
      photoUrl: ticketForm.photo ? URL.createObjectURL(ticketForm.photo) : undefined,
      comments: []
    };

    setTickets(prev => [newTicket, ...prev]);
    setTicketForm({ title: '', description: '', urgency: 'medium', department: '', photo: null });
    setIsRaiseDialogOpen(false);
    toast.success(t.ticketCreated);
  };

  const handleUpdateTicketStatus = (ticketId: string, newStatus: Ticket['status']) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, status: newStatus, updatedAt: new Date().toISOString() }
        : ticket
    ));
    toast.success(t.ticketUpdated);
  };

  const handleAddComment = (ticketId: string) => {
    if (!newComment.trim()) return;

    const comment: TicketComment = {
      id: `c${Date.now()}`,
      author: currentUser,
      message: newComment,
      timestamp: new Date().toISOString(),
      type: 'comment'
    };

    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, comments: [...ticket.comments, comment], updatedAt: new Date().toISOString() }
        : ticket
    ));
    
    setNewComment('');
    toast.success(language === 'en' ? 'Comment added' : 'കമന്റ് ചേർത്തു');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800 border-red-200';
      case 'in-progress': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'closed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-orange-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = Math.floor((now.getTime() - time.getTime()) / 1000);
    
    if (diff < 60) return t.now;
    if (diff < 3600) return `${Math.floor(diff / 60)} ${t.minutes}`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} ${t.hours}`;
    return `${Math.floor(diff / 86400)} ${t.days}`;
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesFilter = filter === 'all' || 
                         filter === ticket.status || 
                         (filter === 'mine' && ticket.createdBy === currentUser);
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>{t.title}</h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>
        <Dialog open={isRaiseDialogOpen} onOpenChange={setIsRaiseDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              {t.raiseTicket}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{t.newTicket}</DialogTitle>
              <DialogDescription>
                Report an issue or request maintenance assistance
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              {/* Auto-detected location */}
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <span className="text-blue-800">{t.location}: {currentLocation}</span>
                </div>
                <div className="flex items-center gap-2 text-sm mt-1">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="text-blue-800">{new Date().toLocaleString()}</span>
                </div>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">{t.ticketTitle}</Label>
                <Input
                  id="title"
                  value={ticketForm.title}
                  onChange={(e) => setTicketForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder={t.titlePlaceholder}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">{t.ticketDescription}</Label>
                <Textarea
                  id="description"
                  value={ticketForm.description}
                  onChange={(e) => setTicketForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder={t.descriptionPlaceholder}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Urgency */}
                <div className="space-y-2">
                  <Label>{t.urgency}</Label>
                  <Select value={ticketForm.urgency} onValueChange={(value: 'high' | 'medium' | 'low') => 
                    setTicketForm(prev => ({ ...prev, urgency: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high" className="text-red-600">{t.urgencyHigh}</SelectItem>
                      <SelectItem value="medium" className="text-orange-600">{t.urgencyMedium}</SelectItem>
                      <SelectItem value="low" className="text-green-600">{t.urgencyLow}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Department */}
                <div className="space-y-2">
                  <Label>{t.department}</Label>
                  <Select value={ticketForm.department} onValueChange={(value) => 
                    setTicketForm(prev => ({ ...prev, department: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(t.departments).map(([key, value]) => (
                        <SelectItem key={key} value={key}>{value}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Photo Upload */}
              <div className="space-y-2">
                <Label>{t.uploadPhoto}</Label>
                <p className="text-sm text-muted-foreground">{t.photoOptional}</p>
                <div className="flex items-center gap-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="gap-2"
                  >
                    <Camera className="h-4 w-4" />
                    {ticketForm.photo ? 'Photo Selected' : 'Select Photo'}
                  </Button>
                  {ticketForm.photo && (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      {ticketForm.photo.name}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsRaiseDialogOpen(false)}>
                {t.cancel}
              </Button>
              <Button onClick={handleSubmitTicket}>
                {t.submit}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.filterAll}</SelectItem>
              <SelectItem value="open">{t.filterOpen}</SelectItem>
              <SelectItem value="in-progress">{t.filterInProgress}</SelectItem>
              <SelectItem value="resolved">{t.filterResolved}</SelectItem>
              <SelectItem value="mine">{t.filterMine}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex-1 max-w-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="pl-9"
            />
          </div>
        </div>
      </div>

      {/* Tickets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTickets.map((ticket) => (
          <Card key={ticket.id} className="overflow-hidden hover:shadow-md transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${getUrgencyColor(ticket.urgency)}`} />
                    <Badge variant="outline" className={getStatusColor(ticket.status)}>
                      {t[`status${ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1).replace('-', '')}` as keyof typeof t] as string}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{ticket.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {ticket.id} • {t.departments[ticket.department as keyof typeof t.departments]}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {ticket.photoUrl && (
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <img 
                    src={ticket.photoUrl} 
                    alt="Issue photo" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <p className="text-sm line-clamp-3">{ticket.description}</p>
              
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{ticket.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{ticket.createdBy}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{formatTimeAgo(ticket.createdAt)}</span>
                </div>
              </div>

              <Separator />
              
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" className="flex-1 gap-2">
                      <Eye className="h-4 w-4" />
                      {t.viewDetails}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{ticket.title}</DialogTitle>
                      <DialogDescription>
                        {ticket.id} • {t.departments[ticket.department as keyof typeof t.departments]}
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-6">
                      {/* Ticket Details */}
                      <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                        <div>
                          <Label className="text-sm text-muted-foreground">{t.createdBy}</Label>
                          <p>{ticket.createdBy}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-muted-foreground">{t.createdAt}</Label>
                          <p>{new Date(ticket.createdAt).toLocaleString()}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-muted-foreground">{t.location}</Label>
                          <p>{ticket.location}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-muted-foreground">Status</Label>
                          <Badge className={getStatusColor(ticket.status)}>
                            {t[`status${ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1).replace('-', '')}` as keyof typeof t] as string}
                          </Badge>
                        </div>
                      </div>

                      {/* Photo */}
                      {ticket.photoUrl && (
                        <div>
                          <h4 className="mb-2">Attached Photo</h4>
                          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden max-w-md">
                            <img 
                              src={ticket.photoUrl} 
                              alt="Issue photo" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      )}

                      {/* Description */}
                      <div>
                        <h4 className="mb-2">{t.ticketDescription}</h4>
                        <p className="text-sm bg-gray-50 p-3 rounded-lg">{ticket.description}</p>
                      </div>

                      {/* Comments */}
                      <div>
                        <h4 className="mb-3">{t.comments}</h4>
                        <ScrollArea className="h-48 mb-4">
                          <div className="space-y-3">
                            {ticket.comments.map((comment) => (
                              <div key={comment.id} className="p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-medium text-sm">{comment.author}</span>
                                  <span className="text-xs text-muted-foreground">
                                    {formatTimeAgo(comment.timestamp)}
                                  </span>
                                </div>
                                <p className="text-sm">{comment.message}</p>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                        
                        {/* Add Comment */}
                        <div className="flex gap-2">
                          <Input
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment..."
                            onKeyPress={(e) => e.key === 'Enter' && handleAddComment(ticket.id)}
                          />
                          <Button size="sm" onClick={() => handleAddComment(ticket.id)}>
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex gap-2 pt-4 border-t">
                        {ticket.status === 'open' && (
                          <Button size="sm" onClick={() => handleUpdateTicketStatus(ticket.id, 'in-progress')}>
                            Start Progress
                          </Button>
                        )}
                        {ticket.status === 'in-progress' && (
                          <Button size="sm" onClick={() => handleUpdateTicketStatus(ticket.id, 'resolved')}>
                            Mark Resolved
                          </Button>
                        )}
                        {ticket.status === 'resolved' && (
                          <Button size="sm" onClick={() => handleUpdateTicketStatus(ticket.id, 'closed')}>
                            {t.close}
                          </Button>
                        )}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button size="sm" variant="outline">
                  <Edit3 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredTickets.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No tickets found</h3>
          <p className="text-muted-foreground mb-4">
            {filter === 'all' 
              ? 'No tickets match your search criteria'
              : `No ${filter} tickets found`
            }
          </p>
          <Button onClick={() => setIsRaiseDialogOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            {t.raiseTicket}
          </Button>
        </div>
      )}
    </div>
  );
}