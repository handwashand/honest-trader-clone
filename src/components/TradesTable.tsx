import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trade } from "@/data/trades";
import TradeDetailModal from "./TradeDetailModal";

interface TradesTableProps {
  trades: Trade[];
}

const formatPnl = (pnl: number) => {
  const rounded = Math.round(pnl);
  return pnl >= 0 ? `+${rounded}` : `${rounded}`;
};

const formatResult = (result: string) => {
  // Remove decimals from percentage
  return result.replace(/\.\d+%/, '%');
};

const TradesTable = ({ trades }: TradesTableProps) => {
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);
  
  const getStatusClass = (status: Trade["status"]) => {
    switch (status) {
      case "ACTIVE":
        return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
      case "Closed":
        return "bg-muted text-muted-foreground border-border";
      case "EXPIRED":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      default:
        return "";
    }
  };

  const getDirectionClass = (direction: Trade["direction"]) => {
    return direction === "LONG" 
      ? "bg-profit/20 text-profit" 
      : "bg-loss/20 text-loss";
  };

  const getPnlClass = (pnl: number) => {
    return pnl >= 0 ? "text-profit" : "text-loss";
  };

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Trade History</h2>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground font-medium text-xs">Signal</TableHead>
              <TableHead className="text-muted-foreground font-medium text-xs hidden sm:table-cell">№</TableHead>
              <TableHead className="text-muted-foreground font-medium text-xs hidden sm:table-cell">Date</TableHead>
              <TableHead className="text-muted-foreground font-medium text-xs">Pair</TableHead>
              <TableHead className="text-muted-foreground font-medium text-xs hidden md:table-cell">Direction</TableHead>
              <TableHead className="text-muted-foreground font-medium text-xs hidden lg:table-cell">Leverage</TableHead>
              <TableHead className="text-muted-foreground font-medium text-xs hidden md:table-cell">Result</TableHead>
              <TableHead className="text-muted-foreground font-medium text-xs">P&L</TableHead>
              <TableHead className="text-muted-foreground font-medium text-xs hidden lg:table-cell">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trades.map((trade) => (
              <TableRow 
                key={trade.id} 
                className="border-border cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setSelectedTrade(trade)}
              >
                <TableCell className="p-1.5">
                  <img 
                    src={trade.screenshot} 
                    alt={trade.pair}
                    className="w-10 h-8 sm:w-12 sm:h-9 object-cover rounded"
                  />
                </TableCell>
                <TableCell className="text-muted-foreground text-xs hidden sm:table-cell">#{trade.id}</TableCell>
                <TableCell className="text-foreground text-xs whitespace-nowrap hidden sm:table-cell">{trade.date.split(' ')[0]}</TableCell>
                <TableCell className="text-foreground font-medium text-xs">{trade.pair}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${getDirectionClass(trade.direction)}`}>
                    {trade.direction}
                  </span>
                </TableCell>
                <TableCell className="text-foreground text-xs hidden lg:table-cell">{trade.leverage}</TableCell>
                <TableCell className={`text-xs hidden md:table-cell ${getPnlClass(trade.pnl)}`}>{formatResult(trade.result)}</TableCell>
                <TableCell className={`text-xs ${getPnlClass(trade.pnl)}`}>
                  {formatPnl(trade.pnl)}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <span className={`px-1.5 py-0.5 rounded text-xs font-medium border ${getStatusClass(trade.status)}`}>
                    {trade.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <TradeDetailModal 
        trade={selectedTrade} 
        open={!!selectedTrade} 
        onClose={() => setSelectedTrade(null)} 
      />
    </div>
  );
};

export default TradesTable;