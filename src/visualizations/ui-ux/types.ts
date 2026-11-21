export interface UIUXStep {
  id: string;
  title: string;
  badge?: string;
  badgeType?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  description: string;
  code?: string;
  codeLang?: string;
  previewHtml: string;
}

export interface UIUXScenario {
  id: string;
  title: string;
  category: 'laws' | 'hierarchy' | 'spacing' | 'typography' | 'color' | 'components' | 'forms' | 'workflow';
  defaultStepIndex?: number;
  steps: UIUXStep[];
}
