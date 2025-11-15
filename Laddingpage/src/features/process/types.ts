import { LucideIcon } from 'lucide-react';

export interface ProcessStep {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
  details?: string[];
  duration?: string;
}

export interface StepItemProps {
  step: ProcessStep;
  isLast?: boolean;
  variant?: 'horizontal' | 'vertical';
  isActive?: boolean;
}

export interface ProcessStepsProps {
  title?: string;
  subtitle?: string;
  steps?: ProcessStep[];
  variant?: 'horizontal' | 'vertical';
  activeStep?: number;
}
