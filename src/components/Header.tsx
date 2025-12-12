import bradescoLogo from "@/assets/bradesco-logo.png";

const Header = () => {
  return (
    <header className="bg-background py-4 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <img 
          src={bradescoLogo} 
          alt="Bradesco Saúde" 
          className="h-16 w-auto"
        />
      </div>
    </header>
  );
};

export default Header;
