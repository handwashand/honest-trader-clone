import StatsCard from "./StatsCard";

const StatsGrid = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
      <StatsCard 
        title="P&L %" 
        value="+147.32%" 
        valueColor="profit"
      />
      <StatsCard 
        title="USDT Profit" 
        value="+14,732.50" 
        valueColor="profit"
        subtitle="USDT"
      />
      <StatsCard 
        title="Total Trades" 
        value="156" 
      />
      <StatsCard 
        title="Win Rate" 
        value="68.5%" 
        valueColor="profit"
      />
      <StatsCard 
        title="Active Trades" 
        value="3" 
      />
    </div>
  );
};

export default StatsGrid;
