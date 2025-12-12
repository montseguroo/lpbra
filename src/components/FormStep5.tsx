import StepIndicator from "./StepIndicator";

interface FormData {
  nome: string;
  telefone: string;
  planoAtual: string;
  porteEmpresa: string;
  faixasEtarias: { [key: string]: number };
  hospitais: string;
  doencas: string;
}

interface FormStep5Props {
  formData: FormData;
  onEdit: (step: number) => void;
  onSubmit: () => void;
}

const FormStep5 = ({ formData, onEdit, onSubmit }: FormStep5Props) => {
  const formatFaixas = () => {
    const entries = Object.entries(formData.faixasEtarias).filter(([_, count]) => count > 0);
    return entries.map(([faixa, count]) => `${faixa}: ${count}`).join(", ") || "Nenhuma";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="w-full max-w-md">
      <StepIndicator currentStep={5} totalSteps={5} />
      
      <h2 className="text-2xl font-bold text-primary-foreground text-center mb-8">
        Confirme seus dados
      </h2>

      <form onSubmit={handleSubmit} className="bg-card rounded-lg overflow-hidden">
        <div className="divide-y divide-border">
          <div className="p-4 flex justify-between items-start">
            <div>
              <span className="text-muted-foreground text-sm">Nome</span>
              <p className="text-foreground font-medium">{formData.nome || "—"}</p>
            </div>
            <button
              type="button"
              onClick={() => onEdit(1)}
              className="text-primary text-sm font-medium hover:underline"
            >
              Editar
            </button>
          </div>

          <div className="p-4 flex justify-between items-start">
            <div>
              <span className="text-muted-foreground text-sm">Telefone</span>
              <p className="text-foreground font-medium">{formData.telefone || "—"}</p>
            </div>
            <button
              type="button"
              onClick={() => onEdit(1)}
              className="text-primary text-sm font-medium hover:underline"
            >
              Editar
            </button>
          </div>

          <div className="p-4 flex justify-between items-start">
            <div>
              <span className="text-muted-foreground text-sm">Plano Atual</span>
              <p className="text-foreground font-medium">{formData.planoAtual || "—"}</p>
            </div>
            <button
              type="button"
              onClick={() => onEdit(1)}
              className="text-primary text-sm font-medium hover:underline"
            >
              Editar
            </button>
          </div>

          <div className="p-4 flex justify-between items-start">
            <div>
              <span className="text-muted-foreground text-sm">Porte da Empresa</span>
              <p className="text-foreground font-medium">{formData.porteEmpresa || "—"}</p>
            </div>
            <button
              type="button"
              onClick={() => onEdit(1)}
              className="text-primary text-sm font-medium hover:underline"
            >
              Editar
            </button>
          </div>

          <div className="p-4 flex justify-between items-start">
            <div>
              <span className="text-muted-foreground text-sm">Faixas Etárias</span>
              <p className="text-foreground font-medium">{formatFaixas()}</p>
            </div>
            <button
              type="button"
              onClick={() => onEdit(2)}
              className="text-primary text-sm font-medium hover:underline"
            >
              Editar
            </button>
          </div>

          <div className="p-4 flex justify-between items-start">
            <div>
              <span className="text-muted-foreground text-sm">Hospitais de Preferência</span>
              <p className="text-foreground font-medium">{formData.hospitais || "—"}</p>
            </div>
            <button
              type="button"
              onClick={() => onEdit(3)}
              className="text-primary text-sm font-medium hover:underline"
            >
              Editar
            </button>
          </div>

          <div className="p-4 flex justify-between items-start">
            <div>
              <span className="text-muted-foreground text-sm">Doenças Pré-existentes</span>
              <p className="text-foreground font-medium">{formData.doencas || "—"}</p>
            </div>
            <button
              type="button"
              onClick={() => onEdit(4)}
              className="text-primary text-sm font-medium hover:underline"
            >
              Editar
            </button>
          </div>
        </div>

        <div className="p-4">
          <button
            type="submit"
            className="w-full py-4 bg-card border-2 border-primary text-primary font-semibold rounded-md hover:bg-primary/5 transition-colors"
          >
            CONFIRMAR E ENVIAR
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormStep5;
