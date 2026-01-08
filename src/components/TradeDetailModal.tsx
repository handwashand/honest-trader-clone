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

  // Demo log entries based on trade
  const logEntries = [
    { time: trade.date, action: "Signal opened", details: `${trade.pair} ${trade.direction} ${trade.leverage}` },
    { time: trade.date.replace(/\d{2}:\d{2}$/, (m) => {
      const [h, min] = m.split(':').map(Number);
      return `${String(h).padStart(2, '0')}:${String(min + 5).padStart(2, '0')}`;
    }), action: "Entry executed", details: `Entry at market price` },
    ...(trade.status === "Closed" ? [
      { time: trade.date.replace(/\d{2}:\d{2}$/, (m) => {
        const [h, min] = m.split(':').map(Number);
        return `${String((h + 2) % 24).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
      }), action: trade.pnl >= 0 ? "Take profit hit" : "Stop loss hit", details: `Closed with ${trade.result}` }
    ] : []),
    ...(trade.status === "ACTIVE" ? [
      { time: "Now", action: "Position active", details: `Current P&L: ${trade.result}` }
    ] : []),
    ...(trade.status === "EXPIRED" ? [
      { time: trade.date.replace(/\d{2}:\d{2}$/, () => "23:59"), action: "Signal expired", details: `Entry conditions not met` }
    ] : []),
  ];

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
            <div className="space-y-2">
              {logEntries.map((entry, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 text-sm bg-muted/30 rounded-lg p-3"
                >
                  <span className="text-muted-foreground whitespace-nowrap font-mono text-xs">
                    {entry.time}
                  </span>
                  <span className="text-foreground font-medium">{entry.action}</span>
                  <span className="text-muted-foreground ml-auto">{entry.details}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TradeDetailModal;
