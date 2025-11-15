# ProcessSteps Component

A beautiful, responsive process steps section with timeline and horizontal layouts, featuring Radix UI Tooltip components and rose-themed icons.

## Features

✨ **Dual layout modes** - Horizontal and Vertical (Timeline)  
🎨 **Rose-themed icons** with gradient backgrounds  
💡 **Radix UI Tooltips** for additional information  
📱 **Fully responsive** design  
🎭 **Expandable details** for each step  
🎯 **Active step highlighting** support  
♿ **Accessible** with keyboard navigation  
⏱️ **Duration badges** for each step  

## Components

### ProcessSteps (Main Component)
The main container with layout toggle and section header.

### StepItem
Individual step component with icon, title, description, and expandable details.

## Usage

### Basic Usage

```tsx
import { ProcessSteps } from '@/features/process';

export default function ProcessPage() {
  return <ProcessSteps />;
}
```

### Vertical Timeline Layout

```tsx
<ProcessSteps variant="vertical" />
```

### With Active Step

```tsx
'use client';

import { useState } from 'react';
import { ProcessSteps } from '@/features/process';

export default function ProcessPage() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <ProcessSteps
      activeStep={activeStep}
      variant="horizontal"
    />
  );
}
```

### Custom Steps

```tsx
import { ProcessSteps, ProcessStep } from '@/features/process';
import { Users, FileText, Rocket, Trophy } from 'lucide-react';

const mySteps: ProcessStep[] = [
  {
    id: 'step1',
    number: 1,
    title: 'Consultation',
    description: 'Initial meeting and planning',
    icon: Users,
    details: [
      'Meet and greet',
      'Discuss requirements',
      'Budget planning',
    ],
    duration: '1-2 days',
  },
  // ... more steps
];

export default function ProcessPage() {
  return (
    <ProcessSteps
      title="Our Process"
      subtitle="How we work with you"
      steps={mySteps}
    />
  );
}
```

## Props

### ProcessStepsProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `"Quy Trình Làm Việc"` | Section title |
| `subtitle` | `string` | Default Vietnamese text | Section subtitle |
| `steps` | `ProcessStep[]` | Default 4 steps | Array of process steps |
| `variant` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout variant |
| `activeStep` | `number` | `undefined` | Currently active step number |

### ProcessStep Type

```typescript
interface ProcessStep {
  id: string;              // Unique identifier
  number: number;          // Step number (1, 2, 3, 4)
  title: string;           // Step title
  description: string;     // Short description
  icon: LucideIcon;        // Icon component from lucide-react
  details?: string[];      // Optional detailed list
  duration?: string;       // Optional duration text
}
```

### StepItemProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `step` | `ProcessStep` | ✅ | Step data object |
| `isLast` | `boolean` | ❌ | Whether this is the last step |
| `variant` | `'horizontal' \| 'vertical'` | ❌ | Layout variant |
| `isActive` | `boolean` | ❌ | Whether step is active |

## Default Steps

The component includes 4 pre-configured Vietnamese steps:

1. **Tư vấn** (Consultation) - MessageCircle icon
   - Duration: 1-2 ngày
   - 4 detail points

2. **Lên kế hoạch** (Planning) - ClipboardList icon
   - Duration: 2-4 tuần
   - 4 detail points

3. **Thực hiện** (Execution) - Sparkles icon
   - Duration: 1-3 tháng
   - 4 detail points

4. **Bàn giao** (Delivery) - CheckCircle2 icon
   - Duration: 1 ngày + follow-up
   - 4 detail points

## Layout Variants

### Horizontal Layout
- **Mobile**: 1 column (stacked)
- **Tablet (md)**: 2 columns
- **Desktop (lg)**: 4 columns
- Connector lines between steps (hidden on mobile)
- Compact card design

### Vertical Timeline Layout
- Single column with left-side timeline
- Icon and connector on the left
- Content cards on the right
- Vertical connector lines between steps
- More spacious design

## Features in Detail

