import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  className?: string;
}

const statusConfig = {
  pending: {
    label: 'Pending',
    className: 'status-pending',
  },
  confirmed: {
    label: 'Confirmed',
    className: 'status-confirmed',
  },
  completed: {
    label: 'Completed',
    className: 'status-completed',
  },
  cancelled: {
    label: 'Cancelled',
    className: 'status-cancelled',
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span className={cn('status-badge', config.className, className)}>
      {config.label}
    </span>
  );
}
