import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { Plus, FileText, AlertTriangle, Clock, ArrowRight } from 'lucide-react';
import { TicketManager } from './TicketManager';

interface TicketWidgetProps {
  language: 'en' | 'ml';
  currentUser: string;
  currentLocation?: string;
}

const translations = {
  en: {
    title: 'Quick Tickets',
    raiseTicket: 'Raise Ticket',
    viewAll: 'View All Tickets',
    openTickets: 'Open',
    inProgress: 'In Progress',
    resolved: 'Resolved Today',
    urgentTickets: 'Urgent Issues',
    recentActivity: 'Recent Activity',
    noTickets: 'No active tickets'
  },
  ml: {
    title: 'ദ്രുത ടിക്കറ്റുകൾ',
    raiseTicket: 'ടിക്കറ്റ് ഉയർത്തുക',
    viewAll: 'എല്ലാ ടിക്കറ്റുകളും കാണുക',
    openTickets: 'തുറന്നത്',
    inProgress: 'പുരോഗതിയിൽ',
    resolved: 'ഇന്ന് പരിഹരിച്ചത്',
    urgentTickets: 'അടിയന്തര പ്രശ്നങ്ങൾ',
    recentActivity: 'സമീപകാല പ്രവർത്തനം',
    noTickets: 'സജീവ ടിക്കറ്റുകളില്ല'
  }
};

// Mock quick stats
const mockStats = {
  open: 3,
  inProgress: 5,
  resolvedToday: 8,
  urgent: 1
};

const mockRecentTickets = [
  {
    id: 'TKT-2024-001',
    title: 'Platform 2 Escalator Issue',
    urgency: 'high',
    status: 'in-progress',
    timeAgo: '15 min ago'
  },
  {
    id: 'TKT-2024-002',
    title: 'Broken Tile Platform 1',
    urgency: 'medium',
    status: 'open',
    timeAgo: '1 hour ago'
  },
  {
    id: 'TKT-2024-003',
    title: 'PA System Volume Low',
    urgency: 'low',
    status: 'resolved',
    timeAgo: '2 hours ago'
  }
];

export function TicketWidget({ language, currentUser, currentLocation }: TicketWidgetProps) {
  const [showFullManager, setShowFullManager] = useState(false);
  const t = translations[language];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'in-progress': return 'bg-orange-100 text-orange-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'high': return <AlertTriangle className="h-3 w-3 text-red-500" />;
      case 'medium': return <Clock className="h-3 w-3 text-orange-500" />;
      case 'low': return <FileText className="h-3 w-3 text-green-500" />;
      default: return <FileText className="h-3 w-3 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-lg">{t.title}</CardTitle>
        <Dialog open={showFullManager} onOpenChange={setShowFullManager}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowRight className="h-4 w-4" />
              {t.viewAll}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-7xl w-[95vw] h-[90vh] p-0">
            <div className="h-full overflow-hidden">
              <div className="p-6 h-full overflow-y-auto">
                <TicketManager 
                  language={language} 
                  currentUser={currentUser} 
                  currentLocation={currentLocation}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
            <div className="text-xl font-medium text-red-700">{mockStats.open}</div>
            <div className="text-xs text-red-600">{t.openTickets}</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
            <div className="text-xl font-medium text-orange-700">{mockStats.inProgress}</div>
            <div className="text-xs text-orange-600">{t.inProgress}</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="text-xl font-medium text-green-700">{mockStats.resolvedToday}</div>
            <div className="text-xs text-green-600">{t.resolved}</div>
          </div>
          <div className="text-center p-3 bg-red-100 rounded-lg border border-red-300">
            <div className="text-xl font-medium text-red-800 flex items-center justify-center gap-1">
              <AlertTriangle className="h-4 w-4" />
              {mockStats.urgent}
            </div>
            <div className="text-xs text-red-700">{t.urgentTickets}</div>
          </div>
        </div>

        {/* Recent Tickets */}
        <div>
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {t.recentActivity}
          </h4>
          <div className="space-y-2">
            {mockRecentTickets.map((ticket, index) => (
              <div key={ticket.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {getUrgencyIcon(ticket.urgency)}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{ticket.title}</div>
                    <div className="text-xs text-muted-foreground">{ticket.id} • {ticket.timeAgo}</div>
                  </div>
                </div>
                <Badge variant="outline" className={`text-xs ${getStatusColor(ticket.status)}`}>
                  {ticket.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 pt-2 border-t">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="flex-1 gap-2">
                <Plus className="h-4 w-4" />
                {t.raiseTicket}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-7xl w-[95vw] h-[90vh] p-0">
              <div className="h-full overflow-hidden">
                <div className="p-6 h-full overflow-y-auto">
                  <TicketManager 
                    language={language} 
                    currentUser={currentUser} 
                    currentLocation={currentLocation}
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" size="sm" onClick={() => setShowFullManager(true)}>
            {t.viewAll}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}