import type { ReactNode } from 'react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { LanguageSwitcher } from './LanguageSwitcher';
import { AppSidebar } from './navigation/AppSidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from './ui/sidebar';
import { 
  Train, 
  User, 
  LogOut, 
  Bell,
  Settings,
  BarChart3,
  Users,
  ShoppingCart,
  Wrench,
  Search,
  Waves
} from 'lucide-react';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface DashboardLayoutProps {
  children: ReactNode;
  role: string;
  language: 'en' | 'ml';
  onLanguageChange: (language: 'en' | 'ml') => void;
  onLogout: () => void;
}

// Get theme based on role - blue for rail metro, teal for water metro
const getRoleTheme = (role: string) => {
  if (role === 'water-metro') {
    return 'water-metro-theme';
  }
  // All other roles use rail metro theme (blue)
  return 'rail-metro-theme';
};

const translations = {
  en: {
    dashboard: 'KMRL Document Intelligence',
    logout: 'Logout',
    notifications: 'Notifications',
    settings: 'Settings',
    searchPlaceholder: 'Search documents...',
    profile: 'Profile',
    roles: {
      'station-controller': 'Station Controller',
      'engineer': 'Engineer',
      'hr': 'HR Manager',
      'procurement': 'Procurement Officer',
      'executive': 'Executive',
      'water-metro': 'Water Metro Operations'
    }
  },
  ml: {
    dashboard: 'കെഎംആർഎൽ ഡോക്യുമെന്റ് ഇന്റലിജൻസ്',
    logout: 'ലോഗൗട്ട്',
    notifications: 'അറിയിപ്പുകൾ',
    settings: 'സെറ്റിംഗ്സ്',
    searchPlaceholder: 'ഡോക്യുമെന്റുകൾ തിരയുക...',
    profile: 'പ്രൊഫൈൽ',
    roles: {
      'station-controller': 'സ്റ്റേഷൻ കൺട്രോളർ',
      'engineer': 'എഞ്ചിനീയർ',
      'hr': 'എച്ച്ആർ മാനേജർ',
      'procurement': 'പ്രൊക്യൂർമെന്റ് ഓഫീസർ',
      'executive': 'എക്സിക്യൂട്ടീവ്',
      'water-metro': 'വാട്ടർ മെട്രോ ഓപ്പറേഷൻസ്'
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

export function DashboardLayout({ 
  children, 
  role, 
  language, 
  onLanguageChange, 
  onLogout 
}: DashboardLayoutProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const t = translations[language];
  const RoleIcon = roleIcons[role as keyof typeof roleIcons] || User;

  const roleTheme = getRoleTheme(role);
  
  return (
    <SidebarProvider>
      <div className={`min-h-screen flex ${roleTheme} role-themed`}>
        <AppSidebar 
          role={role} 
          language={language} 
          context="metro"
          onContextChange={() => {}}
        />
        
        <SidebarInset className="flex-1">
          {/* Top Bar Header */}
          <header className="bg-white border-b shadow-sm sticky top-0 z-10" style={{ borderColor: 'var(--border-color)' }}>
            <div className="flex h-16 items-center gap-4 px-6">
              <SidebarTrigger className="ml-1" />
              <Separator orientation="vertical" className="h-6" />
              
              {/* Brand */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--primary-color)' }}>
                  <Train className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>{t.dashboard}</h1>
              </div>

              {/* Search Bar */}
              <div className="flex-1 max-w-md mx-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: 'var(--text-secondary)' }} />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="pl-10 border-0 focus:ring-2"
                    style={{ 
                      backgroundColor: 'var(--background)'
                    }}
                  />
                </div>
              </div>

              {/* Right side actions */}
              <div className="flex items-center gap-3">
                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5" style={{ color: 'var(--text-secondary)' }} />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 text-xs text-white" style={{ backgroundColor: 'var(--error-color)' }}>
                    5
                  </Badge>
                </Button>
                
                {/* Language Switcher */}
                <LanguageSwitcher 
                  currentLanguage={language} 
                  onLanguageChange={onLanguageChange} 
                />
                
                {/* Profile */}
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg border" style={{ backgroundColor: 'var(--primary-light)', borderColor: 'var(--primary-color)' }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--primary-color)' }}>
                    <RoleIcon className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-sm">
                    <div className="font-medium" style={{ color: 'var(--text-primary)' }}>{t.roles[role as keyof typeof t.roles]}</div>
                    <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>KMRL</div>
                  </div>
                </div>
                
                {/* Logout */}
                <Button onClick={onLogout} variant="ghost" size="sm" className="gap-2" style={{ color: 'var(--text-secondary)' }}>
                  <LogOut className="h-4 w-4" />
                  {t.logout}
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto p-6" style={{ backgroundColor: 'var(--background)' }}>
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}