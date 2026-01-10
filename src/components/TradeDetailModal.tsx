import { ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trade } from "@/data/trades";
import { Button } from "@/components/ui/button";

interface TradeDetailModalProps {
  trade: Trade | null;
  open: boolean;
  onClose: () => void;
  language: "EN" | "RU";
}

interface TelegramDisclaimerProps {
  language: "EN" | "RU";
}

const TelegramDisclaimer = ({ language }: TelegramDisclaimerProps) => (
  <div className="bg-muted/30 rounded-lg p-3 border border-border">
    <Button size="sm" className="w-full mb-2 gap-2 bg-[#0088cc] hover:bg-[#0077b5] text-white border-none">
      <ExternalLink className="w-4 h-4" />
      {language === "EN" ? "View in Telegram" : "Открыть в Telegram"}
    </Button>
    <p className="text-xs text-muted-foreground text-center">
      {language === "EN" 
        ? "Signal received automatically from a Telegram channel. Text and screenshot saved without modifications."
        : "Сигнал получен автоматически из Telegram-канала. Текст и скриншот сохранены без изменений."}
    </p>
  </div>
);

const formatPnl = (pnl: number) => {
  const rounded = Math.round(pnl);
  return pnl >= 0 ? `+${rounded}` : `${rounded}`;
};

const formatResult = (result: string) => {
  return result.replace(/\.\d+%/, '%');
};

