import { X, Image } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trade } from "@/data/trades";

interface TradeDetailModalProps {
  trade: Trade | null;
  open: boolean;
  onClose: () => void;
}

const TradeDetailModal = ({ trade, open, onClose }: TradeDetailModalProps) => {
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
        `Price: ${(Math.random() * 100 + 10).toFixed(1)} USDT`
      ],
      time: `${baseDate.split('-').slice(1).reverse().join(' ')}, 16:00`
    });

    // Position opened
    const entryPrice = (Math.random() * 100 + 10).toFixed(1);
    const positionSize = (Math.random() * 2000 + 500).toFixed(0);
    const bought = (parseFloat(positionSize) / parseFloat(entryPrice)).toFixed(2);
    entries.push({
      title: "Position opened",
      details: [
        `Entry price: ${entryPrice} USDT`,
        `Position size: ${positionSize} USDT`,
        `Bought: ${bought} ${trade.pair.split('/')[0]}`,
        `Direction: ${trade.direction}`,
        `TP: ${(parseFloat(entryPrice) * 1.05).toFixed(0)} / ${(parseFloat(entryPrice) * 1.1).toFixed(0)} / ${(parseFloat(entryPrice) * 1.15).toFixed(0)}`,
        `SL: ${(parseFloat(entryPrice) * 0.95).toFixed(0)}`
      ],
      time: `${baseDate.split('-').slice(1).reverse().join(' ')}, 16:15`
    });

    if (trade.status === "Closed" && trade.pnl >= 0) {
      // TP1 hit
      entries.push({
        title: "TP1 hit — partial close",
        details: [
          `TP1 price: ${(parseFloat(entryPrice) * 1.05).toFixed(0)} USDT`,
          `Closed: 33%`,
          `Closed amount: ${(parseFloat(positionSize) * 0.33).toFixed(2)} USDT`,
          `PNL: +${(parseFloat(positionSize) * 0.05).toFixed(2)} USDT (+5.0%)`
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
          `TP2 price: ${(parseFloat(entryPrice) * 1.1).toFixed(0)} USDT`,
          `Closed: ${(parseFloat(positionSize) * 0.67).toFixed(2)} USDT`,
          `PNL: +${(trade.pnl * 0.7).toFixed(2)} USDT`
        ],
        time: `${baseDate.split('-').slice(1).reverse().join(' ')}, 21:00`
      });
    } else if (trade.status === "Closed" && trade.pnl < 0) {
      // SL hit
      entries.push({
        title: "Stop Loss hit",
        details: [
          `SL price: ${(parseFloat(entryPrice) * 0.95).toFixed(0)} USDT`,
          `Closed: 100%`,
          `PNL: ${trade.pnl.toFixed(2)} USDT (${trade.result})`
        ],
        time: `${baseDate.split('-').slice(1).reverse().join(' ')}, 18:30`
      });
    } else if (trade.status === "ACTIVE") {
      entries.push({
        title: "Position active",
        details: [
          `Current PNL: +${trade.pnl.toFixed(2)} USDT`,
          `Unrealized: ${trade.result}`
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
          `Total PNL: ${trade.pnl >= 0 ? '+' : ''}${trade.pnl.toFixed(2)} USDT`,
          `Total return: ${trade.result}`
        ],
        time: `${baseDate.split('-').slice(1).reverse().join(' ')}, 21:30`
      });
    }

    return entries;
  };

  const logEntries = generateLogEntries();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-foreground flex items-center gap-3">
            <span className="text-xl">Signal #{trade.id}</span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${getDirectionClass(trade.direction)}`}>
              {trade.direction}
            </span>
            <span className="text-muted-foreground font-normal text-sm">{trade.pair}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Screenshot */}
          <div className="bg-muted rounded-lg overflow-hidden border border-border">
            <img 
              src={trade.screenshot} 
              alt={`${trade.pair} Chart`}
              className="w-full aspect-video object-cover"
            />
          </div>

          {/* Post Text */}
          <div className="bg-muted/50 rounded-lg p-4 border border-border">
            <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">
              {trade.postText}
            </p>
          </div>

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
              <p className={`font-medium ${getPnlClass(trade.pnl)}`}>{trade.result}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">P&L</p>
              <p className={`font-medium ${getPnlClass(trade.pnl)}`}>
                {trade.pnl >= 0 ? "+" : ""}{trade.pnl.toFixed(2)} USDT
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TradeDetailModal;
