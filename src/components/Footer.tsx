import bradescoLogo from "@/assets/bradesco-logo.png";

const Footer = () => {
  return (
    <footer className="bg-background py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <div className="flex justify-center mb-4">
          <img 
            src={bradescoLogo} 
            alt="Bradesco Saúde" 
            className="h-10 w-auto"
          />
        </div>

        <p className="text-foreground mb-2">
          <span className="font-semibold">Montseguro Corretora</span>
          <span className="text-muted-foreground"> - Corretor Especializado Bradesco Saúde</span>
        </p>

        <p className="text-muted-foreground text-sm mb-8">
          Oferecemos os melhores planos de saúde empresarial com toda a qualidade e tradição Bradesco Saúde.
        </p>

        <div className="border-t border-border pt-6">
          <p className="text-muted-foreground text-sm">
            © 2024 Montseguro Corretora. Todos os direitos reservados.
          </p>
          <p className="text-muted-foreground text-xs mt-1">
            Bradesco Saúde é uma marca registrada do Banco Bradesco S.A.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
