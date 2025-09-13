import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Train, Shield } from 'lucide-react';

interface LoginPageProps {
  onLogin: (role: string) => void;
  language: 'en' | 'ml';
  onLanguageChange: (language: 'en' | 'ml') => void;
}

const translations = {
  en: {
    title: 'KMRL Portal',
    subtitle: 'Kochi Metro Rail Limited',
    welcome: 'Welcome to KMRL Management System',
    description: 'Secure access to your department dashboard',
    username: 'Username',
    password: 'Password',
    role: 'Select Role',
    login: 'Login',
    roles: {
      'station-controller': 'Station Controller',
      'engineer': 'Engineer',
      'hr': 'HR Manager',
      'procurement': 'Procurement Officer',
      'executive': 'Executive',
      'water-metro': 'Water Metro Operations',
      'operations': 'Operations Manager'
    }
  },
  ml: {
    title: 'കെഎംആർഎൽ പോർട്ടൽ',
    subtitle: 'കൊച്ചി മെട്രോ റെയിൽ ലിമിറ്റഡ്',
    welcome: 'കെഎംആർഎൽ മാനേജ്മെന്റ് സിസ്റ്റത്തിലേക്ക് സ്വാഗതം',
    description: 'നിങ്ങളുടെ ഡിപ്പാർട്ട്മെന്റ് ഡാഷ്ബോർഡിലേക്കുള്ള സുരക്ഷിത പ്രവേശനം',
    username: 'ഉപയോക്തൃനാമം',
    password: 'പാസ്‌വേഡ്',
    role: 'റോൾ തിരഞ്ഞെടുക്കുക',
    login: 'ലോഗിൻ',
    roles: {
      'station-controller': 'സ്റ്റേഷൻ കൺട്രോളർ',
      'engineer': 'എഞ്ചിനീയർ',
      'hr': 'എച്ച്ആർ മാനേജർ',
      'procurement': 'പ്രൊക്യൂർമെന്റ് ഓഫീസർ',
      'executive': 'എക്സിക്യൂട്ടീവ്',
      'water-metro': 'വാട്ടർ മെട്രോ ഓപ്പറേഷൻസ്',
      'operations': 'പ്രവർത്തന മാനേജർ'
    }
  }
};

export function LoginPage({ onLogin, language, onLanguageChange }: LoginPageProps) {
  const [role, setRole] = useState('');
  const t = translations[language];

  const handleLogin = () => {
    if (role) {
      onLogin(role);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher currentLanguage={language} onLanguageChange={onLanguageChange} />
      </div>
      
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="text-center bg-gradient-to-r from-[#0066cc] to-[#00a86b] text-white rounded-t-lg">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-white/20 rounded-full">
              <Train className="h-8 w-8" />
            </div>
            <div className="text-left">
              <CardTitle className="text-2xl">{t.title}</CardTitle>
              <CardDescription className="text-blue-100">{t.subtitle}</CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          <div className="text-center">
            <h2 className="mb-2">{t.welcome}</h2>
            <p className="text-muted-foreground">{t.description}</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="username">{t.username}</Label>
              <Input id="username" type="text" placeholder={t.username} />
            </div>
            
            <div>
              <Label htmlFor="password">{t.password}</Label>
              <Input id="password" type="password" placeholder={t.password} />
            </div>
            
            <div>
              <Label htmlFor="role">{t.role}</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger>
                  <SelectValue placeholder={t.role} />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(t.roles).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              onClick={handleLogin} 
              className="w-full bg-[#0066cc] hover:bg-[#0052a3]"
              disabled={!role}
            >
              <Shield className="mr-2 h-4 w-4" />
              {t.login}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}