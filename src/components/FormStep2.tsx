import { useState } from "react";
import StepIndicator from "./StepIndicator";
import AgeCounter from "./AgeCounter";
import { ArrowLeft } from "lucide-react";

interface AgeData {
  [key: string]: number;
}

interface FormStep2Props {
  onContinue: (data: AgeData) => void;
  onBack: () => void;
}

const FormStep2 = ({ onContinue, onBack }: FormStep2Props) => {
  const [ages, setAges] = useState<AgeData>({
    "00-18": 0,
    "19-23": 0,
    "24-28": 0,
    "29-33": 0,
    "34-38": 0,
    "39-43": 0,
    "44-48": 0,
    "49-53": 0,
    "54-58": 0,
    "59+": 0,
  });

  const updateAge = (key: string, value: number) => {
    setAges(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContinue(ages);
  };

  const ageRanges = [
    ["00-18", "19-23", "24-28"],
    ["29-33", "34-38", "39-43"],
    ["44-48", "49-53", "54-58"],
  ];

  return (
    <div className="w-full max-w-md">
      <StepIndicator currentStep={2} totalSteps={5} />
      
      <h2 className="text-2xl font-bold text-primary-foreground text-center mb-8">
        Quais seriam as idades que<br />gostaria de adicionar ao plano?
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {ageRanges.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-3 gap-4">
            {row.map(range => (
              <AgeCounter
                key={range}
                label={range}
                value={ages[range]}
                onChange={(value) => updateAge(range, value)}
              />
            ))}
          </div>
        ))}
        
        <div className="flex justify-center">
          <AgeCounter
            label="59+"
            value={ages["59+"]}
            onChange={(value) => updateAge("59+", value)}
          />
        </div>

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center justify-center gap-2 py-4 px-6 bg-primary-foreground/10 text-primary-foreground font-semibold rounded-md hover:bg-primary-foreground/20 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
          <button
            type="submit"
            className="flex-1 py-4 bg-card text-primary font-semibold rounded-md hover:bg-card/90 transition-colors"
          >
            CONTINUAR
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormStep2;
