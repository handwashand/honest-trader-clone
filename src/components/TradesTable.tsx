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
  language: "EN" | "RU";
}

const formatPnl = (pnl: number) => {
  const rounded = Math.round(pnl);
  return pnl >= 0 ? `+${rounded}` : `${rounded}`;
};

const formatResult = (result: string) => {
  // Remove decimals from percentage
  return result.replace(/\.\d+%/, '%');
};

const TradesTable = ({ trades, language }: TradesTableProps) => {
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
      
      <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <Table className="min-w-[400px]">
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground font-medium text-xs px-0.5 py-2 sm:px-2">Signal</TableHead>
              <TableHead className="text-muted-foreground font-medium text-xs hidden md:table-cell px-0.5 py-2 sm:px-2">№</TableHead>
              <TableHead className="text-muted-foreground font-medium text-xs px-0.5 py-2 sm:px-2">Date</TableHead>
              <TableHead className="text-muted-foreground font-medium text-xs px-0.5 py-2 sm:px-2">Pair</TableHead>
              <TableHead className="text-muted-foreground font-medium text-xs hidden lg:table-cell px-0.5 py-2 sm:px-2">Direction</TableHead>
              <TableHead className="text-muted-foreground font-medium text-xs hidden lg:table-cell px-0.5 py-2 sm:px-2">Leverage</TableHead>
              <TableHead className="text-muted-foreground font-medium text-xs hidden md:table-cell px-0.5 py-2 sm:px-2">Result</TableHead>
              <TableHead className="text-muted-foreground font-medium text-xs px-0.5 py-2 sm:px-2">P&L</TableHead>
              <TableHead className="text-muted-foreground font-medium text-xs hidden lg:table-cell px-0.5 py-2 sm:px-2">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trades.map((trade) => (
              <TableRow 
                key={trade.id} 
                className="border-border cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setSelectedTrade(trade)}
              >
                <TableCell className="px-0.5 py-1 sm:px-2">
                  <img 
                    src={trade.screenshot} 
                    alt={trade.pair}
                    className="w-7 h-5 sm:w-12 sm:h-9 object-cover rounded"
                  />
                </TableCell>
                <TableCell className="text-muted-foreground text-xs hidden md:table-cell px-0.5 py-1 sm:px-2">#{trade.id}</TableCell>
                <TableCell className="text-foreground text-xs whitespace-nowrap px-0.5 py-1 sm:px-2">{trade.date.split(' ')[0]}</TableCell>
                <TableCell className="text-foreground font-medium text-xs px-0.5 py-1 sm:px-2">{trade.pair}</TableCell>
                <TableCell className="hidden lg:table-cell px-0.5 py-1 sm:px-2">
                  <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${getDirectionClass(trade.direction)}`}>
                    {trade.direction}
                  </span>
                </TableCell>
                <TableCell className="text-foreground text-xs hidden lg:table-cell px-0.5 py-1 sm:px-2">{trade.leverage}</TableCell>
                <TableCell className={`text-xs hidden md:table-cell px-0.5 py-1 sm:px-2 ${getPnlClass(trade.pnl)}`}>{formatResult(trade.result)}</TableCell>
                <TableCell className={`text-xs px-0.5 py-1 sm:px-2 ${getPnlClass(trade.pnl)}`}>
                  {formatPnl(trade.pnl)}
                </TableCell>
                <TableCell className="hidden lg:table-cell px-0.5 py-1 sm:px-2">
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
        language={language}
      />
    </div>
  );
};

export default TradesTable;