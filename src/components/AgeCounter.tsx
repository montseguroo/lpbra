interface AgeCounterProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

const AgeCounter = ({ label, value, onChange }: AgeCounterProps) => {
  const decrement = () => {
    if (value > 0) onChange(value - 1);
  };

  const increment = () => {
    onChange(value + 1);
  };

  return (
    <div className="flex flex-col items-center">
      <span className="text-primary-foreground text-sm mb-2">{label}</span>
      <div className="flex items-center gap-1">
        <button 
          onClick={decrement}
          className="counter-button"
          type="button"
        >
          −
        </button>
        <input 
          type="text" 
          value={value} 
          readOnly 
          className="counter-input"
        />
        <button 
          onClick={increment}
          className="counter-button"
          type="button"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default AgeCounter;
