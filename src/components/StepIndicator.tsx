interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
  return (
    <div className="flex gap-2 justify-center mb-6">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className={`step-dot ${i < currentStep ? 'step-dot-active' : 'step-dot-inactive'}`}
        />
      ))}
    </div>
  );
};

export default StepIndicator;
