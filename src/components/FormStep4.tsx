import { useState } from "react";
import StepIndicator from "./StepIndicator";
import { ArrowLeft } from "lucide-react";

interface FormStep4Props {
  onContinue: (data: string) => void;
  onBack: () => void;
}

const FormStep4 = ({ onContinue, onBack }: FormStep4Props) => {
  const [doencas, setDoencas] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContinue(doencas);
  };

  return (
    <div className="w-full max-w-md">
      <StepIndicator currentStep={4} totalSteps={5} />
      
      <h2 className="text-2xl font-bold text-primary-foreground text-center mb-8">
        Alguém possui alguma doença<br />pré-existente ou realiza<br />terapias?
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-primary-foreground text-sm mb-2">
            Doenças Pré-existentes ou Terapias *
          </label>
          <textarea
            value={doencas}
            onChange={(e) => setDoencas(e.target.value)}
            placeholder="Digite se há doenças pré-existentes ou terapias..."
            className="w-full px-4 py-3 rounded-md bg-card text-foreground placeholder:text-muted-foreground min-h-[120px] resize-none"
            required
          />
        </div>

        <div className="flex gap-3">
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

export default FormStep4;
