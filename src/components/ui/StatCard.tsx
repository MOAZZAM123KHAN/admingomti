import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
  onClick?: () => void;
  className?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  iconColor = 'text-primary',
  iconBgColor = 'bg-primary/10',
  onClick,
  className,
}: StatCardProps) {
  const isClickable = !!onClick;
  
  return (
    <div
      className={cn(
        isClickable ? 'stat-card-clickable' : 'stat-card',
        'animate-fade-in',
        className
      )}
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={isClickable ? (e) => e.key === 'Enter' && onClick?.() : undefined}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
        </div>
        <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', iconBgColor)}>
          <Icon className={cn('w-6 h-6', iconColor)} />
        </div>
      </div>
      {isClickable && (
        <p className="text-xs text-primary mt-4 font-medium">Click to view details →</p>
      )}
    </div>
  );
}
