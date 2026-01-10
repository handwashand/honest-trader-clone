import StatsCard from "./StatsCard";

interface StatsGridProps {
  language: "EN" | "RU";
}

const StatsGrid = ({ language }: StatsGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <StatsCard 
        title="P&L %" 
        value="+147%" 
        valueColor="profit"
      />
      <StatsCard 
        title={language === "EN" ? "USDT Profit" : "Прибыль USDT"} 
        value="+14,732" 
        valueColor="profit"
        subtitle="USDT"
      />
      <StatsCard 
        title={language === "EN" ? "Total Trades" : "Всего сделок"} 
        value="156" 
      />
      <StatsCard 
        title={language === "EN" ? "Win Rate" : "Винрейт"} 
        value="68%" 
        valueColor="profit"
      />
    </div>
  );
};

export default StatsGrid;