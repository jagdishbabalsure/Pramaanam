import type { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { cn } from '../ui/utils';
import { TrendingUp, TrendingDown, Minus, CheckCircle, AlertTriangle, XCircle, Clock } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  status?: 'excellent' | 'good' | 'needs_attention' | 'critical' | 'warning';
  change?: {
    value: string;
    trend: 'up' | 'down' | 'stable';
    period: string;
  };
  icon: ReactNode;
  variant: 'safety' | 'finance' | 'operations' | 'maintenance' | 'hr' | 'performance';
  className?: string;
  lastUpdated?: string;
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
  safety: 'text-[var(--safety-red)]',
  finance: 'text-[var(--finance-blue)]',
  operations: 'text-[var(--operations-green)]',
  maintenance: 'text-[var(--maintenance-orange)]',
  hr: 'text-[var(--hr-purple)]',
  performance: 'text-[var(--performance-indigo)]'
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

export function MetricCard({ 
  title, 
  value, 
  status = 'good',
  change, 
  icon, 
  variant, 
  className,
  lastUpdated
}: MetricCardProps) {
  const iconColor = variantStyles[variant];
  const TrendIcon = change ? trendIcons[change.trend] : null;
  const statusStyle = statusConfig[status];
  const StatusIcon = statusStyle.icon;

  return (
    <Card className={cn(
      'transition-all hover:shadow-lg border-l-4',
      statusStyle.border,
      className
    )}>
      <CardHeader className={cn('flex flex-row items-center justify-between space-y-0 pb-2', statusStyle.bg)}>
        <div className="flex items-center gap-2">
          <StatusIcon className={cn('h-4 w-4', statusStyle.iconColor)} />
          <CardTitle className={cn('text-sm font-medium', statusStyle.color)}>
            {title}
          </CardTitle>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={cn('text-xs', statusStyle.badge)}>
            {status.replace('_', ' ').toUpperCase()}
          </Badge>
          <div className={cn('h-4 w-4', iconColor)}>
            {icon}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="text-2xl font-bold mb-2 text-gray-900">{value}</div>
        {change && (
          <div className="flex items-center gap-1 text-xs mb-2">
            {TrendIcon && (
              <TrendIcon className={cn('h-3 w-3', trendColors[change.trend])} />
            )}
            <span className={trendColors[change.trend]}>{change.value}</span>
            <span className="text-muted-foreground">{change.period}</span>
          </div>
        )}
        {lastUpdated && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>Updated {lastUpdated}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}