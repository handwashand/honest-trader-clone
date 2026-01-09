import StatsCard from "./StatsCard";

const StatsGrid = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <StatsCard 
        title="P&L %" 
        value="+147%" 
        valueColor="profit"
      />
      <StatsCard 
        title="USDT Profit" 
        value="+14,732" 
        valueColor="profit"
        subtitle="USDT"
      />
      <StatsCard 
        title="Total Trades" 
        value="156" 
      />
      <StatsCard 
        title="Win Rate" 
        value="68%" 
        valueColor="profit"
      />
    </div>
  );
};

export default StatsGrid;