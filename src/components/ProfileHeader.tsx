import { Globe } from "lucide-react";

interface ProfileHeaderProps {
  language: "EN" | "RU";
  onLanguageChange: (lang: "EN" | "RU") => void;
}

const ProfileHeader = ({ language, onLanguageChange }: ProfileHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 mb-8">
      {/* Top row: Avatar + Name + Language switcher */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-lg font-bold text-white shrink-0">
            C
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-foreground">CryptoMaster Signals</h1>
            <a 
              href="https://t.me/cryptomaster_signals" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors text-xs sm:text-sm"
            >
              @cryptomaster_signals
            </a>
          </div>
        </div>
        
        <div className="flex items-center gap-1 bg-card rounded-lg p-1 border border-border">
          <button
            onClick={() => onLanguageChange("EN")}
            className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium transition-colors ${
              language === "EN" 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => onLanguageChange("RU")}
            className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium transition-colors ${
              language === "RU" 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            RU
          </button>
        </div>
      </div>
      
      {/* Description */}
      <p className="text-muted-foreground text-sm">
        {language === "EN" 
          ? "Professional crypto trading signals. Join our community for daily market analysis and high-probability setups. Trading since 2019 with consistent results."
          : "Профессиональные сигналы для криптотрейдинга. Присоединяйтесь к нашему сообществу для ежедневного анализа рынка и высоковероятных сетапов. Торгуем с 2019 года со стабильными результатами."}
      </p>
      
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span>📅 {language === "EN" ? "Tracking since: Jan 15, 2024" : "Отслеживаем с: 15 янв, 2024"}</span>
      </div>
    </div>
  );
};

export default ProfileHeader;
