import { Clock, Heart, Settings, Shield, Building2, Users } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Coparticipação Bradesco Saúde",
    description: "Novo modelo de comercialização com mais transparência e controle de custos.",
  },
  {
    icon: Building2,
    title: "Rede Nacional Credenciada",
    description: "Ampla rede de hospitais, clínicas e laboratórios em todo o Brasil.",
  },
  {
    icon: Users,
    title: "Referenciados Bradesco Saúde",
    description: "Acesso aos melhores profissionais e centros de excelência médica.",
  },
  {
    icon: Clock,
    title: "Atendimento 24h",
    description: "Suporte médico disponível 24 horas por dia, 7 dias por semana.",
  },
  {
    icon: Heart,
    title: "Medicina Preventiva",
    description: "Programas de prevenção e promoção da saúde para sua equipe.",
  },
  {
    icon: Settings,
    title: "Gestão Especializada",
    description: "Acompanhamento dedicado com foco na saúde empresarial.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-background py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Por que escolher a Bradesco Saúde?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mais de 75 anos de tradição em saúde, oferecendo soluções completas para sua empresa
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="feature-card flex items-start gap-4">
              <div className="feature-icon shrink-0">
                <feature.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
