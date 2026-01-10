interface OtherTradersProps {
  language: "EN" | "RU";
}

const traders = [
  { name: "CryptoKing", pnl: "+89%", trades: 234, avatar: "👑" },
  { name: "WhaleHunter", pnl: "+156%", trades: 412, avatar: "🐋" },
  { name: "MoonShot", pnl: "+67%", trades: 189, avatar: "🚀" },
  { name: "DiamondHands", pnl: "+203%", trades: 567, avatar: "💎" },
  { name: "TrendMaster", pnl: "+112%", trades: 345, avatar: "📈" },
];

const OtherTraders = ({ language }: OtherTradersProps) => {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        {language === "EN" ? "Other Traders" : "Другие трейдеры"}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {traders.map((trader) => (
          <div 
            key={trader.name}
            className="bg-card rounded-xl p-4 border border-border hover:border-primary/50 transition-colors cursor-pointer"
          >
            <div className="text-2xl mb-2">{trader.avatar}</div>
            <p className="text-foreground font-medium text-sm truncate">{trader.name}</p>
            <p className="text-profit font-bold text-lg">{trader.pnl}</p>
            <p className="text-muted-foreground text-xs">
              {trader.trades} {language === "EN" ? "trades" : "сделок"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherTraders;