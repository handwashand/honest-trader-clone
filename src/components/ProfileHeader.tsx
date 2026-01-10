import { Globe } from "lucide-react";

interface ProfileHeaderProps {
  language: "EN" | "RU";
  onLanguageChange: (lang: "EN" | "RU") => void;
}

const ProfileHeader = ({ language, onLanguageChange }: ProfileHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-start gap-4 mb-8">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-2xl font-bold text-white shrink-0">
        C
      </div>
      
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
          <h1 className="text-2xl font-bold text-foreground">CryptoMaster Signals</h1>
          <a 
            href="https://t.me/cryptomaster_signals" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
          >
            @cryptomaster_signals
          </a>
        </div>
        
        <p className="text-muted-foreground text-sm mb-3">
          {language === "EN" 
            ? "Professional crypto trading signals. Join our community for daily market analysis and high-probability setups. Trading since 2019 with consistent results."
            : "Профессиональные сигналы для криптотрейдинга. Присоединяйтесь к нашему сообществу для ежедневного анализа рынка и высоковероятных сетапов. Торгуем с 2019 года со стабильными результатами."}
        </p>
        
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>📅 {language === "EN" ? "Tracking since: Jan 15, 2024" : "Отслеживаем с: 15 янв, 2024"}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-1 bg-card rounded-lg p-1 self-start">
        <button
          onClick={() => onLanguageChange("EN")}
          className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
            language === "EN" 
              ? "bg-primary text-primary-foreground" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          EN
        </button>
        <button
          onClick={() => onLanguageChange("RU")}
          className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
            language === "RU" 
              ? "bg-primary text-primary-foreground" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          RU
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
