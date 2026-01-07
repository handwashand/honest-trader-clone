interface StatsCardProps {
  title: string;
  value: string;
  valueColor?: "default" | "profit" | "loss";
  subtitle?: string;
}

const StatsCard = ({ title, value, valueColor = "default", subtitle }: StatsCardProps) => {
  const colorClasses = {
    default: "text-foreground",
    profit: "text-profit",
    loss: "text-loss",
  };

  return (
    <div className="bg-card rounded-xl p-4 border border-border">
      <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">{title}</p>
      <p className={`text-2xl font-bold ${colorClasses[valueColor]}`}>{value}</p>
      {subtitle && <p className="text-muted-foreground text-xs mt-1">{subtitle}</p>}
    </div>
  );
};

export default StatsCard;
