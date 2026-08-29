// Shared status configuration for courses and articles

export const STATUS_CONFIG: Record<string, { label: string; cls: string }> = {
  'in-progress':  { label: '🔄 In Progress',   cls: 'status-pill--in-progress'  },
  're-visiting':  { label: '🔁 Re-visiting',   cls: 'status-pill--re-visiting'  },
  'planned':      { label: '🕐 Planned',       cls: 'status-pill--planned'      },
};

export function isLocked(status?: string): boolean {
  return status === 'planned';
}
