const stats = [
  {
    value: "75+",
    label: "Anos de tradição",
  },
  {
    value: "1M+",
    label: "Vidas protegidas",
  },
  {
    value: "100%",
    label: "Segurança e confiança",
  },
];

const StatsSection = () => {
  return (
    <section className="bg-muted py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-center mb-16">
          Mais de 1 milhão de vidas protegidas
        </h2>

        <div className="grid md:grid-cols-3 gap-12 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-5xl lg:text-6xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-lg">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
