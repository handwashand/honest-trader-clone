interface FilterTabsProps<T extends string> {
  options: T[];
  selected: T;
  onChange: (value: T) => void;
  variant?: "default" | "direction";
}

const FilterTabs = <T extends string>({ 
  options, 
  selected, 
  onChange,
  variant = "default"
}: FilterTabsProps<T>) => {
  const getOptionClass = (option: T) => {
    if (option === selected) {
      if (variant === "direction") {
        if (option === "LONG") return "bg-profit text-white";
        if (option === "SHORT") return "bg-loss text-white";
      }
      return "bg-primary text-primary-foreground";
    }
    return "text-muted-foreground hover:text-foreground";
  };

  return (
    <div className="flex items-center gap-1 bg-card rounded-lg p-1">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${getOptionClass(option)}`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
