import type { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { cn } from '../ui/utils';
import { CheckCircle, AlertTriangle, XCircle, Clock, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface RoleCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  variant: 'safety' | 'finance' | 'operations' | 'maintenance' | 'hr' | 'performance';
  priority?: 'high' | 'medium' | 'low';
  status?: 'excellent' | 'good' | 'needs_attention' | 'critical' | 'warning';
  className?: string;
  lastUpdated?: string;
  trend?: 'up' | 'down' | 'stable';
}

const statusConfig = {
  excellent: {
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    icon: CheckCircle,
    iconColor: 'text-emerald-600'
  },
  good: {
    color: 'text-green-700',
    bg: 'bg-green-50',
    border: 'border-green-200',
    badge: 'bg-green-100 text-green-800 border-green-300',
    icon: CheckCircle,
    iconColor: 'text-green-600'
  },
  needs_attention: {
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    badge: 'bg-amber-100 text-amber-800 border-amber-300',
    icon: AlertTriangle,
    iconColor: 'text-amber-600'
  },
  warning: {
    color: 'text-orange-700',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    badge: 'bg-orange-100 text-orange-800 border-orange-300',
    icon: AlertTriangle,
    iconColor: 'text-orange-600'
  },
  critical: {
    color: 'text-red-700',
    bg: 'bg-red-50',
    border: 'border-red-200',
    badge: 'bg-red-100 text-red-800 border-red-300',
    icon: XCircle,
    iconColor: 'text-red-600'
  }
};

const variantStyles = {
  safety: {
    border: 'border-l-[var(--safety-red)]',
    bg: 'bg-[var(--safety-red-light)]',
    text: 'text-[var(--safety-red)]'
  },
  finance: {
    border: 'border-l-[var(--finance-blue)]',
    bg: 'bg-[var(--finance-blue-light)]',
    text: 'text-[var(--finance-blue)]'
  },
  operations: {
    border: 'border-l-[var(--operations-green)]',
    bg: 'bg-[var(--operations-green-light)]',
    text: 'text-[var(--operations-green)]'
  },
  maintenance: {
    border: 'border-l-[var(--maintenance-orange)]',
    bg: 'bg-[var(--maintenance-orange-light)]',
    text: 'text-[var(--maintenance-orange)]'
  },
  hr: {
    border: 'border-l-[var(--hr-purple)]',
    bg: 'bg-[var(--hr-purple-light)]',
    text: 'text-[var(--hr-purple)]'
  },
  performance: {
    border: 'border-l-[var(--performance-indigo)]',
    bg: 'bg-[var(--performance-indigo-light)]',
    text: 'text-[var(--performance-indigo)]'
  }
};

const priorityBadges = {
  high: 'bg-red-100 text-red-800 border-red-200',
  medium: 'bg-orange-100 text-orange-800 border-orange-200',
  low: 'bg-green-100 text-green-800 border-green-200'
};

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus
};

const trendColors = {
  up: 'text-green-600',
  down: 'text-red-600',
  stable: 'text-gray-600'
};

export function RoleCard({ 
  title, 
  description, 
  children, 
  variant, 
  priority, 
  status = 'good',
  className,
  lastUpdated,
  trend
}: RoleCardProps) {
  const styles = variantStyles[variant];
  const statusStyle = statusConfig[status];
  const StatusIcon = statusStyle.icon;
  const TrendIcon = trend ? trendIcons[trend] : null;

  return (
    <Card className={cn(
      'border-l-4 transition-all hover:shadow-xl',
      statusStyle.border,
      className
    )}>
      <CardHeader className={cn('pb-3', statusStyle.bg)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <StatusIcon className={cn('h-5 w-5', statusStyle.iconColor)} />
            <div>
              <CardTitle className={cn('text-lg font-semibold', statusStyle.color)}>
                {title}
              </CardTitle>
              {description && (
                <CardDescription className="mt-1 text-sm">
                  {description}
                </CardDescription>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {trend && TrendIcon && (
              <TrendIcon className={cn('h-4 w-4', trendColors[trend])} />
            )}
            <Badge className={cn('text-xs font-medium', statusStyle.badge)}>
              {status.replace('_', ' ').toUpperCase()}
            </Badge>
            {priority && (
              <Badge 
                variant="outline" 
                className={cn('text-xs', priorityBadges[priority])}
              >
                {priority.toUpperCase()}
              </Badge>
            )}
          </div>
        </div>
        {lastUpdated && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
            <Clock className="h-3 w-3" />
            <span>Updated {lastUpdated}</span>
          </div>
        )}
      </CardHeader>
      <CardContent className="pt-4">
        {children}
      </CardContent>
    </Card>
  );
}