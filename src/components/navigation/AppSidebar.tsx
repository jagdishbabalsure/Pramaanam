import { useState } from 'react';
import { 
  Train,
  BarChart3,
  Wrench,
  Users,
  ShoppingCart,
  Home,
  Settings,
  Bell,
  ChevronDown,
  Waves
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '../ui/sidebar';
import { Badge } from '../ui/badge';

interface AppSidebarProps {
  role: string;
  language: 'en' | 'ml';
  context: 'metro' | 'water-metro';
  onContextChange: (context: 'metro' | 'water-metro') => void;
}

const translations = {
  en: {
    dashboard: 'Dashboard',
    overview: 'Overview',
    analytics: 'Analytics',
    reports: 'Reports',
    settings: 'Settings',
    notifications: 'Notifications',
    contexts: {
      metro: 'Metro Rail',
      'water-metro': 'Water Metro'
    },
    roles: {
      'station-controller': 'Station Control',
      'engineer': 'Engineering',
      'hr': 'Human Resources',
      'procurement': 'Procurement',
      'executive': 'Executive',
      'water-metro': 'Water Metro Ops'
    },
    sections: {
      'station-controller': ['Daily Briefing', 'Incident Alerts', 'Operations', 'Communications'],
      'engineer': ['System Health', 'Maintenance', 'IoT Sensors', 'Diagnostics'],
      'hr': ['Staff Management', 'Training', 'Policies', 'Performance'],
      'procurement': ['Contracts', 'Vendors', 'Budget', 'Approvals'],
      'executive': ['KPIs', 'Compliance', 'Financial', 'Strategic'],
      'water-metro': ['Vessel Operations', 'Weather Monitoring', 'Marine Safety', 'Terminal Management']
    }
  },
  ml: {
    dashboard: 'ഡാഷ്ബോർഡ്',
    overview: 'അവലോകനം',
    analytics: 'അനലിറ്റിക്സ്',
    reports: 'റിപ്പോർട്ടുകൾ',
    settings: 'സെറ്റിംഗ്സ്',
    notifications: 'അറിയിപ്പുകൾ',
    contexts: {
      metro: 'മെട്രോ റെയിൽ',
      'water-metro': 'വാട്ടർ മെട്രോ'
    },
    roles: {
      'station-controller': 'സ്റ്റേഷൻ കൺട്രോൾ',
      'engineer': 'എഞ്ചിനീയറിംഗ്',
      'hr': 'ഹ്യൂമൻ റിസോഴ്സസ്',
      'procurement': 'പ്രൊക്യൂർമെന്റ്',
      'executive': 'എക്സിക്യൂട്ടീവ്',
      'water-metro': 'വാട്ടർ മെട്രോ ഓപ്സ്'
    },
    sections: {
      'station-controller': ['ദൈനംദിന വിവരണം', 'സംഭവ മുന്നറിയിപ്പുകൾ', 'പ്രവർത്തനങ്ങൾ', 'ആശയവിനിമയം'],
      'engineer': ['സിസ്റ്റം ആരോഗ്യം', 'പരിപാലനം', 'IoT സെൻസറുകൾ', 'ഡയഗ്നോസ്റ്റിക്സ്'],
      'hr': ['സ്റ്റാഫ് മാനേജ്മെന്റ്', 'പരിശീലനം', 'നയങ്ങൾ', 'പ്രകടനം'],
      'procurement': ['കരാറുകൾ', 'വെണ്ടർമാർ', 'ബജറ്റ്', 'അംഗീകാരങ്ങൾ'],
      'executive': ['KPIs', 'കംപ്ലയൻസ്', 'സാമ്പത്തികം', 'തന്ത്രപരം'],
      'water-metro': ['കപ്പൽ പ്രവർത്തനങ്ങൾ', 'കാലാവസ്ഥ നിരീക്ഷണം', 'മറൈൻ സുരക്ഷ', 'ടെർമിനൽ മാനേജ്മെന്റ്']
    }
  }
};

const roleIcons = {
  'station-controller': Train,
  'engineer': Wrench,
  'hr': Users,
  'procurement': ShoppingCart,
  'executive': BarChart3,
  'water-metro': Waves
};

export function AppSidebar({ role, language, context, onContextChange }: AppSidebarProps) {
  const [activeSection, setActiveSection] = useState('overview');
  const t = translations[language];
  const RoleIcon = roleIcons[role as keyof typeof roleIcons] || Home;
  const sections = t.sections[role as keyof typeof t.sections] || [];

  return (
    <Sidebar className="border-r-2" style={{ borderColor: 'var(--border-color)' }}>
      <SidebarHeader className="border-b p-4" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--primary-color)' }}>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--accent-color)' }}>
            <Train className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-lg text-white">KMRL</h2>
            <p className="text-xs text-white/80">{t.roles[role as keyof typeof t.roles]}</p>
          </div>
        </div>

        {/* Context Switcher */}
        <div className="mt-4 flex gap-1 p-1 rounded-lg" style={{ backgroundColor: 'var(--primary-light)' }}>
          <button
            onClick={() => onContextChange('metro')}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-all ${
              context === 'metro' 
                ? 'shadow-sm text-white' 
                : 'text-white/70 hover:text-white'
            }`}
            style={{ backgroundColor: context === 'metro' ? 'var(--accent-color)' : 'transparent' }}
          >
            <Train className="h-3 w-3" />
            {t.contexts.metro}
          </button>
          <button
            onClick={() => onContextChange('water-metro')}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-all ${
              context === 'water-metro' 
                ? 'shadow-sm text-white' 
                : 'text-white/70 hover:text-white'
            }`}
            style={{ backgroundColor: context === 'water-metro' ? 'var(--accent-color)' : 'transparent' }}
          >
            <Waves className="h-3 w-3" />
            {t.contexts['water-metro']}
          </button>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2" style={{ backgroundColor: 'var(--surface)' }}>
        <SidebarMenu>
          {/* Main Dashboard */}
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={() => setActiveSection('overview')}
              isActive={activeSection === 'overview'}
              className="w-full"
            >
              <Home className="h-4 w-4" />
              <span>{t.overview}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Role-specific sections */}
          {sections.map((section, index) => (
            <SidebarMenuItem key={section}>
              <SidebarMenuButton 
                onClick={() => setActiveSection(`section-${index}`)}
                isActive={activeSection === `section-${index}`}
                className="w-full"
              >
                <RoleIcon className="h-4 w-4" />
                <span>{section}</span>
                {index === 0 && role === 'station-controller' && (
                  <Badge className="ml-auto h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
                    3
                  </Badge>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}

          {/* Common sections */}
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={() => setActiveSection('analytics')}
              isActive={activeSection === 'analytics'}
              className="w-full"
            >
              <BarChart3 className="h-4 w-4" />
              <span>{t.analytics}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={() => setActiveSection('notifications')}
              isActive={activeSection === 'notifications'}
              className="w-full"
            >
              <Bell className="h-4 w-4" />
              <span>{t.notifications}</span>
              <Badge className="ml-auto h-5 w-5 flex items-center justify-center p-0 text-xs bg-orange-500">
                7
              </Badge>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={() => setActiveSection('settings')}
              isActive={activeSection === 'settings'}
              className="w-full"
            >
              <Settings className="h-4 w-4" />
              <span>{t.settings}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}