interface StatsGridProps {
  language: "EN" | "RU";
}

const StatsGrid = ({ language }: StatsGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      {/* P&L + USDT Profit combined */}
      <div className="bg-card rounded-xl p-4 border border-border">
        <div className="flex justify-between items-start gap-2">
          <div>
            <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">P&L %</p>
            <p className="text-xl sm:text-2xl font-bold text-profit">+147%</p>
          </div>
          <div className="text-right">
            <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">
              {language === "EN" ? "Profit" : "Прибыль"}
            </p>
            <p className="text-xl sm:text-2xl font-bold text-profit">+14,732</p>
            <p className="text-muted-foreground text-xs">USDT</p>
          </div>
        </div>
      </div>

      {/* Total Trades + Win Rate combined */}
      <div className="bg-card rounded-xl p-4 border border-border">
        <div className="flex justify-between items-start gap-2">
          <div>
            <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">
              {language === "EN" ? "Trades" : "Сделки"}
            </p>
            <p className="text-xl sm:text-2xl font-bold text-foreground">156</p>
          </div>
          <div className="text-right">
            <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">
              {language === "EN" ? "Win Rate" : "Винрейт"}
            </p>
            <p className="text-xl sm:text-2xl font-bold text-profit">68%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsGrid;