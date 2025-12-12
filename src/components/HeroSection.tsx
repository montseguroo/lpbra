import { useState, useRef } from "react";
import { ArrowRight } from "lucide-react";
import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";
import FormStep3 from "./FormStep3";
import FormStep4 from "./FormStep4";
import FormStep5 from "./FormStep5";
import { toast } from "@/hooks/use-toast";

interface FormData {
  nome: string;
  telefone: string;
  planoAtual: string;
  porteEmpresa: string;
  faixasEtarias: { [key: string]: number };
  hospitais: string;
  doencas: string;
}

const HeroSection = () => {
  const [step, setStep] = useState(1);
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    telefone: "",
    planoAtual: "",
    porteEmpresa: "",
    faixasEtarias: {},
    hospitais: "",
    doencas: "",
  });

  const handleStartForm = () => {
    setStep(1);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleStep1 = (data: { nome: string; telefone: string; planoAtual: string; porteEmpresa: string }) => {
    setFormData(prev => ({ ...prev, ...data }));
    setStep(2);
  };

  const handleStep2 = (data: { [key: string]: number }) => {
    setFormData(prev => ({ ...prev, faixasEtarias: data }));
    setStep(3);
  };

  const handleStep3 = (data: string) => {
    setFormData(prev => ({ ...prev, hospitais: data }));
    setStep(4);
  };

  const handleStep4 = (data: string) => {
    setFormData(prev => ({ ...prev, doencas: data }));
    setStep(5);
  };

  const handleEdit = (editStep: number) => {
    setStep(editStep);
  };

  const handleSubmit = () => {
    window.location.href = "https://obrigado.montseguro.com.br/";
  };

  return (
    <section className="hero-gradient min-h-[700px] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-primary-foreground">
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              <span className="italic">O cuidado que</span><br />
              <span className="italic">sua família precisa</span>
            </h1>
            
            <p className="text-xl lg:text-2xl opacity-90 mb-8">
              Planos de saúde empresarial completo para você, sua<br />
              família e sua empresa.
            </p>

            <div className="discount-badge rounded-lg p-4 mb-8 max-w-lg">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">💰</span>
                <span className="font-semibold">CNPJ: Até 40% de desconto</span>
              </div>
              <p className="text-sm opacity-80">
                Já tem plano? Podemos aproveitar carência a partir de 12 meses
              </p>
            </div>

            <button
              onClick={handleStartForm}
              className="inline-flex items-center gap-2 bg-card text-primary px-8 py-4 rounded-md font-semibold text-lg hover:bg-card/90 transition-colors"
            >
              Simule seu Plano de Saúde
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Right Form */}
          <div ref={formRef} className="flex justify-center lg:justify-end">
            
            {step === 1 && <FormStep1 onContinue={handleStep1} />}
            {step === 2 && <FormStep2 onContinue={handleStep2} onBack={() => setStep(1)} />}
            {step === 3 && <FormStep3 onContinue={handleStep3} onBack={() => setStep(2)} />}
            {step === 4 && <FormStep4 onContinue={handleStep4} onBack={() => setStep(3)} />}
            {step === 5 && (
              <FormStep5
                formData={formData}
                onEdit={handleEdit}
                onSubmit={handleSubmit}
                onBack={() => setStep(4)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Decorative overlay for doctor image effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)'
        }}
      />
    </section>
  );
};

export default HeroSection;