### Radix UI Tooltips
- Hover over step icons to see duration
- Smooth animations
- Accessible with keyboard
- Portal rendering for proper z-index

### Expandable Details
- Click on any step card to expand
- Shows detailed list of activities
- Smooth height transition
- Checkmark icons for list items

### Active Step Highlighting
- Gradient background (rose-500 to pink-600)
- White icon color
- Larger scale (110%)
- Enhanced shadow
- Border color change

### Duration Badges
- Clock icon with duration text
- Rose-themed styling
- Visible in both layouts

## Styling

### Color Scheme
- Primary: Rose (rose-500, rose-600)
- Secondary: Pink (pink-500, pink-600)
- Accent: Rose-100, Rose-200 for backgrounds
- Active: Gradient from rose-500 to pink-600

### Animations
```css
/* Fade-up animation */
.animate-fade-up {
  animation: fade-up 0.8s ease-out forwards;
}

/* Staggered delays for horizontal layout */
style={{ animationDelay: `${step.number * 100}ms` }}
```

### Hover Effects
- Icon container scales up
- Border color changes
- Shadow increases
- Background gradient appears

## Radix UI Tooltip Usage

```tsx
import * as Tooltip from '@radix-ui/react-tooltip';

<Tooltip.Provider>
  <Tooltip.Root>
    <Tooltip.Trigger asChild>
      <div>Hover me</div>
    </Tooltip.Trigger>
    <Tooltip.Portal>
      <Tooltip.Content>
        Tooltip content
        <Tooltip.Arrow />
      </Tooltip.Content>
    </Tooltip.Portal>
  </Tooltip.Root>
</Tooltip.Provider>
```

## Accessibility

- ✅ Semantic HTML structure
- ✅ ARIA labels on buttons
- ✅ Keyboard navigation support
- ✅ Focus states on interactive elements
- ✅ Tooltip accessibility from Radix UI
- ✅ Proper heading hierarchy

## Responsive Design

### Mobile (< 768px)
- Horizontal: 1 column, stacked cards
- Vertical: Full width timeline
- No connector lines in horizontal mode

### Tablet (768px - 1024px)
- Horizontal: 2 columns
- Vertical: Optimized spacing

### Desktop (> 1024px)
- Horizontal: 4 columns with connectors
- Vertical: Maximum width container

## Customization Examples

### Change Icons

```tsx
import { Heart, Star, Gift, Cake } from 'lucide-react';

const customSteps: ProcessStep[] = [
  {
    id: 'step1',
    number: 1,
    title: 'Step 1',
    description: 'Description',
    icon: Heart, // Custom icon
    // ...
  },
];
```

### Change Colors

```tsx
// In StepItem.tsx, replace rose/pink with your colors:
// rose-500 → blue-500
// pink-600 → indigo-600
// rose-100 → blue-100
```

### Add More Steps

```tsx
const steps: ProcessStep[] = [
  // ... existing 4 steps
  {
    id: 'step5',
    number: 5,
    title: 'Follow-up',
    description: 'Post-event support',
    icon: HeadphonesIcon,
    duration: '1 month',
  },
];
```

## Integration Examples

### With Navigation

```tsx
'use client';

import { useState } from 'react';
import { ProcessSteps } from '@/features/process';

export default function ProcessPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <>
      <ProcessSteps activeStep={currentStep} />
      
      <div className="flex justify-center gap-4 mt-8">
        <button onClick={handlePrev}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </>
  );
}
```

### With Form Wizard

```tsx
const [step, setStep] = useState(1);
const [formData, setFormData] = useState({});

return (
  <>
    <ProcessSteps activeStep={step} />
    
    {step === 1 && <ConsultationForm onNext={() => setStep(2)} />}
    {step === 2 && <PlanningForm onNext={() => setStep(3)} />}
    {step === 3 && <ExecutionForm onNext={() => setStep(4)} />}
    {step === 4 && <DeliveryForm onSubmit={handleSubmit} />}
  </>
);
```

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Demo

See `ProcessStepsDemo.tsx` for multiple usage examples with different configurations.
