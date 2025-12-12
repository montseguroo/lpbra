import { useState } from "react";
import StepIndicator from "./StepIndicator";

interface FormStep1Props {
  onContinue: (data: { nome: string; telefone: string; planoAtual: string; porteEmpresa: string }) => void;
}

const FormStep1 = ({ onContinue }: FormStep1Props) => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [planoAtual, setPlanoAtual] = useState("");
  const [porteEmpresa, setPorteEmpresa] = useState("MEI");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContinue({ nome, telefone, planoAtual, porteEmpresa });
  };

  return (
    <div className="w-full max-w-md">
      <StepIndicator currentStep={1} totalSteps={5} />
      
      <h2 className="text-2xl font-bold text-primary-foreground text-center mb-8">
        Simule seu Plano de Saúde<br />usando seu CNPJ.
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-primary-foreground text-sm mb-2">Nome*</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => {
              const value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
              setNome(value);
            }}
            placeholder="Digite aqui seu nome"
            className="w-full px-4 py-3 rounded-md bg-card text-foreground placeholder:text-muted-foreground"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-primary-foreground text-sm mb-2">Telefone com DDD *</label>
            <input
              type="tel"
              value={telefone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 11);
                setTelefone(value);
              }}
              placeholder="(00) 00000-0000"
              maxLength={11}
              className="w-full px-4 py-3 rounded-md bg-card text-foreground placeholder:text-muted-foreground"
              required
            />
          </div>
          <div>
            <label className="block text-primary-foreground text-sm mb-2">Plano Atual</label>
            <input
              type="text"
              value={planoAtual}
              onChange={(e) => {
                const value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
                setPlanoAtual(value);
              }}
              placeholder="Seu plano atual?"
              className="w-full px-4 py-3 rounded-md bg-card text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <div>
          <label className="block text-primary-foreground text-sm mb-2">Porte da Empresa *</label>
          <select
            value={porteEmpresa}
            onChange={(e) => setPorteEmpresa(e.target.value)}
            className="w-full px-4 py-3 rounded-md bg-card text-foreground appearance-none cursor-pointer"
            required
          >
            <option value="MEI">MEI</option>
            <option value="EI">EI</option>
            <option value="SLU">SLU</option>
            <option value="LTDA">LTDA</option>
            <option value="SA">SA</option>
            <option value="EIRELI">EIRELI</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-card text-primary font-semibold rounded-md hover:bg-card/90 transition-colors mt-6"
        >
          ENVIAR
        </button>

        <p className="text-primary-foreground/80 text-xs text-center mt-4">
          Ao enviar os seus dados pessoais, você fica ciente do Comunicado de<br />
          Privacidade e Termos de Uso e confirma que tem CNPJ.
        </p>
      </form>
    </div>
  );
};

export default FormStep1;
