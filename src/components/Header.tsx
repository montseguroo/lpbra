import bradescoLogo from "@/assets/bradesco-logo.png";
import montseguroLogo from "@/assets/montseguro-logo.png";

const Header = () => {
  return (
    <header className="bg-background py-4 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-6">
        <div className="flex items-center gap-3">
          <img 
            src={montseguroLogo} 
            alt="Montseguro Corretora" 
            className="h-8 w-auto"
          />
          <span className="text-muted-foreground text-sm font-medium">
            Parceiro autorizado
          </span>
        </div>
        <img 
          src={bradescoLogo} 
          alt="Bradesco Saúde" 
          className="h-10 w-auto"
        />
      </div>
    </header>
  );
};

export default Header;