const TradeDetailModal = ({ trade, open, onClose, language }: TradeDetailModalProps) => {
  if (!trade) return null;

  const getPnlClass = (pnl: number) => {
    return pnl >= 0 ? "text-profit" : "text-loss";
  };

  const getDirectionClass = (direction: Trade["direction"]) => {
    return direction === "LONG" 
      ? "bg-profit/20 text-profit" 
      : "bg-loss/20 text-loss";
  };

  // Generate realistic log entries based on trade
  const generateLogEntries = () => {
    const baseDate = trade.date.split(' ')[0];
    const entries = [];
    
    // Signal received
    entries.push({
      title: "Signal received from Telegram",
      details: [
        `Price: ${Math.round(Math.random() * 100 + 10)} USDT`
      ],
      time: `${baseDate.split('-').slice(1).reverse().join(' ')}, 16:00`
    });

    // Position opened
    const entryPrice = Math.round(Math.random() * 100 + 10);
    const positionSize = Math.round(Math.random() * 2000 + 500);
    const bought = (positionSize / entryPrice).toFixed(2);
    entries.push({
      title: "Position opened",
      details: [
        `Entry price: ${entryPrice} USDT`,
        `Position size: ${positionSize} USDT`,
        `Bought: ${bought} ${trade.pair.split('/')[0]}`,
        `Direction: ${trade.direction}`,
        `TP: ${Math.round(entryPrice * 1.05)} / ${Math.round(entryPrice * 1.1)} / ${Math.round(entryPrice * 1.15)}`,
        `SL: ${Math.round(entryPrice * 0.95)}`
      ],
      time: `${baseDate.split('-').slice(1).reverse().join(' ')}, 16:15`
    });

    if (trade.status === "Closed" && trade.pnl >= 0) {
      // TP1 hit
      entries.push({
        title: "TP1 hit — partial close",
        details: [
          `TP1 price: ${Math.round(entryPrice * 1.05)} USDT`,
          `Closed: 33%`,
          `Closed amount: ${Math.round(positionSize * 0.33)} USDT`,
          `PNL: +${Math.round(positionSize * 0.05)} USDT (+5%)`
        ],
        time: `${baseDate.split('-').slice(1).reverse().join(' ')}, 18:00`
      });

      // SL moved
      entries.push({
        title: "Stop Loss moved",
        details: [
          `New SL: ${entryPrice} USDT (Breakeven)`
        ],
        time: `${baseDate.split('-').slice(1).reverse().join(' ')}, 18:05`
      });

      // TP2 hit
      entries.push({
        title: "TP2 hit — full close",
        details: [
          `TP2 price: ${Math.round(entryPrice * 1.1)} USDT`,
          `Closed: ${Math.round(positionSize * 0.67)} USDT`,
          `PNL: +${Math.round(trade.pnl * 0.7)} USDT`
        ],
        time: `${baseDate.split('-').slice(1).reverse().join(' ')}, 21:00`
      });
    } else if (trade.status === "Closed" && trade.pnl < 0) {
      // SL hit
      entries.push({
        title: "Stop Loss hit",
        details: [
          `SL price: ${Math.round(entryPrice * 0.95)} USDT`,
          `Closed: 100%`,
          `PNL: ${Math.round(trade.pnl)} USDT (${formatResult(trade.result)})`
        ],
        time: `${baseDate.split('-').slice(1).reverse().join(' ')}, 18:30`
      });
    } else if (trade.status === "ACTIVE") {
      entries.push({
        title: "Position active",
        details: [
          `Current PNL: ${formatPnl(trade.pnl)} USDT`,
          `Unrealized: ${formatResult(trade.result)}`
        ],
        time: "Now"
      });
    } else if (trade.status === "EXPIRED") {
      entries.push({
        title: "Signal expired",
        details: [
          `Entry conditions not met`,
          `Order cancelled`
        ],
        time: `${baseDate.split('-').slice(1).reverse().join(' ')}, 23:59`
      });
    }

    // Final result for closed trades
    if (trade.status === "Closed") {
      entries.push({
        title: "Trade closed — final result",
        details: [
          `Total PNL: ${formatPnl(trade.pnl)} USDT`,
          `Total return: ${formatResult(trade.result)}`
        ],
        time: `${baseDate.split('-').slice(1).reverse().join(' ')}, 21:30`
      });
    }

    return entries;
  };

  const logEntries = generateLogEntries();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border max-w-2xl max-h-[90vh] flex flex-col p-4 sm:p-6 pt-12 sm:pt-6">
        {/* Custom close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors z-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-foreground flex items-center gap-2 sm:gap-3 flex-wrap pr-8">
            <span className="text-lg sm:text-xl">Signal #{trade.id}</span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${getDirectionClass(trade.direction)}`}>
              {trade.direction}
            </span>
            <span className="text-muted-foreground font-normal text-sm">{trade.pair}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4 overflow-y-auto flex-1 pr-2">
          {/* Screenshot */}
          <div className="bg-muted rounded-lg overflow-hidden border border-border flex-shrink-0">
            <img 
              src={trade.screenshot} 
              alt={`${trade.pair} Chart`}
              className="w-full h-auto max-h-[200px] object-cover"
            />
          </div>

          {/* Post Text */}
          <div className="bg-muted/50 rounded-lg p-4 border border-border">
            <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">
              {trade.postText}
            </p>
          </div>

          {/* Telegram Disclaimer - First instance */}
          <TelegramDisclaimer language={language} />

          {/* Trade info grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">Pair</p>
              <p className="text-foreground font-medium">{trade.pair}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">Leverage</p>
              <p className="text-foreground font-medium">{trade.leverage}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">Result</p>
              <p className={`font-medium ${getPnlClass(trade.pnl)}`}>{formatResult(trade.result)}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">P&L</p>
              <p className={`font-medium ${getPnlClass(trade.pnl)}`}>
                {formatPnl(trade.pnl)} USDT
              </p>
            </div>
          </div>

          {/* Trade log */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Trade Log</h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[7px] top-3 bottom-3 w-0.5 bg-border" />
              
              <div className="space-y-4">
                {logEntries.map((entry, index) => (
                  <div key={index} className="flex gap-4 relative">
                    {/* Timeline dot */}
                    <div className="w-4 h-4 rounded-full bg-muted border-2 border-primary flex-shrink-0 mt-1 z-10" />
                    
                    <div className="flex-1 bg-muted/30 rounded-lg p-3">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-foreground font-medium text-sm">{entry.title}</span>
                        <span className="text-muted-foreground text-xs whitespace-nowrap">{entry.time}</span>
                      </div>
                      <div className="space-y-1">
                        {entry.details.map((detail, i) => (
                          <p key={i} className="text-muted-foreground text-xs">{detail}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Telegram Disclaimer - Second instance at bottom */}
          <TelegramDisclaimer language={language} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TradeDetailModal;