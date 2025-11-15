'use client';

import { useState } from 'react';
import ProcessSteps from './ProcessSteps';
import { ProcessStep } from '../types';
import { Users, FileText, Rocket, Trophy } from 'lucide-react';

/**
 * ProcessStepsDemo - Example usage of the ProcessSteps component
 */
export default function ProcessStepsDemo() {
  const [activeStep, setActiveStep] = useState<number | undefined>(1);

  // Custom process steps
  const customSteps: ProcessStep[] = [
    {
      id: 'discover',
      number: 1,
      title: 'Discovery',
      description: 'Understanding your needs and goals',
      icon: Users,
      details: [
        'Initial consultation',
        'Requirements gathering',
        'Budget discussion',
        'Timeline planning',
      ],
      duration: '1 week',
    },
    {
      id: 'design',
      number: 2,
      title: 'Design',
      description: 'Creating the perfect plan for your event',
      icon: FileText,
      details: [
        'Concept development',
        'Mood board creation',
        'Vendor selection',
        'Contract finalization',
      ],
      duration: '2-3 weeks',
    },
    {
      id: 'launch',
      number: 3,
      title: 'Launch',
      description: 'Bringing your vision to life',
      icon: Rocket,
      details: [
        'Setup and decoration',
        'Vendor coordination',
        'Final walkthrough',
        'Event execution',
      ],
      duration: '1 day',
    },
    {
      id: 'celebrate',
      number: 4,
      title: 'Celebrate',
      description: 'Enjoying your perfect day',
      icon: Trophy,
      details: [
        'Event management',
        'Problem solving',
        'Photo/video delivery',
        'Post-event support',
      ],
      duration: 'Ongoing',
    },
  ];

  return (
    <div className="space-y-20">
      {/* Example 1: Default Process Steps */}
      <ProcessSteps />

      {/* Example 2: Vertical Layout */}
      <ProcessSteps
        title="Our Workflow"
        subtitle="Step by step to your perfect wedding"
        variant="vertical"
      />

      {/* Example 3: Custom Steps with Active State */}
      <div>
        <ProcessSteps
          title="Custom Process"
          subtitle="Interactive steps with active state"
          steps={customSteps}
          activeStep={activeStep}
        />

        {/* Step Navigation */}
        <div className="flex justify-center gap-4 mt-8">
          {customSteps.map((step) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.number)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeStep === step.number
                  ? 'bg-rose-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Step {step.number}
            </button>
          ))}
        </div>
      </div>

      {/* Example 4: Minimal Steps (3 steps) */}
      <ProcessSteps
        title="Quick Process"
        subtitle="Simplified workflow"
        steps={customSteps.slice(0, 3)}
        variant="horizontal"
      />
    </div>
  );
}
